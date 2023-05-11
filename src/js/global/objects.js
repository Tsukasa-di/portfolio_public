import { gsap } from "gsap";

const STATUS = {
  page: null,
  modal: {
    active: false,
    type: null
  },
  audio: {
    active: false,
    bgm: false,
    direction: null
  },
  cursor: {
    light: true
  }
};

const LOCATION = {
  origin: location.origin
}

const INST = {};

const AUDIOS = {};

const TL = {};

export { gsap, STATUS, LOCATION, INST, AUDIOS, TL }
