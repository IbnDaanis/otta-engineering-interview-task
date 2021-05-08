// import csv from 'csvtojson/v2'

// interface ReactionInterface {
//   user_id: string
//   job_id: string
//   direction: string
//   time: string
// }

const main = async () => {
  // const csvFilePath = 'src/data/reactions.csv'
  // const data: ReactionInterface[] = await csv().fromFile(csvFilePath)
  // const reactions = data
  //   .filter(reaction => reaction.direction === 'true')
  //   .sort((a, b) => +b.job_id - +a.job_id)

  const reactions = [
    { job_id: 'microsoft', user_id: 'john', direction: true },
    { job_id: 'microsoft', user_id: 'jack', direction: true },
    { job_id: 'apple', user_id: 'john', direction: true },
    { job_id: 'amazon', user_id: 'john', direction: true },
    { job_id: 'apple', user_id: 'james', direction: true },
    { job_id: 'google', user_id: 'jane', direction: true },
    { job_id: 'apple', user_id: 'mark', direction: true },
    { job_id: 'amazon', user_id: 'jane', direction: true },
    { job_id: 'google', user_id: 'mark', direction: true },
    { job_id: 'google', user_id: 'john', direction: true },
    { job_id: 'apple', user_id: 'joseph', direction: true },
    { job_id: 'microsoft', user_id: 'joseph', direction: true },
    { job_id: 'netflix', user_id: 'jane', direction: true },
    { job_id: 'apple', user_id: 'jane', direction: true }
  ]

  const users = reactions.reduce((acc: any, r): any => {
    if (!acc[r.user_id]) {
      acc[r.user_id] = new Set()
      if (r.direction) acc[r.user_id].add(r.job_id)
    } else if (r.direction) {
      acc[r.user_id].add(r.job_id)
    }

    return acc
  }, {})

  const likes = Object.entries(users).sort((a: any, b: any) => b[1].size - a[1].size)
  for (let i = 0; i < likes.length; i++) {
    const curr: any = likes[i]
    if (i > 0) {
      const prev: any = likes[i - 1]
      if (curr[1].size === prev[1].size) {
        console.log('Match: ', curr[0], prev[0], curr[1].size)
      }
    }
  }
  return users
}

main()
