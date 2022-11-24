import { renderDOM } from '../../utils/renderDOM';
import { rootSelector } from '../../types';
import Status404 from './Status404';
import Link from '../../components/Link/Link';

export default function renderStatus404(query: string = rootSelector): Element | undefined {
  const page = new Status404({ link: new Link({ text: 'GO TO HOME PAGE', href: '/' }) });

  return renderDOM(query, page);
}
