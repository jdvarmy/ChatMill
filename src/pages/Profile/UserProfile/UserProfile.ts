import Button from '../../../components/Button/Button';
import Block from '../../../packages/View';
import userProfileHbs from './userProfile.hbs';
import TextField from '../../../components/TextField/TextField';

type Props = {
  button: Button;
  firstNameField: TextField;
  lastNameField: TextField;
  phoneField: TextField;
  loginField: TextField;
  displayNameField: TextField;
  emailField: TextField;
};

export default class UserProfile extends Block {
  constructor(props: Props) {
    super('div', props);
  }

  render(): DocumentFragment {
    return this.compile(userProfileHbs());
  }
}
