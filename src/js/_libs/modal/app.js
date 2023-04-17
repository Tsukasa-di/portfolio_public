import { DOM } from "../../global/dom";
import { AUDIOS, INST, STATUS, TL } from "../../global/objects";
import { OP } from "../operator/app";

export class Modal {
  constructor(triggers) {
    this.triggers = triggers;
    this.dom = {};
    this.vals = {
      target: 0,
      current: 0
    };
    this.event = event => {
      event.target.classList.value.includes('MENU') ? this._menuSet() : this._modalSet(event);
    }
  }

  init() {
    this._domSet();
    this._click('on');
  }

  update() {
    this._domSet();
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
      this._scrollTop();
      setTimeout(() => {
        DOM.body.classList.remove('STATUS_' + name + '_OPEN');
        DOM.body.classList.add('STATUS_' + name + '_CLOSE'); 
      }, name == 'MODAL' ? 300 : 0);
      TL.start.resume();
      TL.end.resume();
      if (STATUS.audio.active) INST.bgmMaster.unreverb();
      if (STATUS.audio.active) INST.bgmMaster.volumeUp();
      if (STATUS.page == 'home') STATUS.cursor.light = true;
      else STATUS.cursor.light = false;

    } else {
    // 開く時の処理

      STATUS.modal.active = true;
      DOM.body.classList.remove('STATUS_' + name + '_CLOSE');
      DOM.body.classList.add('STATUS_' + name + '_OPEN');
      TL.start.pause();
      TL.end.pause();
      if (STATUS.modal.type == 'menu') if (STATUS.audio.active) AUDIOS.menu.play();
      if (STATUS.audio.active) INST.bgmMaster.reverb();
      if (STATUS.audio.active) INST.bgmMaster.volumeDown();
    } 
  }

  _scrollTop() {
    this.vals.target = 0;
    this.vals.current = this.dom.modalInner.scrollTop;
    const inst = this;

    function animate() {
      inst.vals.current += (inst.vals.target - inst.vals.current) * 0.3;
      inst.dom.modalInner.scroll(0, inst.vals.current);
      if (inst.vals.current >= inst.vals.target + 1) requestAnimationFrame(animate);
    }

    animate();
  }
}
