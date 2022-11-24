import { Action } from './Action';
import { getChatsRequest } from '../requests/getChatsRequest';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';
import { addChatRequest } from '../requests/addChatRequest';
import { addUsersToChatRequest } from '../requests/addUsersToChatRequest';
import { deleteUsersFromChatRequest } from '../requests/deleteUsersFromChatRequest';
import { getChatTokenRequest } from '../requests/getChatTokenRequest';
import { deleteChatRequest } from '../requests/deleteChatRequest';

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

  public async addChat(title: string) {
    const chat = await addChatRequest(title);
    if (chat) {
      this.getChats();
    }
  }

  public async deleteChat(id: number) {
    const chat = await deleteChatRequest(id);
    if (chat) {
      this.getChats();
    }
  }

  // todo: конец спринта, делаю все в спешке =(, переделать
  public async addUsersToChat(userid: number, chatId: number) {
    await addUsersToChatRequest({ users: [userid], chatId });
  }

  public async deleteUsersFromChat(userid: number, chatId: number) {
    await deleteUsersFromChatRequest({ users: [userid], chatId });
  }

  public async getToken(chatId: number | string) {
    return getChatTokenRequest(chatId);
  }
}

export default new ChatAction();
