import { rootSelector } from '../../types';
import { renderDOM } from '../../utils/renderDOM';
import Chat from './Chat';
import { UserChats } from './UserChats/UserChats';
import Messenger from './Messenger/Messenger';
import Button from '../../components/Button/Button';
import TextField, { InputNames } from '../../components/TextField/TextField';
import { handleClick } from '../../utils/validator/handleClick';
import Link, { LinkProps } from '../../components/Link/Link';
import { logoutIcon, plusIcon, settingIcon } from '../../utils/icons';
import { handleFocus } from '../../utils/validator/handleFocus';
import { handleBlur } from '../../utils/validator/handleBlur';
import LogoutAction from '../../api/actions/LogoutAction';
import { connect } from '../../hoc/connect';
import ChatAction from '../../api/actions/ChatAction';
import Store from '../../packages/Store/Store';
import { findParentNode } from '../../utils/findParentNode';
import { WS } from '../../packages/WS/WS';

const linkProps: LinkProps = { icon: logoutIcon, type: 'icon', href: '/', text: '', size: 's' };

export default function renderChat(query: string = rootSelector): Element | undefined {
  const events = { focus: handleFocus, blur: handleBlur };
  const button = new Button({ text: 'Send', name: 'send', events: { click: sendMessageHandler } });
  const message = new TextField({
    label: 'Your message here...',
    inputName: InputNames.message,
    events: { ...events, keypress: keyPressHandler },
  });
  const addUser = new TextField({ label: 'User id', inputName: 'add_user', size: 's', events });
  const addUserBtn = new Button({ text: 'Add', name: 'add', events: { click: addUserHandler } });
  const removeUserBtn = new Button({ text: 'Del', name: 'del', events: { click: delUserHandler } });

  const messengerProps = { button, message, addUser, addUserBtn, removeUserBtn };
  const MessengerContent = connect((store) => ({
    chats: store.chats,
    activeChatId: store.activeChatId,
    user: store.user,
    messages: store.messages,
  }))(Messenger);

  const logout = new Link({ ...linkProps, events: { click: (e) => LogoutAction.logout(e) } });
  const setting = new Link({ ...linkProps, icon: settingIcon, href: '/profile' });
  const addChat = new TextField({ label: 'Chat title', inputName: 'add_chat', size: 's', events });
  const addChatBtn = new Link({ ...linkProps, icon: plusIcon, events: { click: addChatHandler } });

  const userProps = { logout, setting, addChat, addChatBtn };
  const UserContent = connect((store) => ({ user: store.user, chats: store.chats, activeChatId: store.activeChatId }))(
    UserChats,
  );

  const page = new Chat({
    userContent: new UserContent(userProps),
    messengerContent: new MessengerContent(messengerProps),
  });

  ChatAction.getChats();

  return renderDOM(query, page);
}

function addChatHandler(e: MouseEvent) {
  e.preventDefault();

  const input = (e.currentTarget as HTMLElement).parentNode?.querySelector('input');

  if (input?.value) {
    ChatAction.addChat(input.value);
    input.value = '';
  }
}
function addUserHandler(e: MouseEvent) {
  return userBtnHandler(e, ChatAction.addUsersToChat);
}
function delUserHandler(e: MouseEvent) {
  return userBtnHandler(e, ChatAction.deleteUsersFromChat);
}
function keyPressHandler(e: Event) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (e.key === 'Enter') {
    e.preventDefault();
    findParentNode(e.currentTarget, 'form')?.querySelector('button')?.click();
  }
}
function sendMessageHandler(e: MouseEvent) {
  e.preventDefault();
  const validateFormData = handleClick(e);
  const input = findParentNode(e.target, 'form')?.querySelector('input');
  if (input) input.value = '';

  if (validateFormData) {
    const socket = new WS();
    socket?.send(validateFormData.message);
  }
}

function userBtnHandler(e: MouseEvent, handler: (userid: number, chatId: number) => Promise<void>) {
  const input = (e.currentTarget as HTMLElement)?.parentNode?.querySelector('input');
  if (input?.value) {
    const chat = Number(Store.getState().activeChatId);
    const user = Number(input.value);
    if (chat && user) {
      handler(user, chat);
    }
    input.value = '';
  }
}
