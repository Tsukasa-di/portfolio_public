import { INST, STATUS, TL, gsap } from "../../global/objects";
import { CULC } from "../../_libs/culc/app";
import { SCREEN } from "../../global/screen";
import { DOM } from "../../global/dom";

export class Animate {
  constructor() {
    /**
     * カラー再設定用のリスト
     * @type {array}
     */
    this.colorList = ['red', 'red', 'green', 'yellow'];
    this._common = num => {
      TL.start.from(INST.stageOperator.objects[num], {
        duration: 2.0,
        ease: 'power1.inOut',
        opacity: 0,
        width: '600px'
      }, '-=1.7');
    }
    this._last = () => {
      TL.start.to('#AREA .child', {
        duration: 1,
        opacity: 0,
        ease: 'power1.inOut',
        stagger: {
          from: "random",
          amount: 1
        }
      });
      TL.start.call(() => {
        this._complete();
      });
    }
  }

  /**
   * 初期化処理
   */
  init() {
    for (let i = 0; i < INST.stageOperator.objects.length; i++) {
      this._common(i);
      if (i == INST.stageOperator.objects.length-1) this._last();
    }
    this._calls();
  }
  
  /**
   * タイムライン進行中の call 処理
   */
  _calls() {
    TL.start.call(
      () => {
        TL.start.timeScale(0.1);
      },
      null,
      SCREEN.TABLET() ? 2 : 3
    );
  
    TL.start.call(
      () => {
        if (STATUS.page == 'home') gsap.to(DOM.GLOBAL_WRAP.AREA, {
          duration: 2.0,
          scale: 20,
          rotate: -110
        });
        TL.start.timeScale(0.3);
      },
      null,
      SCREEN.TABLET() ? 2.3 : 3.3
    );
  
    TL.start.call(
      () => {
        TL.start.timeScale(1.5);
        if (STATUS.page == 'home') gsap.to(DOM.GLOBAL_WRAP.AREA, {
          duration: 3.5,
          scale: 2.5,
          rotate: -20,
          width: SCREEN.TABLET() ? '60%' : '28%'
        });
      },
      null,
      SCREEN.TABLET() ? 2.4 : 3.4
    );
  
    TL.start.call(
      () => {
        if (!SCREEN.TABLET()) TL.start.timeScale(2);
      },
      null,
      SCREEN.TABLET() ? 4 : 5,
    );
  }

  /**
   * タイムライン終了後の処理
   */
  _complete() {
    if (STATUS.page != 'home') INST.stageOperator.default.AREA.width = '30%';
    gsap.set(DOM.GLOBAL_WRAP.AREA, INST.stageOperator.default.AREA);
    INST.stageOperator.vals.currentRepeatTime++;
    if (INST.stageOperator.vals.currentRepeatTime == 3) INST.stageOperator.color = 'yellow';
    else if (INST.stageOperator.vals.currentRepeatTime == 2) INST.stageOperator.color = 'green';
    else if (INST.stageOperator.vals.currentRepeatTime == 1) INST.stageOperator.color = 'red';
    else INST.stageOperator.color = this.colorList[Math.floor(Math.random() * 4)];
    this._color();
  }

  /**
   * カラーの再設定
   */
  _color() {
    for (let i = 0; i < INST.stageOperator.objects.length; i++) { 
      INST.stageOperator.objects[i].style.backgroundColor = CULC.getRGBColor(INST.stageOperator.color, 206, 30);
    }
  }
}
