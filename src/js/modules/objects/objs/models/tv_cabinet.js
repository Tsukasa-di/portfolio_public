import { LOADERS } from '../../../global/variables';

function tv_cabinet() {
  const group = new THREE.Group();
  LOADERS.MODELS.tv_cabinet.scene.children[0].children.forEach( mesh => {
    mesh.material.wireframe = true;
    mesh.material.depthWrite = true;
    mesh.material.transparent = true;
    mesh.material.opacity = .5;
  });
  LOADERS.MODELS.tv_cabinet.scene.scale.set(0.25, 0.25, 0.25);

  group.add(
    LOADERS.MODELS.tv_cabinet.scene,
  );
  group.name = 'tv_cabinet';

  return group;
}

export { tv_cabinet };
