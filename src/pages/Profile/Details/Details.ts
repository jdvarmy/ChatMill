import View from '../../../packages/View';
import detailsHbs from './details.hbs';
import Button from '../../../components/Button/Button';
import ButtonFile from '../../../components/ButtonFile/ButtonFile';

type Props = {
  loadAvatarBtn: ButtonFile;
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
