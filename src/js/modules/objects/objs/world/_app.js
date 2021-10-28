import { star } from './star';
import { globalPlane } from './globalPlane';

export function world() {
  return {
    core: star(5, 'core'),
    star: star(60, 'star'),
    globalPlane: globalPlane()
  }
}
