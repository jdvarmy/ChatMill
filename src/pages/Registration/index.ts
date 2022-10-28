import { rootSelector } from '../../types';
import { renderDOM } from '../../utils/renderDOM';
import Button from '../../components/Button/Button';
import { formFieldValidator } from '../../utils/formFieldValidator';
import TextField, { InputNames, InputTypes } from '../../components/TextField/TextField';
import Card from '../../components/Card/Card';
import Form from './Form/Form';
import Registration from './Registration';
import { handleClick } from '../../utils/handleClick';

export default function renderRegistration(query = rootSelector) {
  const button = new Button({
    text: 'Registration',
    name: 'registration',
    events: {
      click: handleClick,
    },
  });

  const fieldEvents = { focus: formFieldValidator, blur: formFieldValidator };
  const textFields = {
    firstNameField: new TextField({
      label: 'First name',
      inputName: InputNames.firstName,
      inputType: InputTypes.text,
      events: fieldEvents,
    }),
    lastNameField: new TextField({
      label: 'Last name',
      inputName: InputNames.lastName,
      inputType: InputTypes.text,
      events: fieldEvents,
    }),
    phoneField: new TextField({
      label: 'Phone',
      inputName: InputNames.phone,
      inputType: InputTypes.tel,
      events: fieldEvents,
    }),
    emailField: new TextField({
      label: 'Email',
      inputName: InputNames.email,
      inputType: InputTypes.email,
      events: fieldEvents,
    }),
    loginField: new TextField({
      label: 'Login',
      inputName: InputNames.login,
      inputType: InputTypes.text,
      events: fieldEvents,
    }),
    passwordField: new TextField({
      label: 'Password',
      inputName: InputNames.password,
      inputType: InputTypes.text,
      events: fieldEvents,
    }),
  };

  const form = new Form({ ...textFields, button, link: { text: 'sign in', href: '/login' } });
  const card = new Card({ title: 'Create account', content: form });
  const page = new Registration({ card });

  renderDOM(query, page);
}
