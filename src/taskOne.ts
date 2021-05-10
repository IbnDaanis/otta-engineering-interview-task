// import Reactions from './data/reactions'
import { reactionsSample1 } from './data/reactionsSamples'
import { ReactionInterface } from './interfaces/ReactionInterface'
import { StringSetInterface } from './interfaces/StringSetInterface'
import { StringSetArrayType } from './interfaces/StringSetArrayType'
import { findHighestSimilarity } from './utils/findHighestSimilarity'

export const taskOne = async () => {
  // const reactions: ReactionInterface[] = await Reactions()
  const reactions: ReactionInterface[] = reactionsSample1

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
