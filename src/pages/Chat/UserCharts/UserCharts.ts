import View from '../../../packages/View';
import userChartsHbs from './userCharts.hbs';
import css from '../chat.css';

type Props = any;

export default class UserCharts extends View<Props> {
  public constructor(props: Props = {}) {
    super('div', props);

    this.addAttribute({ class: css.userCharts });
  }

  public render(): DocumentFragment | string {
    return this.compile(userChartsHbs());
  }
}
