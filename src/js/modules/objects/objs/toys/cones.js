import { CreateMesh } from '../../_libs/mesh';

export function cylinder() {
  const cylinder = new CreateMesh(
    new THREE.CylinderGeometry(2, 2, 5, 15),
    new THREE.MeshNormalMaterial({
      wireframe: true
    })
  ).mesh();

  cylinder.name = 'cylinder';
  cylinder.position.set(
    -5.9,
    2.7,
    -2.6
  );
  return cylinder;
}

export function cone() {
  const group = new THREE.Group();

  const cone = new CreateMesh(
    new THREE.ConeGeometry(1, 2.5, 12),
    new THREE.MeshNormalMaterial({
      wireframe: false
    })
  ).mesh();

  cone.name = 'cone';
  cone.position.set(
    -10.6,
    0.7,
    0.7
  );
  cone.rotation.set(
    2,
    0,
    0
  );

  const copy = cone.clone();
  copy.position.set(
    -7.9,
    0.7,
    0.7
  );
  cone.rotation.set(
    2,
    0,
    1
  );

  group.add(cone, copy);
  return group;
}
