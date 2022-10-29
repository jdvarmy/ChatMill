import css from '../registration.css';

export default function registrationFormHbs() {
  return `
    <form class="${css.form}">
      {{{firstNameField}}}
      {{{lastNameField}}}
      {{{phoneField}}}
      {{{emailField}}}
      {{{loginField}}}
      {{{passwordField}}}
      <div class="${css.paddingTop}"></div>
      {{{button}}}
      {{#with link}}
        {{> link}}
      {{/with}}
    </form>
  `;
}
