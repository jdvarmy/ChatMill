import View from '../../../packages/View';
import messengerHbs from './messenger.hbs';
import Button from '../../../components/Button/Button';
import TextField from '../../../components/TextField/TextField';
import css from '../chat.css';
import { StoreType } from '../../../packages/Store/Store';

type Props = {
  button: Button;
  addUser: TextField;
  addUserBtn: Button;
  removeUserBtn: Button;
  message: TextField;
  messages?: StoreType['messages'];
  user?: StoreType['user'];
  chats?: StoreType['chats'];
  activeChatId?: StoreType['activeChatId'];
};

export default class Messenger extends View<Props> {
  public constructor(props: Props) {
    super('div', props);

    this.addAttribute({ class: css.messengerContainer });
  }

  public render(): DocumentFragment | string {
    return this.compile(messengerHbs(this.props.messages, this.props.user?.id));
  }
}
