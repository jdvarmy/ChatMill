import css from '../profile.css';

export default function userProfileHbs(): string {
  return `
  <div class="${css.headWrapper}">
    {{> typography tag="h2" text="Profile"}}
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
