import { card } from '../../components/card/card';

type Props = {
  content?: string;
  title?: string;
};

export default function loginHbs(props?: Props | undefined) {
  return `
    <div class="{{css.content}}">
      ${card(props)}
    </div>
  `;
}
