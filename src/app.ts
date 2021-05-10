import { taskOne } from './taskOne'
import { taskTwo } from './taskTwo'

// import Reactions from './data/reactions'
// import { reactionsSample1 } from './data/reactionsSamples'

// import Jobs from './data/jobs'
// import Reactions from './data/reactions'
import { jobsSample1 } from './data/jobsSamples'
import { reactionsSample1 } from './data/reactionsSamples'

taskOne(reactionsSample1).then(data => console.log(data))
taskTwo(jobsSample1, reactionsSample1).then(data => console.log(data))
