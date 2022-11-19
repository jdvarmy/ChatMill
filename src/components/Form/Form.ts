import loginFormHbs from './formTemplate.hbs';
import View from '../../packages/View';
import Button from '../Button/Button';
import TextField from '../TextField/TextField';
import css from '../../pages/Login/login.css';
import Link from '../Link/Link';

type Props = {
  fields: TextField[];
  button: Button;
  link: Link;
};

export default class Form extends View<Props> {
  public constructor(props: Props) {
    super('div', props);

    this.addAttribute({ class: css.container });
  }

  public render(): DocumentFragment {
    return this.compile(loginFormHbs());
  }
}
