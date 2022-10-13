export default function loginFormHbs() {
  return `
    <div class="{{css.container}}">
      <form class="{{css.form}}">
        {{#each form}}
          {{> textField}}
        {{/each}}
        <div class="{{css.padding-top}}"></div>
        {{#with button}}
          {{> button}}
        {{/with}}
        {{#with link}}
          {{> link}}
        {{/with}}
      </form>
    </div>
  `;
}
