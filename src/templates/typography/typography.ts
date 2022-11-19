import Handlebars from 'handlebars';
import './typography.css';

/**
 * Шаблон ХБС может принимать следующие параметры:
 *
 * @param {string} tag имя тега p, h1, h2, h3, h4, h5, h6
 * @param {string} text контент
 */
export function typography(): void {
  const template = Handlebars.compile(`<{{tag}}>{{prefix}}{{text}}</{{tag}}>`);

  Handlebars.registerPartial('typography', template);
}
