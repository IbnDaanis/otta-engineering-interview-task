import { taskOne } from './taskOne'
import { taskTwo } from './taskTwo'

import Reactions from './data/reactions'
import Jobs from './data/jobs'

// Answers
taskOne(Reactions()).then(data => console.log(data))
//{ user1: '3447', user2: '2115', similarity: 120 }

taskTwo(Jobs(), Reactions()).then(data => console.log(data))
//{ company1: '92', company2: '46', similarity: 104 }
