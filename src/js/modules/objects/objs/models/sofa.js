import { LOADERS } from '../../../global/variables';

function sofa() {
  const group = new THREE.Group();
  LOADERS.MODELS.sofa.scene.children[0].children.forEach( mesh => {
    mesh.material.wireframe = false;
    mesh.material.depthWrite = true;
    mesh.material.transparent = true;
    mesh.material.opacity = .4;
  });
  group.add(
    LOADERS.MODELS.sofa.scene,
  )
  group.scale.set(0.1, 0.1, 0.1);
  group.name = 'sofa';

  return group;
}

export { sofa };
