import Jobs from './data/jobs'
import Reactions from './data/reactions'
// import { jobsSample1 } from './data/jobsSamples'
// import { reactionsSample1 } from './data/reactionsSamples'
import { CombinedDataInterface } from './interfaces/CombinedDataInterface'
import { CompaniesInterface } from './interfaces/CompaniesInterface'
import { JobInterface } from './interfaces/JobInterface'
import { ReactionInterface } from './interfaces/ReactionInterface'
import { StringSetArrayType } from './interfaces/StringSetArrayType'
import { findHighestSimilarity } from './utils/findHighestSimilarity'

export const taskTwo = async () => {
  const jobs: JobInterface[] = await Jobs()
  const reactions: ReactionInterface[] = await Reactions()
  // const jobs: JobInterface[] = jobsSample1
  // const reactions: ReactionInterface[] = reactionsSample1
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
    combined.reduce((accumulator: CompaniesInterface, current: CombinedDataInterface) => {
      if (!accumulator[current.company_id]) accumulator[current.company_id] = new Set()
      // Set because we are counting only one job like from each company
      accumulator[current.company_id].add(current.user_id)
      return accumulator
    }, {})
  ) // [company, Set(){...users}]

  const { answers, score } = findHighestSimilarity(companies)

  return { company1: answers[0][0], company2: answers[1][0], similarity: score }
}
