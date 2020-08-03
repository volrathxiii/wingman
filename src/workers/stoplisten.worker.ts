import WorkerAbstract from './worker.abstract'

export default class StopListenWorker extends WorkerAbstract
{
  constructor()
  {
    super(`stoplisten`)
  }

  MessageEvent(data:string, self: WorkerAbstract):void
  {
    console.log(`WORKER`, data)
  }

  Send(data:string|object):void
  {

  }
}


new StopListenWorker()