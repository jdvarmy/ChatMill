import Block from '../../packages/View';
import cardHbs from './card.hbs';
import css from './card.css';

type Props = {
  title: string;
  content: Block;
};

export default class Card extends Block {
  constructor(props: Partial<Props>) {
    super('div', props);

    this.addAttribute({ class: css.card });
  }

  render(): DocumentFragment {
    return this.compile(cardHbs());
  }
}
