import css from '../chat.css';
import rickAvatar from '../../../../static/images/avatars/4.jpg';
import { staticUrl } from '../../../api/api';
import { Messages, StoreType } from '../../../packages/Store/Store';
import { message } from './message';

export default function messengerHbs(messages?: StoreType['messages'], userId?: string | number) {
  let formattedMessages = [];
  if (messages && userId) {
    formattedMessages = formatMessages(messages, userId);
  }

  return `
    <!-- header -->
    <div class="${css.messengerHeaderWrapper}">
      <div class="${css.messengerHeaderContainer}">
        {{#if activeChatId}}
          <div class="${css.headerAvatar}">
          <div class="${css.headerAvatarImg}">
              <img alt="avatar" src="${rickAvatar}">
          </div>
          <div class="${css.userSettings}">
            {{> typography tag="h3" text="Rick"}}
            <div class="${css.lastMessage}">8 minutes ago</div>
          </div>
        </div>
        {{/if}}
        <div class="${css.addUser}">
          {{#if activeChatId}}
            {{{addUser}}}
            {{{addUserBtn}}}
            {{{removeUserBtn}}}
          {{else}}
            {{> typography tag="h4" text="Select chat"}}
          {{/if}}
        </div>
      </div>
    </div>
    <!-- messenger board -->
    <div class="${css.boardWrapper}">
      <div class="${css.boardContainer}">
        <div class="${css.board}">
          ${formattedMessages
            .map((item: any) =>
              message({
                side: item.side,
                time: item.content.at(-1)?.time,
                text: item.content.map((i: Messages) => i.content),
              }),
            )
            .join('')}
        </div>
      </div>
    </div>
    <!-- send message -->
    <form class="${css.sendMessageFormWrapper}">
      <div class="${css.sendMessageFormContainer}">
      <div class="${css.messageImg}">
        <img alt="avatar" src="${staticUrl}{{user.avatar}}">
      </div>
      {{> vr}}
      <div class="${css.messageFieldContainer}">
        {{{message}}}
      </div>
      {{#if activeChatId}}{{> vr}}{{{button}}}{{/if}}
      </div>
    </form>
  `;
}

function formatMessages(messages: any, user: string | number) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return messages?.reduceRight((accumulator, { userId, ...mess }) => {
    const previos = accumulator.at(-1);
    if (previos && previos.userId === userId) {
      previos.content.push({ ...mess });
      return accumulator;
    }

    accumulator.push({ userId, side: userId === user ? 'left' : 'right', content: [{ ...mess }] });
    return accumulator;
  }, []);
}
