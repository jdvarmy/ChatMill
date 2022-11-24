import api from '../api';

export const logoutRequest = async () => {
  try {
    return api.post<true>('auth/logout');
  } catch (e) {
    console.log(e);
  }
};
