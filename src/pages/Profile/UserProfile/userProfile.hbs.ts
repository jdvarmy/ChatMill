import css from '../profile.css';

export default function userProfileHbs(): string {
  return `
  <div class="${css.headWrapper}">
    {{> typography tag="h2" text="Profile"}}
  </div>
  <div class="${css.contentWrapper}">
    <form>
      {{{firstNameField}}}
      {{{lastNameField}}}
      {{{phoneField}}}
      {{{loginField}}}
      {{{displayNameField}}}
      {{{emailField}}}
      {{{button}}}
    </form>
  </div>
  `;
}
