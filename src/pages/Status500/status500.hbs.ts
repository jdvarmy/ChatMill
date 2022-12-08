import css from './status500.css';
import { icon500Page } from '../../utils/icons';

export default function status500Hbs(): string {
  return `
    <div class="${css.content}">
      ${icon500Page}
      {{> typography tag="h2" text="There was an error, please try again later"}}
      {{> hr}}
      {{{link}}}
    </div>
  `;
}
