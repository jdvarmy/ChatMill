import { addRemoveClass, getPropsInputElement } from './valudator';

export function handleFocus(e: Event): void {
  const target = e.target;
  if (target && target instanceof HTMLInputElement) {
    const props = getPropsInputElement(target);
    addRemoveClass(props, 'add');
  }
}
