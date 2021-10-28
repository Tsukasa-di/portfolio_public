import { LOADERS } from '../../../global/variables';

function desk() {
  const group = new THREE.Group();

  const mesh = LOADERS.MODELS.desk.scene.children[0];
  mesh.material.wireframe = false;
  mesh.material.depthWrite = true;
  mesh.material.transparent = true;
  mesh.material.opacity = .4;
  LOADERS.MODELS.desk.scene.scale.set(0.08, 0.08, 0.08);

  group.add(
    LOADERS.MODELS.desk.scene
  );

  group.name = 'desk';
  group.visible = true;
  return group;
}

export { desk };
