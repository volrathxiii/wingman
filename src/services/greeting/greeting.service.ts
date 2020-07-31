import ServiceAbstract from '../service.abstract';

import ListenIntent from './listen.intent';
import StopListenIntent from './stoplisten.intent';

class GreetingService extends ServiceAbstract
{
  constructor()
  {
    super(`greeting`);
    this.addIntent(new ListenIntent())
    this.addIntent(new StopListenIntent())
  }
}

export default new GreetingService();

