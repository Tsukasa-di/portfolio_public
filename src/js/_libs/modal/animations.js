import { AUDIOS, STATUS } from "../../modules/global/variables";
import { RENDERING } from "../../modules/renderings/_app";
import { promise } from "../async/promise";

let canvasMask, slider;

export const animations = {
  async open(Modal, event, finish) {
    await promise( resolve => {
      this.setOpen();
      Modal.TYPE.target.style.transition = '0s';
      Modal.TYPE.target.style.opacity = 1;
      AUDIOS.typeWriting.volume = 0.5;
      Modal.TYPE.instance.set('Access work [' + event.target.querySelector('h2').innerText + ']...');
      Modal.TYPE.instance.animate('async', 5, resolve);
    });
    await promise( resolve => {
      AUDIOS.typeWriting.volume = 0.7;
      Modal.TYPE.target.style.transition = '.5s';
      setTimeout(() => {
        Modal.TYPE.target.style.opacity = 0;
        resolve();
      }, 400);
    });
    await promise( () => {
      Modal.TYPE.instance.reseter();
      AUDIOS.typeWriting.currentTime = 0;
      AUDIOS.ui.rollover.play();
      finish();
    });
  },
  async close(Modal, event, finish) {
    await promise( () => {
      this.setClose();
      canvasMask.style.opacity = .25;
      slider.style.opacity = .7;
      finish();
    });
  },
  setOpen() {
    const transition = '2.5s';
    canvasMask = document.querySelector('#canvas-mask');
    slider = document.querySelector('.MODULES-slider');
    canvasMask.style.transition = transition;
    slider.style.transition = transition;
    canvasMask.style.opacity = .5;
    slider.style.opacity = .1;
    STATUS.render.works = false;
  },
  setClose() {
    setTimeout(() => {
      const transition = '1.0s';
      canvasMask.style.transition = transition;
      slider.style.transition = transition;
    }, 2500);
    STATUS.render.works = true;
    RENDERING.works();
  }
}
