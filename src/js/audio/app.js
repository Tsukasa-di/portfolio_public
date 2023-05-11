import { OP } from "../_libs/operator/node";
import { DOM } from "../global/dom";
import { AUDIOS, INST, STATUS } from "../global/objects";

export class AudioMaster {
  constructor() {
    this.rootPath = 'assets/audios/';
    this.dom = {};
    this.status = {
      bgm: false
    }
  }

  init() {
    return new Promise( resolve => {
      this._set();
      this.dom.selector = {};
      this.dom.selector.on = OP.node.qs('.sound-on', DOM.UI.MENU);
      this.dom.selector.off = OP.node.qs('.sound-off', DOM.UI.MENU);
      this._event();
      resolve(true);
    });
  }

  play() {
    INST.bgmMaster.play();
    if (!STATUS.audio.active) INST.bgmMaster.unplay();
  }

  pause() {
    STATUS.audio.active = false;
    INST.bgmMaster.pause();
  }

  replay() {
    STATUS.audio.active = true;
    INST.bgmMaster.replay(); 
  }

  _set() {
    const hover = new Audio(this.rootPath + 'hover.mp3');
    hover.volume = 0.5;
    AUDIOS.hover = hover;

    const click = new Audio(this.rootPath + 'click.mp3');
    click.volume = 0.9;
    AUDIOS.click = click;

    const menu = new Audio(this.rootPath + 'menu.mp3');
    menu.volume = 0.5;
    AUDIOS.menu = menu;
  }

  _event() {
    [this.dom.selector.on, this.dom.selector.off].forEach( el => {
      OP.node.on(el, 'click', event => {
        if (event.target.dataset.sound == 'on') {
          this.dom.selector.on.style.pointerEvents = 'none';
          this.dom.selector.on.style.opacity = 0;
          this.dom.selector.off.style.pointerEvents = 'visible';
          this.dom.selector.off.style.opacity = 1;
          DOM.body.classList.remove('SOUND_ON');
          DOM.body.classList.add('SOUND_OFF');
          this.pause();
        } else {
          this.dom.selector.off.style.pointerEvents = 'none';
          this.dom.selector.off.style.opacity = 0;
          this.dom.selector.on.style.pointerEvents = 'visible';
          this.dom.selector.on.style.opacity = 1;
          DOM.body.classList.remove('SOUND_OFF');
          DOM.body.classList.add('SOUND_ON');
          this.replay();
        };
      });
    });
  }
}
