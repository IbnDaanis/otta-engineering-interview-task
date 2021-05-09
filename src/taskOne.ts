import { ReactionInterface } from './interfaces/ReactionInterface'
import { UsersArray, UsersInterface } from './interfaces/UsersInterface'
// import Reactions from './data/reactions'
import { reactionsSample1 } from './data/reactionsSamples'

export const taskOne = async () => {
  const reactions: ReactionInterface[] = reactionsSample1

  const users: UsersArray = Object.entries(
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

  const answers: UsersArray = []
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

  return { user1: answers[0][0], user2: answers[1][0], similarity: score }
}
