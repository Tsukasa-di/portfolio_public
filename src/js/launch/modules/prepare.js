import { OP } from "../../_libs/operator/app";
import { DOM } from "../../global/dom";
import { INST, STATUS } from "../../global/objects";

export function _prepare() {
  return new Promise( resolve => {
    OP.node.on(DOM.OPENING.button, 'click', event => {
      DOM.OPENING.style.opacity = 0;
      DOM.OPENING.style.pointerEvents = 'none';
      INST.stageOperator.animate();
      if (STATUS.audio.active) INST.bgmMaster.play();
    });
    resolve('finish prepare.');
  });
}
