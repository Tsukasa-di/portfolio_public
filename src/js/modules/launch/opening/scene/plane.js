export function plane() {
  const mesh = new THREE.Mesh(
    new THREE.CircleGeometry(25, 32, 0),
    new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: .8,
      fog: true
    })
  );
  mesh.rotation.x = (1 / 2 * Math.PI);

  return mesh;
}
