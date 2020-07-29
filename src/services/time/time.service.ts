import ServiceAbstract from '../service.abstract';

import TimeNowIntent from './timenow.intent';

class TimeService extends ServiceAbstract
{
  constructor()
  {
    super();
    this.addIntent(new TimeNowIntent())
  }
}

export default new TimeService();

