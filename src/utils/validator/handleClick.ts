import { findParentNode } from '../findParentNode';
import { addRemoveAlert, addRemoveClass, getPropsInputElement, validation } from './valudator';

export function handleClick<K extends string | number | symbol, V = any>(e: MouseEvent): Record<K, V> | false {
  const form = findParentNode(e.target, 'form') as HTMLFormElement;
  if (form) {
    const data: Record<K, V> = {} as Record<K, V>;
    let isValid = true;

    for (const [key, value] of new FormData(form).entries()) {
      data[key as K] = value as V;
    }

    form.querySelectorAll('input').forEach((input) => {
      const props = getPropsInputElement(input);
      if (validation(input)) {
        isValid = false;
        addRemoveClass(props, 'add');
        addRemoveAlert(props, 'add');
      } else {
        addRemoveAlert(props, 'remove');
      }
    });

    if (isValid) {
      return data;
    }
  } else {
    console.log('form not found');
  }

  return false;
}
