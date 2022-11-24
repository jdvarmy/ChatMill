import { renderDOM } from '../../utils/renderDOM';
import { rootSelector } from '../../types';
import Status500 from './Status500';
import Link from '../../components/Link/Link';

export default function renderStatus500(query: string = rootSelector): Element | undefined {
  const page = new Status500({ link: new Link({ text: 'GO TO HOME PAGE', href: '/' }) });

  return renderDOM(query, page);
}
