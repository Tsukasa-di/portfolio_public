import { LOADERS } from '../../../global/variables';

function staircase() {
  const group = new THREE.Group();
  const mesh = LOADERS.MODELS.staircase.scene.children[0];
  mesh.material.wireframe = true;
  mesh.material.depthWrite = true;
  mesh.material.transparent = true;
  mesh.material.opacity = .3;
  group.add(
    LOADERS.MODELS.staircase.scene
  );
  group.scale.set(0.25, 0.25, 0.25);

  group.name = 'staircase';
  group.visible = true;
  return group;
}

export { staircase };
