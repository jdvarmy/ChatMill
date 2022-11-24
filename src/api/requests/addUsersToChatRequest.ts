import api, { contentHeaderJson } from '../api';

export type UsersToChatType = {
  users: number[];
  chatId: number;
};

export const addUsersToChatRequest = (data: UsersToChatType) => {
  try {
    console.log(data);
    return api.put<true>('chats/users', JSON.stringify(data), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
