import Button from '../../../components/Button/Button';
import View from '../../../packages/View';
import userProfileHbs from './userProfile.hbs';
import TextField from '../../../components/TextField/TextField';
import { StoreType } from '../../../packages/Store/Store';

type Props = {
  button: Button;
  fields: TextField[];
  user?: StoreType['user'];
};

export default class UserProfile extends View<Props> {
  public constructor(props: Props) {
    super('div', props);
  }

  componentWillMount(_oldProps: Props, _newProps: Props) {
    updateFields(this.arrayOfChildren.fields, this.props);
  }

  componentDidMount(oldProps: Props): Props {
    // todo: запросить юзера с сервера, вдруг он изменился
    updateFields(this.arrayOfChildren.fields, this.props);

    return super.componentDidMount(oldProps);
  }

  public render(): DocumentFragment {
    return this.compile(userProfileHbs());
  }
}

function updateFields(children: TextField[], props: Props) {
  for (const child of children) {
    if (child.viewProps.name) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      child.setProps({ value: props.user[child.viewProps.name] || '' });
    }
  }
}
