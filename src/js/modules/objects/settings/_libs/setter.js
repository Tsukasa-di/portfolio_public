export class Setter {
  constructor() {
    this.settings;
    this.target;
    this.prop;
    this.props = [];
    this.value;
    this.flag;
  }

  _setting() {
    this.target[this.prop] = this.value;
  }

  scanning(settings, target) {
    this.settings = settings;
    this.target = target;
    Object.entries(this.settings).forEach( entry => {
      if (entry[1].constructor.name === 'Object') {
        if (entry[0] == 'position') this._position(entry[1]);
        else if (entry[0] == 'rotation') this._rotation(entry[1]);
        else if (entry[0] == 'scale') this._scale(entry[1]);
        else if (entry[0] == 'target') this._target(entry[1]);
        else if (entry[0] == 'font') ;
      } else {
        this.prop = entry[0];
        this.value = entry[1]
        this._setting();
      }
    });
  }

  _position(pos) {
    this.target.position.set(pos.x, pos.y, pos.z);
  }

  _rotation(rot) {
    this.target.rotation.set(rot.x, rot.y, rot.z);
  }

  _scale(scale) {
    this.target.scale.set(scale.x, scale.y, scale.z);
  }

  _target(targetPos) {
    this.target.target.position.set(
      targetPos.position.x,
      targetPos.position.y,
      targetPos.position.z,
    );
  }
}
