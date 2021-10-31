import { screenChecker } from '../../_libs/operations/screenChecker';
import { Cursor } from '../../_libs/ui/cursor';
import { RENDERER, CAMERA, SCREEN } from './variables';

// ========================================
// Pointer
// ========================================

const pointer = new THREE.Vector2();
let mouseMove = false;
function onMouseMove(event) {
  mouseMove = true;
  pointer.x = (event.x / innerWidth) * 2 - 1;
  pointer.y = -(event.y / innerHeight) * 2 + 1;
}

// ========================================
// Cursor
// ========================================

const onCursor = {
  instance: new Cursor(),
  init() {
    const _this = this;
    _this.instance.init({
      UI: document.querySelector('.MODULES-cursor'),
      cursor: document.querySelector('.MODULES-cursor .cursor'),
      hovers: document.querySelectorAll('.CURSOR--hover, a'),
      pointer: document.querySelector('.MODULES-cursor .pointer'),
      pointerWrap: document.querySelector('.MODULES-cursor .pointer-wrap'),
    });

    function animation() {
      if (mouseMove) _this.instance.animate(pointer);
      requestAnimationFrame(animation);
    }
    if (!SCREEN.TABLET()) animation();
    else _this.instance.off();
  }
}

// ========================================
// Window
// ========================================

function onResize() {
  CAMERA.aspect = SCREEN.WIDTH() / SCREEN.HEIGHT();
  CAMERA.updateProjectionMatrix();
  RENDERER.setSize(SCREEN.WIDTH(), SCREEN.HEIGHT());
  screenChecker(document.querySelector('.MODULES-screen_checker'), this.status);
  if (this.status.screenCheck && this.resolve) this.resolve();
  return this.status;
}

// ========================================
// Raycaster
// ========================================

class Raycaster {
  constructor() {
    this.INTERSECTED = null;
    this.raycaster = new THREE.Raycaster();
  }

  intersects(targets, fn) {
    const R = this;
    R.raycaster.setFromCamera(pointer, CAMERA);
    const intersects = R.raycaster.intersectObjects(targets, false);
    if (intersects.length > 0) {
      if (R.INTERSECTED != intersects[0].object) {
        if (R.INTERSECTED) fn.off(R.INTERSECTED);
        R.INTERSECTED = intersects[0].object;
        if (R.INTERSECTED) fn.on(R.INTERSECTED);
      }
    } else {
      if (R.INTERSECTED) fn.off(R.INTERSECTED);
      R.INTERSECTED = null;
    }
  }
}
const raycaster = new Raycaster();

export { pointer, onMouseMove, onResize, raycaster, onCursor };
