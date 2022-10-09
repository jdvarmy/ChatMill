import Handlebars from 'handlebars';
import cardHbs from './card.hbs';
import css from './card.css';

type Props = { content?: string; title?: string };

export function card(props?: Props) {
  const data = { css, ...props };
  const template = Handlebars.compile(cardHbs);

  return template(data);
}
