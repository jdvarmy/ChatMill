import Handlebars from 'handlebars';
import textFieldHbs from './textField.hbs';

/**
 * Шаблон ХБС может принимать следующие параметры:
 *
 * @param {string} label отображаемое название поля
 * @param {object} input параметры input:
 *    @param {string} name имя input
 */
export function textField(): void {
  const template = Handlebars.compile(textFieldHbs());

  Handlebars.registerPartial('textField', template);
}
