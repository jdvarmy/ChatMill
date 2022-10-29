import css from '../chat.css';
import mortyAvatar from '../../../../static/images/avatars/2.jpg';
import rickAvatar from '../../../../static/images/avatars/4.jpg';
import { clockIcon, pinIcon, videoIcon, voiceIcon } from '../../../utils/icons';

export default function messengerHbs() {
  return `
    <!-- header -->
    <div class="${css.messengerHeaderWrapper}">
      <div class="${css.messengerHeaderContainer}">
        <div class="${css.headerAvatar}">
          <div class="${css.headerAvatarImg}">
              <img alt="Rick" src="${rickAvatar}">
          </div>
          <div class="${css.userSettings}">
            {{> typography tag="h3" text="Rick"}}
            <div class="${css.lastMessage}">8 minutes ago</div>
          </div>
        </div>
        <div>
          <button class="${css.button} ${css.buttonIcon}">${voiceIcon}</button>
          <button class="${css.button} ${css.buttonIcon}">${videoIcon}</button>
        </div>
      </div>
    </div>
    <!-- messenger board -->
    <div class="${css.boardWrapper}">
      <div class="${css.boardContainer}">
        <div class="${css.board}">
          <div class="${css.dividerWrapper}">
              <span class="${css.divider}">October 23 2022</span>
          </div>
          
          <div class="${css.messageBoxLeft}">
            <div class="${css.headerAvatarImg}">
              <img alt="Morty" src="${mortyAvatar}">
            </div>
            <div class="${css.boardMessage} ${css.boardUserMessage}">
              <div class="${css.paperUserMessage}">
                Hi. Can you send me the missing invoices?
              </div>
              <div class="${css.timeAgo}">
                ${clockIcon} 5 days ago
              </div>
            </div>
          </div>
          
          <div class="${css.messageBoxRight}">
            <div class="${css.boardMessage}">
              <div class="${css.paperUserMessage} ${css.paperMessage}">
                Yes, I'll email them right now. I'll let you know once the remaining invoices are done.
              </div>
              <div class="${css.timeAgo}">
                ${clockIcon} 5 days ago
              </div>
            </div>
            <div class="${css.headerAvatarImg}">
              <img alt="Rick" src="${rickAvatar}">
            </div>
          </div>
          
          <div class="${css.dividerWrapper}">
              <span class="${css.divider}">October 21 2022</span>
          </div>
          
          <div class="${css.messageBoxRight}">
            <div class="${css.boardMessage}">
              <div class="${css.paperUserMessage} ${css.paperMessage}">
                Hey! Are you there?
              </div>
              <div class="${css.paperUserMessage} ${css.paperMessage} ${css.padding}">
                Heeeelloooo????
              </div>
              <div class="${css.timeAgo}">
                ${clockIcon} 3 days ago
              </div>
            </div>
            <div class="${css.headerAvatarImg}">
              <img alt="Rick" src="${rickAvatar}">
            </div>
          </div>
          
          <div class="${css.dividerWrapper}">
              <span class="${css.divider}">Today</span>
          </div>
          
          <div class="${css.messageBoxLeft}">
            <div class="${css.headerAvatarImg}">
              <img alt="Morty" src="${mortyAvatar}">
            </div>
            <div class="${css.boardMessage} ${css.boardUserMessage}">
              <div class="${css.paperUserMessage}">
                Hey there!
              </div>
              <div class="${css.paperUserMessage} ${css.padding}">
                How are you? Is it ok if I call you?
              </div>
              <div class="${css.timeAgo}">
                ${clockIcon} 6 minutes ago
              </div>
            </div>
          </div>
          
          <div class="${css.messageBoxRight}">
            <div class="${css.boardMessage}">
              <div class="${css.paperUserMessage} ${css.paperMessage}">
                Hello, I just got my Amazon order shipped and I’m very happy about that.
              </div>
              <div class="${css.paperUserMessage} ${css.paperMessage} ${css.padding}">
                Can you confirm?
              </div>
              <div class="${css.timeAgo}">
                ${clockIcon} 8 minutes ago
              </div>
            </div>
            <div class="${css.headerAvatarImg}">
              <img alt="Rick" src="${rickAvatar}">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- send message -->
    <form class="${css.sendMessageFormWrapper}">
      <div class="${css.sendMessageFormContainer}">
      <div class="${css.messageImg}">
        <img alt="Morty" src="${mortyAvatar}">
      </div>
      {{> vr}}
      <div class="${css.messageFieldContainer}">
        {{{message}}}
      </div>
      <button class="${css.button} ${css.buttonIcon}" type="button">
      ${pinIcon}
      </button>
      {{> vr}}
      {{{button}}}
      </div>
    </form>
  `;
}
