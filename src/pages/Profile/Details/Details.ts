import Block from '../../../packages/View';
import detailsHbs from './details.hbs';
import Button from '../../../components/Button/Button';

type Props = {
  button: Button;
};

export default class Details extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(detailsHbs());
  }
}
