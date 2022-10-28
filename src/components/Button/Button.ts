import Handlebars from 'handlebars';
import View from '../../packages/View';
import buttonHbs from './button.hbs';
import css from './button.css';
import { EventType } from '../../types';

type Props = {
  name: string;
  text: string;
  events?: EventType<MouseEvent>;
};

export default class Button extends View<Props> {
  public constructor(props: Props) {
    super('button', props);

    const element = this.element as HTMLButtonElement;
    element.classList.add(css.button);
    element.name = props.name || '';
    element.type = 'button';
  }

  public render(): string {
    return Handlebars.compile(buttonHbs())(this.props);
  }
}
