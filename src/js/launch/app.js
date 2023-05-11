import { DOM } from "../global/dom";
import { Loading } from "./modules/loading";
import { _load } from "./modules/load";
import { _loadChecker } from "./modules/loadChecker";
import { _prepare } from "./modules/prepare";
import { STATUS } from "../global/objects";
import { fixScale } from "../_libs/operator/fixScale";

export class Launch {
  constructor() {
    this.status = {
      sound: false,
      audio: false,
      spa: false,
      instances: false
    };
    this.progress = 0;
    this.dom = {};
  }

  init() {
    new Promise( resolve => {
      STATUS.page = _currentPage();
      STATUS.page == 'home' ? STATUS.cursor.light = true : STATUS.cursor.light = false;
      DOM.init(resolve);
      fixScale();
    })
      .then( log => { 
        new Loading(this, () => { this._finish(); }).init();
        return _load(this);
      })
      .then( log => { 
        return _prepare() 
      })
  }

  _finish() {
    DOM.LOADING.style.opacity = 0;
    DOM.LOADING.style.pointerEvents = 'none';
    DOM.LOADING.style.transition = 'all 1.2s';
    DOM.OPENING.style.transition = 'all ease-in 2.0s';
    DOM.OPENING.button.style.transition = 'all 0.7s';
    DOM.GLOBAL_WRAP.style.transition = 'all 1.2s';
    DOM.BG.style.transition = 'all 1.2s';
  }
}

function _currentPage() {
  if (window.location.pathname == '/') {
    return 'home';
  } else {
    let now = '';
    now = window.location.pathname;
    now = now.split('/')[1];
    now = now.split('.')[0];
    return now;
  }
}
