import api, { contentHeaderJson } from '../api';
import { InputNames } from '../../components/TextField/TextField';

export const changeSecurityRequest = async (data: Record<InputNames.oldPassword | InputNames.newPassword, string>) => {
  try {
    return api.put<true>('user/password', JSON.stringify(data), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
