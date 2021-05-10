import { reactionsSample1 } from '../data/reactionsSamples'
import { taskOne } from '../taskOne'

test('Jim, James, 3', async () => {
  const data = await taskOne(reactionsSample1)
  return expect(data).toStrictEqual({ user1: 'jim', user2: 'james', similarity: 3 })
})
