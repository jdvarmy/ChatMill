import svg from 'bundle-text:../../../static/images/404.svg';
import css from './status404.css';

export default function status404Hbs(): string {
  return `
    <div class="${css.content}">
      ${svg}
      {{> typography tag="h2" text="The page you were looking for doesn't exist."}}
      {{> hr}}
      {{#with link}}
        {{> link}}
      {{/with}}
    </div>
  `;
}
