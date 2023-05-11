import { SCREEN } from "../global/screen";
import { gsap, STATUS, TL } from "../global/objects";
import { createObjects } from "./modules/creators";
import { Animate } from "./modules/animate";
import { DOM } from "../global/dom";

export class StageOperator {
  constructor() {
    this.objects = '';
    this.vals = {
      objectTotal: 0,
      currentRepeatTime: 1
    }
    this.props = {
      left: 0
    }
    this.color = 'red';
    this.default = {
      AREA: {
        scale: 2,
        rotate: -200,
        width: SCREEN.TABLET() ? '60%' : '25%'
      }
    }
  }

  init() {
    this._setting();
  }

  animate() {
    TL.start = gsap.timeline({repeat: -1, repeatDelay: 3.5, delay: 1.2});
    TL.end = gsap.timeline({repeat: -1, repeatDelay: 3.5, delay: 1.2});
    new Animate().init();
  }

  _setting() {
    // 画面サイズによって objectTotal の数を変更
    if (SCREEN.TABLET()) this.vals.objectTotal = 15;
    else this.vals.objectTotal = 30;

    // gsapの設定
    gsap.set(DOM.BG.AREA, this.default.AREA);
    if (STATUS.page != 'home') this.default.AREA.width = ( SCREEN.TABLET() ? '60%' : '30%' );

    // Creating
    createObjects();
  }
}
