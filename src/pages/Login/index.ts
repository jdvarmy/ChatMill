import { renderDOM } from '../../utils/renderDOM';
import Login from './Login';
import Card from '../../components/Card/Card';
import Form from './Form/Form';
import Button from '../../components/Button/Button';
import TextField, { InputNames, InputTypes } from '../../components/TextField/TextField';
import { findParentNode } from '../../utils/findParentNode';
import { formFieldValidator } from '../../utils/formFieldValidator';
import { rootSelector } from '../../types';

export default function renderLogin(query = rootSelector) {
  const button = new Button({
    text: 'Enter',
    name: 'enter',
    events: {
      click: (e) => {
        const form = findParentNode(e.target, 'form') as HTMLFormElement;
        const data = new FormData(form);

        for (const i of data.entries()) {
          console.log(`${i[0]}: ${i[1]}`);
        }

        form.querySelectorAll('input').forEach((input) => {
          formFieldValidator(input, e.type);
        });
      },
    },
  });

  const fieldEvents = { focus: formFieldValidator, blur: formFieldValidator };
  const textFields = {
    loginField: new TextField({
      label: 'Login',
      inputName: InputNames.login,
      inputType: InputTypes.text,
      events: fieldEvents,
    }),
    passwordField: new TextField({
      label: 'Password',
      inputName: InputNames.password,
      inputType: InputTypes.password,
      events: fieldEvents,
    }),
  };

  const form = new Form({ ...textFields, button, link: { text: 'create account', href: '/registration' } });
  const card = new Card({ title: 'Login', content: form });
  const page = new Login({ card });

  renderDOM(query, page);
}
