require('dotenv').config();

import {Server} from 'ws';
import * as http from 'http';

const port = process.env.WEBSOCKET_PORT || 8081

const server = http.createServer()

const wss = new Server( {server} )

wss.on('connenction', ws=>{
  console.log('New client!');

  ws.on('close', ()=>{
    console.log('client disconnected!');
  })
})

server.listen(port,() => {
  console.log(`WebSocket Port: ${port}`)
})
