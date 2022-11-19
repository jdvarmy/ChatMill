import { Action } from './Action';
import { handleClick } from '../../utils/validator/handleClick';
import { changeUserRequest } from '../requests/changeUserRequest';
import { UserDataType } from '../requests/getUserRequest';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';
import { InputNames } from '../../components/TextField/TextField';
import Security from '../../pages/Profile/Security/Security';
import { changeSecurityRequest } from '../requests/changeSecurityRequest';
import { changeAvatarRequest } from '../requests/changeAvatarRequest';

class UserAction extends Action {
  constructor() {
    super();
  }

  public async putProfile(e: MouseEvent) {
    e.preventDefault();
    const validateFormData = handleClick<keyof Omit<UserDataType, 'id' | 'avatar'>, string>(e);

    if (validateFormData) {
      const user = await changeUserRequest(validateFormData);

      if (user) {
        this.store.set('user', camelCaseKeys(user));
      }
    }
  }

  public async putSecurity(e: MouseEvent, ClassContent: Security) {
    e.preventDefault();
    const validateFormData = handleClick<InputNames.oldPassword | InputNames.newPassword, string>(e);

    if (validateFormData) {
      const response = await changeSecurityRequest(validateFormData);
      if (response) {
        const fields = ClassContent.viewArrayOfChildren.fields;
        fields.forEach((field) => field.setProps({ value: '' }));
      }
    }
  }

  public async putAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file);

    const user = await changeAvatarRequest(formData);

    if (user) {
      this.store.set('user', camelCaseKeys(user));
    }
  }
}

export default new UserAction();
