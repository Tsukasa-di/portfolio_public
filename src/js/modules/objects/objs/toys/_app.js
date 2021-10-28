import { books } from './books';
import { teddy } from './teddy';
import { torus } from './torus';
import { cone, cylinder } from './cones';
import { drawing_vehicle } from './drawings';

export function toys() {
  return {
    teddy: teddy(),
    drawing_vehicle: drawing_vehicle()
  }
}
