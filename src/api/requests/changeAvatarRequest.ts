import api from '../api';
import { UserDataType } from './getUserRequest';

export const changeAvatarRequest = async (data: FormData) => {
  try {
    return api.put<UserDataType>('user/profile/avatar', data);
  } catch (e) {
    console.log(e);
  }
};
