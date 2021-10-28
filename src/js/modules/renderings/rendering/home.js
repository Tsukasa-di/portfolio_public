import { CTRL } from "../../../controllers/_app";
import { raycaster } from "../../global/events";
import { CAMERA, SCENE, STATUS } from "../../global/variables";
import { story } from "../home/raycaster/story";
import { intersect, status, val } from "../home/raycaster/_app";
import { basic } from "../_libs/basic";

const scaler = {
  set(target, speed) {
    SCENE.getObjectByName('core').scale.set(this.t('x', target, speed), this.t('y', target, speed), this.t('z', target, speed));
  },
  t(axis, target, speed) {
    return SCENE.getObjectByName('core').scale[axis] += (target - SCENE.getObjectByName('core').scale[axis]) * speed;
  }
}

let degree = 0;
let initTrigger = true;

export function home() {
  if (!CTRL.rendering.home) STATUS.render.home = false;
  basic('home', custom);
}

function custom() { if (!STATUS.transition.clear) initTrigger = true; else {
  if (initTrigger) init();
  initTrigger = false;

  degree += val;

  // objects
  // ------------------------------------------
  if (SCENE.getObjectByName('core')) SCENE.getObjectByName('core').rotation.set(
    degree,
    degree,
    degree
  );

  if (SCENE.getObjectByName('core') && STATUS.home.raycaster) raycaster.intersects(
    [SCENE.getObjectByName('core-raycaster')],
    { on: intersect.on, off: intersect.off }
  );

  if (status.camera.zoomin) if (CAMERA.position.z > 40 - 1) scaler.set(1.0, 0.05);
  if (status.camera.zoomout) if (CAMERA.position.z < 100 - 1) scaler.set(0.5, 0.01);

  if (status.type) story.animate();
} }

function init() {
  intersect.init();
}
