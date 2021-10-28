const setting = {
  global: {
    color: 0xFFFFFF,
    intensity: 0.61,
    decay: 3.61,
    distance: 216,
    angle: 0.74,
    penumbra: 0,
    position: {
      x: 0.01,
      y: 26.6,
      z: 0.01
    },
    target: {
      position: {
        x: 0.01,
        y: 0.01,
        z: 0.01
      }
    }
  },
  spot: {
    color: 0xCF70CB,
    intensity: 5.01,
    decay: 1.01,
    distance: 33,
    angle: 0.62,
    penumbra: 0.90121,
    position: {
      x: 7.701,
      y: 0.5,
      z: -6.41
    },
    target: {
      position: {
        x: 1.01,
        y: 2.311,
        z: 0.01
      }
    }
  }
}

function template(setting, name, helperToggle=false) {
  const group = new THREE.Group();

  const light = new THREE.SpotLight(
    setting.color,
    setting.intensity, // intensity : Float,
    setting.distance, // distance : Float,
    setting.angle, // angle : Radians,
    setting.penumbra, // penumbra : Float,
    setting.decay  // decay : Float
  );
  light.position.x = setting.position.x;
  light.position.y = setting.position.y;
  light.position.z = setting.position.z;
  light.target.updateMatrixWorld();
  light.target.position.set(
    setting.target.position.x,
    setting.target.position.y,
    setting.target.position.z
  );

  light.name = name;
  const helper = new THREE.SpotLightHelper(light);
  helper.name = name + '_helper';

  group.add(light);
  if (helperToggle) group.add(
    light.target,
    helper
  );

  return group;
}

export function lights() {
  const group = new THREE.Group();
  group.add(
    template(setting.global, 'globalLight'),
    template(setting.spot, 'spotLight')
  );
  return group;
}
