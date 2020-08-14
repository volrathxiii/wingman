require('dotenv').config()
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0';

import WebSocket from 'ws'

export interface WorkerInterface
{
  /**
   * Used to inject additional operations
   * to worker
   */
  boot():void

  /**
   * Triggered everytime a message is
   * broadcasted over sockets
   * @param data 
   * @param self 
   */
  MessageEvent(data:string, self: WorkerAbstract):void

  /**
   * Triggers when a connection to
   * websocket is established
   * @param self 
   */
  OpenEvent(self: WorkerAbstract):void
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
    
    this.boot()
  }

  boot():void
  {
    // Null implementation
  }

  OpenEvent(self: WorkerAbstract):void
  {
    console.info(`Connected to: ${self.socketHost}`)
    let data = {
      info: `WorkerName: ${self.name}`
    }
    self.socket.send(JSON.stringify(data))
  }

  MessageEvent(data:string, self: WorkerAbstract):void
  {
    // Null implementation
  }
}