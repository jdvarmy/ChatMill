import './style.css';
import login from './pages/login/login';
import { registrationTemplates } from './templates/registrationTemplates';

registrationTemplates();

const root = document.querySelector('#root') as HTMLDivElement;
root.style.height = '100%';

root.innerHTML = login();
