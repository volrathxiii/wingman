// anything about the memory will be store here

import pm2 from 'pm2'

let manager = pm2.connect((err)=>{
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.list((err, list) => {
    list.forEach(proc=>{
      console.log(proc.name, proc.pid)
    })
  })

  // pm2.stop('app-name', (err, proc) => {
  // })

  // pm2.restart('app-name', (err, proc) => {
  // })
  
  // pm2.start({
  //   script    : 'app.js',         // Script to be run
  //   exec_mode : 'cluster',        // Allows your app to be clustered
  //   instances : 4,                // Optional: Scales your app by 4
  //   max_memory_restart : '100M'   // Optional: Restarts your app if it reaches 100Mo
  // }, function(err, apps) {
  //   pm2.disconnect();   // Disconnects from PM2
  //   if (err) throw err
  // });
 


})