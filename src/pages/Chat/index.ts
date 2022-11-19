import { rootSelector } from '../../types';
import { renderDOM } from '../../utils/renderDOM';
import Chat from './Chat';
import { UserCharts } from './UserCharts/UserCharts';
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

const linkProps: LinkProps = { icon: logoutIcon, type: 'icon', href: '/', text: '', size: 's' };

export default function renderChat(query: string = rootSelector): Element | undefined {
  const button = new Button({ text: 'Send', name: 'send', events: { click: handleClick } });

  const fieldEvents = { focus: handleFocus, blur: handleBlur };
  const messageField = new TextField({
    label: 'Write here your message...',
    inputName: InputNames.message,
    inputType: InputTypes.text,
    events: fieldEvents,
  });

  const userProps = {
    logOut: new Link({ ...linkProps, events: { click: (e) => LogoutAction.logout(e) } }),
    settingLink: new Link({ ...linkProps, icon: settingIcon, href: '/profile' }),
    addChat: new Link({ ...linkProps, icon: plusIcon, events: { click: (e) => ChatAction.addChat(e) } }),
  };

  const UserContent = connect((store) => ({ user: store.user, chats: store.chats, activeChatId: store.activeChatId }))(
    UserCharts,
  );
  const messengerContent = new Messenger({ button, message: messageField });

  const page = new Chat({ userContent: new UserContent(userProps), messengerContent });

  ChatAction.getChats();

  return renderDOM(query, page);
}
