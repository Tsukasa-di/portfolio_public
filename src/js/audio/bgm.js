import * as Tone from 'tone';
import { STATUS } from '../global/objects';
import { SCREEN } from '../global/screen';

export class BgmMaster {
  constructor() {
    this.player = '';
    this.effector = {};
    this.vols = {
      current: -5,
      max: -5,
      min: -25,
      muted: -50
    };
    this.speed = {
      default: 0.08
    };
    this.requestAnimeIds = [];
    this.count = 0;
    this.status = {
      reverb: false
    }
  }

  init() {
    return new Promise( resolve => {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.player = new Tone.Player({
        url: "assets/audios/bgm.mp3",
        loop: true,
        fadeOut: 3,
        fadeIn: 3,
        volume: this.vols.max,
        onload: () => { resolve(true); }
      }).toDestination();
      this.effector.reverb = new Tone.Freeverb(0.3, 1500).toDestination();
      this.player.replay
    });
  }

  play() {
    this.player.start();
  }

  unplay() {
    this.player.volume.value = this.vols.muted;
    this.vols.current = this.vols.muted;
    this.player.mute = true;
  }

  pause() {
    this.volumeDown(this.vols.muted, this.speed.default, () => {
      this.player.mute = true;
    });
  }

  replay() {
    function unMute() { 
      this.player.mute = false; 
    };
    if (this.status.reverb) this.volumeUp(this.vols.min, this.speed.default, unMute.bind(this));
    else this.volumeUp(this.vols.max, this.speed.default, unMute.bind(this));
  }

  reverb() { if (!SCREEN.MINI()) {
    setTimeout(() => { this.player.connect(this.effector.reverb); }, 300);
    if (STATUS.audio.active) this.volumeDown();
    this.status.reverb = true;
  } }

  unreverb() { if (!SCREEN.MINI()) {
    setTimeout(() => { this.player.disconnect(this.effector.reverb); }, 300);
    if (STATUS.audio.active) this.volumeUp();
    this.status.reverb = false;
  } }

  volumeDown(target = this.vols.min, speed, resolve = () => {}) {
    STATUS.audio.direction = 'down';
    this._volumeChange('down', target, speed, resolve);
  }

  volumeUp(target = this.vols.max, speed, resolve = () => {}) {
    STATUS.audio.direction = 'up';
    this._volumeChange('up', target, speed, resolve);
  }

  _volumeChange(type, target, speed = this.speed.default, resolve = () => {}) {
    function animate() {
      this.vols.current += (target - this.vols.current) * speed;
      this.player.volume.value = this.vols.current;
      if (type == 'up') {
        if (this.vols.current <= target - 0.1 && STATUS.audio.direction == 'up') {
          requestAnimationFrame(animate.bind(this));
        } else resolve();
      } else {
        if (this.vols.current >= target + 0.1 && STATUS.audio.direction == 'down') {
          requestAnimationFrame(animate.bind(this));
        } else resolve();
      }
    }
    animate.bind(this)(); 
  }
}
