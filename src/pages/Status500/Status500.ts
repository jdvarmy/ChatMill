import layout from '../../layout/layout';
import View from '../../packages/View';
import status500Hbs from './status500.hbs';
import css from '../../layout/layout.css';
import Link from '../../components/Link/Link';

type Props = {
  link: Link;
};

export default class Status500 extends View<Props> {
  public constructor(props: Props) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  public render(): DocumentFragment {
    const layoutTemplate = layout({ content: status500Hbs() });

    return this.compile(layoutTemplate);
  }
}
