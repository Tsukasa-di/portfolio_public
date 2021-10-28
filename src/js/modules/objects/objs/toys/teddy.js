import { LOADERS } from '../../../global/variables';

export function teddy() {
  const teddy = LOADERS.MODELS.teddy.scene;
  const mesh = teddy.children[0];
  mesh.material.wireframe = false;
  mesh.material.depthWrite = true;
  teddy.scale.set(0.1, 0.1, 0.1);

  teddy.name = 'teddy';
  return teddy;
}
