import { LOADERS } from '../../../global/variables';

function jet() {
  const group = new THREE.Group();

  LOADERS.MODELS.jet.scene.children[0].children.forEach( mesh => {
    mesh.material.wireframe = false;
    mesh.material.depthWrite = true;
  });
  LOADERS.MODELS.jet.scene.scale.set(2.1, 2.1, 2.1);

  group.add(
    LOADERS.MODELS.jet.scene
  );

  group.name = 'jet';
  group.visible = true;
  return group;
}

export { jet };
