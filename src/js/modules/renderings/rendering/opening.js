import { CTRL } from "../../../controllers/_app";
import { Camera } from "../../camera/_app";
import { composer } from "../../effects/_app";
import { CAMERA, SCENE, STATUS } from "../../global/variables";
import { entryHome } from "../../launch/opening/entryHome";
import { stats } from "../../ui/stats";
import { CameraWorks, Light, TypingOpening } from "../opening/animates";
import { GetScreen } from "../_libs/getScreen";

// ========================================
// Definition
// ========================================

// Updates
// ----------------------------------------
const clock = new THREE.Clock();

// Status
// ----------------------------------------
let initRender = true;
let typingFlag = true;
STATUS.render.preEntryInit = false;
STATUS.render.toEntry1 = false;
STATUS.render.toEntry2 = false;

// Camera
// ----------------------------------------
const camera = new Camera();
camera.init();

// Aniamte
// ----------------------------------------
const animate = {};
let goInit;

// ========================================
// Rendering
// ========================================

export function opening(init) {
  // Init
  // ----------------------------------------
  if (initRender) {
    goInit = init;
    animate.light = new Light(SCENE.getObjectByName('globalLight'));
    animate.getScreen = new GetScreen({
      el: document.querySelector('.screen'),
      obj: SCENE.getObjectByName('screen')
    });
    animate.typing = new TypingOpening(document.querySelector('.screen p'));
    animate.typing.init();
    animate.cw = new CameraWorks();
    animate.cw.init();
  }
  // preEntryInit
  // ----------------------------------------
  if (STATUS.render.preEntryInit) {
    document.querySelector('.screen').style.opacity = 0;
    setTimeout(() => {
      document.querySelector('.launching').style.opacity = 0;
      STATUS.render.toEntry2 = true;
    }, 1200);
    STATUS.render.preEntryInit = false;
  }

  // Updates
  // ----------------------------------------
  const delta = clock.getDelta();
  camera.log();
  camera.update(delta);
  camera.limit();
  if (CTRL.gui.toggle.stats) stats.update();

  // Rendering
  // ----------------------------------------
  initRender = false;
  composer.update(delta);
  if (STATUS.render.opening) requestAnimationFrame(opening);

  // Animates
  // ----------------------------------------
  animate.cw.opening();
  animate.light.animate();

  if (CAMERA.position.z > -24) {
    animate.getScreen.get();
    animate.typing.animate('inRAF', 2);
  }
  if (STATUS.render.toEntry1) {
    animate.cw.toEntry1Pos();
    animate.cw.toEntry1Rot();
  }
  if (STATUS.render.toEntry2) {
    animate.cw.toEntry2Pos();
  }
  if (CAMERA.position.z > 0) {
    if (STATUS.render.opening) entryHome(goInit);
    STATUS.render.opening = false;
  }
}
