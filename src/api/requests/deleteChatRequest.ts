import api, { contentHeaderJson } from '../api';

export const deleteChatRequest = (id: number) => {
  try {
    return api.delete<true>('chats', JSON.stringify({ chatId: id }), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
