// import Jobs from './data/jobs'
// import Reactions from './data/reactions'
import { jobsSample1 } from './data/jobsSamples'
import { reactionsSample1 } from './data/reactionsSamples'
import { CombinedDataInterface } from './interfaces/CombinedDataInterface'
import { CompaniesInterface } from './interfaces/CompaniesInterface'
import { JobInterface } from './interfaces/JobInterface'
import { ReactionInterface } from './interfaces/ReactionInterface'
import { compareSetSimilarity } from './utils/compareSetSimilarity'
// import { SetInterface } from './interfaces/SetInterface'
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

  const companies = Object.entries(
    combined.reduce((accumulator: CompaniesInterface, current: CombinedDataInterface) => {
      if (!accumulator[current.company_id]) {
        accumulator[current.company_id] = new Set() // Set because we are counting only one job like from each company
        accumulator[current.company_id].add(current.user_id)
      } else {
        accumulator[current.company_id].add(current.user_id)
      }

      return accumulator
    }, {})
  )

  const answers = []
  let score: number = 0

  for (let i = 0; i < companies.length; i++) {
    const currentUser = companies[i]

    if (!answers.length && !score) {
      answers[0] = currentUser
      answers[1] = companies[i + 1]
      score = compareSetSimilarity(currentUser[1], companies[i + 1][1])
      i++
      continue
    }

    const comparisonToFirst: number = compareSetSimilarity(currentUser[1], answers[0][1])
    const comparisonToSecond: number = compareSetSimilarity(currentUser[1], answers[1][1])

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

  return { company1: answers[0][0], company2: answers[1][0], similarity: score }
}
