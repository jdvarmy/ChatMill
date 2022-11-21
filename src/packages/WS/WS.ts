import Store, { Messages } from '../Store/Store';
import { camelCaseKeys } from '../../utils/functions/camelCaseKeys';

const url = 'wss://ya-praktikum.tech/ws/chats';

export class WS {
  socket: WebSocket | undefined;

  public static instance: WS;

  constructor() {
    if (WS.instance) {
      return WS.instance;
    }

    WS.instance = this;
  }

  init(userId: number | string, chatId: number | string, tocken: string) {
    this.socket = new WebSocket(`${url}/${userId}/${chatId}/${tocken}`);

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.socket?.send(JSON.stringify({ content: '0', type: 'get old' }));
    });

    this.socket.addEventListener('message', (event: any) => {
      try {
        const parseData = JSON.parse(event.data);
        if (Array.isArray(parseData)) {
          Store.set(
            'messages',
            JSON.parse(event.data).map((item: Messages) => camelCaseKeys(item)),
          );
        } else {
          const messages = Store.getState().messages;
          Store.set('messages', [camelCaseKeys(parseData), ...(messages || [])]);
        }
      } catch (e) {
        console.log(e);
      }
    });

    this.socket.addEventListener('error', (event: any) => {
      console.log('Ошибка', event.message);
    });

    this.socket.addEventListener('close', (event: any) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    return this.socket;
  }

  send(content: string) {
    this.socket?.send(JSON.stringify({ content, type: 'message' }));
  }
}
