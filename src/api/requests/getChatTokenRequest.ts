import api from '../api';

export const getChatTokenRequest = (chatId: number | string) => {
  try {
    return api.post<{ token: string }>(`chats/token/${chatId}`);
  } catch (e) {
    console.log(e);
  }
};
