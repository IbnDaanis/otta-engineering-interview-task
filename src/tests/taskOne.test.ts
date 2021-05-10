import { taskOne } from '../taskOne'
import { reactionsSample1, reactionsSample2 } from '../data/reactionsSamples'
import Reactions from '../data/reactions'

test('John, Jane, 4', async () => {
  const data = await taskOne(reactionsSample1)
  return expect(data).toStrictEqual({ user1: 'john', user2: 'jane', similarity: 4 })
})

test('John, Jane, 5', async () => {
  const data = await taskOne(reactionsSample2)
  return expect(data).toStrictEqual({ user1: 'john', user2: 'jane', similarity: 5 })
})

test('3447, 2115, 120', async () => {
  const data = await taskOne(Reactions())
  return expect(data).toStrictEqual({ user1: '3447', user2: '2115', similarity: 120 })
})
