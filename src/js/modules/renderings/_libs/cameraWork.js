import { CAMERA } from "../../global/variables";

class CameraWork {
  constructor(type, target, current, speed = 0.025) {
    this.type = type;
    this.target = target;
    this.current = current;
    this.speed = speed;
  }

  work() {
    Object.keys(this.current).forEach( axis => {
      this.current[axis] += (this.target[axis] - this.current[axis]) * this.speed;
      CAMERA[this.type][axis] = this.current[axis];
    });
  }
}

export { CameraWork };
