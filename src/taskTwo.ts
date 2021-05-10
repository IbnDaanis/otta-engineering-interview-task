// import Jobs from './data/jobs'
// import Reactions from './data/reactions'
import { jobsSample1 } from './data/jobsSamples'
import { reactionsSample1 } from './data/reactionsSamples'
import { CombinedDataInterface } from './interfaces/CombinedDataInterface'
import { JobInterface } from './interfaces/JobInterface'
import { ReactionInterface } from './interfaces/ReactionInterface'
import { SetInterface } from './interfaces/SetInterface'
import { UsersArray, UsersInterface } from './interfaces/UsersInterface'

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

  const companies: [string, Set<string>][] = Object.entries(
    combined.reduce(
      (accumulator: UsersInterface, current: CombinedDataInterface): UsersInterface => {
        if (!accumulator[current.company_id]) {
          accumulator[current.company_id] = new Set() // Set because we are counting only one job like from each company
          accumulator[current.company_id].add(current.job_id)
        }

        return accumulator
      },
      {}
    )
  )

  const userCompanies: UsersArray = Object.entries(
    combined.reduce((accumulator: SetInterface, current: CombinedDataInterface): SetInterface => {
      if (!accumulator[current.user_id]) {
        accumulator[current.user_id] = new Set()
        accumulator[current.user_id].add(current.company_id)
      } else if (current.direction) {
        accumulator[current.user_id].add(current.company_id)
      }
      return accumulator
    }, {})
  )

  const compareLikes = (first: string, second: string, array: UsersArray): number => {
    let common = 0
    array.forEach(user => {
      if (user[1].has(first) && user[1].has(second)) common++
    })
    return common
  }

  const answers: any = []
  let score: number = 0

  for (let i = 0; i < companies.length; i++) {
    const currentCompany = companies[i]
    const nextCompany = companies[i + 1]

    if (!answers.length && !score) {
      answers[0] = currentCompany
      answers[1] = nextCompany
      let scores = compareLikes(currentCompany[0], nextCompany[0], userCompanies)

      score = scores
      i++
      continue
    }

    const comparisonToFirst: number = compareLikes(currentCompany[0], answers[0][1], userCompanies)
    const comparisonToSecond: number = compareLikes(currentCompany[0], answers[1][1], userCompanies)

    if (comparisonToFirst > score) {
      answers[1] = currentCompany
      score = comparisonToFirst
      continue
    }

    if (comparisonToSecond > score) {
      answers[0] = currentCompany
      score = comparisonToSecond
    }
  }

  return { company1: answers[0][0], company2: answers[1][0], similarity: score }
}
