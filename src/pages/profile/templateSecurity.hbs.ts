export default function templateSecurityHbs(): string {
  return `
  <div class="{{css.head-wrapper}}">
    {{> typography tag="h2" text="Security"}}
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
