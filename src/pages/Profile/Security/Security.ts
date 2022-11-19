import Button from '../../../components/Button/Button';
import TextField from '../../../components/TextField/TextField';
import View from '../../../packages/View';
import securityHbs from './security.hbs';

type Props = {
  button: Button;
  fields: TextField[];
};

export default class Security extends View<Props> {
  public constructor(props: Props) {
    super('div', props);
  }

  public render(): DocumentFragment {
    return this.compile(securityHbs());
  }
}
