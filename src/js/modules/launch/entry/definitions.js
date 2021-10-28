import { RENDERING } from "../../renderings/_app";
import { STATUS, AUDIOS } from "../../global/variables";
import { SPA } from "../../transition/spa/_app";
import { setAudios } from "./setAudios";
import { currentRootDir } from "../../../_libs/processing/currentRootDir";
import { PAGES } from "../../pages/_app";
import { CTRL } from "../../../controllers/_app";
import { menu } from "../../global/menu";

const dom = {
  checker: document.querySelector('.entry p.button'),
  checkerBg: document.querySelector('.entry'),
  global: document.querySelector('.GLOBAL'),
  contents: document.querySelector('.CONTENTS'),
  canvas: document.querySelector('.CANVAS'),
  nowLoading: document.querySelector('.now-loading')
}

const events = {
  mouseenter() {
    dom.checker.style.color = '#ffffff';
    dom.checker.style.borderColor = '#ffffff';
    dom.checkerBg.style.backgroundColor = '#000000';
  },
  mouseleave() {
    dom.checker.style.color = '#000000';
    dom.checker.style.borderColor = '#000000';
    dom.checkerBg.style.backgroundColor = '#ffffff';
  },
  click() {
    dom.checker.style.pointerEvents = 'none';
    dom.checkerBg.style.transition = '2.0s';
    dom.checkerBg.style.opacity = 0;
    dom.checkerBg.style.pointerEvents = 'none';
    dom.global.style.pointerEvents = 'none';
    setAudios();
    SPA.init();
    PAGES[currentRootDir()].init();
    menu.init(document.querySelector('.MODULES-menu .button'));
    if (currentRootDir() != 'home') {
      if (CTRL.audios.bgm) AUDIOS.bgm.play();
      STATUS.home.opening = false;
      STATUS.render[currentRootDir()] = true;
      RENDERING[currentRootDir()]();
    }
    setTimeout(() => {
      dom.checkerBg.style.display = 'none';
    }, 2000);
  }
}

const trans = '1.2s';

function init() {
  dom.checker.style.pointerEvents = 'none';
  setTimeout(() => {
    dom.checker.style.pointerEvents = 'visible';
  }, 1200);
  dom.checkerBg.style.opacity = 1;
}

export { dom, events, trans, init };
