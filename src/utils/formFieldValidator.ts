import css from './style.css';
import { InputNames } from '../components/TextField/TextField';

type Props = {
  name: InputNames;
  value: string;
  label: Element | null;
  fieldset: Element | null;
  legend: Element | null;
};

export function formFieldValidator(e: Event | EventTarget | null, type = 'click'): void {
  if (e === null) {
    return;
  }

  const fieldProps: Props = {} as Props;
  let target: EventTarget | null = null;
  let currentEventType = type;

  if (e instanceof Event && e.target instanceof HTMLInputElement) {
    target = e.target;
    currentEventType = e.type;
  }
  if (e instanceof EventTarget) {
    target = e;
  }

  if (target && target instanceof HTMLInputElement) {
    fieldProps.name = target.name as InputNames;
    fieldProps.value = target.value;

    fieldProps.label = target.parentElement?.previousElementSibling ?? null;
    fieldProps.fieldset = target.nextElementSibling;
    fieldProps.legend = fieldProps.fieldset?.firstElementChild ?? null;

    if (currentEventType === 'focus') {
      addRemoveClass(fieldProps, 'add');
    }
    if (currentEventType === 'blur' && fieldProps.value === '') {
      addRemoveClass(fieldProps, 'remove');
      addRemoveAlert(fieldProps, 'remove');
    }

    validator(fieldProps);

    if (currentEventType === 'click' && fieldProps.value === '') {
      addRemoveClass(fieldProps, 'add');
      addRemoveAlert(fieldProps, 'add');
    }
  }
}

function validator(props: Props) {
  const { name, value } = props;

  if (value === '') {
    return;
  }

  // todo: немного улучшить функцию валидации, сделать так, чтобы она возвращала просто true/false значения и была чистой функцией
  switch (name) {
    case InputNames.login:
      if (value.match(/(?=^[-.\w]{3,20}$)(?!^\d*$)/)) {
        addRemoveAlert(props, 'remove');
      } else {
        addRemoveAlert(props, 'add');
      }
      break;
    case InputNames.password:
    case InputNames.oldPassword:
    case InputNames.repeatPassword:
      if (value.match(/(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z]).*/)) {
        addRemoveAlert(props, 'remove');
      } else {
        addRemoveAlert(props, 'add');
      }
      break;
    case InputNames.email:
      if (value.match(/[-.\w]+@([\w-]+\.)+[\w-]+/)) {
        addRemoveAlert(props, 'remove');
      } else {
        addRemoveAlert(props, 'add');
      }
      break;
    case InputNames.phone:
      if (value.match(/^[*/+\d]{10,15}$/)) {
        addRemoveAlert(props, 'remove');
      } else {
        addRemoveAlert(props, 'add');
      }
      break;
    case InputNames.firstName:
    case InputNames.lastName:
      if (value.match(/^[А-ЯЁA-Z][а-яА-ЯёЁa-zA-Z]+$/)) {
        addRemoveAlert(props, 'remove');
      } else {
        addRemoveAlert(props, 'add');
      }
      break;
    case InputNames.message:
      if (value !== '') {
        addRemoveAlert(props, 'remove');
      }
      break;
    default:
      console.log('no validate');
  }
}

function addRemoveClass(fieldProps: Props, func: 'add' | 'remove') {
  fieldProps.label?.parentElement?.classList[func](css.active);
  fieldProps.label?.classList[func](css.activeTextFieldLabel);
  fieldProps.fieldset?.classList[func](css.activeTextFieldFieldset);
  fieldProps.legend?.classList[func](css.activeTextFieldLegend);
}

function addRemoveAlert(fieldProps: Props, func: 'add' | 'remove'): void {
  fieldProps.label?.classList[func](css.alertTextField);
  fieldProps.fieldset?.classList[func](css.alertTextField);
}
