import { CreateMesh } from "../../_libs/mesh";

export function globalPlane() {
  const plane = new CreateMesh(
    new THREE.CircleGeometry(25, 32, 0),
    new THREE.MeshLambertMaterial({
      color: 0xCCCCCC,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: .3,
      fog: true
    })
  ).mesh();
  plane.rotation.x = (1 / 2 * Math.PI);
  plane.name = 'globalPlane';

  return plane;
}
