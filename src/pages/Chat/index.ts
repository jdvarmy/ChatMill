import { rootSelector } from '../../types';
import { renderDOM } from '../../utils/renderDOM';
import Chat from './Chat';
import UserCharts from './UserCharts/UserCharts';
import Messenger from './Messenger/Messenger';
import Button from '../../components/Button/Button';
import { formFieldValidator } from '../../utils/formFieldValidator';
import TextField, { InputNames, InputTypes } from '../../components/TextField/TextField';
import { handleClick } from '../../utils/handleClick';

export default function renderChat(query = rootSelector) {
  const button = new Button({
    text: 'Send',
    name: 'send',
    events: {
      click: handleClick,
    },
  });

  const fieldEvents = { focus: formFieldValidator, blur: formFieldValidator };
  const messageField = new TextField({
    label: 'Write here your message...',
    inputName: InputNames.message,
    inputType: InputTypes.text,
    events: fieldEvents,
  });

  const userChartsContent = new UserCharts({});
  const messengerContent = new Messenger({ button, message: messageField });
  const page = new Chat({ userChartsContent, messengerContent });

  renderDOM(query, page);
}
