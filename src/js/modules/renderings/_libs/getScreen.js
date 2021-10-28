import { CAMERA, SCREEN } from "../../global/variables";

export class GetScreen {
  constructor(targets) {
    this.targets = targets;
    // targets = {
    //   el: Element
    //   obj: Object3D
    // }
    this.scale = {
      width: this.targets.el.clientWidth,
      height: this.targets.el.clientHeight
    };
    this.v;
  }

  get() {
    this.v = new THREE.Vector3();

    // get the position of the center of the cube
    this.targets.obj.getWorldPosition(this.v);

    // get the normalized screen coordinate of that position
    // x and y will be in the -1 to +1 range with x = -1 being
    // on the left and y = -1 being on the bottom
    this.v.project(CAMERA);

    this.targets.el.style.transform = `translate(${
      (this.v.x * .5 + .5) * SCREEN.WIDTH() - this.scale.width / 2
    }px,${
      (this.v.y * -.5 + .5) * SCREEN.HEIGHT() - this.scale.height / 2
    }px)`;

    delete this.v;
  }
}
