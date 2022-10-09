import Handlebars from 'handlebars';
import loginHbs from './login.hbs';
import loginFormHbs from './loginFormHbs';
import css from './login.css';
import layout from '../../layout/layout';

const login = (): string => {
  const contentData = {
    css,
    form: [
      { label: 'Login', input: { name: 'login' } },
      { label: 'Password', input: { name: 'password' } },
    ],
    button: { style: 'width: calc(100% - 16px)', text: 'Enter', name: 'enter' },
    link: { text: 'create account', href: '/registration' },
  };

  // шаблон контента формы логина
  const loginContentTemplate: HandlebarsTemplateDelegate = Handlebars.compile(loginFormHbs());
  const dataHbs = { content: loginContentTemplate(contentData), title: 'Sign in' };

  // шаблон обертки над формой логина
  const loginTemplate: HandlebarsTemplateDelegate = Handlebars.compile(loginHbs(dataHbs));

  // оборачиваем все в layout
  return layout({ content: loginTemplate({ css }) });
};

export default login;
