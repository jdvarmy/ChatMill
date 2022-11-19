import css from './profile.css';

export default function profileHbs(): string {
  return `
    <div class="${css.wrapper}">
      <div class="${css.container}">
        <div class="${css.content}">
          <div class="${css.cardHead}">
            {{{backLink}}}
            <div class="${css.userHead}">
              {{> typography tag="h3" prefix="Profile for " text=user.firstName}}
              <div style="color: var(--color-ghost)">This is a profile page. Easy to modify, always blazing fast</div>
            </div>
          </div>
          {{{content}}}
        </div>
        <div class="${css.menu}">
          {{#each links}}
            {{{this}}}
          {{/each}}
        </div>
      </div>
    </div>
  `;
}
