import { Page } from '../_libs/page';

function init() {
  console.log(
    '%cThis Page is OPENING.', 'background: blue; color: white;'
  );
}

const camera = {
  pos: {
    x: -0.6269774858827821,
    y: 3.9680249428735017,
    z: -22.756498062467244
  },
  rot: {
    x: 3.1085671282810505,
    y: -0.24865513709369844,
    z: 3.133462272279773
  }
}

export const opening = new Page(
  'opening',
  init,
  camera
);
