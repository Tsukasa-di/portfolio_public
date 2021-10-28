import { promise } from "../../../_libs/async/promise";
import { STATUS } from '../../global/variables';
import { Page } from '../_libs/page';
import { opening } from './opening/_app';
import { typing } from "./launched/typing";
import { prompt } from "./prompt";

async function init() {
  console.log(
    '%cThis Page is HOME.', 'background: blue; color: white;'
  );

  await promise( resolve => {
    STATUS.render.home = true;
    opening.init();
    if (STATUS.home.opening) opening._true(resolve);
    else opening._false(resolve);
  });
  await promise( resolve => {
    typing();
    prompt(resolve);
  });
  await promise( () => {
    STATUS.home.raycaster = true;
    console.log('clear');
  });
}

const camera = {
  pos: {
    x: 0,
    y: 0,
    z: 40
  },
  rot: {
    x: 0,
    y: 0,
    z: 0
  }
}

export const home = new Page(
  'home',
  init,
  camera
);
