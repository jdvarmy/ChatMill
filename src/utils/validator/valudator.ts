import css from '../style.css';
import { InputNames } from '../../components/TextField/TextField';

type Props = {
  name: InputNames;
  value: string;
  label: Element | null;
  fieldset: Element | null;
  legend: Element | null;
};

function validator(props: Props): boolean {
  const { name, value } = props;

  if (value === '') {
    return true;
  }

  switch (name) {
    case InputNames.login:
      return !value.match(/(?=^[-.\w]{3,20}$)(?!^\d*$)/);
    case InputNames.password:
    case InputNames.oldPassword:
    case InputNames.newPassword:
      return !value.match(/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z]).*/);
    case InputNames.email:
      return !value.match(/[-.\w]+@([\w-]+\.)+[\w-]+/);
    case InputNames.phone:
      return !value.match(/^[*/+\d]{10,15}$/);
    case InputNames.firstName:
    case InputNames.secondName:
      return !value.match(/^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z]+$/);
    case InputNames.message:
      if (value !== '') {
        return false;
      }
      break;
    default:
      return false;
  }

  return true;
}

export function addRemoveClass(fieldProps: Props, action: 'add' | 'remove'): void {
  fieldProps.label?.parentElement?.classList[action](css.active);
  fieldProps.label?.classList[action](css.activeTextFieldLabel);
  fieldProps.fieldset?.classList[action](css.activeTextFieldFieldset);
  fieldProps.legend?.classList[action](css.activeTextFieldLegend);
}

export function addRemoveAlert(fieldProps: Props, action: 'add' | 'remove'): void {
  fieldProps.label?.classList[action](css.alertTextField);
  fieldProps.fieldset?.classList[action](css.alertTextField);
}

export function getPropsInputElement(field: HTMLInputElement) {
  const props: Props = {} as Props;

  props.name = field.name as InputNames;
  props.value = field.value;

  props.label = field.parentElement?.previousElementSibling ?? null;
  props.fieldset = field.nextElementSibling;
  props.legend = props.fieldset?.firstElementChild ?? null;

  return props;
}

export const validation = (element: HTMLInputElement) => {
  if (element.constructor.name === 'HTMLInputElement' && element instanceof HTMLInputElement) {
    const props = getPropsInputElement(element);
    return validator(props);
  }

  return false;
};
