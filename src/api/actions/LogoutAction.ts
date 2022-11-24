import { Action } from './Action';
import { logoutRequest } from '../requests/logoutRequest';

class LogoutAction extends Action {
  constructor() {
    super();
  }

  public async logout(e: MouseEvent) {
    e.preventDefault();

    try {
      logoutRequest();

      this.store.set('user', {});
      this.router.go('/');
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LogoutAction();
