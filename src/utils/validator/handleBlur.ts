import { addRemoveAlert, addRemoveClass, getPropsInputElement, validation } from './valudator';

export function handleBlur(e: Event): void {
  const target = e.target;
  if (target && target instanceof HTMLInputElement) {
    const props = getPropsInputElement(target);
    if (props.value === '') {
      addRemoveClass(props, 'remove');
      addRemoveAlert(props, 'remove');
      return;
    }
    addRemoveClass(props, 'add');

    if (validation(target)) {
      addRemoveAlert(props, 'add');
    } else {
      addRemoveAlert(props, 'remove');
    }
  }
}
