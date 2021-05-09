// import Jobs from './data/jobs'
// import Reactions from './data/reactions'
import { jobsSample1 } from './data/jobsSamples'
import { reactionsSample1 } from './data/reactionsSamples'
import { CombinedDataInterface } from './interfaces/CombinedDataInterface'
import { JobInterface } from './interfaces/JobInterface'
import { ReactionInterface } from './interfaces/ReactionInterface'
// import { UsersInterface } from './interfaces/UsersInterface'

export const taskTwo = async () => {
  // const jobs: JobInterface[] = await Jobs()
  // const reactions: ReactionInterface[] = await Reactions()
  const jobs: JobInterface[] = jobsSample1
  const reactions: ReactionInterface[] = reactionsSample1
  const combined: CombinedDataInterface[] = reactions.map(reaction => {
    let curr: any = reaction
    jobs.forEach(job => {
      if (reaction.job_id === job.job_id) {
        curr = { ...reaction, company_id: job.company_id }
      }
    })
    return curr
  })

  const companies: any = combined.reduce(
    (accumulator: any, current: CombinedDataInterface): any => {
      if (!accumulator[current.company_id]) {
        accumulator[current.company_id] = new Set()
        accumulator[current.company_id].add(current.job_id)
      }
      // else if (current.direction) {
      //   accumulator[current.user_id].add(current.job_id)
      // }
      return accumulator
    },
    {}
  )

  // const users = reactions.reduce(
  //   (accumulator: UsersInterface, current: ReactionInterface): UsersInterface => {
  //     if (!accumulator[current.user_id]) {
  //       accumulator[current.user_id] = new Set()
  //       if (current.direction) accumulator[current.user_id].add(current.job_id)
  //     } else if (current.direction) {
  //       accumulator[current.user_id].add(current.job_id)
  //     }
  //     return accumulator
  //   },
  //   {}
  // )

  // const compareLikes = (first: Set<string>, second: Set<string>): number => {
  //   let common = 0
  //   for (const a of first) {
  //     if (second.has(a)) common++
  //   }
  //   return common
  // }

  //  const answers: UsersArray = []
  //  let score: number = 0

  //  for (let i = 0; i < companies.length; i++) {
  //    const currentUser = users[i]

  //  }

  console.log(combined)
  return companies
}
