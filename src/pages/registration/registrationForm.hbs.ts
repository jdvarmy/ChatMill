// пока что код дублирует страницу логина, не знаю что будет дальше, пусть полежит здесь =)
export default function registrationFormHbs() {
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
