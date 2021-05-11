import { StringSetArrayType } from '../interfaces'
import { compareSetSimilarity } from './'

export const findHighestSimilarity = (
  data: StringSetArrayType[]
): { answers: StringSetArrayType[]; score: number } => {
  const answers: StringSetArrayType[] = []
  let score: number = 0

  // const e2215 = data.findIndex(answer => answer[0] == '2115')
  // const e3447 = data.findIndex(answer => answer[0] == '3447')
  // e2215 + e3447 > 0 && console.log(compareSetSimilarity(data[e2215][1], data[e3447][1]))

  for (let i = 0; i < data.length; i++) {
    const currentUser: StringSetArrayType = data[i]

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
