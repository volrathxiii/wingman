require('dotenv').config()

import {Server} from 'ws'
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
    let processed = await processor.execute(data.transcript)
    if(processed === false || typeof processed === 'undefined') {
      console.log(`UndefinedCommand: ${message}`)
      return false
    }
    processed.forEach(intent=>{
      let output = JSON.stringify({
        type: intent.constructor.name,
        data: intent.data
      })
      // Send reply
      console.log(`Reply: ${output}`)
      ws.send(output)
    })
  })
})