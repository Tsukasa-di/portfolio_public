import { AUDIOS } from "../../modules/global/variables";
import { Typing } from "../animations/typing/_app";
import { setTrigger } from "./setTrigger";

export class Modal {
  constructor(param={}, dom={triggers: {}}) {
    // setting.jsの受け取り
    // ------------------------------------------
    this.DOM = dom ? dom : {};
    this.PARAM = param;

    // 初期化
    // ------------------------------------------
    this.EVENT = {};
    this.STATUS = {
      type: null,
      targetModal: null,
      currentScroll: 0
    };
    this.TARGET = null;
    this.TYPE = {
      target: document.querySelector('.cursor .type p'),
      instance: new Typing(
        document.querySelector('.cursor .type p'),
        [AUDIOS.typeWriting]
      )
    }

    // DOM定義
    // ------------------------------------------
    this.DOM.body = document.body;
    this.DOM.wrap = dom.wrap ? document.querySelector(dom.wrap) : document.querySelector('.MODULES-modal');
    this.DOM.content = dom.content ? document.querySelector(dom.content) : document.querySelector('.modal-content');
    this.DOM.triggers.open = dom.triggers.open ? document.querySelectorAll(dom.triggers.open) : document.querySelectorAll('.modal-trigger-open');
    this.DOM.triggers.close = dom.triggers.close ? document.querySelectorAll(dom.triggers.close) : document.querySelectorAll('.modal-trigger-close, .modal-mask');

    // PARAM定義
    // ------------------------------------------
    this.PARAM.duration = param.duration ? param.duration : 700;

    // 処理の実行
    // ------------------------------------------
    this.eventType = window.ontouchstart ? 'touchstart' : 'click';
    setTrigger.bind(this)();
  }
}
