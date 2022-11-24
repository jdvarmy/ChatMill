import css from '../chat.css';

export function divider(date = '') {
  return `<div class="${css.dividerWrapper}">
              <span class="${css.divider}">${date}</span>
          </div>`;
}
