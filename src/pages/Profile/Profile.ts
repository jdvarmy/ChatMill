import Block from '../../packages/View';
import layout from '../../layout/layout';
import profileHbs from './profile.hbs';
import { LinkPropsType } from '../../templates/link/link';
import css from '../../layout/layout.css';

type Props = {
  links: LinkPropsType[];
  content: Block;
};

export default class Profile extends Block {
  constructor(props: Props) {
    super('main', props);

    this.addAttribute({ class: css.layout });
  }

  render(): DocumentFragment {
    const layoutTemplate = layout({ content: profileHbs() });

    return this.compile(layoutTemplate);
  }
}
