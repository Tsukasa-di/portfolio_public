import { CTRL } from '../../controllers/_app';
import { Stats } from '../../_libs/ui/stats';
// https://github.com/mrdoob/stats.js

let stats;

function initStats() {
  const stats = new Stats();
  stats.setMode(0);
  const styles = { position: 'absolute', top: 0, left: 0 };
  Object.keys(styles).forEach(key => {
    stats.domElement.style[key] = styles[key];
  });
  document.querySelector('#stats').appendChild(stats.domElement);
  return stats;
}
if (CTRL.gui.toggle.stats) stats = initStats();

export { stats };
