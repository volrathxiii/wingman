require('dotenv').config()

import WebSocket,{Server} from 'ws'
import Processor from "./processor"

const port:number = parseInt(String(process.env.WEBSOCKET_PORT)) || 8081

const processor = new Processor()

const wss = new Server({port:port},()=>{
  console.log(`WebSocket Port: ${port}`)
})

wss.on('connection', ws=>{
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