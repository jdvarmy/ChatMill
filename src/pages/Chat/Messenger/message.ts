import css from '../chat.css';
import { clockIcon } from '../../../utils/icons';

type MessageProps = {
  side: 'left' | 'right';
  text: string[];
  time: string;
};

const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

export function message({ side = 'left', time, text }: MessageProps) {
  return side === 'left' ? left({ time, text }) : right({ time, text });
}

function left({ time, text }: Omit<MessageProps, 'side'>) {
  return `
    <div class="${css.messageBoxLeft}">
      <div class="${css.headerAvatarImg}">
        <img alt="avatar" src="">
      </div>
      <div class="${css.boardMessage} ${css.boardUserMessage}">
        ${text.map((t) => `<div class="${css.paperUserMessage} ${css.marginBotton}">${t}</div>`).join('')}
        <div class="${css.timeAgo}">
          ${clockIcon} ${timeFormatter.format(Date.parse(time))}
        </div>
      </div>
    </div>
  `;
}
function right({ time, text }: Omit<MessageProps, 'side'>) {
  return `
    <div class="${css.messageBoxRight}">
      <div class="${css.boardMessage}">
        ${text
          .map((t) => `<div class="${css.paperUserMessage} ${css.paperMessage} ${css.marginBotton}">${t}</div>`)
          .join('')}
        <div class="${css.timeAgo}">
          ${clockIcon} ${timeFormatter.format(Date.parse(time))}
        </div>
      </div>
      <div class="${css.headerAvatarImg}">
        <img alt="avatar" src="">
      </div>
    </div>
  `;
}
