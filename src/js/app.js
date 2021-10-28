import '../assets/sass/app.scss';

import './modules/objects/_app';
import { onCursor, onMouseMove } from './modules/global/events';
import { OBJECTS, SCREEN, STATUS } from './modules/global/variables';
import { launch } from './modules/launch/_app';
import { RENDERING } from './modules/renderings/_app';
import { currentRootDir } from './_libs/processing/currentRootDir';
import { settings } from './modules/objects/settings/_app';

window.onload = () => {
  launch(init);
}

function init() {

  console.log(
    '\n\n' +
    'Hello Tsukasa Tomioka\n' +
    '  Portfolio Site.\n' +
    '\n\n'
  );
  onCursor.init();

  // ========================================
  // Scene
  // ========================================

  OBJECTS.op[currentRootDir()].add();
  settings.gui();

  // ========================================
  // Animation
  // ========================================

  STATUS.render[currentRootDir()] = false;
  RENDERING[currentRootDir()]();
  document.addEventListener('mousemove', onMouseMove, false);
}
