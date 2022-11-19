import api, { contentHeaderJson } from '../api';
import { InputNames } from '../../components/TextField/TextField';

export type LoginDataRequestType = {
  [InputNames.login]: string;
  [InputNames.password]: string;
};

export const loginRequest = async (data: LoginDataRequestType) => {
  try {
    return api.post<true>('auth/signin', JSON.stringify(data), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
