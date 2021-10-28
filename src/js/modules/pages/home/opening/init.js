import { DOM } from "./members";

export function init() {
  DOM.canvas = document.querySelector('#dreams');
  DOM.canvasMask = document.querySelector('#canvas-mask');
  DOM.opening = document.querySelector('.opening');
  DOM.launched = document.querySelector('.launched');
  DOM.openingP = document.querySelector('.opening p');
}
