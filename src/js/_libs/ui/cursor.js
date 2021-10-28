import { AUDIOS, SCREEN } from "../../modules/global/variables";

export class Cursor {
  constructor() {
    this.DOM;
    this.vals = {
      target: {
        bottom: 0,
        left: 0
      },
      current: {
        bottom: 0,
        left: 0
      }
    };
    this.eventType = window.ontouchstart ? 'touchstart' : 'click';
  }

/*
  this.DOMのサンプル
  DOM = {
    UI: document.querySelector('.MODULES-cursor'),
    cursor: document.querySelector('.MODULES-cursor .cursor'),
    hovers: document.querySelectorAll('.CURSOR--hover'),
    pointer: document.querySelector('.MODULES-cursor .pointer'),
    pointerWrap: document.querySelector('.MODULES-cursor .pointer-wrap'),
  };
*/

  init(DOM) {
    this.DOM = DOM;
    document.body.style.cursor = 'none';
    this.DOM.UI.style.opacity = 1;
    this._hover();
    this._click();
    this._transform.bind({ m: this, size: 1.0, opacity: .9, color: '#fff' })();
  }

  addClass(targets, className) {
    targets.forEach( el => {
      el.classList.add(className);
    });
  }

  _hover() {
    if (this.DOM.hovers) {
      this.DOM.hovers.forEach(el => {
        el.addEventListener('mouseenter', this._transform.bind({ m: this, size: 1.85, opacity: .2, color: '#CF70CB' }));
        el.addEventListener('mouseleave', this._transform.bind({ m: this, size: 1.0, opacity: .9, color: '#fff' }));
      });
    }
  }

  _transform() {
    this.m.DOM.pointer.style.backgroundColor = this.color;
    this.m.DOM.pointer.style.opacity = this.opacity;
    this.m.DOM.pointer.style.transform = 'scale(' + this.size + ')';
    this.m.DOM.pointerWrap.style.transform = 'scale(' + this.size + ')';
  }

  _click() {
    if (!SCREEN.TABLET()) document.querySelectorAll('.CURSOR--click').forEach(el => {
      el.addEventListener(this.eventType, () => {
        AUDIOS.ui.click.play();
      });
    });
  }

  animate(pointer) {
    this.vals.target.bottom = (pointer.y + 0.9665)/2 * 100;
    this.vals.current.bottom += (this.vals.target.bottom - this.vals.current.bottom) * 0.18;
    this.vals.target.left = (pointer.x + 0.987)/2 * 100;
    this.vals.current.left += (this.vals.target.left - this.vals.current.left) * 0.18;

    this.DOM.cursor.style.bottom = this.vals.current.bottom + '%';
    this.DOM.cursor.style.left = this.vals.current.left + '%';
  }

  off() {
    this.DOM.pointerWrap.style.opacity = 0;
    this.DOM.pointerWrap.style.pointerEvents = 'none';
  }
}
