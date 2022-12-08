import css from './status404.css';
import { icon400Page } from '../../utils/icons';

export default function status404Hbs(): string {
  return `
    <div class="${css.content}">
      ${icon400Page}
      {{> typography tag="h2" text="The page you were looking for doesn't exist."}}
      {{> hr}}
      {{{link}}}
    </div>
  `;
}
