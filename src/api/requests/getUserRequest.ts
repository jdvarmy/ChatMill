import api, { contentHeaderJson } from '../api';

export type UserDataType = {
  id: number;
  login: string;
  email: string;
  phone: string;
  first_name: string;
  second_name: string;
  display_name: string | null;
  avatar: string | null;
  status?: string | null;
};

export const getUserRequest = async () => {
  try {
    return api.get<UserDataType>('auth/user', {}, { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
