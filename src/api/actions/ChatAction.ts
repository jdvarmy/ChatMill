import { Action } from './Action';
import { getChatsRequest } from '../requests/getChatsRequest';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';
import { addChatRequest } from '../requests/addChatRequest';

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
}

export default new ChatAction();
