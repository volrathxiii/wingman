require('dotenv').config()
import pm2 from 'pm2'
pm2.connect((err)=>{
  if (err) {
    console.error(err);
    process.exit(2);
  }
})

import WebSocket,{Server} from 'ws'
import Processor from "./processor"

import express from 'express';
import * as fs from 'fs';
import * as https from 'https';
const app = express()


const SocketServer = https.createServer({
  key: fs.readFileSync('cert/localhost.key'),
  cert: fs.readFileSync('cert/localhost.crt')
}, app)


const port:number = parseInt(String(process.env.WEBSOCKET_PORT)) || 8081

const processor = new Processor()

const wss = new Server({server:SocketServer})

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


SocketServer.listen(port, () => {
  console.log(`WebSocket Port (secure): ${port}`)
  if(typeof process.send === 'function') process.send('ready');
})