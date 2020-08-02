// To emulate a brain
// bring me a coffee wingman
// wingman, bring me a coffee 
// determine what tasks can be done
// determine if it understands the task (boolean)
//  determine subject - who is asking the task
//  determine what is the task
//  determine what the task is for
// can do the task ()
// Determines if it would like to do the task (boolean)
// determine how to respond
// determine to learn from the task

let compromise = require('compromise')

let request = compromise(`talk to me samantha can you please tell me what time is because i need to go somewhere and tomorrow there will`)


console.log(request.clauses().json())

