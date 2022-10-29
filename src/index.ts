import './style.css';
import { registrationTemplates } from './templates/registrationTemplates';

import renderLogin from './pages/Login';
import renderRegistration from './pages/Registration';
import renderStatus404 from './pages/Status404';
import renderStatus500 from './pages/Status500';
import renderProfile, { ContentPage } from './pages/Profile';
import renderChat from './pages/Chat';

registrationTemplates();

const root = document.querySelector('#root') as HTMLDivElement;
if (root) {
  root.style.height = '100%';

  switch (window.location.pathname) {
    case '/':
      renderChat();
      break;
    case '/login':
      renderLogin();
      break;
    case '/registration':
      renderRegistration();
      break;
    case '/profile':
    case '/profile/details':
      renderProfile();
      break;
    case '/profile/profile':
      renderProfile('#root', ContentPage.profile);
      break;
    case '/profile/security':
      renderProfile('#root', ContentPage.security);
      break;
    case '/500':
      renderStatus500();
      break;
    case '/404':
    default:
      renderStatus404('#root');
  }
}
