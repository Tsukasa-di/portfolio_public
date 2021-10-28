import { CreateMesh } from '../../_libs/mesh';

export function torus() {
  const torus = new CreateMesh(
    new THREE.TorusGeometry(
      2,// radius : Float,
      1,// tube : Float,
      16,// radialSegments : Integer,
      16,// tubularSegments : Integer,
      // arc : Float
    ),
    new THREE.MeshBasicMaterial({
      color: 0x555555,
      wireframe: true
    })
  ).mesh();

  torus.name = 'torus';
  torus.position.set(
    8.0,
    1.4,
    -2.6
  );
  torus.rotation.set(
    2.4,
    0.15,
    1.12
  );
  return torus;
}
