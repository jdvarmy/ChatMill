import css from '../chat.css';
import avatar from '../../../../static/images/avatars/4.jpg';
import { searchIcon } from '../../../utils/icons';
import { staticUrl } from '../../../api/api';

export default function userChatsHbs(): string {
  return `
    <!-- user -->
    <div class="${css.userSettingsContainer}">
      <div class="${css.userSettingsAvatar}">
        <img alt="avatar" src="${staticUrl}{{user.avatar}}" class="${css.userSettingsAvatarImg}">
      </div>
      <div class="${css.userSettings}">
        <div class="${css.userSettingsChildren}">
          <div>
            {{#if user.displayName}}
              {{> typography tag="h5" text=user.displayName}}
            {{else}}
              {{> typography tag="h5" text=user.firstName}}
            {{/if}}
            {{> typography tag="h6" text="Hi Mr. Jellybean, I’m Morty. I’m on an adventure with my grandpa."}}
          </div>
          <div>
            {{{logOut}}}
            {{{settingLink}}}
          </div>
        </div>
      </div>
    </div>
    <!-- search -->
    <div class="${css.searchContainer}">
      <div class="${css.search}">
        <div class="${css.searchIcon}">
          ${searchIcon}
        </div>
        <input placeholder="Search..." type="text" class="${css.searchInput}" value="">
        <fieldset class="${css.searchFieldset}"></fieldset>
      </div>
    </div>
    <!-- chars -->
    <div class="${css.chatTitle}">
      {{> typography tag="h3" text="Chats"}}
      {{{addChat}}}
    </div>
    <div class="${css.chatList}" id="chats">
      {{#each chats}}
        <!-- todo: сделаать активный чат, в помощь хелпер iff -->
        <div class="${css.chatContainer}" data-chat-id="{{this.id}}"> <!-- {item.active && css.chatContainerActive}-->
          <div class="${css.chatImageContainer}">
            <div class="${css.chatImage}">
              {{#if this.avatar}}
                <img alt="avatar" src="${staticUrl}{{this.avatar}}">
              {{else}}
                <img alt="avatar" src="${avatar}">
              {{/if}}
            </div>
          </div>
          <div class="${css.userContainer}">
            {{> typography tag="h5" text=this.title}}
            <div class="${css.lastMessage}">{{this.lastMessage.content}}</div>
          </div>
          {{#if this.unreadCount}}<span class="${css.unreadCount}">{{this.unreadCount}}</span>{{/if}}
        </div>
      {{/each}}
    </div>
  `;
}
