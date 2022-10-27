import css from './login.css';

export default function loginHbs(): string {
  return `
    <div class="${css.content}">
      {{{card}}}
    </div>
  `;
}
