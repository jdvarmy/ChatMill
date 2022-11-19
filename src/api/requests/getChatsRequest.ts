import { UserDataType } from './getUserRequest';
import api, { contentHeaderJson } from '../api';

export type ChatType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: Omit<UserDataType, 'id' | 'status' | 'display_name'>;
    time: Date;
    content: string;
  };
};

export const getChatsRequest = () => {
  try {
    return api.get<ChatType[]>('chats', {}, { headers: contentHeaderJson });
  } catch (e) {
    console.log(e);
  }
};
