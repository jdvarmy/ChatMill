import { card } from '../../components/card/card';

type Props = {
  content?: string;
  title?: string;
};

// пока что код дублирует страницу логина, не знаю что будет дальше, пусть полежит здесь =)
export default function registrationHbs(props?: Props | undefined): string {
  return `
    <div class="{{css.content}}">
      ${card(props)}
    </div>
  `;
}
