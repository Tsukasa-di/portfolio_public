import { LOADERS } from "../../../global/variables";

export function basic(name, setting, mat) {
  const geom = new THREE.TextGeometry(setting.text, {
    font: LOADERS.FONTS['Roboto-Thin_Regular'],
    size: setting.size,
    height: setting.height,
    curveSegments: setting.curveSegments,
    bevelEnabled: setting.bevelEnabled,
    bevelThickness: setting.bevelThickness,
    bevelSize: setting.bevelSize,
    bevelOffset: setting.bevelOffset,
    bevelSegments: setting.bevelSegments,
  });
  console.log(geom);
  geom.computeBoundingBox();
  const width = geom.boundingBox.max.x - geom.boundingBox.min.x;
  const height = geom.boundingBox.max.y - geom.boundingBox.min.y;
  const mesh = new THREE.Mesh(geom, mat);
  mesh.name = name;

  const data = {
    width: width,
    height: height
  };

  return {
    mesh: mesh,
    data: data
  }
}
