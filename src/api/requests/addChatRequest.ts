import api, { contentHeaderJson } from '../api';

export const addChatRequest = (title: string) => {
  try {
    return api.post<true>('chats', JSON.stringify({ title }), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
