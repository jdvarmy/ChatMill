import css from './chat.css';

export default function chatHbs(): string {
  return `
    <div class="${css.wrapper}">
      <div class="${css.container}">
        <div class="${css.userChartsContainer}">
          {{{userChartsContent}}}
        </div>
        {{{messengerContent}}}
      </div>
    </div>
  `;
}
