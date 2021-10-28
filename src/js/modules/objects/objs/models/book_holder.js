import { LOADERS } from '../../../global/variables';

function book_holder() {
  const group = new THREE.Group();

  LOADERS.MODELS.book_holder.scene.children[0].children.forEach( mesh => {
    mesh.material.wireframe = false;
    mesh.material.depthWrite = true;
    mesh.material.transparent = true;
    mesh.material.opacity = .5;
  });
  LOADERS.MODELS.book_holder.scene.scale.set(0.07, 0.07, 0.07);

  group.add(
    LOADERS.MODELS.book_holder.scene
  );

  group.name = 'book_holder';
  group.visible = true;
  return group;
}

export { book_holder };
