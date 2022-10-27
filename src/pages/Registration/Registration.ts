import layout from '../../layout/layout';
import registrationHbs from './registration.hbs';
import Block from '../../packages/View';
import Card from '../../components/Card/Card';
import css from '../../layout/layout.css';

type Props = { card: Card };

export default class Registration extends Block {
  constructor(props: Partial<Props>) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  render(): DocumentFragment {
    const layoutTemplate = layout({ content: registrationHbs() });

    return this.compile(layoutTemplate);
  }
}
