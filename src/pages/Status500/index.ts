import { renderDOM } from '../../utils/renderDOM';
import { rootSelector } from '../../types';
import Status500 from './Status500';

export default function renderStatus500(query = rootSelector) {
  const page = new Status500({ link: { text: 'GO TO HOME PAGE', href: '/' } });

  renderDOM(query, page);
}
