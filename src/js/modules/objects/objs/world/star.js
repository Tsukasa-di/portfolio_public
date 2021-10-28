import { LOADERS } from '../../../global/variables';

export function star(radius, type) {
  function create(texture, val, size, opacity) {
    const positions = [];

    const mat = new THREE.PointsMaterial({
      size: size,
      depthWrite: false,
      map: texture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: opacity,
      fog: false
    });

    const geom = new THREE.BufferGeometry();

    for (let i = 0; i < val; i++) {
      const cosTheta = -2.0 * Math.random() + 1.0;
      const sinTheta = Math.sqrt(1.0 - cosTheta * cosTheta);
      const phi = 2.0 * Math.PI * Math.random();

      const x = (sinTheta * Math.cos(phi)) * radius;
      const y = (sinTheta * Math.sin(phi)) * radius;
      const z = (cosTheta) * radius;

      positions.push(x);
      positions.push(y);
      positions.push(z);
    }

    const positionsArray = new Float32Array(positions);
    geom.setAttribute('position', new THREE.BufferAttribute(positionsArray, 3));

    const particle = new THREE.Points(geom, mat);
    return particle;
  }

  const group = new THREE.Group();

  if (type === 'core') group.add(
    create(LOADERS.TEXTURES['star_blue'], 40, 6, 1.0),
    create(LOADERS.TEXTURES['star_orange'], 100, 5, 1.0),
    create(LOADERS.TEXTURES['star_white'], 100, 1.5, .7),
    create(LOADERS.TEXTURES['star_green'], 20, 2, .7),
    create(null, 170, 0.1, .8),
  ); else group.add(
    create(LOADERS.TEXTURES['star_blue'], 30, 8,  .37),
    create(LOADERS.TEXTURES['star_orange'], 150, 4.5,  .37),
    create(LOADERS.TEXTURES['star_white'], 30, 3, .37),
    create(null, 170, 0.2, .3)
  );

  group.name = type;

  if (type === 'core') {
    const wrapper = new THREE.Group();
    wrapper.name = 'wrapper';
    wrapper.add(
      group,
      (function () {
        const mesh = new THREE.Mesh(
          new THREE.SphereGeometry(radius+2),
          new THREE.MeshBasicMaterial({
            transparent: true,
            opacity: 0
          })
        );
        mesh.name = 'core-raycaster'
        return mesh;
      })()
    );
    return wrapper;
  } else return group;
}
