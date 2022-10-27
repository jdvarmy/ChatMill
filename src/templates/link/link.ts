import Handlebars from 'handlebars';
import css from './link.css';

export type LinkPropsType = {
  text: string;
  href: string;
  style?: string;
  button?: boolean;
};

/**
 * Шаблон ХБС может принимать следующие параметры:
 *
 * @param {boolean} button если true делаем ссылку похожей на кнопку
 * @param {string} text название ссылки
 * @param {string} href адрес документа, на который следует перейти
 * @param {string} style стиль ссылки
 */
export function link(): void {
  const template = Handlebars.compile(`
    <a style="{{style}}" href="{{href}}" class="{{#if button}}${css.button}{{else}}${css.link}{{/if}}">{{text}}</a>
  `);

  Handlebars.registerPartial('link', template);
}
