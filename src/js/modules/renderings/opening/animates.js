import { Typing } from "../../../_libs/animations/typing/_app";
import { CAMERA } from "../../global/variables";
import { CameraWork } from "../_libs/cameraWork";

class TypingOpening {
  constructor(targetEl) {
    this.targetEl = targetEl;
    this.instance = new Typing(targetEl, null);
  }

  init() {
    this.targetEl.style.opacity = 1;
    this.instance.reseter();
    this.instance.set(
      'Entrypoint app 1.81 MiB (2.14 MiB) = js/./venders.bundle.js 1.52 MiB css/app.css 8.43 KiB js/app.bundle.js 284 KiB app.250ee4b863891dfd8757.hot-update.js 3.58 KiB 4 auxiliary assets cached modules 1.61 MiB (javascript) 7.26 KiB (css/mini-extract) [cached] 113 modules runtime modules 32.4 KiB 16 modules ./src/js/modules/clientEvents.js 1.53 KiB [built] [code generated] webpack 5.51.1 compiled successfully in 83 ms assets by status 1.53 MiB [cached] 2 assets assets by path . 295 KiB assets by chunk 288 KiB (name: app) asset js/app.bundle.js 284 KiB [emitted] (name: app) 1 related asset asset app.15b59e25c5b9d91a9f36.hot-update.js 3.51 KiB [emitted] [immutable] [hmr] (name: app) 1 related asset asset opening/index.html 2.27 KiB [emitted] asset index.html 1.46 KiB [emitted] asset about/index.html 1.42 KiB [emitted] asset works/index.html 1.42 KiB [emitted] asset app.15b59e25c5b9d91a9f36.hot-update.json 27 bytes [emitted] [immutable] [hmr] Entrypoint app 1.81 MiB (2.14 MiB) = js/./venders.bundle.js 1.52 MiB css/app.css 8.43 KiB js/app.bundle.js 284 KiB app.15b59e25c5b9d91a9f36.hot-update.js 3.51 KiB 4 auxiliary assets cached modules 1.61 MiB (javascript) 7.26 KiB (css/mini-extract) [cached] 113 modules runtime modules 32.4 KiB 16 modules ./src/js/modules/clientEvents.js 1.51 KiB [built] [code generated] webpack 5.51.1 compiled successfully in 111 ms'
    );
  }

  animate(type, prcsSum) {
    this.instance.animate(type, prcsSum);
  }
}

class Light {
  constructor(light) {
    this.light = light;
    this.val = {
      target: 0.61,
      current: 0
    };
  }

  animate() {
    this.val.current += (this.val.target - this.val.current) * 0.01;
    this.light.intensity = this.val.current;
  }
}

class CameraWorks {
  constructor() {
    this._opening;
    this._toEntry1Pos;
    this._toEntry1Rot;
    this._toEntry2Pos;
  }

  init() {
    this._opening = new CameraWork(
      'position',
      {
        x: -0.6269774858827821,
        y: 3.9680249428735017,
        z: - 22.756498062467244
      },
      {
        x: 2.4160616583640513,
        y: 16.387858329601736,
        z: -54.25404510227216
      },
      0.03
    );
    this._toEntry1Pos = new CameraWork(
      'position',
      {
        x: -0.29700013818583915,
        y: 4.560005079071228,
        z: -26.81876223336175
      },
      {
        x: -0.6269774858827821,
        y: 3.9680249428735017,
        z: - 22.756498062467244
      },
      0.03
    );
    this._toEntry1Rot = new CameraWork(
      'rotation',
      {
        x: CAMERA.rotation.x,
        y: 0,
        z: CAMERA.rotation.z
      },
      {
        x: CAMERA.rotation.x,
        y: CAMERA.rotation.y,
        z: CAMERA.rotation.z
      },
      0.03
    );
    this._toEntry2Pos = new CameraWork(
      'position',
      {
        x: -0.29700013818583915,
        y: 5.133344524852943,
        z: 15.0448234297826104
      },
      {
        x: -0.29700013818583915,
        y: 4.560005079071228,
        z: -26.81876223336175
      },
      0.0085
    );
  }

  opening() {
    this._opening.work();
  }

  toEntry1Pos() {
    this._toEntry1Pos.work();
  }

  toEntry1Rot() {
    this._toEntry1Rot.work();
  }

  toEntry2Pos() {
    this._toEntry2Pos.work();
  }
}

export { TypingOpening, CameraWorks, Light };
