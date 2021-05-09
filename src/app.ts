import csv from 'csvtojson/v2'

interface ReactionInterface {
  user_id: string
  job_id: string
  direction: string
  time: string
}

interface UsersInterface {
  [key: string]: Set<string>
}

const main = async () => {
  const csvFilePath = 'src/data/reactions.csv'
  const reactionsData: ReactionInterface[] = await csv().fromFile(csvFilePath)
  const reactions = reactionsData
    .filter(reaction => reaction.direction === 'true')
    .sort((a, b) => +b.job_id - +a.job_id)

  // const reactions: ReactionInterface[] = [
  //   { job_id: 'facebook', user_id: 'john', direction: 'true', time: '' },
  //   { job_id: 'apple', user_id: 'john', direction: 'true', time: '' },
  //   { job_id: 'amazon', user_id: 'john', direction: 'true', time: '' },
  //   { job_id: 'netflix', user_id: 'john', direction: 'true', time: '' },
  //   { job_id: 'google', user_id: 'john', direction: 'true', time: '' },
  //   { job_id: 'facebook', user_id: 'jane', direction: 'true', time: '' },
  //   { job_id: 'apple', user_id: 'jane', direction: 'true', time: '' },
  //   { job_id: 'amazon', user_id: 'jane', direction: 'true', time: '' },
  //   { job_id: 'netflix', user_id: 'jane', direction: 'true', time: '' },
  //   { job_id: 'facebook', user_id: 'james', direction: 'true', time: '' },
  //   { job_id: 'apple', user_id: 'james', direction: 'true', time: '' },
  //   { job_id: 'amazon', user_id: 'james', direction: 'true', time: '' },
  //   { job_id: 'facebook', user_id: 'jack', direction: 'true', time: '' },
  //   { job_id: 'apple', user_id: 'jack', direction: 'true', time: '' }
  // ]

  const users = Object.entries(
    reactions.reduce((accumulator: UsersInterface, current: ReactionInterface): UsersInterface => {
      if (!accumulator[current.user_id]) {
        accumulator[current.user_id] = new Set()
        if (current.direction) accumulator[current.user_id].add(current.job_id)
      } else if (current.direction) {
        accumulator[current.user_id].add(current.job_id)
      }
      return accumulator
    }, {})
  )

  const compareLikes = (first: Set<string>, second: Set<string>): number => {
    let common = 0
    for (const a of first) {
      if (second.has(a)) common++
    }
    return common
  }

  const answers: any = []
  let score: number = 0

  for (let i = 0; i < users.length; i++) {
    const currentUser = users[i]

    if (!answers.length && !score) {
      answers[0] = currentUser
      answers[1] = users[i + 1]
      score = compareLikes(currentUser[1], users[i + 1][1])
      i++
      continue
    }

    const comparisonToFirst: number = compareLikes(currentUser[1], answers[0][1])
    const comparisonToSecond: number = compareLikes(currentUser[1], answers[1][1])

    if (comparisonToFirst > score) {
      answers[1] = currentUser
      score = comparisonToFirst
      continue
    }

    if (comparisonToSecond > score) {
      answers[0] = currentUser
      score = comparisonToSecond
    }
  }

  console.log(answers, score)

  return answers
}

main()

// const jobs = async () => {
//   const csvFilePath = 'src/data/jobs.csv'
//   const jobsData = await csv().fromFile(csvFilePath)

//   console.log(jobsData.sort((a, b) => +b.company_id - +a.company_id))
// }

// jobs()
