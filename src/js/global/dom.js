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

    // LOADING
    this.LOADING = OP.node.qs('#LOADING', document);
    loading(this);

    // POINTER
    this.POINTER = OP.node.qs('#POINTER', document);
    pointer(this);

    // OPENING
    this.OPENING = OP.node.qs('#OPENING', document);
    opening(this);

    // UI
    this.UI = OP.node.qs('#UI', document);

    // GLOBAL_WRAP
    this.GLOBAL_WRAP = OP.node.qs('#GLOBAL_WRAP', document);
    global_wrap(this);

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
  d.GLOBAL_WRAP.STAGE = OP.node.qs('#STAGE', d.GLOBAL_WRAP);
  d.GLOBAL_WRAP.AREA = OP.node.qs('#AREA', d.GLOBAL_WRAP);
  d.GLOBAL_WRAP.CONTENTS = OP.node.qs('#CONTENTS', d.GLOBAL_WRAP);
  contents(d);
  d.GLOBAL_WRAP.BG = OP.node.qs('#BG', d.GLOBAL_WRAP);
  bg(d);
}

function contents(d) {
  d.GLOBAL_WRAP.CONTENTS.mask = OP.node.qs('.mask', d.GLOBAL_WRAP.CONTENTS);
  d.GLOBAL_WRAP.CONTENTS.inner = OP.node.qs('.inner', d.GLOBAL_WRAP.CONTENTS);
}

function bg(d) {
  d.GLOBAL_WRAP.BG.light = OP.node.qs('.light', d.GLOBAL_WRAP.BG); 
}

function triggers(d) {
  d.TRIGGERS = {};
  d.TRIGGERS.spa = OP.node.qsAll('.PAGE_CHANGER');
}
