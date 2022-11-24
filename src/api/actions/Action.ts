import store from '../../packages/Store/Store';
import { Router } from '../../packages/Router/Router';

export class Action {
  public store: typeof store;
  public router: Router;

  constructor() {
    this.store = store;
    this.router = new Router();
  }
}
