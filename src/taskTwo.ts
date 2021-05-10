import {
  JobInterface,
  ReactionInterface,
  CombinedDataInterface,
  StringSetArrayType,
  StringSetInterface
} from './interfaces'
import { findHighestSimilarity } from './utils'

// 1. Get the jobs and reactions lists
// 2. Combine them so each reaction has the correct company
// 4. Make a list of the companies and the users who liked at least one job in that company
// 3. Compare each company's common users to another's

export const taskTwo = async (
  jobsData: JobInterface[] | Promise<JobInterface[]>,
  reactionsData: ReactionInterface[] | Promise<ReactionInterface[]>
) => {
  const jobs: JobInterface[] = await jobsData
  const reactions: ReactionInterface[] = await reactionsData
  const combined: CombinedDataInterface[] = reactions.map(reaction => {
    const current: CombinedDataInterface = { ...reaction, company_id: '' }
    jobs.forEach(job => {
      if (reaction.job_id === job.job_id) {
        current.company_id = job.company_id
      }
    })
    return current
  })

  const companies: StringSetArrayType[] = Object.entries(
    combined.reduce((accumulator: StringSetInterface, current: CombinedDataInterface) => {
      if (!accumulator[current.company_id]) accumulator[current.company_id] = new Set()
      // Set because we are counting only one job like from each company
      accumulator[current.company_id].add(current.user_id)
      return accumulator
    }, {})
  ) // [company, Set(){...users}]

  const { answers, score } = findHighestSimilarity(companies)

  return { company1: answers[0][0], company2: answers[1][0], similarity: score }
}
