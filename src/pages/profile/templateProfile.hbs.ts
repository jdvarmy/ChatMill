export default function templateProfileHbs(): string {
  return `
  <div class="{{css.head-wrapper}}">
    {{> typography tag="h2" text="Profile"}}
  </div>
  <div class="{{css.content-wrapper}}">
    <form>
        {{#each form}}
          {{> textField}}
        {{/each}}
        {{#with button}}
          {{> button}}
        {{/with}}
      </form>
  </div>
  `;
}
