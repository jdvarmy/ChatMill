import View from '../../../packages/View';
import Link from '../../../components/Link/Link';
import userChartsHbs from './userCharts.hbs';
import css from '../chat.css';
import { StoreType } from '../../../packages/Store/Store';

type Props = {
  logOut: Link;
  settingLink: Link;
  addChat: Link;
  user?: StoreType['user'];
  chats?: StoreType['chats'];
};

export class UserCharts extends View<Props> {
  public constructor(props: Props) {
    super('div', props);

    this.addAttribute({ class: css.userCharts });
  }

  public render(): DocumentFragment | string {
    return this.compile(userChartsHbs());
  }
}
