import View from '../../packages/View';
import Handlebars from 'handlebars';
import { EventType } from '../../types';
import css from './buttonIcon.css';

type Props = {
  icon?: string;
  name?: string;
  events?: EventType<MouseEvent>;
};

export default class ButtonIcon extends View {
  constructor(props: Props) {
    super('button', props);
  }

  public render(): string {
    return Handlebars.compile(`<span class="${css.button} ${css.buttonIcon}">{{{icon}}}</span>`)(this.props);
  }
}
