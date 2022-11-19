const url = 'wss://ya-praktikum.tech/ws/chats';

export class WS {
  socket: WebSocket | undefined;

  init(userId: number | string, chatId: number | string, tocken: string) {
    this.socket = new WebSocket(`${url}/${userId}/${chatId}/${tocken}`);

    this.socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      this.socket?.send(
        JSON.stringify({
          content: 'Start chat',
          type: 'message',
        }),
      );
    });

    this.socket.addEventListener('close', (event: any) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener('message', (event: any) => {
      console.log('Получены данные', event.data);
    });

    this.socket.addEventListener('error', (event: any) => {
      console.log('Ошибка', event.message);
    });

    return this.socket;
  }
}
