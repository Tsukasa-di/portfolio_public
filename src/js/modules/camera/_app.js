import { CAMERA } from "../global/variables";
import { person } from "./person";
import { orbit } from "./orbit";
import { mouse } from "./mouse";
import { auto } from "./auto";

export class Camera {
  constructor(type, console=false) {
    this.type = type;
    this.console = console;
    this.instance;
  }

  init() {
    switch (this.type) {
      case 'orbit':
        this.instance = orbit.init();
        break;
      case 'person':
        this.instance = person.init();
        break;
      case 'mouse':
        this.instance = mouse.init();
        break;
      case 'auto':
        this.instance = auto.init();
        break;
      default:
        console.log('Please insert argument on Camera class.');
        break;
    }
  }

  update(delta, args) {
    if (this.instance && this.instance.update) {
      this.instance.update(delta, args);
    }
  }

  limit() {
    switch (this.type) {
      case 'orbit':
        break;
      case 'person':
        person.limit();
        break;
      case 'mouse':
        mouse.limit();
        break;
      default:
        // console.log('Please insert argument on Camera class.');
        break;
    }
  }

  log() {
    if (this.console) {
      console.log(
        '[position]\n' +
        CAMERA.position.x + ',\n' +
        CAMERA.position.y + ',\n' +
        CAMERA.position.z + '\n' +
        '[lookAt]\n' +
        CAMERA.rotation.x + ',\n' +
        CAMERA.rotation.y + ',\n' +
        CAMERA.rotation.z
      );
    }
  }
}
