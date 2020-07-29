import ServiceAbstract from '../service.abstract';

import TimeNowIntent from './timenow.intent';

class TimeService extends ServiceAbstract
{
  constructor()
  {
    super(`time`);
    this.addIntent(new TimeNowIntent())
  }
}

export default new TimeService();

