import './style.css';
import { registrationTemplates } from './templates/registrationTemplates';
import login from './pages/login/login';
import registration from './pages/registration/registration';
import status404 from './pages/status404/status404';
import status500 from './pages/status500/status500';

registrationTemplates();

const root = document.querySelector('#root') as HTMLDivElement;
root.style.height = '100%';

root.innerHTML = status500();
