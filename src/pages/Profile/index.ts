import { renderDOM } from '../../utils/renderDOM';
import { rootSelector } from '../../types';
import Profile from './Profile';
import Button from '../../components/Button/Button';
import Details from './Details/Details';
import UserProfile from './UserProfile/UserProfile';
import Security from './Security/Security';
import TextField, { InputNames, InputTypes, TextFieldProps } from '../../components/TextField/TextField';
import Link from '../../components/Link/Link';
import { backIcon, loadIcon } from '../../utils/icons';
import { handleFocus } from '../../utils/validator/handleFocus';
import { handleBlur } from '../../utils/validator/handleBlur';
import { connect } from '../../hoc/connect';
import { userSelector } from '../../packages/Store/selectors';
import UserAction from '../../api/actions/UserAction';
import ButtonFile from '../../components/ButtonFile/ButtonFile';
import { findParentNode } from '../../utils/findParentNode';
import View from '../../packages/View';

export enum ContentPage {
  details = 'details',
  profile = 'profile',
  security = 'security',
}

export default function renderProfile(contentPage = ContentPage.details): (query?: string) => Element | undefined {
  return function (query: string = rootSelector): Element | undefined {
    const button = new Button({ text: 'Save', name: 'save' });
    const loadAvatarBtn = new ButtonFile({ name: 'avatar', icon: loadIcon });
    const events = { focus: handleFocus, blur: handleBlur };
    const textFieldsProfile: TextFieldProps[] = [
      { label: 'First name', inputName: InputNames.firstName, events, name: 'firstName' },
      { label: 'Last name', inputName: InputNames.secondName, events, name: 'secondName' },
      { label: 'Phone', inputName: InputNames.phone, inputType: InputTypes.tel, events, name: 'phone' },
      { label: 'Login', inputName: InputNames.login, events, name: 'login' },
      { label: 'Display name', inputName: InputNames.displayName, events, name: 'displayName' },
      { label: 'Email', inputName: InputNames.email, inputType: InputTypes.email, events, name: 'email' },
    ];
    const textFieldsSecurity = [
      { label: 'Old password', inputName: InputNames.oldPassword, inputType: InputTypes.password, events },
      { label: 'New password', inputName: InputNames.newPassword, inputType: InputTypes.password, events },
    ];

    let ClassContent: any;

    switch (contentPage) {
      case ContentPage.profile:
        button.setProps({ events: { click: (e) => UserAction.putProfile(e) } });
        ClassContent = new (connect(userSelector)(UserProfile))({
          fields: textFieldsProfile.map((item) => new TextField(item)),
          button,
        });
        break;
      case ContentPage.security:
        ClassContent = new Security({
          fields: textFieldsSecurity.map((item) => new TextField(item)),
          button,
        });
        button.setProps({ events: { click: (e) => UserAction.putSecurity(e, ClassContent) } });
        break;
      default:
        button.setProps({ text: 'Change cover', name: 'cover' });
        ClassContent = new (connect(userSelector)(Details))({ button, loadAvatarBtn });
        loadAvatarBtn.setProps({
          events: {
            click: (e: MouseEvent) => {
              findParentNode(e.target, 'form')?.querySelector('input')?.click();
            },
            change: (e: Event) => {
              if (e.target instanceof HTMLInputElement) {
                const file = e.target.files && e.target?.files[0];
                if (!file) {
                  return;
                }
                e.target.value = '';

                UserAction.putAvatar(file);
              }
            },
          },
        });
        break;
    }

    const page = new Profile({
      content: ClassContent,
      backLink: new Link({ icon: backIcon, type: 'icon', text: '' }),
      links: [
        new Link({ type: 'button', text: 'Details', href: '/profile/details' }),
        new Link({ type: 'button', text: 'Profile', href: '/profile/profile' }),
        new Link({ type: 'button', text: 'Security', href: '/profile/security' }),
      ],
    });

    return renderDOM(query, page as unknown as View);
  };
}
