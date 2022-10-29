import Handlebars from 'handlebars';
import css from './verticalRule.css';

export function verticalRule(): void {
  const data = { css };
  const template = Handlebars.compile('<hr class="{{css.vertical-rule}}">');

  // здесь, в отличие от других шаблонов, css передается в шаблон через data
  Handlebars.registerPartial('vr', template(data));
}
