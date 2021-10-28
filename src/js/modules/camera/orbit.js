import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { CANVAS, CAMERA } from '../global/variables';

let orbitControls;

export const orbit = {
  init: function () {
    orbitControls = new OrbitControls(CAMERA, CANVAS);
    return orbitControls;
  }
}
