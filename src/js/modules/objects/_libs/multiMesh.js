import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils.js';

export class CreateMultiMesh {
  constructor(geom, mat, matSub) {
    this.geom = geom;
    this.mat = mat;
    this.matSub = matSub;
  }

  mesh() {
    const mesh = SceneUtils.createMultiMaterialObject(this.geom, [this.matSub, this.mat]);
    return mesh;
  }
}
