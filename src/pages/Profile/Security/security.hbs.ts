import css from '../profile.css';

export default function securityHbs(): string {
  return `
  <div class="${css.headWrapper}">
    {{> typography tag="h2" text="Security"}}
  </div>
  <div class="${css.contentWrapper}">
    <form>
      {{#each fields}}
        {{{this}}}
      {{/each}}
      {{{button}}}
    </form>
  </div>
  `;
}
