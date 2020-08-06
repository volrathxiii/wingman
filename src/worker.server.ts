require('dotenv').config()
import pm2 from 'pm2'

import WorkersRegistry from './workers/index'

const Workers = new WorkersRegistry()

pm2.connect((err)=>{
  if (err) {
    console.error(err);
    process.exit(2);
  }

  let workerList = Workers.all()
  Object.keys(workerList).forEach(workerName=>{
    console.log(`Loading Worker:`, workerName, workerList[workerName])
    pm2.start({
      name: workerName,
      script    : workerList[workerName],         // Script to be run
      watch: [workerList[workerName]],
      wait_ready: true,
    }, function(err, apps) {
      if (err) throw err
    });
  })
})