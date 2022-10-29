import css from './card.css';

export default function cardHbs() {
  return `
    {{#if title}}
      <div class="${css.cardHeader}">
        <h1 class="${css.cardTitle}">{{title}}</h1>
      </div>
      {{> hr}}
    {{/if}}
    <div class="${css.cardContent}">
      {{{content}}}
    </div>
  `;
}
