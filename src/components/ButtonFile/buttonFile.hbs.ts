import css from './buttonFile.css';

export default function buttonFileHbs() {
  return `
    <input accept="image/*" name="{{name}}" type="file" style="display: none;">
    <span class="${css.button} ${css.avatarButton}">
      {{{icon}}}
    </span>
`;
}
