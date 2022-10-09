import Handlebars from 'handlebars';
import layoutHbs from './layout.hbs';
import css from './layout.css';

type Props = { content?: string };

const layout = ({ content }: Props): string => {
  const data = { css };
  const template = Handlebars.compile(layoutHbs);

  return template({ ...data, content });
};

export default layout;
