import { taskTwo } from '../taskTwo'
import { jobsSample1 } from '../data/jobsSamples'
import { reactionsSample1, reactionsSample2 } from '../data/reactionsSamples'
import Jobs from '../data/jobs'
import Reactions from '../data/reactions'

test('Apple, Amazon, 3', async () => {
  const data = await taskTwo(jobsSample1, reactionsSample1)
  return expect(data).toStrictEqual({ company1: 'apple', company2: 'amazon', similarity: 3 })
})

test('Amazon, Apple, 4', async () => {
  const data = await taskTwo(jobsSample1, reactionsSample2)
  return expect(data).toStrictEqual({ company1: 'amazon', company2: 'apple', similarity: 4 })
})

test('3447, 2115, 120', async () => {
  const data = await taskTwo(Jobs(), Reactions())
  return expect(data).toStrictEqual({ company1: '92', company2: '46', similarity: 104 })
})
