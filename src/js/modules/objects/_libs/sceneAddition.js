import { disposer } from "../../../_libs/processing/disposer";
import { SCENE } from "../../global/variables";

export class SceneAddition {
  constructor(name = 'Objects Group') {
    this.creations = [];
    this.settings = [];
    this.setting = () => {};
    this.objs = new THREE.Group();
    this.name = name;
  }

  init() {
    this.objs.name = this.name;
    this.listing();
  }

  add() {
    this.creations.forEach(creation => {
      this.objs.add(creation);
    });
    SCENE.add(this.objs);
    console.log(
      ' ==================================\n' +
      ' %cObjects Add in Scene.\n', 'background: blue; color: #fff;',
      '==================================\n',
      this.objs
    );
    this.setting();
    return this.objs;
  }

  remove() {
    SCENE.remove(SCENE.getObjectByName(this.name));
    disposer(this.objs);
    return this.objs;
  }
}
