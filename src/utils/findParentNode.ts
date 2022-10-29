export function findParentNode(target: EventTarget | null, nodeName: string): HTMLElement | null {
  if (!target) {
    return null;
  }

  if (target instanceof Element && target.closest) {
    return target.closest(nodeName);
  }

  return null;
}
