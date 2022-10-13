import Handlebars from 'handlebars';
import css from './horizontalRule.css';

export function horizontalRule(): void {
  const data = { css };
  const template = Handlebars.compile('<hr class="{{css.horizontal-rule}}">');

  // здесь, в отличие от других шаблонов, css передается в шаблон через data
  Handlebars.registerPartial('hr', template(data));
}
