import { basic } from "../../templates/fonts/basic";

export function font(name, setting) {
  const group = new THREE.Group();
  const font = basic(
    'font_' + name,
    setting,
    new THREE.MeshBasicMaterial({
      wireframe: true,
      color: 0x777777
    })
  );

  const line = new THREE.Mesh(
    new THREE.BoxGeometry(font.data.width, 0.2, 0.2, 10, 10, 10),
    new THREE.MeshBasicMaterial({
      color: 0xCF70CB,
      transparent: true,
      opacity: 0
    })
  );
  line.position.set(
    font.data.width / 2,
    font.data.height / 2 - 0.3,
    0.2
  );
  line.name = 'line_' + name;

  const raycaster = new THREE.Mesh(
    new THREE.BoxGeometry(font.data.width, font.data.height+2, 1),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0
    })
  );
  raycaster.position.set(
    font.data.width / 2,
    font.data.height / 2 - 1,
    -1
  );
  raycaster.name = 'raycaster_' + name;

  group.add(
    raycaster,
    line,
    font.mesh
  );
  group.name = name;
  return group;
}
