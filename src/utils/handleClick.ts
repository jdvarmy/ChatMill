import { findParentNode } from './findParentNode';
import { formFieldValidator } from './formFieldValidator';

export function handleClick(e: MouseEvent) {
  const form = findParentNode(e.target, 'form') as HTMLFormElement;
  if (form) {
    const data = new FormData(form);

    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    form.querySelectorAll('input').forEach((input) => {
      formFieldValidator(input, e.type);
    });
  } else {
    console.log('form not found');
  }
}
