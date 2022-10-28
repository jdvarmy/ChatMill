import loginHbs from './login.hbs';
import layout from '../../layout/layout';
import View from '../../packages/View';
import Card from '../../components/Card/Card';
import css from '../../layout/layout.css';

type Props = { card: Card };

export default class Login extends View<Props> {
  public constructor(props: Props) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  public render(): DocumentFragment {
    const layoutTemplate = layout({ content: loginHbs() });

    return this.compile(layoutTemplate);
  }
}
