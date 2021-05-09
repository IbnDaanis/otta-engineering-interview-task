import Jobs from './data/jobs'
import Reactions from './data/reactions'
import { JobInterface } from './interfaces/JobInterface'
import { ReactionInterface } from './interfaces/ReactionInterface'

export const taskTwo = async () => {
  const reactions: ReactionInterface[] = await Reactions()
  const jobs: JobInterface[] = await Jobs()

  console.log(jobs, reactions)
}
