import { DOM } from "./members";

export function skip(resolve) {
  DOM.canvas.style.opacity = 1;
  DOM.opening.style.display = 'none';
  DOM.launched.style.opacity = 1;
  resolve();
}
