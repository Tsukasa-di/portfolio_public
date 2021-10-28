import { LOADERS } from '../../../global/variables';

export function laptop() {
  const laptop = LOADERS.MODELS.laptop.scene;
  const mesh = laptop.children[0].children.forEach(mesh => {
    mesh.material.wireframe = false;
    mesh.material.depthWrite = true;
  });
  laptop.scale.set(0.15, 0.15, 0.15);

  laptop.name = 'laptop';
  return laptop;
}
