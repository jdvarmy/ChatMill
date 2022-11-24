import api, { contentHeaderJson } from '../api';
import { InputNames } from '../../components/TextField/TextField';

export type RegistrationDataRequestType = {
  [InputNames.firstName]: string;
  [InputNames.secondName]: string;
  [InputNames.phone]: string;
  [InputNames.email]: string;
  [InputNames.login]: string;
  [InputNames.password]: string;
};

export const registrationRequest = (data: RegistrationDataRequestType) => {
  try {
    return api.post<{ id: number }>('auth/signup', JSON.stringify(data), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
