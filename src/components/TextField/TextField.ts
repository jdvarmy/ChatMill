import Handlebars from 'handlebars';
import View from '../../packages/View';
import textFieldHbs from './textField.hbs';
import css from './textField.css';
import { EventType } from '../../types';

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
  lastName = 'last_name',
  displayName = 'display_name',
  login = 'login',
  password = 'password',
  oldPassword = 'old_password',
  repeatPassword = 'repeat_password',
  email = 'email',
  phone = 'phone',
  message = 'message',
}

export type TextFieldProps = {
  label: string;
  inputName: InputNames;
  inputType: InputTypes | string;
  events?: EventType;
};

export default class TextField extends View<TextFieldProps> {
  public constructor(props: TextFieldProps) {
    super('div', props);

    this.addAttribute({ class: css.fieldContainer });
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

  public render(): DocumentFragment | string {
    return Handlebars.compile(textFieldHbs())(this.props);
  }
}
