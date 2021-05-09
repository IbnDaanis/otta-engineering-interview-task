import csv from 'csvtojson/v2'
import { ReactionInterface } from '../interfaces/ReactionInterface'

const reactions = async () => {
  const csvFilePath = 'src/data/reactions.csv'
  const data: ReactionInterface[] = await csv().fromFile(csvFilePath)
  const filteredData: ReactionInterface[] = data // Filtering out jobs that are not liked
    .filter(reaction => reaction.direction === 'true')
  return filteredData
}

export default reactions
