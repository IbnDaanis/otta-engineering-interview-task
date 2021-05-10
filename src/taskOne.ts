import { ReactionInterface, StringSetArrayType, StringSetInterface } from './interfaces'
import { findHighestSimilarity } from './utils'

// 1. Get data which only has likes
// 2. Make a list of users and all of the jobs they liked
// 3. Compare each user's common jobs to another's

export const taskOne = async (
  reactionsData: ReactionInterface[] | Promise<ReactionInterface[]>
) => {
  const reactions: ReactionInterface[] = await reactionsData

  const users: StringSetArrayType[] = Object.entries(
    reactions.reduce(
      (accumulator: StringSetInterface, current: ReactionInterface): StringSetInterface => {
        if (!accumulator[current.user_id]) {
          // Set because we don't want to count duplicates of job likes
          accumulator[current.user_id] = new Set()
          if (current.direction) accumulator[current.user_id].add(current.job_id)
        } else if (current.direction) {
          accumulator[current.user_id].add(current.job_id)
        }
        return accumulator
      },
      {}
    )
  ) // [user, Set(){...jobs}]

  const { answers, score } = findHighestSimilarity(users)

  return { user1: answers[0][0], user2: answers[1][0], similarity: score }
}
