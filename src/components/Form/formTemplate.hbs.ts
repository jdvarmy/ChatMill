import css from './form.css';

export default function formTemplateHbs() {
  return `
    <form class="${css.form}">
      {{#each fields}}
        {{{this}}}
      {{/each}}
      <div class="${css.paddingTop}"></div>
      {{{button}}}
      {{{link}}}
    </form>
  `;
}
