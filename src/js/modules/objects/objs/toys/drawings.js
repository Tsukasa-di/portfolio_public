import { LOADERS } from '../../../global/variables';
import { CreateMesh } from '../../_libs/mesh';

export function drawing_vehicle() {
  const group = new THREE.Group();

  function template(texture) {
    const plane = new CreateMesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({
        map: texture,
        depthWrite: false,
        transparent: true,
        opacity: 1
      })
    ).mesh();

    return plane;
  }

  const drawing_vehicle01 = template(LOADERS.TEXTURES['cars']);

  group.add(
    drawing_vehicle01
  );
  group.name = 'drawing_vehicle';

  return group;
}
