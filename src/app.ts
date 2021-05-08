// import csv from 'csvtojson/v2'

// interface ReactionInterface {
//   user_id: string
//   job_id: string
//   direction: string
//   time: string
// }

// interface JobsInterface {
//   [key: string]: {
//     users: string[]
//   }
// }

// interface userSimilarityInterface {
//   [key: string]: {
//     user: string
//     count: number
//   }
// }

const main = async () => {
  // const csvFilePath = 'src/data/reactions.csv'
  // const data: ReactionInterface[] = await csv().fromFile(csvFilePath)
  // const reactions = data.filter(reaction => reaction.direction === 'true').sort((a,b)=> +b.job_id - +a.job_id)

  // const reactions = [
  //   { job_id: 'apple', user_id: 'john', direction: true },
  //   { job_id: 'google', user_id: 'jane', direction: true },
  //   { job_id: 'amazon', user_id: 'john', direction: true },
  //   { job_id: 'apple', user_id: 'jane', direction: true },
  //   { job_id: 'google', user_id: 'john', direction: true },
  //   { job_id: 'apple', user_id: 'mark', direction: true },
  //   { job_id: 'amazon', user_id: 'jane', direction: true },
  //   { job_id: 'google', user_id: 'mark', direction: true },
  //   { job_id: 'microsoft', user_id: 'john', direction: true },
  //   { job_id: 'apple', user_id: 'james', direction: true }
  // ]

  const reactions = [
    { job_id: 12, user_id: 'john', direction: true },
    { job_id: 2, user_id: 'jane', direction: true },
    { job_id: 3, user_id: 'john', direction: true },
    { job_id: 4, user_id: 'jane', direction: true },
    { job_id: 5, user_id: 'john', direction: true },
    { job_id: 6, user_id: 'mark', direction: true },
    { job_id: 7, user_id: 'jane', direction: true },
    { job_id: 8, user_id: 'mark', direction: true },
    { job_id: 9, user_id: 'john', direction: true },
    { job_id: 10, user_id: 'james', direction: true }
  ]

  const users = reactions.reduce(
    (acc: any, r): any => {
      if (!acc[r.user_id]) {
        acc[r.user_id] = new Set()
        if (r.direction) acc[r.user_id].add(r.job_id)
      } else if (r.direction) {
        acc[r.user_id].add(r.job_id)
      }

      const key: any = Array.from(acc[r.user_id]).reduce((acc: any, curr: any) => +acc * +curr, 1)

      if (!acc.jobs[key]) {
        acc.jobs[key] = new Set([r.user_id])
      } else {
        acc.jobs[key].add(r.user_id)
      }

      return acc
    },
    { jobs: {} }
  )
  // console.log(Object.entries(users.jobs).sort((a, b) => b[0].length - a[0].length))
  console.log(users)
  return users
}

main()

// const reactions = [
//   { jobId: 'apple', userId: 'john', direction: true },
//   { jobId: 'apple', userId: 'jane', direction: true },
//   { jobId: 'apple', userId: 'mark', direction: true },
//   { jobId: 'amazon', userId: 'john', direction: true },
//   { jobId: 'amazon', userId: 'jane', direction: true },
//   { jobId: 'google', userId: 'john', direction: true },
//   { jobId: 'google', userId: 'jane', direction: true },
//   { jobId: 'google', userId: 'mark', direction: true }
// ]
