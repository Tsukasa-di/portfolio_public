import { MESSAGES } from "../../../../../contents/messages/_app";
import { Typing } from "../../../../_libs/animations/typing/_app";

export class Type {
  constructor() {
    this.targetEl;
    this.buffer;
    this.typing;
    this.messages = MESSAGES.about;
  }

  init() {
    this.targetEl = document.querySelector('.content p');
    this._makeFakeEl();
    this.typing = new Typing(
      this.targetEl,
      null
    );
  }

  _makeFakeEl() {
    Object.keys(this.messages).forEach(key => {
      const fake = document.querySelector('.content .inner').appendChild(document.createElement('p'));
      const styles = {
        display: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        opacity: 0
      };
      Object.entries(styles).forEach(entry => {
        fake.style[entry[0]] = entry[1];
      });
      fake.innerText = this.messages[key];
    });
  }

  set(target) {
    if (this.buffer != target) {
      this.typing.reseter();
      this.typing.set(this.messages[target]);
    }
    this.buffer = target;
  }

  animate() {
    this.typing.animate('inRAF', 4);
  }
}
