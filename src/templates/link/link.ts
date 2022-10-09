import Handlebars from 'handlebars';
import css from './link.css';

/**
 * Шаблон ХБС может принимать следующие параметры:
 *
 * @param {string} text название ссылки
 * @param {string} href адрес документа, на который следует перейти
 */
export function link(): void {
  const template = Handlebars.compile(`<a href="{{href}}" class="${css.link}">{{text}}</a>`);

  Handlebars.registerPartial('link', template);
}
