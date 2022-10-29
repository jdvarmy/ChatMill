import cover from '../../../../static/images/1.jpg';
import avatar from '../../../../static/images/avatars/2.jpg';
import css from '../profile.css';

export default function detailsHbs(): string {
  return `
    <div class="${css.detailsCoverWrapper}">
      <div class="${css.detailsCover}" style="background-image: url(${cover});"></div>
      <div class="${css.inputWrapper}">
        <input accept="image/*" type="file" style="display: none;">
        {{{button}}}
      </div>
    </div>
    <div class="${css.detailsAvatarWrapper}">
      <div class="${css.detailsAvatar}">
        <img alt="Morty" src="${avatar}" class="${css.detailsAvatarImg}">
      </div>
      <div class="${css.changeAvatar}">
        <input accept="image/*" type="file" style="display: none;">
          <span class="${css.button} ${css.changeAvatarButton}">
            <svg class="${css.avatarSvg}" viewBox="0 0 24 24">
              <path d="M9.83 8H11v6h2V8h1.17L12 5.83z"></path>
              <path d="m12 3-7 7h4v6h6v-6h4l-7-7zm1 5v6h-2V8H9.83L12 5.83 14.17 8H13zM5 18h14v2H5z"></path>
            </svg>
            <span class="MuiTouchRipple-root css-8je8zh-MuiTouchRipple-root"></span>
          </span>
      </div>
    </div>
    <div class="${css.bioWrapper}">
        {{> typography tag="h4" text="Morty"}}
        {{> typography tag="p" text="The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veldt fox. Bright vixens jump; dozy fowl quack. Quick wafting zephyrs vex bold Jim. Quick zephyrs blow, vexing daft Jim. Sex-charged fop blew my junk TV quiz. How quickly daft jumping zebras vex. Two driven jocks help fax my big quiz. Quick, Baz, get my woven flax jodhpurs! Now fax quiz Jack! my brave ghost pled. Five quacking zephyrs jolt my wax bed. Flummoxed by job, kvetching W. zaps Iraq. Cozy sphinx waves quart jug of bad milk. A very bad quack might jinx zippy fowls. Few quips galvanized the mock jury box. Quick brown dogs jump over the lazy fox. The jay, pig, fox, zebra, and my wolves quack! Blowzy red vixens fight for a quick jump. Joaquin Phoenix was gazed by MTV for luck."}}
    </div>
  `;
}
