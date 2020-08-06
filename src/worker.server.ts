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
      // exec_mode : 'cluster',        // Allows your app to be clustered
      // instances : 4,                // Optional: Scales your app by 4
      // max_memory_restart : '100M'   // Optional: Restarts your app if it reaches 100Mo
    }, function(err, apps) {
      // pm2.disconnect();   // Disconnects from PM2
      if (err) throw err
    });
  })

  // pm2.start({
  //   name: 'test',
  //   script    : './build/workers/autosleep.worker.js',         // Script to be run
  //   // exec_mode : 'cluster',        // Allows your app to be clustered
  //   // instances : 4,                // Optional: Scales your app by 4
  //   // max_memory_restart : '100M'   // Optional: Restarts your app if it reaches 100Mo
  // }, function(err, apps) {
  //   // pm2.disconnect();   // Disconnects from PM2
  //   if (err) throw err
  // });

  // pm2.start({
  //   name: 'test2',
  //   script    : './build/workers/autosleep.worker.js',         // Script to be run
  //   // exec_mode : 'cluster',        // Allows your app to be clustered
  //   // instances : 4,                // Optional: Scales your app by 4
  //   // max_memory_restart : '100M'   // Optional: Restarts your app if it reaches 100Mo
  // }, function(err, apps) {
  //   // pm2.disconnect();   // Disconnects from PM2
  //   if (err) throw err
  // });
})

// let workerList = Workers.all()
// console.log(workerList,'--list')
// Object.keys(workerList).forEach(workerName=>{
//   console.log(workerList[workerName], '--file')
  
// })