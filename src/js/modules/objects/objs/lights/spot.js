import { settings } from "../../settings/_app";
import { SpotLight } from "../../templates/lights/spot";

function spotLight(name) {
  return new SpotLight(settings.defaults.light, name, false).create();
}

export const spotLights = {
  _1: spotLight,
  _2: spotLight
}
