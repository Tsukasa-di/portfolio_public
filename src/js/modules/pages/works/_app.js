import { Page } from '../_libs/page';
import { modal } from './modal';
import { slider } from './slider';

function init() {
  console.log(
    '%cThis Page is WORKS.', 'background: blue; color: white;'
  );
  slider();
  modal();
}

const camera = {
  pos: {
    x: 0,
    y: 1.2964610895167376,
    z: -26.2458291993623
  },
  rot: {
    x: 3.037799056628205,
    y: 0,
    z: 3.1907594015199227
  }
}

export const works = new Page(
  'works',
  init,
  camera
);
