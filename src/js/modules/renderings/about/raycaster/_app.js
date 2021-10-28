import { SCENE } from "../../../global/variables";
import { Type } from "../type/_app";

export class Intersect {
  constructor(targetObj) {
    this.type;
    this.targetObj = targetObj;
    this.triggerEl;
    this.targetVal = {};
    this.target = '';
    this.reseter = {
      target: null
    };
    this.status = {
      hovered: false,
      clicked: {},
      setPermision: true
    },
    this.initTarget = 'profile';
  }

  init() {
    this.triggerEl = document.querySelector('.click-trigger');
    // targetObjを基準に各オブジェクトプロパティのセット
    // ------------------------------------------
    this.targetObj.forEach( obj => {
      this.targetVal[obj.name] = {
        up: obj.position.y + 0.15,
        down: obj.position.y,
      };
      this.status.clicked[obj.name] = false;
      this.reseter[obj.name] = false;
    });

    // 初期値のセット
    // ------------------------------------------
    this.status.clicked[this.initTarget] = true;
    SCENE.getObjectByName('line_' + this.initTarget).material.opacity = 1;
    Object.keys(this.reseter).forEach( key => {
      this.reseter[key] = null;
    });

    // タイピング演出のセット
    // ------------------------------------------
    this.type = new Type();
    this.type.init();
    this.type.set(this.initTarget);
  }

  on(INTERSECTED) {
    const target = INTERSECTED.name.split('_')[1];
    this.target = target;
    this.reseter[this.target] = false;
    this.status.hovered = true;

    this.triggerEl.style.zIndex = '99999';
    this.triggerEl.style.pointerEvents = 'visible';

    this.triggerEl.addEventListener('click', () => {
      if (this.status.setPermision) this.type.set(this.target);
      this.status.setPermision = false;
      this.status.clicked[this.target] = true;
    });
  }

  off(INTERSECTED) {
    this.reseter.target = this.target;
    if (this.target) this.reseter[this.target] = true;
    const target = INTERSECTED.name.split('_')[1];
    this.target = target;
    this.status.hovered = false;

    this.triggerEl.style.zIndex = '0';
    this.triggerEl.style.pointerEvents = 'none';
  }

  checker() {
    this.type.animate();
    // ホバーイベントのループ処理
    // ------------------------------------------
    if (this.status.hovered) this._hovering(this.target, this.targetVal[this.target].up);
    else {
      if (this.target) this._hovering(this.target, this.targetVal[this.target].down);
    }
    if (this.reseter[this.reseter.target]) {
      // ホバー対象外のオブジェクトを強制的に下げる処理
      this._hovering(
        this.reseter.target,
        this.targetVal[this.reseter.target].down
      );
    }
    // クリックイベントのループ処理
    // ------------------------------------------
    if (this.status.clicked[this.target]) {
      Object.keys(this.status.clicked).forEach( key => {
        if (key != this.target) {
          this._clicked(key, 0);
          this.status.clicked[key] = false;
        }
      });
      this.status.setPermision = true;
      this._clicked(this.target, 1);
    }
  }

  _hovering(targetName, targetVal) {
    SCENE.getObjectByName(targetName).position.y
      += (targetVal - SCENE.getObjectByName(targetName).position.y) * 0.035;
  }

  _clicked(targetName, targetVal) {
    SCENE.getObjectByName('line_' + targetName).material.opacity += (targetVal - SCENE.getObjectByName('line_' + targetName).material.opacity) * 0.08;
  }
}
