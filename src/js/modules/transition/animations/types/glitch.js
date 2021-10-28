import { currentRootDir } from '../../../../_libs/processing/currentRootDir';
import { OBJECTS, AUDIOS } from '../../../global/variables';
import { PAGES } from '../../../pages/_app';
import { sequence } from '../_libs/sequence';
import { Toggle } from '../../../effects/toggle/toggle';

export class Glitch {
  constructor(scene) {
    this._effect = new Toggle(AUDIOS.glitch);
    this._scene     = scene;
    this._counter   = 0;
  }

  async _animate(preName, nextName, pages, resolve) {
    await sequence(() => {
      this._effect.add('glitch');
    }, 0);
    await sequence(() => {
      this._effect.remove('glitch');
      OBJECTS.op[preName].remove();
    }, 500);
    await sequence(() => {
      OBJECTS.op[nextName].add();
      this._effect.add('glitch');
    }, 500);
    await sequence(() => {
      this._effect.remove('glitch');
      pages.camera();
      resolve('finish glitch animation.');
    }, 800);
  }

  trans(event, resolve) {
    const nextPageName = event.target.innerHTML.split(' ')[1];
    this._animate(
      currentRootDir(),
      nextPageName.toLowerCase(),
      PAGES[nextPageName.toLowerCase()],
      resolve
    );
  }
}
