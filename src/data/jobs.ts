import csv from 'csvtojson/v2'
import { JobInterface } from '../interfaces/JobInterface'

const jobs = async () => {
  const csvFilePath = 'src/data/jobs.csv'
  const data: JobInterface[] = await csv().fromFile(csvFilePath)
  return data
}

export default jobs
