import css from './textField.css';

export default function textFieldHbs() {
  return `
    <label class="${css.fieldInputLabel}">
      {{label}}
    </label>
    <div class="${css.fieldInputContainer}">
      <input type="{{#if inputType}}{{inputType}}{{else}}text{{/if}}" name="{{inputName}}" class="${css.fieldInput}" value="{{value}}">
      <fieldset class="${css.fieldFieldset}">
        <legend class="${css.fieldLegend}">
          <span>{{label}}</span>
        </legend>
      </fieldset>
    </div>
  `;
}
