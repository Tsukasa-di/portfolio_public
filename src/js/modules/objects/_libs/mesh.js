export class CreateMesh {
  constructor(geom, mat) {
    this.geom = geom;
    this.mat = mat;
  }

  mesh() {
    const mesh = new THREE.Mesh(
      this.geom,
      this.mat
    )
    return mesh;
  }
}
