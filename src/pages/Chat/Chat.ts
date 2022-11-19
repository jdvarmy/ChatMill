import layout from '../../layout/layout';
import View from '../../packages/View';
import chatHbs from './chat.hbs';
import Messenger from './Messenger/Messenger';
import css from '../../layout/layout.css';

type Props = {
  userContent: { state: object };
  messengerContent: Messenger;
};

export default class Chat extends View<Props> {
  public constructor(props: Props) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  public render(): DocumentFragment {
    const layoutTemplate = layout({ content: chatHbs() });

    return this.compile(layoutTemplate);
  }
}
