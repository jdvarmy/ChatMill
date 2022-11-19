import View from '../../../packages/View';
import messengerHbs from './messenger.hbs';
import Button from '../../../components/Button/Button';
import TextField from '../../../components/TextField/TextField';
import css from '../chat.css';

type Props = {
  button: Button;
  message: TextField;
};

export default class Messenger extends View<Props> {
  public constructor(props: Props) {
    super('div', props);

    this.addAttribute({ class: css.messengerContainer });
  }

  public render(): DocumentFragment | string {
    console.log(this.props);
    return this.compile(messengerHbs());
  }
}
