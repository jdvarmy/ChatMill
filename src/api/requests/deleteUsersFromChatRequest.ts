import api, { contentHeaderJson } from '../api';
import { UsersToChatType } from './addUsersToChatRequest';

export const deleteUsersFromChatRequest = (data: UsersToChatType) => {
  try {
    return api.delete<true>('chats/users', JSON.stringify(data), { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
