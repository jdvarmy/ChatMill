import Block from '../packages/View';

export function renderDOM(query: string, block: Block): Element | undefined {
  const root = document.querySelector(query);
  if (!root) {
    return;
  }

  const content = block.getContent();

  root.append(content);
  block.dispatchComponentDidMount();

  return root;
}
