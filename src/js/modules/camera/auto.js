import { CAMERA } from '../global/variables';

function AutoCamera() {
  const _this = this;

  this.define = {
    origin: {
      x: CAMERA.position.x,
      y: CAMERA.position.y,
      z: CAMERA.position.z
    },
    max: {
      x: CAMERA.position.x + .5,
      y: CAMERA.position.y + .5,
      z: CAMERA.position.z + .5
    },
    min: {
      x: CAMERA.position.x - .5,
      y: CAMERA.position.y - .5,
      z: CAMERA.position.z - .5
    },
  };

  this.operator = {
    speed: 0.002,
    toggle: false,
  }

  this.functions = {
    calc(xMaMi, yMaMi) {
      CAMERA.position.x += (_this.define[xMaMi].x - CAMERA.position.x) * _this.operator.speed;
      CAMERA.position.y += (_this.define[yMaMi].y - CAMERA.position.y) * _this.operator.speed;
    },
    top_right() {
      this.calc('max', 'max');
    },
    top_left() {
      this.calc('min', 'max');
    },
    bottom_right() {
      this.calc('max', 'min');
    },
    bottom_left() {
      this.calc('min', 'min');
    }
  }

  this.update = (delta, args) => {
    if (Math.floor(args.deg) % 8 === 0) {
      if (Math.random() < 0.5) this.operator.toggle = false;
      else this.operator.toggle = true;
    }

    if (Math.sin(args.deg) > 0) {
      if (this.operator.toggle) this.functions.top_right();
      else this.functions.top_left();
    } else {
      if (this.operator.toggle) this.functions.bottom_left();
      else this.functions.bottom_right();
    }
  }
}

let autoCamera;

export const auto = {
  init() {
    autoCamera = new AutoCamera();
    return autoCamera;
  }
}

