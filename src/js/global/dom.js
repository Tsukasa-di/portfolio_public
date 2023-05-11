import { OP } from "../_libs/operator/node";

export const DOM = {
  init(finish) {
    this.set();
    [
      this.POINTER,
      this.OPENING,
      this.UI,
      this.GLOBAL_WRAP
    ].forEach( el => { el.style.opacity = 1; });
    finish('finish dom setting.');
  },
  set() {
    // BASE
    this.body = OP.node.qs('body');
    this.html = OP.node.qs('html');
    this.head = OP.node.qs('head');
    this.title = OP.node.qs('title', this.head);

    // SOUND
    this.SOUND = OP.node.qs('#SOUND_CHECKER');

    // LOADING
    this.LOADING = OP.node.qs('#LOADING');
    loading(this);

    // POINTER
    this.POINTER = OP.node.qs('#POINTER');
    pointer(this);

    // OPENING
    this.OPENING = OP.node.qs('#OPENING');
    opening(this);

    // UI
    this.UI = OP.node.qs('#UI');
    this.UI.MENU = OP.node.qs('#MENU', this.UI);
    this.UI.MODAL = OP.node.qs('#MODAL', this.UI);
    this.UI.MODAL.inner = OP.node.qs('#MODAL > .inner', this.UI.MODAL);

    // GLOBAL_WRAP
    this.GLOBAL_WRAP = OP.node.qs('#GLOBAL_WRAP');
    global_wrap(this);

    // BG
    this.BG = OP.node.qs('#BG');
    this.BG.light = OP.node.qs('.light', this.BG); 
    this.BG.STAGE = OP.node.qs('#STAGE', this.BG);
    this.BG.AREA = OP.node.qs('#AREA', this.BG);

    // TRIGGERS
    triggers(this);
  }
}

function loading(d) {
  d.LOADING.cancelMask = OP.node.qs('.load-cancel-mask', d.LOADING);
  d.LOADING.bar = OP.node.qs('.loading-bar .bar', d.LOADING);
  d.LOADING.wrap = OP.node.qs('.loading-bar .wrap', d.LOADING);
}

function pointer(d) {
  d.POINTER.pointer = OP.node.qs('.pointer', d.POINTER);
  d.POINTER.outer = OP.node.qs('.pointer-outer', d.POINTER);
}

function opening(d) {
  d.OPENING.button = OP.node.qs('.button', d.OPENING);
}

function global_wrap(d) {
  d.GLOBAL_WRAP.CONTENTS = OP.node.qs('#CONTENTS', d.GLOBAL_WRAP);
  contents(d);
}

function contents(d) {
  d.GLOBAL_WRAP.CONTENTS.mask = OP.node.qs('.mask', d.GLOBAL_WRAP.CONTENTS);
  d.GLOBAL_WRAP.CONTENTS.inner = OP.node.qs('.inner', d.GLOBAL_WRAP.CONTENTS);
  d.GLOBAL_WRAP.CONTENTS.mv = OP.node.qs('section.title', d.GLOBAL_WRAP.CONTENTS);
}

function triggers(d) {
  d.TRIGGERS = {};
  d.TRIGGERS.spa = OP.node.qsAll('.PAGE_CHANGER');
}
