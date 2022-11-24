import api, { contentHeaderJson } from '../api';
import { UserDataType } from './getUserRequest';

export const changeUserRequest = async (data: Omit<UserDataType, 'id' | 'avatar'>) => {
  try {
    return api.put<UserDataType>('user/profile', JSON.stringify(data), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
