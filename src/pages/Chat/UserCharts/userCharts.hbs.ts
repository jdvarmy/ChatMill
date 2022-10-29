import css from '../chat.css';
import summerAvatar from '../../../../static/images/avatars/1.jpg';
import jessicaAvatar from '../../../../static/images/avatars/3.jpg';
import rickAvatar from '../../../../static/images/avatars/4.jpg';
import avatar from '../../../../static/images/avatars/2.jpg';
import { searchIcon, settingIcon } from '../../../utils/icons';

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
        <div class="${css.userSettingsChildren}">
          <div>
            {{> typography tag="h5" text="Morty"}}
            {{> typography tag="h6" text="Hi Mr. Jellybean, I’m Morty. I’m on an adventure with my grandpa."}}
          </div>
          <button class="${css.button} ${css.buttonIcon}" type="button">
            ${settingIcon}
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
