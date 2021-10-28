import { LOADERS } from '../../../global/variables';

function photo_frames() {
  const group = new THREE.Group();
  LOADERS.MODELS.photo_frames.scene.children[0].children.forEach(mesh => {
    mesh.material.depthWrite = false;
    mesh.material.transparent = true;
    mesh.material.opacity = .2;
  });
  group.add(
    LOADERS.MODELS.photo_frames.scene,
  )
  group.scale.set(0.15, 0.15, 0.15);
  group.name = 'photo_frames';

  return group;
}

export { photo_frames };
