import Handlebars from 'handlebars';
import css from './button.css';

/**
 * Шаблон ХБС может принимать следующие параметры:
 *
 * @param {string} text название кнопки
 * @param {string} name имя кнопки
 * @param {string} style стиль кнопки
 */
export function button(): void {
  const template = Handlebars.compile(
    `<button style="{{style}}" name="{{name}}" class="${css.button}" type="button">{{text}}</button>`,
  );

  Handlebars.registerPartial('button', template);
}
