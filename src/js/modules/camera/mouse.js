import { CAMERA } from '../global/variables';
import { pointer } from '../global/events';

function MouseCamera(limitVal) {
  this.limitVal = limitVal;
  this.define = {
    max: {
      x: CAMERA.rotation.z + limitVal,
      y: CAMERA.rotation.y + limitVal
    },
    min: {
      x: CAMERA.rotation.z - limitVal,
      y: CAMERA.rotation.y - limitVal
    },
    speed: 20500
  };
  this.limit = function() {
    if (CAMERA.rotation.z >= this.define.max.x && pointer.y < 0) {
      CAMERA.rotation.z = CAMERA.rotation.z;
    } else if (CAMERA.rotation.z <= this.define.min.x && pointer.y > 0) {
      CAMERA.rotation.z = CAMERA.rotation.z;
    } else {
      CAMERA.rotation.z -= pointer.y / this.define.speed;
    }
    if (CAMERA.rotation.y >= this.define.max.y && pointer.x > 0) {
      CAMERA.rotation.y = CAMERA.rotation.y;
    } else if (CAMERA.rotation.y <= this.define.min.y && pointer.x < 0) {
      CAMERA.rotation.y = CAMERA.rotation.y;
    } else {
      CAMERA.rotation.y += pointer.x / this.define.speed;
    }
  }
}

let mouseCamera;

export const mouse = {
  init: function() {
    mouseCamera = new MouseCamera(0.03);
    return mouseCamera;
  },
  limit: function () {
    mouseCamera.limit();
  }
}
