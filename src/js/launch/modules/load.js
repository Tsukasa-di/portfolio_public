import { INST, STATUS } from "../../global/objects";
import { SCREEN } from "../../global/screen";
import { StageOperator } from "../../stage/app";
import { AudioMaster } from "../../audio/app";
import { Cursor } from "../../_libs/ui/cursor";
import { Modal } from "../../_libs/modal/app";
import { BgmMaster } from "../../audio/bgm";
import { Spa } from "../../_libs/spa/app";

export function _load(launch) {
  return Promise.all([
    _bgm(launch.status)
      .then( flag => { 
        console.log('bgm: ', flag);
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

function _bgm(status) {
  if (STATUS.audio.active) {
    return new Promise( resolve => {
      INST.audioMaster = new Proxy(
        new AudioMaster(),
        {
          get(target, prop, receiver) {
            if (STATUS.audio.active) return Reflect.get(target, prop, receiver);
            else return function() {};
          }
        }
      );
      INST.bgmMaster = new Proxy(
        new BgmMaster(),
        {
          get(target, prop, receiver) {
            if (STATUS.audio.active) return Reflect.get(target, prop, receiver);
            else return function() {};
          }
        }
      );
      INST.audioMaster.init();
      INST.bgmMaster.init().then( flag => {
        status.bgm = flag;
        resolve(status.bgm);
      });
    });
  } else {
    return new Promise( resolve => {
      resolve(true)
    });
  }
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
