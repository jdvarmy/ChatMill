import View from '../../packages/View';
import cardHbs from './card.hbs';
import css from './card.css';

type Props = {
  content: View;
  title?: string;
};

export default class Card extends View<Props> {
  public constructor(props: Props) {
    super('div', props);

    this.addAttribute({ class: css.card });
  }

  public render(): DocumentFragment {
    return this.compile(cardHbs());
  }
}
