import registrationFormHbs from './registrationForm.hbs';
import Block from '../../../packages/View';
import Button from '../../../components/Button/Button';
import TextField from '../../../components/TextField/TextField';
import { LinkPropsType } from '../../../templates/link/link';
import css from '../registration.css';

type Props = {
  loginField: TextField;
  passwordField: TextField;
  button: Button;
  link: LinkPropsType;
};

export default class Form extends Block {
  constructor(props: Props) {
    super('div', props);

    this.addAttribute({ class: css.container });
  }

  render(): DocumentFragment {
    return this.compile(registrationFormHbs());
  }
}
