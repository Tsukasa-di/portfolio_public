import { DOM } from "../../../global/dom";
import { INST, LOCATION, STATUS } from "../../../global/objects";
import { fixScale } from "../../operator/fixScale";
import { OP } from "../../operator/node";
import { ScrollTop } from "../../operator/scroll";

export class Reactive {
  constructor() {
    this.from = {
      page: ''
    }
    this.to = {
      page: ''
    },
    this.scrollTop = new ScrollTop(DOM.GLOBAL_WRAP);
  }

  init() {
    window.addEventListener('popstate', () => {
      location.reload();
    });
    this.scrollTop.scroll();
    this._registor('on');
  }

  _registor(type) {
    DOM.TRIGGERS.spa.forEach( trigger => {
      OP.node[type](trigger, 'click', event => {
        this.from.page = STATUS.page;
        this.to.page = event.target.dataset.page;
        this._change();
        this._path();
      });
    });
  }

  _replace() {
    DOM.GLOBAL_WRAP.CONTENTS.inner.innerHTML = INST.spa.docs[this.to.page].querySelector('#CONTENTS .inner').innerHTML;
    DOM.UI.MODAL.inner.innerHTML = INST.spa.docs[this.to.page].querySelector('#MODAL > .inner').innerHTML;
    DOM.title.innerHTML = INST.spa.docs[this.to.page].querySelector('head title').innerHTML;
    if (STATUS.modal.active) INST.modal.toggle('MENU');
  }

  _change() {
    DOM.GLOBAL_WRAP.CONTENTS.mask.style.opacity = 1;
    this.scrollTop.scroll();
    setTimeout(() => {
      this._replace();
      this._update();
      this._finish();
    }, 1000);
  }

  _update() {
    this.to.page == 'home' ? STATUS.cursor.light = true : STATUS.cursor.light = false;
    DOM.set();
    fixScale();
    INST.modal.update();
    INST.cursor.update();
    this._registor('off');
    this._registor('on');
    this._classFix();
  }

  _classFix() {
    const removes = [];
    const addes = [];
    if (this.from.page != this.to.page) { { if (this.from.page == 'home') {
      removes.push(this.from.page.toUpperCase());
      addes.push(this.to.page.toUpperCase());
      addes.push('SINGLE');
    } else if (this.from.page != 'home' && this.to.page != 'home') {
      removes.push(this.from.page.toUpperCase());
      addes.push(this.to.page.toUpperCase());
    } else {
      removes.push(this.from.page.toUpperCase());
      removes.push('SINGLE');
      addes.push(this.to.page.toUpperCase());
    }
    removes.forEach( remove => { DOM.body.classList.remove(remove) });
    addes.forEach( add => { DOM.body.classList.add(add) });
    } }
  }

  _finish() {
    STATUS.page = this.to.page;
    DOM.GLOBAL_WRAP.CONTENTS.mask.style.opacity = 0;
  }

  _path() {
    if (this.to.page == 'home') history.pushState(null, 'title', LOCATION.origin + '/');
    else history.pushState(null, 'title', LOCATION.origin + '/' + this.to.page + '.html');
  }
}
