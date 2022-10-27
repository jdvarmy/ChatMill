import Block from '../../../packages/View';
import userChartsHbs from './userCharts.hbs';
import css from '../chat.css';

type Props = any;

export default class UserCharts extends Block {
  constructor(props: Props = {}) {
    super('div', props);

    this.addAttribute({ class: css.userCharts });
  }

  render(): DocumentFragment | string {
    return this.compile(userChartsHbs());
  }
}
