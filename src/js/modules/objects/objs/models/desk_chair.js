import { LOADERS } from '../../../global/variables';

function desk_chair() {
  const group = new THREE.Group();

  const mesh = LOADERS.MODELS.desk_chair.scene.children[0];
  mesh.material.wireframe = false;
  mesh.material.depthWrite = true;
  mesh.material.transparent = true;
  mesh.material.opacity = .5;
  LOADERS.MODELS.desk_chair.scene.scale.set(0.05, 0.05, 0.05);

  group.add(
    LOADERS.MODELS.desk_chair.scene
  );

  group.name = 'desk_chair';
  group.visible = true;
  return group;
}

export { desk_chair };
