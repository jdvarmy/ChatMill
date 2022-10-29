import css from './registration.css';

export default function registrationHbs(): string {
  return `
    <div class="${css.content}">
      {{{card}}}
    </div>
  `;
}
