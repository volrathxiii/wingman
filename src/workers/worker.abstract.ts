require('dotenv').config()
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

import WebSocket from 'ws'

export interface WorkerInterface
{
  MessageEvent(data:string, self: WorkerAbstract):void
  Send(data:string|object):void
}

export default abstract class WorkerAbstract implements WorkerInterface
{
  protected socket: WebSocket
  protected socketHost: string
  protected name:string //WorkerName

  constructor(name:string)
  {
    this.name = name
    this.socketHost = `wss://${process.env.WEBSOCKET_HOST}:${process.env.WEBSOCKET_PORT}`
    this.socket = new WebSocket(this.socketHost)
    let instance = this

    this.socket.on(`open`,(ws:any)=>{
      instance.OpenEvent(instance)
    })

    this.socket.on('message',(msg:string)=>{
      instance.MessageEvent(msg,instance)
    })

  }

  OpenEvent(self: WorkerAbstract):void
  {
    console.info(`Connected to: ${self.socketHost}`)
    let data = {
      info: `WorkerName: ${self.name}`
    }
    self.socket.send(JSON.stringify(data))
  }

  abstract MessageEvent(data:string, self: WorkerAbstract):void
  abstract Send(data:string|object):void
}