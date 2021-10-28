import { composer } from "../_app";

export class Toggle {
  constructor(sound) {
    this._sound = sound;
    this._counter = 0;
  }

  add(type) {
    composer.effect.addPass(composer.effects[type]);
    if (this._sound) this._sound.play();
  }

  remove(type) {
    composer.effect.removePass(composer.effects[type]);
    if (this._sound) this._sound.pause();
    this._counter++;
    if (this._counter % 6 === 0) {
      if (this._sound) this._sound.currentTime = 0;
      console.log('%creset glitch audio.', 'color: blue;');
    }
  }

  soundOff() {
    if (this._sound) this._sound.pause();
  }

  soundOn() {
    if (this._sound) this._sound.play();
  }
}
