import * as Tone from 'tone';
import { STATUS } from '../global/objects';

export class BgmMaster {
  constructor() {
    this.player = '';
    this.effector = {};
    this.vals = {
      currentVolume: -5,
      maxVolume: -5,
      minVolume: -25
    };
    this.requestAnimeIds = [];
    this.count = 0;
  }

  init() {
    return new Promise( resolve => {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      this.player = new Tone.Player({
        url: "assets/audios/bgm.mp3",
        loop: true,
        volume: this.vals.maxVolume,
        onload: () => { resolve(true); }
      }).toDestination();
      this.effector.reverb = new Tone.Freeverb(0.3, 1500).toDestination();
      if (STATUS.page != 'home') this.vals.maxVolume = this.vals.currentVolume = -15;
    });
  }

  reverb() {
    setTimeout(() => { this.player.connect(this.effector.reverb); }, 0.6);
  }

  unreverb() {
    setTimeout(() => { this.player.disconnect(this.effector.reverb); }, 0.6);
  }

  play() {
    Tone.loaded().then(() => {
      this.player.start();
    }); 
  }

  volumeDown() {
    STATUS.audio.volume = 'down';
    this._volumeChange('down', this.vals.minVolume);
  }

  volumeUp() {
    STATUS.audio.volume = 'up';
    this._volumeChange('up', this.vals.maxVolume);
  }

  _volumeChange(type, target) {
    function animate() {
      this.vals.currentVolume += (target - this.vals.currentVolume) * 0.1;
      this.player.volume.value = this.vals.currentVolume;
      if (type == 'up') if (this.vals.currentVolume <= target - 0.1 && STATUS.audio.volume == 'up') {
        requestAnimationFrame(animate.bind(this));
      }
      if (type == 'down') if (this.vals.currentVolume >= target + 0.1 && STATUS.audio.volume == 'down') {
        requestAnimationFrame(animate.bind(this));
      }
    }
    animate.bind(this)(); 
  }
}
