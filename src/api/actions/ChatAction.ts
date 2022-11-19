import { Action } from './Action';
import { getChatsRequest } from '../requests/getChatsRequest';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';
import { addChatRequest } from '../requests/addChatRequest';
import { addUsersToChatRequest } from '../requests/addUsersToChatRequest';
import { deleteUsersFromChatRequest } from '../requests/deleteUsersFromChatRequest';

class ChatAction extends Action {
  public async getChats() {
    const chats = await getChatsRequest();
    if (chats) {
      this.store.set(
        'chats',
        chats.map((chat) => camelCaseKeys(chat)),
      );
    }
  }

  public async addChat(e: MouseEvent) {
    e.preventDefault();
    const chat = await addChatRequest('new chat');
    if (chat) {
      this.getChats();
    }
  }

  // todo: принимать массив id юзеров
  public async addUsersToChat(chatId: number) {
    await addUsersToChatRequest({ users: [1341, 1241], chatId });
  }

  // todo: принимать массив id юзеров
  public async deleteUsersFromChat(chatId: number) {
    await deleteUsersFromChatRequest({ users: [1341, 1241], chatId });
  }
}

export default new ChatAction();
