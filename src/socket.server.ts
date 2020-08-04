require('dotenv').config()

import WebSocket,{Server} from 'ws'
import Processor from "./processor"
import pm2 from 'pm2'

const port:number = parseInt(String(process.env.WEBSOCKET_PORT)) || 8081

const processor = new Processor()

const wss = new Server({port:port},()=>{
  console.log(`WebSocket Port: ${port}`)
})

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

wss.on('connection', ws=>{
  // Get process list here?
  console.log('New client!')

  ws.on('close', ()=>{
    console.log('client disconnected!')
  })

  ws.on('message', async (message:string)=>{
    console.log(`Message: ${message}`)
    let data = JSON.parse(message)
    
    /**
     * Worker
     */
    if(typeof data.info !== 'undefined') {
      console.info(`Info: ${data.info}`)
      return false
    }

    /**
     * Intent
     * Something here
     */
    let processed = await processor.execute(data.transcript)
    // if(processed === false || typeof processed === 'undefined') {
    //   console.info(`UndefinedCommand: ${message}`)
    //   return false
    // }
    processed.forEach(intent=>{
      let output = JSON.stringify({
        type: intent.constructor.name,
        data: intent.data
      })
      // Send reply
      console.log(`Reply: ${output}`)
      // Broadcast to workers
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(output);
        }
      });
  
      ws.send(output)
    })
  })
})