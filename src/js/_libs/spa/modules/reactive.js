import { DOM } from "../../../global/dom";
import { INST, LOCATION, STATUS } from "../../../global/objects";
import { OP } from "../../operator/node";

export class Reactive {
  constructor() {
    this.from = {
      page: ''
    }
    this.to = {
      page: ''
    }
  }

  init() {
    window.addEventListener('popstate', () => {
      location.reload();
    });
    DOM.TRIGGERS.spa.forEach( trigger => {
      OP.node.on(trigger, 'click', event => {
        this.from.page = STATUS.page;
        this.to.page = event.target.dataset.page;
        this._change();
        this._path();
      });
    });
  }

  _replace() {
    DOM.GLOBAL_WRAP.CONTENTS.inner.innerHTML = INST.spa.docs[this.to.page].querySelector('#CONTENTS .inner').innerHTML;
    DOM.title.innerHTML = INST.spa.docs[this.to.page].querySelector('head title').innerHTML;
    if (STATUS.modal.active) INST.modal.toggle('MENU');
  }

  _change() {
    DOM.GLOBAL_WRAP.CONTENTS.mask.style.opacity = 1;
    setTimeout(() => {
      this._replace();
      this._update();
      this._finish();
    }, 700);
  }

  _update() {
    this.to.page == 'home' ? STATUS.cursor.light = true : STATUS.cursor.light = false;
    INST.modal.update();
    INST.cursor.update();
    this._classFix();
  }

  _classFix() {
    const removes = [];
    const addes = [];
    if (this.from.page == 'home') {
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
