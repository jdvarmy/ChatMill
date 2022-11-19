import './style.css';
import { registrationTemplates } from './templates/registrationTemplates';

import renderLogin from './pages/Login';
import renderRegistration from './pages/Registration';
import renderStatus404 from './pages/Status404';
import renderStatus500 from './pages/Status500';
import renderProfile, { ContentPage } from './pages/Profile';
import renderChat from './pages/Chat';
import { Router } from './packages/Router/Router';
import { registerHelpers } from './helpers/registerHelpers';

registrationTemplates();
registerHelpers();

new Router('#root')
  .use('/messenger', renderChat)
  .use('/', renderLogin)
  .use('/registration', renderRegistration)
  .use(['/profile/profile'], renderProfile(ContentPage.profile))
  .use(['/profile', '/profile/details'], renderProfile(ContentPage.details))
  .use('/profile/security', renderProfile(ContentPage.security))
  .use('/500', renderStatus500)
  .use('*', renderStatus404)
  .start();
