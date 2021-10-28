import { SPA } from "./_app";
import { fixIndex } from "../../../_libs/processing/fixIndex";
import { react } from "./react";
import { TransAnimates } from "../animations/_app";
import { PATHS, STATUS } from "../../global/variables";
import { currentRootDir } from "../../../_libs/processing/currentRootDir";

const events = {
  status: { clicked: false },
  type: window.ontouchstart ? 'touchstart' : 'click'
};

export function init() {
  // ページ戻る・進むボタンイベント
  // ------------------------------------------
  window.addEventListener('popstate', () => {
    location.reload();
  });

  // SPAオブジェクトにページ遷移イベントを登録
  // ------------------------------------------
  events.click();
  SPA.events.click = events.click;

  // SPAオブジェクトにページ遷移アニメーションを登録
  // ------------------------------------------
  const transAnimates = new TransAnimates();
  SPA.animates = transAnimates;
  SPA.animates.init();
}

events.action = function (event) {
  if (!events.status.clicked) {
    events.status.clicked = true;
    STATUS.transition.clear = false;
    let flag = true;
    const target = event.target.dataset.link,
      path = fixIndex(target),
      name = path.split('/index.html')[0] === 'index.html' ? 'home' : path.split('/index.html')[0],
      doc = SPA.docs[PATHS.root.replace(location.origin, '') + path];
    SPA.animates.animate(
      event,
      function () { react(doc, path, name, flag); }
    );
  }
}

events.click = function () {
  events.status.clicked = false;
  if (currentRootDir() != 'home') document.querySelectorAll('.MODULES-menu .TRANSITION').forEach(el => {
    el.addEventListener(events.type, e => {
      events.action(e);
    });
  });
  else document.querySelectorAll('.CONTENTS .TRANSITION').forEach(el => {
    el.addEventListener(events.type, e => {
      events.action(e);
    });
  });
}
