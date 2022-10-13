type Props = {
  content: string;
};

export default function profileHbs({ content }: Props): string {
  return `
    <div class="{{css.wrapper}}">
      <div class="{{css.container}}">
        <div class="{{css.content}}">
          <div class="{{css.card-head}}">
            <a class="{{css.button}}" href="/">
              <svg class="{{css.button-icon}}" viewBox="0 0 24 24">
                <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
              </svg>
            </a>
            <div>
              {{> typography tag="h3" text="Profile for Vasia Pupkin"}}
              <div style="color: var(--color-ghost)">This is a profile page. Easy to modify, always blazing fast</div>
            </div>
          </div>
          ${content}
        </div>
        <div class="{{css.menu}}">
          {{#each links}}
            {{> link}}
          {{/each}}
        </div>
      </div>
    </div>
  `;
}
