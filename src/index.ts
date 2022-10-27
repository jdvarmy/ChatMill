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

  renderChat('#root');
}
