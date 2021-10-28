import { Page } from '../_libs/page';

function init() {
  console.log(
    '%cThis Page is ABOUT.', 'background: blue; color: white;'
  );
}

const camera = {
  pos: {
    x: 0,
    y: 1.32,
    z: 30
  },
  rot: {
    x: 0.12,
    y: 0,
    z: 0
  }
}

export const about = new Page(
  'about',
  init,
  camera
);
