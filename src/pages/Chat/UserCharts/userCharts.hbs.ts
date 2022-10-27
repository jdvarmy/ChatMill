import css from '../chat.css';
import summerAvatar from '../../../../static/images/avatars/1.jpg';
import jessicaAvatar from '../../../../static/images/avatars/3.jpg';
import rickAvatar from '../../../../static/images/avatars/4.jpg';
import avatar from '../../../../static/images/avatars/2.jpg';
import { searchIcon } from '../../../utils/icons';

export default function userChartsHbs(): string {
  const charts = [
    {
      name: 'Summer',
      message: 'B*tch, my generation gets traumatized for breakfast!',
      avatar: summerAvatar,
      unread: 2,
      active: false,
    },
    {
      name: 'Jessica',
      message: 'Nobody exists on purpose. Nobody belongs anywhere. We’re all going to die.',
      avatar: jessicaAvatar,
      unread: 0,
      active: false,
    },
    {
      name: 'Rick',
      message:
        'Morty, I need your help on an adventure. Eh, ‘need’ is a strong word. We need door stops, but a brick would work too.',
      avatar: rickAvatar,
      unread: 5,
      active: true,
    },
  ];

  return `
    <!-- user -->
    <div class="${css.userSettingsContainer}">
      <div class="${css.userSettingsAvatar}">
        <img alt="Morty" src="${avatar}" class="${css.userSettingsAvatarImg}">
      </div>
      <div class="${css.userSettings}">
        <div>
          <div>
            {{> typography tag="h5" text="Morty"}}
            {{> typography tag="h6" text="Hi Mr. Jellybean, I’m Morty. I’m on an adventure with my grandpa."}}
          </div>
          <button class="${css.button} ${css.buttonIcon}" type="button">
            <svg viewBox="0 0 24 24">
                <path d="m19.28 8.6-.7-1.21-1.27.51-1.06.43-.91-.7c-.39-.3-.8-.54-1.23-.71l-1.06-.43-.16-1.13L12.7 4h-1.4l-.19 1.35-.16 1.13-1.06.44c-.41.17-.82.41-1.25.73l-.9.68-1.05-.42-1.27-.52-.7 1.21 1.08.84.89.7-.14 1.13c-.03.3-.05.53-.05.73s.02.43.05.73l.14 1.13-.89.7-1.08.84.7 1.21 1.27-.51 1.06-.43.91.7c.39.3.8.54 1.23.71l1.06.43.16 1.13.19 1.36h1.39l.19-1.35.16-1.13 1.06-.43c.41-.17.82-.41 1.25-.73l.9-.68 1.04.42 1.27.51.7-1.21-1.08-.84-.89-.7.14-1.13c.04-.31.05-.52.05-.73 0-.21-.02-.43-.05-.73l-.14-1.13.89-.7 1.1-.84zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" opacity=".3"></path><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>
            </svg>
          </button>
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
    <!-- charts -->
    <div class="${css.chartTitle}">
      {{> typography tag="h3" text="Charts"}}
    </div>
    <div class="${css.chartList}">
      ${charts
        .map((item) => {
          return `
          <div class="${css.chartContainer} ${item.active && css.chartContainerActive}">
            <div class="${css.chartImageContainer}">
              <div class="${css.chartImage}">
                <img alt="Summer" src="${item.avatar}">
              </div>
            </div>
            <div class="${css.userContainer}">
              {{> typography tag="h5" text="${item.name}"}}
              <div class="${css.lastMessage}">${item.message}</div>
            </div>
            ${item.unread ? `<span class="${css.unreadCount}">${item.unread}</span>` : ''}
          </div>
        `;
        })
        .join('')}
    </div>
  `;
}
