import layout from '../../layout/layout';
import Block from '../../packages/View';
import chatHbs from './chat.hbs';
import UserCharts from './UserCharts/UserCharts';
import Messenger from './Messenger/Messenger';
import css from '../../layout/layout.css';

type Props = {
  userChartsContent: UserCharts;
  messengerContent: Messenger;
};

export default class Chat extends Block {
  constructor(props: Props) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  render(): DocumentFragment {
    const layoutTemplate = layout({ content: chatHbs() });

    return this.compile(layoutTemplate);
  }
}
