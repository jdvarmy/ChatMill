import Handlebars from 'handlebars';
import layout from '../../layout/layout';
import profileHbs from './profile.hbs';
import css from './profile.css';
import templateDetailsHbs from './templateDetails.hbs';
import templateProfileHbs from './templateProfile.hbs';
import templateSecurityHbs from './templateSecurity.hbs';

const style = 'width: calc(100% - 16px)';
export enum Page {
  details = 'details',
  profile = 'profile',
  security = 'security',
}

const profile = (page: Page): string => {
  const data = {
    css,
    links: [
      { button: true, style, text: 'Details', href: '/profile/details' },
      { button: true, style, text: 'Profile', href: '/profile/profile' },
      { button: true, style, text: 'Security', href: '/profile/security' },
    ],
  };

  // todo: компилятся все три сразу, потом, видимо, сделаем по одному
  const detailsTemplate: HandlebarsTemplateDelegate = Handlebars.compile(templateDetailsHbs());
  const detailsData = { css, button: { text: 'Change cover', name: '' } };

  const profileTemplate: HandlebarsTemplateDelegate = Handlebars.compile(templateProfileHbs());
  const profileData = {
    css,
    form: [
      { label: 'First name', input: { name: 'first_name' } },
      { label: 'Second name', input: { name: 'second_name' } },
      { label: 'Phone', input: { name: 'phone' } },
      { label: 'Login', input: { name: 'login' } },
      { label: 'Display name', input: { name: 'display_name' } },
      { label: 'Email', input: { name: 'email' } },
    ],
    button: { text: 'Save', name: 'save' },
  };

  const securityTemplate: HandlebarsTemplateDelegate = Handlebars.compile(templateSecurityHbs());
  const securityData = {
    css,
    form: [
      { label: 'Old password', input: { name: 'old_password' } },
      { label: 'New password', input: { name: 'new_password' } },
      { label: 'Repeat password', input: { name: 'repeat_password' } },
    ],
    button: { text: 'Save', name: 'save' },
  };

  const content: Record<Page, string> = {
    [Page.details]: detailsTemplate(detailsData),
    [Page.profile]: profileTemplate(profileData),
    [Page.security]: securityTemplate(securityData),
  };

  const responseTemplate: HandlebarsTemplateDelegate = Handlebars.compile(profileHbs({ content: content[page] }));

  // оборачиваем все в layout
  return layout({ content: responseTemplate(data) });
};

export default profile;
