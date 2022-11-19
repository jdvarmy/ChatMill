import View from '../../packages/View';
import Handlebars from 'handlebars';
import buttonFileHbs from './buttonFile.hbs';
import { EventType } from '../../types';

type Props = {
  icon?: string;
  name?: string;
  events?: EventType<MouseEvent>;
};

export default class ButtonFile extends View {
  constructor(props: Props) {
    super('div', props);
  }

  public render(): string {
    return Handlebars.compile(buttonFileHbs())(this.props);
  }
}
