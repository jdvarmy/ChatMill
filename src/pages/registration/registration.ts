import Handlebars from 'handlebars';
import layout from '../../layout/layout';
import registrationHbs from './registration.hbs';
import css from './registration.css';
import registrationFormHbs from './registrationForm.hbs';

const registration = (): string => {
  const contentData = {
    css,
    form: [
      { label: 'First name', input: { name: 'first_name' } },
      { label: 'Second name', input: { name: 'second_name' } },
      { label: 'Phone', input: { name: 'phone' } },
      { label: 'Email', input: { name: 'email' } },
      { label: 'Login', input: { name: 'login' } },
      { label: 'Password', input: { name: 'password' } },
    ],
    button: { style: 'width: calc(100% - 16px)', text: 'Registration', name: 'registration' },
    link: { text: 'sign in', href: '/login' },
  };

  // шаблон контента формы логина
  const loginContentTemplate: HandlebarsTemplateDelegate = Handlebars.compile(registrationFormHbs());
  const dataHbs = { content: loginContentTemplate(contentData), title: 'Create account' };

  // шаблон обертки над формой логина
  const loginTemplate: HandlebarsTemplateDelegate = Handlebars.compile(registrationHbs(dataHbs));

  // оборачиваем все в layout
  return layout({ content: loginTemplate({ css }) });
};

export default registration;
