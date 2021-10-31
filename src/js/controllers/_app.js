import { SCREEN } from "../modules/global/variables";
import { settings } from "../modules/objects/settings/_app";

export const CTRL = {
  camera: {
    type: 'auto',
    log: false
  },
  rendering: {
    works: true,
    about: true,
    home:  true
  },
  audios: {
    bgm: true
  },
  gui: {
    toggle: {
      datGui: false,
      stats: false
    },
    set() {
      import('../modules/ui/dat.gui').then( m => {
        // m.GUI.PosRot(m.GUI, settings.works.teddy, 'teddy');
        // m.GUI.light(m.GUI, settings.works.globalLight, 'globalLight');
        // m.GUI.light(m.GUI, settings.works.spotLight, 'spotLight');
      });
    }
  },
  settings: {
    slider() {
      const settings = {
        el: document.querySelector('.MODULES-slider')
      };
      if (SCREEN.TABLET()) settings.param = {
        slide: {
          margin: 10,
          width: 280
        }
      }; else if (SCREEN.WIDTH() <= 1366) settings.param = {
        slide: {
          margin: 20,
          width: 440
        }
      }; else settings.param = {
        slide: {
          margin: 20,
          width: 640
        }
      };
      return settings;
    }
  }
}
