import { DOM } from "../../global/dom";

export function fixScale() {
  DOM.GLOBAL_WRAP.CONTENTS.mv && ( DOM.GLOBAL_WRAP.CONTENTS.mv.style.height = innerHeight + 'px' );
}
