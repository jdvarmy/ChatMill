import View from '../../../packages/View';
import Link from '../../../components/Link/Link';
import userChatsHbs from './userChats.hbs';
import css from '../chat.css';
import Store, { StoreType } from '../../../packages/Store/Store';

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
        const handleClick = (e: Event) => {
          const chatId = (e.currentTarget as HTMLElement).getAttribute('data-chat-id');
          Store.set('activeChatId', chatId);
        };
        chatNodes.forEach((node) => node.addEventListener('click', handleClick));
      }
    }
  }

  public render(): DocumentFragment | string {
    return this.compile(userChatsHbs());
  }
}
