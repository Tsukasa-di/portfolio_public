import { SCENE } from "../../global/variables";

const v = {
  max: 3.5,
  min: 1.1,
  obj: null,
  current: 0,
  counter: 0,
  switcher: 'down'
}

export function lightBlinking() {
  v.obj = SCENE.getObjectByName('globalLight');
  v.current = v.obj.intensity;

  if (v.current >= v.max - 0.1) {
    v.counter++;
    v.switcher = 'stay';
    if (v.counter >= 120) v.switcher = 'down';
  }
  if (v.current <= v.min + 0.1) {
    v.counter--;
    v.switcher = 'stay';
    if (v.counter <= 0) v.switcher = 'up';
  }

  if (v.switcher === 'down') v.obj.intensity += (v.min - v.obj.intensity) * 0.008;
  else if (v.switcher === 'up') v.obj.intensity += (v.max - v.obj.intensity) * 0.008;
}
