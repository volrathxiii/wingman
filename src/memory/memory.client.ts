require('dotenv').config()

import fetch from 'node-fetch'
import sp from 'synchronized-promise'

export default class MemoryClient
{
  private host:string
  constructor()
  {
    this.host = `http://${process.env.MEMORYSERVER_HOST}:${process.env.MEMORYSERVER_PORT}`
  }

  get(config:string):any
  {
    
    return new Promise((resolve, reject)=>{
      fetch(`${this.host}/get/${config}`)
        .then(res => res.json())
        .then(body => {
          resolve(body.data)
        })
    })
  }

  set(config:string, configValue:any):any
  {
    return new Promise((resolve, reject)=>{
      fetch(`${this.host}/set/${config}`,{
        method: 'post',
        body:    JSON.stringify({value: configValue}),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(body => {
          if(body.status === 'ok') {
            resolve(true)
          }else{
            resolve(false)
          }
        })
    })
  }
}


export function MemoryFetchAPI(config:string)
{
  let memory = new MemoryClient()
  return memory.get(config)
}

export let MemoryFetch = sp(MemoryFetchAPI)

// const MemoryClientSDK = new MemoryClient()

// setTimeout(()=>{
//   MemoryClientSDK.set('listen','falsed')
//     .then((body:any) => console.log(body, '--set'))
// }, 2000)

// setTimeout(async ()=>{
//   let data = await MemoryClientSDK.get('listen')
//   console.log(data, '--awaited')
// }, 4000)

