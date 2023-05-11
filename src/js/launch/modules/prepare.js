import { OP } from "../../_libs/operator/node";
import { DOM } from "../../global/dom";
import { INST } from "../../global/objects";
import { SCREEN } from "../../global/screen";

export function _prepare() {
  return new Promise( resolve => {
    OP.node.on(DOM.OPENING.button, 'click', event => {
      DOM.OPENING.style.opacity = 0;
      DOM.OPENING.style.pointerEvents = 'none';
      INST.stageOperator.animate();
      if (!SCREEN.MINI()) INST.audioMaster.play();
    });
    resolve('finish prepare.');
  });
}
