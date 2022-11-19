import View from '../../../packages/View';
import Link from '../../../components/Link/Link';
import userChatsHbs from './userChats.hbs';
import css from '../chat.css';
import Store, { StoreType } from '../../../packages/Store/Store';
import ChatAction from '../../../api/actions/ChatAction';
import { WS } from '../../../packages/WS/WS';

type Props = {
  logOut: Link;
  settingLink: Link;
  addChat: Link;
  user?: StoreType['user'];
  chats?: StoreType['chats'];
  activeChatId?: StoreType['activeChatId'];
};

export class UserChats extends View<Props> {
  public constructor(props: Props) {
    super('div', props);

    this.addAttribute({ class: css.userChats });
  }

  componentWillMount(_oldProps: Props, _newProps: Props) {
    if (this.props.chats?.length) {
      const chatNodes = this.element.querySelectorAll('#chats > div');
      if (chatNodes.length) {
        const handleClick = selectChatHandler;
        chatNodes.forEach((node) => node.addEventListener('click', handleClick));
      }
    }
  }

  public render(): DocumentFragment | string {
    return this.compile(userChatsHbs());
  }
}

async function selectChatHandler(e: Event) {
  const chatId = (e.currentTarget as HTMLElement).getAttribute('data-chat-id');
  if (chatId) {
    const token = await ChatAction.getToken(chatId);
    Store.set('token', token?.token ?? null);
    Store.set('activeChatId', chatId);

    if (token) {
      // подрубаемся к сокету
      const socket = new WS().init(Store.getState().user.id, chatId, token?.token);
      console.log(socket);
    }
  }
}
