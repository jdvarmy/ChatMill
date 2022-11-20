import { rootSelector } from '../../types';
import { renderDOM } from '../../utils/renderDOM';
import Chat from './Chat';
import { UserChats } from './UserChats/UserChats';
import Messenger from './Messenger/Messenger';
import Button from '../../components/Button/Button';
import TextField, { InputNames, InputTypes } from '../../components/TextField/TextField';
import { handleClick } from '../../utils/validator/handleClick';
import Link, { LinkProps } from '../../components/Link/Link';
import { logoutIcon, plusIcon, settingIcon } from '../../utils/icons';
import { handleFocus } from '../../utils/validator/handleFocus';
import { handleBlur } from '../../utils/validator/handleBlur';
import LogoutAction from '../../api/actions/LogoutAction';
import { connect } from '../../hoc/connect';
import ChatAction from '../../api/actions/ChatAction';
import Store from '../../packages/Store/Store';

const linkProps: LinkProps = { icon: logoutIcon, type: 'icon', href: '/', text: '', size: 's' };

export default function renderChat(query: string = rootSelector): Element | undefined {
  const button = new Button({ text: 'Send', name: 'send', events: { click: handleClick } });

  const events = { focus: handleFocus, blur: handleBlur };
  const message = new TextField({
    label: 'Your message here...',
    inputName: InputNames.message,
    inputType: InputTypes.text,
    events,
  });
  const addUser = new TextField({ label: 'User id', inputName: 'add_user', inputType: InputTypes.text, events });

  const addUserHandler = (e: MouseEvent) => userBtnHandler(e, ChatAction.addUsersToChat);
  const delUserHandler = (e: MouseEvent) => userBtnHandler(e, ChatAction.deleteUsersFromChat);
  const addUserBtn = new Button({ text: 'Add', name: 'add', events: { click: addUserHandler } });
  const removeUserBtn = new Button({ text: 'Del', name: 'del', events: { click: delUserHandler } });

  const userProps = {
    logout: new Link({ ...linkProps, events: { click: (e) => LogoutAction.logout(e) } }),
    setting: new Link({ ...linkProps, icon: settingIcon, href: '/profile' }),
    addChat: new Link({ ...linkProps, icon: plusIcon, events: { click: (e) => ChatAction.addChat(e) } }),
  };
  const messengerProps = { button, message, addUser, addUserBtn, removeUserBtn };

  const UserContent = connect((store) => ({ user: store.user, chats: store.chats, activeChatId: store.activeChatId }))(
    UserChats,
  );
  const MessengerContent = connect((store) => ({ chats: store.chats, activeChatId: store.activeChatId }))(Messenger);

  const page = new Chat({
    userContent: new UserContent(userProps),
    messengerContent: new MessengerContent(messengerProps),
  });

  ChatAction.getChats();

  return renderDOM(query, page);
}

function userBtnHandler(e: MouseEvent, handler: (userid: number, chatId: number) => Promise<void>) {
  const parent = (e.currentTarget as HTMLElement)?.parentNode;
  const input = parent?.querySelector('input');
  if (input?.value) {
    const chat = Number(Store.getState().activeChatId);
    const user = Number(input.value);
    if (chat && user) {
      handler(user, chat);
    }
    input.value = '';
  }
}
