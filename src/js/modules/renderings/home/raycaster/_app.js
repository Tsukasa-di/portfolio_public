import { AUDIOS, SCREEN } from "../../../global/variables";
import { story } from "./story";

let val = 0.0004;
const DOM = {
  canvasMask: null,
  ui: null,
  story: null,
  escape: null
};

export const intersect = {
  init() {
    DOM.canvasMask = document.querySelector('#canvas-mask');
    DOM.ui = document.querySelector('.ui');
    DOM.story = document.querySelector('.story');
    DOM.escape = document.querySelector('.escape');
    story.init();
  },
  on(INTERSECTED) {
    onActions();
  },
  off(INTERSECTED) {
    offActions();
  }
}

const status = {
  camera: {
    zoomin: false,
    zoomout: false
  },
  type: false
}

function onActions() {
  status.camera.zoomout = true;
  status.camera.zoomin = false;

  AUDIOS.bgm.volume = 0.2;
  AUDIOS.whisperNoize.volume = 0.03;
  AUDIOS.glitchRadio.volume = 0.12;
  AUDIOS.glitchRadio.play();
  if (!SCREEN.TABLET()) AUDIOS.whisperNoize.play();
  AUDIOS.lifeSounds.public.play();
  val = -0.005;

  DOM.canvasMask.style.opacity = .65;
  DOM.ui.style.opacity = .1;
  DOM.escape.style.opacity = 1;

  status.type = true;
  DOM.story.style.opacity = 1;
}

function offActions() {
  status.camera.zoomout = false;
  status.camera.zoomin = true;

  AUDIOS.bgm.volume = 0.5;
  AUDIOS.whisperNoize.volume = 0.15;
  AUDIOS.glitchRadio.volume = 0.8;
  AUDIOS.glitchRadio.pause();
  if (!SCREEN.TABLET()) AUDIOS.whisperNoize.pause();
  AUDIOS.lifeSounds.public.pause();
  val = 0.0004;

  DOM.canvasMask.style.opacity = .25;
  DOM.ui.style.opacity = 1;
  DOM.escape.style.opacity = 0;

  status.type = false;
  DOM.story.style.opacity = 0;
}

export { status, val, onActions };
