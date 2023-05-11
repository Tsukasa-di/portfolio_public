import { DOM } from "../../global/dom";
import { AUDIOS, INST, STATUS, TL } from "../../global/objects";
import { OP } from "../operator/node";
import { ScrollTop } from "../operator/scroll";

export class Modal {
  constructor(triggers) {
    this.triggers = triggers;
    this.dom = {};
    this.scrollTop = '';
    this.event = event => {
      event.target.classList.value.includes('MENU') ? this._menuSet() : this._modalSet(event);
    },
    this._wheelCancel = {
      cancel(e) {
        e.preventDefault();
      },
      eventName: '',
      add(name) {
        if (name == 'MENU') OP.node.on(DOM.body, this.event, this.cancel, false);
      },
      remove(name) {
        if (name == 'MENU') OP.node.off(DOM.body, this.event, this.cancel, false);
      }
    }
  }

  init() {
    this._wheelCancel.event = 'onmousewheel' in document ? 'mousewheel' : 'onwheel' in document ? 'wheel' : 'DOMMouseScroll';
    this._domSet();
    this.scrollTop = new ScrollTop(this.dom.modalInner);
    this._click('on');
  }

  update() {
    this._domSet();
    this.scrollTop = new ScrollTop(this.dom.modalInner);
    this._click('off');
    this._click('on');
  }

  _click(type) {
    this.dom.buttons.forEach( el => {
      OP.node[type](el, 'click', this.event);
    });
  }

  _domSet() {
    this.dom.buttons = OP.node.qsAll(this.triggers);
    this.dom.modals = OP.node.qsAll('.modal');
    this.dom.modalInner = OP.node.qs('#MODAL > .inner');
  }

  _menuSet() {
    this.toggle('MENU');
  }

  _modalSet(event) {
    const name = event.target.dataset.modal;
    const targetModal = OP.node.qs('#' + name);
    if (!name) this.toggle('MODAL');
    else if (targetModal) {
      this.dom.modals.forEach( modal => {
        modal.style.display = 'none';
      });
      targetModal.style.display = 'block';
      this.toggle('MODAL');
    }
  }

  toggle(name = 'MENU') {
    STATUS.modal.type = name.toLowerCase();

    if (DOM.body.classList.value.includes('STATUS_' + name + '_OPEN')) {
    // 閉じる時の処理

      STATUS.modal.active = false;
      this.scrollTop.scroll();
      setTimeout(() => {
        DOM.body.classList.remove('STATUS_' + name + '_OPEN');
        DOM.body.classList.add('STATUS_' + name + '_CLOSE'); 
      }, name == 'MODAL' ? 700 : 0);
      TL.start.resume();
      TL.end.resume();
      INST.bgmMaster.unreverb();
      if (STATUS.page == 'home') STATUS.cursor.light = true;
      else STATUS.cursor.light = false;
      this._wheelCancel.remove(name);

    } else {
    // 開く時の処理

      STATUS.modal.active = true;
      DOM.body.classList.remove('STATUS_' + name + '_CLOSE');
      DOM.body.classList.add('STATUS_' + name + '_OPEN');
      TL.start.pause();
      TL.end.pause();
      if (STATUS.modal.type == 'menu') if (STATUS.audio.active) AUDIOS.menu.play();
      INST.bgmMaster.reverb();
      this._wheelCancel.add(name);
      
    }
  }
}
