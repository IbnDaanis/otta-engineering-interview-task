import csv from 'csvtojson/v2'
import { ReactionInterface } from '../interfaces/ReactionInterface'

const reactions = async () => {
  const csvFilePath = 'src/data/reactions.csv'
  const data: ReactionInterface[] = await csv().fromFile(csvFilePath)
  const filteredData: ReactionInterface[] = data
    .filter(reaction => reaction.direction === 'true')
    .sort((a, b) => +b.job_id - +a.job_id)
  return filteredData
}

export default reactions
