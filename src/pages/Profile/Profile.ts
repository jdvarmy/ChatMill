import View from '../../packages/View';
import layout from '../../layout/layout';
import profileHbs from './profile.hbs';
import css from '../../layout/layout.css';
import Link from '../../components/Link/Link';

type Props = {
  links: Link[];
  backLink: Link;
  content: { state: object };
};

export default class Profile extends View<Props> {
  public constructor(props: Props) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  public render(): DocumentFragment {
    const layoutTemplate = layout({ content: profileHbs() });

    return this.compile(layoutTemplate);
  }
}
