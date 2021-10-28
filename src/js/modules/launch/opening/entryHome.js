import { currentRootDir } from "../../../_libs/processing/currentRootDir";
import { disposer } from "../../../_libs/processing/disposer";
import { fixIndex } from "../../../_libs/processing/fixIndex";
import { PATHS, SCENE, STATUS } from "../../global/variables";
import { PAGES } from "../../pages/_app";
import { react } from "../../transition/spa/react";
import { SPA } from "../../transition/spa/_app";
import { entry } from "../entry/_app";

export function entryHome(init) {
  disposer(
    SCENE.getObjectByName('OPENING')
  );
  SCENE.remove(
    SCENE.getObjectByName('OPENING')
  );
  document.querySelector('.GLOBAL').style.opacity = 1;
  entry();
  setTimeout(() => {
    STATUS.render.init = true;
    react(SPA.docs[PATHS.root.replace(location.origin, '') + 'index.html'], fixIndex('/'), 'home', false);
    PAGES[currentRootDir()].camera();
    init();
  }, 1200);
}
