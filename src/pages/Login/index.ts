import { renderDOM } from '../../utils/renderDOM';
import Login from './Login';
import Card from '../../components/Card/Card';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import TextField, { InputNames, InputTypes } from '../../components/TextField/TextField';
import { rootSelector } from '../../types';
import Link from '../../components/Link/Link';
import { handleFocus } from '../../utils/validator/handleFocus';
import { handleBlur } from '../../utils/validator/handleBlur';
import LoginAction from '../../api/actions/LoginAction';

export default function renderLogin(query: string = rootSelector): Element | undefined {
  const button = new Button({ text: 'Enter', name: 'enter', events: { click: (e) => LoginAction.login(e) } });
  const link = new Link({ text: 'create account', href: '/registration' });

  const events = { focus: handleFocus, blur: handleBlur };
  const fields = [
    new TextField({ label: 'Login', inputName: InputNames.login, inputType: InputTypes.text, events }),
    new TextField({ label: 'Password', inputName: InputNames.password, inputType: InputTypes.password, events }),
  ];

  const form = new Form({ fields, button, link });
  const card = new Card({ title: 'Login', content: form });
  const page = new Login({ card });

  return renderDOM(query, page);
}
