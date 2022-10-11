import Handlebars from 'handlebars';
import layout from '../../layout/layout';
import status500Hbs from './status500.hbs';
import css from './status500.css';

const status500 = (): string => {
  const loginTemplate: HandlebarsTemplateDelegate = Handlebars.compile(status500Hbs());

  // оборачиваем все в layout
  return layout({ content: loginTemplate({ css, link: { text: 'GO TO HOME PAGE', href: '/' } }) });
};

export default status500;
