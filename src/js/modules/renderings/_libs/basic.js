import { stats } from '../../ui/stats';
import { composer } from '../../effects/_app';
import { SCENE, STATUS } from '../../global/variables';
import { Camera } from '../../camera/_app';
import { GUI } from '../../ui/dat.gui';
import { CTRL } from '../../../controllers/_app';
import { menu } from '../../global/menu';

let degree = 0, deg = 0;
let camera;
const clock = new THREE.Clock();

export function basic(pageName, custom, init) {
  function renderScene() {
    if (custom) custom();

    if (STATUS.render.init) {
      camera = new Camera(CTRL.camera.type, CTRL.camera.log);
      camera.init();
      if (init) init();
      STATUS.render.init = false;
    }

    if (menu.status.init) menu.animate();
    if (GUI && CTRL.gui.toggle.datGui && GUI.update) GUI.update();

    // update
    // ------------------------------------------
    deg += 0.007;
    if (CTRL.gui.toggle.stats) stats.update();

    // camera
    // ------------------------------------------
    camera.log();
    camera.update(clock.getDelta(), { deg: deg });
    camera.limit();

    // request
    // ------------------------------------------
    if (STATUS.render[pageName]) requestAnimationFrame(renderScene);
    composer.update(clock.getDelta());
  }
  renderScene();
}
