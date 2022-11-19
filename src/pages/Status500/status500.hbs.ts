import svg from 'bundle-text:../../../static/images/500.svg';
import css from './status500.css';

export default function status500Hbs(): string {
  return `
    <div class="${css.content}">
      ${svg}
      {{> typography tag="h2" text="There was an error, please try again later"}}
      {{> hr}}
      {{{link}}}
    </div>
  `;
}
