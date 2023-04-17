import { DOM } from "../../global/dom";
import { AUDIOS, STATUS } from "../../global/objects";
import { SCREEN } from "../../global/screen";
import { OP } from "../operator/node";

export class Cursor {
  constructor(hovers, clicks) {
    this.dom = {}
    this.classes = {
      hovers: hovers,
      clicks: clicks
    }
    this.eventType = window.ontouchstart ? 'touchstart' : 'click';
    this.events = {};
    this.vals = {
      target: {
        light: {
          left: 0,
          top: 0
        },
        pointer: {
          left: 0,
          top: 0
        },
        outer: {
          left: 0,
          top: 0
        }
      },
      current: {
        light: {
          left: 0,
          top: 0
        },
        pointer: {
          left: 0,
          top: 0
        },
        outer: {
          left: 0,
          top: 0
        }
      }
    }
  }

  init() {
    this.dom.light = DOM.GLOBAL_WRAP.BG.light;
    this.dom.pointer = DOM.POINTER.pointer;
    this.dom.outer = DOM.POINTER.outer;
    this._domSet();
    OP.node.on(document, 'mousemove', this._onMouseMove.bind(this), false);
    this._eventRegistor();
    this._animate();
    this._hover('on');
    this._click('on');
  }

  update() {
    this._domSet();
    this._hover('off');
    this._click('off'); 
    this._hover('on');
    this._click('on');
  }

  _domSet() {
    if (this.classes.hovers) this.dom.hovers = OP.node.qsAll('.' + this.classes.hovers);
    if (this.classes.clicks) this.dom.clicks = OP.node.qsAll('.' + this.classes.clicks);
  }

  _eventRegistor() {
    const inst = this;
    this.events.mouseenter = () => inst._transform.bind({ m: inst, size: 2.5, type: 'enter' })();
    this.events.mouseleave = () => inst._transform.bind({ m: inst, size: 1.0, type: 'leave' })();
    this.events.click = event => {
      if (!event.target.classList.value.includes('MENU_BUTTON')) if (STATUS.audio.active) AUDIOS.click.play();
    }
  }

  _culc(name, vals, duration) {
    if (duration) {
      vals.current[name].left += (vals.target[name].left - vals.current[name].left) * duration;
      vals.current[name].top += (vals.target[name].top - vals.current[name].top) * duration;
      this.dom[name].style.left = vals.current[name].left + 'px';
      this.dom[name].style.top = vals.current[name].top + 'px';
    } else {
      this.dom[name].style.left = vals.target[name].left + 'px';
      this.dom[name].style.top = vals.target[name].top  + 'px';
    }
  }

  _animate() {
    if (STATUS.cursor.light) {
      this._culc('light', this.vals, 0.05);
      this.dom.light.style.opacity = 1;
    } else this.dom.light.style.opacity = 0;
    this._culc('pointer', this.vals, 0.4);
    this._culc('outer', this.vals, 0.1);
    requestAnimationFrame(this._animate.bind(this));
  }

  _onMouseMove(event) {
    this.vals.target.light.left = event.x - 700;
    this.vals.target.light.top = event.y - 700;
    this.vals.target.pointer.left = event.x - 10;
    this.vals.target.pointer.top = event.y - 10;
    this.vals.target.outer.left = event.x - 25;
    this.vals.target.outer.top = event.y - 25;
  }

  _hover(type) {
    if (this.dom.hovers) {
      this.dom.hovers.forEach( el => {
        OP.node[type](el, 'mouseenter', this.events.mouseenter);
        OP.node[type](el, 'mouseleave', this.events.mouseleave);
      });
    }
  }

  _click(type) {
    if (this.dom.clicks) {
      this.dom.clicks.forEach( el => {
        OP.node[type](el, this.eventType, this.events.click);
      });
    }
  }

  _transform() {
    this.m.dom.pointer.style.transform = 'scale(' + this.size + ')';
    this.m.dom.outer.style.transform = 'scale(' + this.size + ')';
    if (this.type == 'enter') setTimeout(() => {
      if (STATUS.audio.active) AUDIOS.hover.play();
    }, 1.0);
  }
}
