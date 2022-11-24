import { Action } from './Action';
import { handleClick } from '../../utils/validator/handleClick';
import { RegistrationDataRequestType, registrationRequest } from '../requests/registrationRequest';
import { getUserRequest } from '../requests/getUserRequest';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';

class RegistrationAction extends Action {
  constructor() {
    super();
  }

  public async registration(e: MouseEvent) {
    e.preventDefault();
    const validateFormData = handleClick<keyof RegistrationDataRequestType, string>(e);

    if (validateFormData) {
      const registration = await registrationRequest(validateFormData);

      if (registration?.id) {
        const user = await getUserRequest();

        if (user) {
          this.store.set('user', camelCaseKeys(user));
          this.router.go('/messenger');
        }
      }
    }
  }
}

export default new RegistrationAction();
