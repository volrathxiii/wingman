// Communication to API goes thru sockets

const ws = new WebSocket("ws://localhost:8081");

ws.addEventListener("open", ()=>{
  console.log('Connected to WebSocket!')
})