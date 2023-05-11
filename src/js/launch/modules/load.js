import { INST, STATUS } from "../../global/objects";
import { SCREEN } from "../../global/screen";
import { StageOperator } from "../../stage/app";
import { AudioMaster } from "../../audio/app";
import { Cursor } from "../../_libs/ui/cursor";
import { Modal } from "../../_libs/modal/app";
import { BgmMaster } from "../../audio/bgm";
import { Spa } from "../../_libs/spa/app";
import { DOM } from "../../global/dom";
import { OP } from "../../_libs/operator/node";

export function _load(launch) {
  return Promise.all([
    _sound(launch.status)
      .then( flag => {
        console.log('sound: ', flag);
        if (flag) launch.progress++;
      }),
    _audio(launch.status)
      .then( flag => { 
        console.log('audio: ', flag);
        if (flag) launch.progress++;
      }),
    _spa(launch.status)
      .then( flag => { 
        console.log('spa: ', flag);
        if (flag) launch.progress++;
      }),
    _instances(launch.status)
      .then( flag => { 
        console.log('instances: ', flag);
        if (flag) launch.progress++;
      })
  ]);
}

function _sound(status) {
  return new Promise( resolve => {
    if (SCREEN.MINI()) {

      resolve(true);
      STATUS.audio.active = false;
      DOM.body.classList.add('SOUND_OFF');

    } else { 
      [
        OP.node.qs('.sound-on', DOM.SOUND), 
        OP.node.qs('.sound-off', DOM.SOUND)
      ].forEach( el => {
        OP.node.on(el, 'click', event => {
          DOM.SOUND.style.transition = 'all 1.2s';
          DOM.SOUND.style.opacity = 0;
          DOM.SOUND.style.pointerEvents = 'none';
          if (event.target.dataset.sound == 'on') {
            STATUS.audio.active = true;
            DOM.body.classList.add('SOUND_ON');
          } else {
            STATUS.audio.active = false;
            DOM.body.classList.add('SOUND_OFF');
          };
          INST.bgmMaster.init().then( flag => {
            status.sound = flag;
            resolve(status.sound);
          });
        });
      });

    }
  });
}

function _audio(status) {
  return new Promise( resolve => {
    INST.audioMaster = new Proxy(
      new AudioMaster(),
      {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver);
        }
      }
    );
    INST.bgmMaster = new Proxy(
      new BgmMaster(),
      {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver);
        }
      }
    );
    INST.audioMaster.init().then( flag => {
      status.audio = flag;
      resolve(status.audio);
    });
  });
}

function _spa(status) {
  return new Promise( resolve => {
    INST.spa = new Spa();
    INST.spa.init().then( flag => {
      status.spa = flag;
      resolve(status.spa);
    });
  });
}

function _instances(status) {
  return new Promise( resolve => {
    INST.stageOperator = new StageOperator();
    INST.stageOperator.init();
    INST.cursor = new Cursor('CURSOR_HOVER', 'CURSOR_CLICK');
    INST.modal = new Modal('.MENU_BUTTON, .MODAL_BUTTON');
    if (!SCREEN.TABLET()) INST.cursor.init();
    INST.modal.init();
    status.instances = true;
    resolve(status.instances);
  });
}
