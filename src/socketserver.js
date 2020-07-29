require('dotenv').config();

const WebSocket = require('ws');
const fs = require('fs')
const https = require('http')
const port = process.env.WEBSOCKET_PORT || 8081

const server = https.createServer()

const wss = new WebSocket.Server({ server })

wss.on('connenction', ws=>{
  console.log('New client!');

  ws.on('close', ()=>{
    console.log('client disconnected!');
  })
})

server.listen(port, () => {
  console.log(`WebSocket Port: ${port}`)
})
