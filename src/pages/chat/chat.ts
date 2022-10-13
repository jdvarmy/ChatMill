import layout from '../../layout/layout';
import Handlebars from 'handlebars';
import css from './chat.css';

const chat = (): string => {
  const chatTemplate: HandlebarsTemplateDelegate = Handlebars.compile(
    `
    <div class="{{css.content}}">
      {{> typography tag="h2" text="Здесь будет чат"}}
    </div>
    `,
  );

  // оборачиваем все в layout
  return layout({ content: chatTemplate({ css }) });
};

export default chat;
