import { CTRL } from "../../../controllers/_app";
import { SCENE, STATUS } from "../../global/variables";
import { lightBlinking } from "../works/lightBlinking";
import { basic } from "../_libs/basic";

let degree = 0;

export function works() {
  if (!CTRL.rendering.works) STATUS.render.works = false;
  basic('works', custom);
}

function custom() {
  degree += 0.00015;

  // objects
  // ------------------------------------------
  if (SCENE.getObjectByName('star')) SCENE.getObjectByName('star').rotation.set(
    degree,
    degree,
    degree
  );

  if (SCENE.getObjectByName('globalLight')) lightBlinking();
}
