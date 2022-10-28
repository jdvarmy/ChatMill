import View from '../../../packages/View';
import detailsHbs from './details.hbs';
import Button from '../../../components/Button/Button';

type Props = {
  button: Button;
};

export default class Details extends View<Props> {
  public constructor(props: Props) {
    super('div', props);
  }

  public render(): DocumentFragment {
    return this.compile(detailsHbs());
  }
}
