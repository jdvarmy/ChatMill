import View from '../../packages/View';
import Handlebars from 'handlebars';
import css from './link.css';
import { Router } from '../../packages/Router/Router';
import { EventType } from '../../types';

export type LinkProps = {
  text: string;
  href?: string;
  icon?: string;
  type?: 'link' | 'button' | 'icon';
  size?: 'm' | 's';
  events?: EventType<MouseEvent>;
};

export default class Link extends View<LinkProps> {
  public constructor(props: LinkProps) {
    super('a', props);

    const element = this.element as HTMLLinkElement;
    element.classList.add(css[props.type || 'link']);
    props.size === 's' && element.classList.add(css.sizeS);
    element.href = props.href || '/messenger';

    if (!props.events) {
      element.addEventListener('click', (e) => {
        e.preventDefault();

        new Router().go(props.href || '/messenger');
      });
    }
  }

  render(): DocumentFragment | string {
    return Handlebars.compile(this.props.icon ?? `{{text}}`)(this.props);
  }
}
