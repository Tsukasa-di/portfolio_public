import { LOADERS } from "../../../global/variables";

export function laptop() {
  const group = new THREE.Group();

  const laptop = LOADERS.MODELS.laptop.scene;
  laptop.children[0].children.forEach(mesh => {
    mesh.material.wireframe = false;
    mesh.material.depthWrite = true;
  });
  laptop.scale.set(0.5, 0.5, 0.5);
  laptop.rotation.y = Math.PI;
  laptop.name = 'laptop';

  const screen = new THREE.Mesh(
    new THREE.PlaneGeometry(11.6, 6.5, 10, 10),
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 })
  );
  screen.position.y = 5.3;
  screen.position.x = -0.2;
  screen.name = 'screen';

  group.add(
    laptop,
    screen
  );

  return group;
}
