import { SCENE } from "../../global/variables";
import { Setter } from "./_libs/setter";
import { about } from "./about/_app";
import { opening } from "./opening/_app";
import { defaults } from "./defaults/_app";
import { works } from "./works/_app";
import { CTRL } from "../../../controllers/_app";

const settings = {
  opening: opening,
  about: about,
  works: works,
  defaults: defaults,
  set: {
    opening: () => {
      entrySetter(settings.opening);
    },
    about: () => {
      entrySetter(settings.about);
    },
    works: () => {
      entrySetter(settings.works);
        SCENE.getObjectByName('laptop').children[0].children.forEach( mesh => {
          mesh.material.transparent = true;
          mesh.material.opacity = .65;
        });
    }
  },
  gui() { CTRL.gui.set(); }
}

const setter = new Setter();
function entrySetter(settings) {
  Object.entries(settings).forEach(entry => {
    setter.scanning(entry[1], SCENE.getObjectByName(entry[0]));
  });
}

export { settings };
