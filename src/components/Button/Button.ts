import Handlebars from 'handlebars';
import Block from '../../packages/View';
import buttonHbs from './button.hbs';
import css from './button.css';
import { EventType } from '../../types';

type Props = {
  name: string;
  text: string;
  events?: EventType<MouseEvent>;
};

export default class Button extends Block {
  constructor(props: Props) {
    super('button', props);

    const element = this.element as HTMLButtonElement;
    element.classList.add(css.button);
    element.name = props.name || '';
    element.type = 'button';
  }

  render(): string {
    return Handlebars.compile(buttonHbs())(this.props);
  }
}
