import { AUDIOS, INST, STATUS } from "../global/objects";

export class AudioMaster {
  constructor() {
    this.rootPath = 'assets/audios/';
  }

  init() {
    this._set();
  }

  play() {
    if (STATUS.audio.active) INST.bgmMaster.play();
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
}
