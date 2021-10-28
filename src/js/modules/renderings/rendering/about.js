import { CTRL } from "../../../controllers/_app";
import { SCENE, STATUS } from "../../global/variables";
import { lightBlinking } from "../about/lights/lightBlinking";
import { changer } from "../about/type/changer";
import { Type } from "../about/type/_app";
import { basic } from "../_libs/basic";

let degree = 0;
let type;

export function about() {
  if (!CTRL.rendering.about) STATUS.render.about = false;
  basic('about', custom, init);
}

function init() {
  const initType = 'profile';
  document.querySelectorAll('.changers p').forEach( el => {
    if (el.dataset.changer === initType) el.classList.add('active');
  });
  type = new Type();
  type.init();
  type.set(initType);
  changer(type);
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

  if (type) type.animate();

  if (SCENE.getObjectByName('globalLight')) lightBlinking();
}
