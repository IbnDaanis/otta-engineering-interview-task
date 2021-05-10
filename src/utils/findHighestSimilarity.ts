import { StringSetArrayType } from '../interfaces/StringSetArrayType'
import { compareSetSimilarity } from './compareSetSimilarity'

export const findHighestSimilarity = (
  data: StringSetArrayType[]
): { answers: StringSetArrayType[]; score: number } => {
  const answers = []
  let score: number = 0

  for (let i = 0; i < data.length; i++) {
    const currentUser = data[i]

    if (!answers.length && !score) {
      answers[0] = currentUser
      answers[1] = data[i + 1]
      score = compareSetSimilarity(currentUser[1], data[i + 1][1])
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

  return { answers, score }
}
