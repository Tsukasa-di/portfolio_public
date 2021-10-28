import { spotLights } from "./spot";

export function lights() {
  return {
    spotLight: spotLights._1('spotLight'),
    globalLight: spotLights._2('globalLight')
  }
}
