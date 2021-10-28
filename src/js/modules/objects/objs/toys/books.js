import { LOADERS } from '../../../global/variables';

export function books() {
  const books = LOADERS.MODELS.books.scene;
  const mesh = books.children[0].children.forEach(mesh => {
    mesh.material.wireframe = false;
    mesh.material.depthWrite = true;
  });
  books.scale.set(0.15, 0.15, 0.15);
  books.position.x = 7.3;
  books.position.z = 8.5;
  books.rotation.y = -0.68;
  books.name = 'books'
  return books;
}
