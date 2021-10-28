import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PATHS, LOADERS, SCENE } from '../../global/variables';
import { laptop } from './scene/laptop';
import { lights } from './scene/lights';
import { plane } from './scene/plane';

export function prepare(resolve) {
  const path = PATHS.root + 'assets/models/laptop/laptop.glb';
  new GLTFLoader().load(path, item => {
    const splitSlash = path.split('/');
    const name = splitSlash[splitSlash.length - 1].split('.')[0]
    item.name = name;
    LOADERS.MODELS[name] = item;

    const opening = new THREE.Group();
    opening.add(
      laptop(),
      lights(),
      plane()
    );
    opening.name = 'OPENING';
    SCENE.add(opening);

    resolve(item);
  });
}
