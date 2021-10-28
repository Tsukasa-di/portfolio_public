import { Typing } from "../../_libs/animations/typing/_app";
import { currentRootDir } from "../../_libs/processing/currentRootDir";
import { RENDERING } from "../renderings/_app";
import { AUDIOS, SCREEN, STATUS } from "./variables";

class Menu {
  constructor() {
    this.target;
    this.typing;
    this.status = {
      init: false,
      hover: true,
      typing: false,
      menu: 'close'
    };
    this.DOM = {
      mask: null,
      contents: null,
      menu: null,
      wrap: null
    };
    this.eventType = window.ontouchstart ? 'touchstart' : 'click';
  }

  init(target) {
    this.status.init = true;
    this.target = target;
    this._set();
    this._hover();
    this._click();
  }

  _set() {
    this.target.style.opacity = 1;
    this.DOM.mask = document.querySelector('#canvas-mask');
    this.DOM.contents = document.querySelector('.CONTENTS');
    this.DOM.wrap = document.querySelector('.MODULES-menu');
    this.typing = new Typing(document.querySelector('.MODULES-menu p'))
    document.querySelectorAll('.MODULES-menu .menu li').forEach( el => {
      el.classList.remove('active');
      if ( el.classList.value.includes(currentRootDir()) ) el.classList.add('active');
    });
  }

  _hover() {
    this.target.addEventListener('mouseenter', e => { if (this.status.hover && !SCREEN.TABLET()) {
      this.typing.reseter();
      this.typing.set('OPEN?');
      this.status.typing = true;
    } });
    this.target.addEventListener('mouseleave', e => { if (this.status.hover && !SCREEN.TABLET()) {
      this.typing.reseter();
      this.typing.set('MENU');
      this.status.typing = true;
    } });
  }

  _click() {
    this.target.addEventListener(this.eventType, e => {
      this.DOM.menu = document.querySelector('.MODULES-menu .menu');
      this.DOM.menu.style.display = 'block';
      if (this.status.menu === 'close') {
        // status
        this.status.menu = 'open';
        this.status.hover = false;
        // typing処理
        this.typing.reseter();
        this.typing.set('CLOSE');
        this.status.typing = true;
        // DOM処理
        this.DOM.mask.style.opacity = .7;
        this.DOM.contents.style.opacity = .05;
        this.DOM.wrap.classList.add('active');
        setTimeout(() => {
          this.DOM.menu.style.opacity = 1;
          AUDIOS.ui.rollover.play();
        }, 200);
        setTimeout(() => {
          STATUS.render[currentRootDir()] = false;
        }, 800);
      } else {
        // status
        this.status.menu = 'close';
        this.status.hover = true;
        // typing処理
        this.typing.reseter();
        this.typing.set('MENU');
        this.status.typing = true;
        // effect処理
        STATUS.render[currentRootDir()] = true;
        RENDERING[currentRootDir()]();
        // DOM処理
        this.DOM.menu.style.opacity = 0;
        this.DOM.wrap.classList.remove('active');
        this.DOM.mask.style.opacity = .25;
        this.DOM.contents.style.opacity = 1;
      }
    });
  }

  reseter() {
    // status
    this.status.menu = 'close';
    this.status.hover = true;
    // typing処理
    this.typing.reseter();
    this.typing.set('MENU');
    this.status.typing = true;
    // DOM処理
    this.DOM.menu.style.opacity = 0;
    this.DOM.wrap.classList.remove('active');
    this.DOM.mask.style.opacity = .25;
    this.DOM.contents.style.opacity = 1;
  }

  update() {
    this.DOM.menu = document.querySelector('.MODULES-menu .menu');
    this.DOM.menu.style.display = 'none';
    this.DOM.contents = document.querySelector('.CONTENTS');
    document.querySelectorAll('.MODULES-menu .menu li').forEach(el => {
      el.classList.remove('active');
      if (el.classList.value.includes(currentRootDir())) el.classList.add('active');
    });
  }

  animate() {
    if (this.status.typing) this.typing.animate('inRAF', 5, () => {this.status.typing = false;});
  }
}

export const menu = new Menu();
