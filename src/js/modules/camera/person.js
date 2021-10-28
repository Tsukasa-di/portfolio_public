import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';
import { CANVAS, CAMERA } from '../global/variables';

let firstPersonControls;

export const person = {
  init: function() {
    firstPersonControls = new FirstPersonControls(CAMERA, CANVAS);
    // firstPersonControls.lookSpeed = 0.03;
    firstPersonControls.lookSpeed = 0.001;
    firstPersonControls.movementSpeed = 50;
    firstPersonControls.mouseDragOn = true;
    return firstPersonControls;
  },
  limit: function() {
    function zxControl(axis, val) {
      if (CAMERA.position[axis] >= val) {
        CAMERA.position[axis] = (val - 0.1);
      } else if (CAMERA.position[axis] <= -val) {
        CAMERA.position[axis] = -(val - 0.1);
      }
    }

    if (CAMERA.position.y <= 5) {
      CAMERA.position.y = 5;
    } else if (CAMERA.position.y >= 7) {
      CAMERA.position.y = 7;
    }

    zxControl('z', 100);
    zxControl('x', 100);
  }
}

