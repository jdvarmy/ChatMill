import Button from '../../../components/Button/Button';
import TextField from '../../../components/TextField/TextField';
import Block from '../../../packages/View';
import securityHbs from './security.hbs';

type Props = {
  button: Button;
  oldPasswordField: TextField;
  newPasswordField: TextField;
  repeatPasswordField: TextField;
};

export default class Security extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(securityHbs());
  }
}
