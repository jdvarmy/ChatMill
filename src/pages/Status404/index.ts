import { renderDOM } from '../../utils/renderDOM';
import { rootSelector } from '../../types';
import Status404 from './Status404';

export default function renderStatus404(query = rootSelector) {
  const page = new Status404({ link: { text: 'GO TO HOME PAGE', href: '/' } });

  renderDOM(query, page);
}
