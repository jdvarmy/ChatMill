import { rootSelector } from '../../types';
import { renderDOM } from '../../utils/renderDOM';
import Chat from './Chat';
import UserCharts from './UserCharts/UserCharts';
import Messenger from './Messenger/Messenger';
import Button from '../../components/Button/Button';
import { findParentNode } from '../../utils/findParentNode';
import { formFieldValidator } from '../../utils/formFieldValidator';
import TextField, { InputNames, InputTypes } from '../../components/TextField/TextField';

export default function renderChat(query = rootSelector) {
  const button = new Button({
    text: 'Send',
    name: 'send',
    events: {
      click: (e) => {
        const form = findParentNode(e.target, 'form') as HTMLFormElement;
        if (form) {
          const data = new FormData(form);

          for (const i of data.entries()) {
            console.log(`${i[0]}: ${i[1]}`);
          }

          form.querySelectorAll('input').forEach((input) => {
            formFieldValidator(input, e.type);
          });
        } else {
          console.log('form not found');
          button.setProps({ text: 'Hello' });
        }
      },
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
