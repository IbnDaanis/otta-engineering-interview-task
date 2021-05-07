import csv from 'csvtojson/v2'

interface ReactionInterface {
  user_id: string
  job_id: string
  direction: string
  time: string
}

interface JobsInterface {
  [key: string]: {
    users: string[]
  }
}

interface userSimilarityInterface {
  [key: string]: {
    user: string
    count: number
  }
}

const main = async () => {
  const csvFilePath = 'src/data/reactions.csv'
  const data: ReactionInterface[] = await csv().fromFile(csvFilePath)
  const reactions = data.filter(reaction => reaction.direction === 'true')

  const users = [...new Set(reactions.map(reaction => reaction.user_id))]
  const jobs: JobsInterface = {}

  for (let i = 0; i < reactions.length; i++) {
    // Add jobs and the users who liked them
    const currentReaction = reactions[i]
    const currentJob = jobs[currentReaction.job_id]
    if (jobs[currentReaction.job_id]) {
      jobs[currentReaction.job_id] = {
        users: [...currentJob.users, currentReaction.user_id]
      }
    } else {
      jobs[currentReaction.job_id] = {
        users: [currentReaction.user_id]
      }
    }
  }

  for (let i = 0; i < reactions.length; i++) {
    // Remove jobs that only have one person who liked them and sort users
    const currentReaction = reactions[i]
    const currentJob = jobs[currentReaction.job_id]
    if (!currentJob?.users || currentJob.users.length < 2) {
      delete jobs[currentReaction.job_id]
    }
    if (jobs[currentReaction.job_id]) {
      jobs[currentReaction.job_id].users = [
        ...new Set(jobs[currentReaction.job_id].users.sort((a, b) => +a - +b))
      ]
    }
  }

  const userSimilarity: userSimilarityInterface = {}

  for (let i = 0; i < users.length; i++) {
    // if (users.length === 134) {
    //   console.log(users)
    // }
    // console.log(users[i])
    //     userSimilarity[users[i]] = {}

    for (let j = 0; j < users.length; j++) {
      if (users[i] === users[j]) continue
      let count = 0
      for (const job in jobs) {
        if (jobs[job].users.includes(users[i]) && jobs[job].users.includes(users[j])) {
          count++
        }
      }
      if (!count) continue
      userSimilarity[users[i]] = { user: users[j], count }
    }
  }
  // console.log(userSimilarity)
  console.log(Object.entries(userSimilarity).sort((a, b) => b[1].count - a[1].count)[0])
}

main()
