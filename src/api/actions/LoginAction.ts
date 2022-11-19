import { handleClick } from '../../utils/validator/handleClick';
import { LoginDataRequestType, loginRequest } from '../requests/loginRequest';
import { getUserRequest } from '../requests/getUserRequest';
import { Action } from './Action';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';

class LoginAction extends Action {
  constructor() {
    super();
  }

  public async login(e: MouseEvent) {
    e.preventDefault();
    try {
      const validateFormData = handleClick<keyof LoginDataRequestType, string>(e);

      if (validateFormData && (await loginRequest(validateFormData))) {
        const user = await getUserRequest();

        if (user) {
          const { id, ...newUser } = user;
          this.store.set('user', camelCaseKeys(newUser));
          this.router.go('/messenger');
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new LoginAction();
