import Handlebars from 'handlebars';
import layout from '../../layout/layout';
import status404Hbs from './status404.hbs';
import css from './status404.css';

const status404 = (): string => {
  const loginTemplate: HandlebarsTemplateDelegate = Handlebars.compile(status404Hbs());

  // оборачиваем все в layout
  return layout({ content: loginTemplate({ css, link: { text: 'GO TO HOME PAGE', href: '/' } }) });
};

export default status404;
