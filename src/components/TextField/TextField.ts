import Handlebars from 'handlebars';
import View from '../../packages/View';
import textFieldHbs from './textField.hbs';
import css from './textField.css';
import { EventType } from '../../types';
import { addRemoveClass, getPropsInputElement } from '../../utils/validator/valudator';

export const enum InputTypes {
  text = 'text',
  password = 'password',
  file = 'file',
  email = 'email',
  search = 'search',
  tel = 'tel',
}
export const enum InputNames {
  firstName = 'first_name',
  secondName = 'second_name',
  displayName = 'display_name',
  login = 'login',
  password = 'password',
  oldPassword = 'oldPassword',
  newPassword = 'newPassword',
  email = 'email',
  phone = 'phone',
  message = 'message',
}

export type TextFieldProps = {
  label: string;
  inputName: InputNames | string;
  inputType?: InputTypes | string;
  name?: string;
  value?: string | number;
  events?: EventType;
  size?: 'm' | 's';
};

export default class TextField extends View<TextFieldProps> {
  public constructor(props: TextFieldProps) {
    super('div', props);

    this.addAttribute({ class: css.fieldContainer });
    const element = this.element as HTMLDivElement;
    props.size === 's' && element.classList.add(css.sizeS);
  }

  protected addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.querySelector('input')?.addEventListener(eventName, events[eventName]);
    });
  }

  protected removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element.querySelector('input')?.removeEventListener(eventName, events[eventName]);
    });
  }

  componentWillMount(_oldProps: TextFieldProps, _newProps: TextFieldProps) {
    const input = this.element.querySelector('input');

    if (input && this.props.value) {
      const props = getPropsInputElement(input);
      addRemoveClass(props, 'add');
    }
  }

  public render(): DocumentFragment | string {
    return Handlebars.compile(textFieldHbs())(this.props);
  }
}
