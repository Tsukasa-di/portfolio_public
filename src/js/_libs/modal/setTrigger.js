import { promise } from "../async/promise";
import { animations } from "./animations";

export function setTrigger() {
  _addEvent(this, this.DOM.triggers.open, "open");
  _addEvent(this, this.DOM.triggers.close, "close");
}

function _addEvent(Modal, targets, type) {
  targets.forEach( target => {
    target.addEventListener(Modal.eventType, event => {
      Modal.STATUS.type = type;
    });
    target.addEventListener(Modal.eventType, _modalToggle.bind(Modal));
  });
}

async function _modalToggle(event) {
  const menuButtonEl = document.querySelector('.MODULES-menu .button');
  if (this.STATUS.type == "open") {
    /* Modal Open Function */
    menuButtonEl.style.opacity = 0;
    menuButtonEl.style.pointerEvents = 'none';
    await promise( resolve => {
      animations.open(this, event, resolve);
    });
    await promise( resolve => {
      this.TARGET = document.querySelector("#modal-" + event.target.dataset.modal);
      this.TARGET.style.display = "block";
      this.DOM.wrap.style.display = "block";
      setTimeout(() => {
        resolve();
      }, 100);
    });
    await promise( () => {
      this.DOM.body.classList.add('modal-open');
      this.DOM.content.scrollTop = 0;
    });
  } else if (this.STATUS.type == "close") {
    /* Modal Close Function */
    menuButtonEl.style.opacity = 1;
    menuButtonEl.style.pointerEvents = 'visible';
    await promise( resolve => {
      animations.close(this, event, resolve);
    });
    await promise( () => {
      this.DOM.body.classList.remove('modal-open');
      setTimeout(() => {
        this.TARGET.style.display = "none";
        this.DOM.wrap.style.display = "none";
      }, this.PARAM.duration);
    });
  }
}
