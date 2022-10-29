import View from '../../packages/View';
import layout from '../../layout/layout';
import profileHbs from './profile.hbs';
import { LinkPropsType } from '../../templates/link/link';
import css from '../../layout/layout.css';

type Props = {
  links: LinkPropsType[];
  content: View;
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
