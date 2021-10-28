import { CAMERA, OBJECTS } from "../../global/variables";

export class Page {
  constructor(name, init, camera, custom=null) {
    this.name = name;
    this._init = init;
    this._camera = camera;
    if (custom) this.custom = custom;
  }

  init(...args) {
    this._init(...args);
    // document.querySelectorメソッドなど、ページ読み込み時に走らせる必要のある処理
  }

  obj() {
    return OBJECTS[this.name.toUpperCase()] // ページで使用するObject3Dを返す
  }

  camera() {
    CAMERA.position.set(
      this._camera.pos.x,
      this._camera.pos.y,
      this._camera.pos.z,
    );
    CAMERA.rotation.set(
      this._camera.rot.x,
      this._camera.rot.y,
      this._camera.rot.z,
    );
    return this._camera;
  }

  custom() {
    if (this.custom) this.custom();
    else console.log('custom関数が登録されていません。');
  }
}
