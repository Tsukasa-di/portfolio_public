import { init } from "./init";
import { log } from "./log";

export class Slider {
  constructor(slider, param) {
    this.slider = slider;
    this.DOM = {
      triggers: {
        prev: null,
        next: null
      },
      inner: null,
      wrap: null,
      slides: null
    };
    this.PARAM = {
      slide: {
        width: param.slide.width ? param.slide.width : 640,
        margin: param.slide.margin ? param.slide.margin : 20,
        num: null,
        value: null
      }
    };
    this.eventType = window.ontouchstart ? 'touchstart' : 'click';
    init(this);
  }
  log() { log(this); };
}
