export class SpotLight {
  constructor(setting, name, helper=false) {
    this.setting = setting;
    this.name = name;
    this.helper = helper;
  }

  create() {
    const group = new THREE.Group();
    const light = new THREE.SpotLight(this.setting);

    light.position.x = this.setting.position.x;
    light.position.y = this.setting.position.y;
    light.position.z = this.setting.position.z;
    light.target.updateMatrixWorld();
    light.target.name = this.name + '_target'
    light.target.position.set(
      this.setting.target.position.x,
      this.setting.target.position.y,
      this.setting.target.position.z
    );

    light.name = this.name;
    const helper = new THREE.SpotLightHelper(light);
    helper.name = this.name + '_helper';

    group.add(
      light,
      light.target,
    );
    if (this.helper) group.add(helper);
    group.name = this.name + '_group';

    return group;
  }
}
