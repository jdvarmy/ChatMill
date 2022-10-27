import { renderDOM } from '../../utils/renderDOM';
import { rootSelector } from '../../types';
import Profile from './Profile';
import Button from '../../components/Button/Button';
import Block from '../../packages/View';
import { findParentNode } from '../../utils/findParentNode';
import Details from './Details/Details';
import UserProfile from './UserProfile/UserProfile';
import Security from './Security/Security';
import { formFieldValidator } from '../../utils/formFieldValidator';
import TextField, { InputNames, InputTypes } from '../../components/TextField/TextField';

const style = 'width: calc(100% - 16px)';
export enum ContentPage {
  details = 'details',
  profile = 'profile',
  security = 'security',
}

export default function renderProfile(query = rootSelector, contentPage = ContentPage.details) {
  const button = new Button({
    text: 'Save',
    name: 'save',
    events: {
      click: (e) => {
        const form = findParentNode(e.target, 'form') as HTMLFormElement;
        if (form) {
          const data = new FormData(form);

          for (const i of data.entries()) {
            console.log(`${i[0]}: ${i[1]}`);
          }

          form.querySelectorAll('input').forEach((input) => {
            formFieldValidator(input, e.type);
          });
        } else {
          console.log('form not found');
        }
      },
    },
  });

  const fieldEvents = { focus: formFieldValidator, blur: formFieldValidator };
  let content: Block;
  switch (contentPage) {
    case ContentPage.details:
      button.setProps({ text: 'Change cover', name: 'cover' });
      content = new Details({ button });
      break;
    case ContentPage.profile:
      // eslint-disable-next-line no-case-declarations
      const textFieldsProfile = {
        firstNameField: new TextField({
          label: 'First name',
          inputName: InputNames.firstName,
          inputType: InputTypes.text,
          events: fieldEvents,
        }),
        lastNameField: new TextField({
          label: 'Last name',
          inputName: InputNames.lastName,
          inputType: InputTypes.text,
          events: fieldEvents,
        }),
        phoneField: new TextField({
          label: 'Phone',
          inputName: InputNames.phone,
          inputType: InputTypes.tel,
          events: fieldEvents,
        }),
        loginField: new TextField({
          label: 'Login',
          inputName: InputNames.login,
          inputType: InputTypes.text,
          events: fieldEvents,
        }),
        displayNameField: new TextField({
          label: 'Display name',
          inputName: InputNames.displayName,
          inputType: InputTypes.text,
          events: fieldEvents,
        }),
        emailField: new TextField({
          label: 'Email',
          inputName: InputNames.email,
          inputType: InputTypes.email,
          events: fieldEvents,
        }),
      };

      content = new UserProfile({ ...textFieldsProfile, button });
      break;
    case ContentPage.security:
      // eslint-disable-next-line no-case-declarations
      const textFieldsSecurity = {
        oldPasswordField: new TextField({
          label: 'Old password',
          inputName: InputNames.oldPassword,
          inputType: InputTypes.password,
          events: fieldEvents,
        }),
        newPasswordField: new TextField({
          label: 'New password',
          inputName: InputNames.password,
          inputType: InputTypes.password,
          events: fieldEvents,
        }),
        repeatPasswordField: new TextField({
          label: 'Repeat password',
          inputName: InputNames.repeatPassword,
          inputType: InputTypes.password,
          events: fieldEvents,
        }),
      };

      content = new Security({ ...textFieldsSecurity, button });
      break;
    default:
      content = new Details({ button });
  }

  const page = new Profile({
    content,
    links: [
      { button: true, style, text: 'Details', href: '/profile/details' },
      { button: true, style, text: 'Profile', href: '/profile/profile' },
      { button: true, style, text: 'Security', href: '/profile/security' },
    ],
  });

  renderDOM(query, page);
}
