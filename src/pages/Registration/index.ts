import { rootSelector } from '../../types';
import { renderDOM } from '../../utils/renderDOM';
import Button from '../../components/Button/Button';
import TextField, { InputNames, InputTypes, TextFieldProps } from '../../components/TextField/TextField';
import Card from '../../components/Card/Card';
import Form from '../../components/Form/Form';
import Registration from './Registration';
import Link from '../../components/Link/Link';
import { handleFocus } from '../../utils/validator/handleFocus';
import { handleBlur } from '../../utils/validator/handleBlur';
import RegistrationAction from '../../api/actions/RegistrationAction';

export default function renderRegistration(query: string = rootSelector): Element | undefined {
  const button = new Button({
    text: 'Registration',
    name: 'registration',
    events: { click: (e) => RegistrationAction.registration(e) },
  });
  const link = new Link({ text: 'sign in', href: '/' });

  const events = { focus: handleFocus, blur: handleBlur };
  const fields: TextFieldProps[] = [
    { label: 'First name', inputName: InputNames.firstName, inputType: InputTypes.text, events },
    { label: 'Last name', inputName: InputNames.secondName, inputType: InputTypes.text, events },
    { label: 'Phone', inputName: InputNames.phone, inputType: InputTypes.tel, events },
    { label: 'Email', inputName: InputNames.email, inputType: InputTypes.email, events },
    { label: 'Login', inputName: InputNames.login, inputType: InputTypes.text, events },
    { label: 'Password', inputName: InputNames.password, inputType: InputTypes.text, events },
  ];

  const form = new Form({ fields: fields.map((item) => new TextField(item)), button, link });
  const card = new Card({ title: 'Create account', content: form });
  const page = new Registration({ card });

  return renderDOM(query, page);
}
