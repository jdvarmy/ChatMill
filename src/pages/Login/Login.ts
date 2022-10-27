import loginHbs from './login.hbs';
import layout from '../../layout/layout';
import Block from '../../packages/View';
import Card from '../../components/Card/Card';
import css from '../../layout/layout.css';

type Props = { card: Card };

export default class Login extends Block {
  constructor(props: Partial<Props>) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  render(): DocumentFragment {
    const layoutTemplate = layout({ content: loginHbs() });

    return this.compile(layoutTemplate);
  }
}
