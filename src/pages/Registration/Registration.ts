import layout from '../../layout/layout';
import registrationHbs from './registration.hbs';
import View from '../../packages/View';
import Card from '../../components/Card/Card';
import css from '../../layout/layout.css';

type Props = { card: Card };

export default class Registration extends View<Props> {
  public constructor(props: Props) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  public render(): DocumentFragment {
    const layoutTemplate = layout({ content: registrationHbs() });

    return this.compile(layoutTemplate);
  }
}
