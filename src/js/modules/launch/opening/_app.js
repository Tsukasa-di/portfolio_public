import { promise } from "../../../_libs/async/promise";
import { prepare } from "./prepare";
import { RENDERING } from "../../renderings/_app";
import { STATUS } from "../../global/variables";
import { loading } from "../loading/_app";
import { performer } from "./performer";
import { storage } from "./storage";

export async function opening(init) {
  /*
  ========================================
  Opening演出に必要なコンテンツのロード
  ========================================
  */
  await promise(resolve => {
    prepare(resolve);
  });
  /*
  ========================================
  Opening演出の開始
  ========================================
  */
  await promise(resolve => {
    document.querySelector('.GLOBAL').style.opacity = 0;
    document.querySelector('.GLOBAL').style.pointerEvents = 'none';
    document.querySelector('.CANVAS').style.opacity = 1;
    document.querySelector('.CONTENTS').style.opacity = 1;
    STATUS.render.opening = true;
    RENDERING.opening(init);
    performer(resolve);
  });
  /*
  ========================================
  サイトに必要なコンテンツのロード
  ========================================
  */
  await promise( () => {
    function timer() {
      return new Promise( _resolve => {
        setTimeout(() => {
          _resolve();
        }, 10000);
      });
    }
    return Promise.all([loading(), timer()]).then( () => {
      if (storage.checker()) storage.set({flag: 'true'});
      STATUS.render.preEntryInit = true;
      STATUS.render.toEntry1 = true;
    });
  });
}
