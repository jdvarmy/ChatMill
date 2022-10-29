import css from './profile.css';

export default function profileHbs(): string {
  return `
    <div class="${css.wrapper}">
      <div class="${css.container}">
        <div class="${css.content}">
          <div class="${css.cardHead}">
            <a class="${css.button}" href="/">
              <svg class="${css.buttonIcon}" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
            </a>
            <div>
              {{> typography tag="h3" text="Profile for Morty"}}
              <div style="color: var(--color-ghost)">This is a profile page. Easy to modify, always blazing fast</div>
            </div>
          </div>
          {{{content}}}
        </div>
        <div class="${css.menu}">
          {{#each links}}
            {{> link}}
          {{/each}}
        </div>
      </div>
    </div>
  `;
}
