import css from '../login.css';

export default function formHbs() {
  return `
    <form class="${css.form}">
      {{{loginField}}}
      {{{passwordField}}}
      <div class="${css.paddingTop}"></div>
      {{{button}}}
      {{#with link}}
        {{> link}}
      {{/with}}
    </form>
  `;
}
