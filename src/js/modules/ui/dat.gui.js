import { CTRL } from '../../controllers/_app';
import { disposer } from '../../_libs/processing/disposer';
import * as dat from '../../_libs/ui/dat.gui';
// https://github.com/dataarts/dat.gui
import { SCENE } from '../global/variables';
import { basic } from '../objects/templates/fonts/basic';

let GUI;

function CreateGUI() {
  this.controls = {};
  this.gui = new dat.GUI();
  this.guis = {};
  this.helpers = {};
  this.update = () => {
    if (this.helpers) Object.keys(this.helpers).forEach(key => { this.helpers[key].update(); } );
  };
  // 「position, rotation」用のGUI
  // ------------------------------------------
  this.PosRot = function(GUI, setting, name) {
    GUI.controls[name] = {
      setting: setting
    };
    GUI.guis[name] = GUI.gui.addFolder(name);
    PosRot(GUI, name);
  };
  // light用のGUI
  // ------------------------------------------
  this.light = function(GUI, setting, name) {
    if (SCENE.getObjectByName(name + '_helper')) {
      this.helpers[name] = SCENE.getObjectByName(name + '_helper');
    };
    GUI.controls[name] = {
      setting: setting
    };
    GUI.guis[name] = GUI.gui.addFolder(name);
    GUI.guis[name].position = GUI.guis[name].addFolder('position');
    GUI.guis[name].target = GUI.guis[name].addFolder('target');
    GUI.guis[name].position.add(GUI.controls[name].setting.position, 'x', -30, 30).onChange(value => {
      change(SCENE.getObjectByName(name), 'position', 'x', value);
    });
    GUI.guis[name].position.add(GUI.controls[name].setting.position, 'y', -30, 30).onChange(value => {
      change(SCENE.getObjectByName(name), 'position', 'y', value);
    });
    GUI.guis[name].position.add(GUI.controls[name].setting.position, 'z', -30, 30).onChange(value => {
      change(SCENE.getObjectByName(name), 'position', 'z', value);
    });
    GUI.guis[name].target.add(GUI.controls[name].setting.target.position, 'x', -30, 30).onChange(value => {
      change(SCENE.getObjectByName(name).target, 'position', 'x', value);
    });
    GUI.guis[name].target.add(GUI.controls[name].setting.target.position, 'y', -30, 30).onChange(value => {
      change(SCENE.getObjectByName(name).target, 'position', 'y', value);
    });
    GUI.guis[name].target.add(GUI.controls[name].setting.target.position, 'z', -30, 30).onChange(value => {
      change(SCENE.getObjectByName(name).target, 'position', 'z', value);
    });
    GUI.guis[name].addColor(GUI.controls[name].setting, 'color').onChange( c => {
      SCENE.getObjectByName(name).color = new THREE.Color(c.r, c.g, c.b);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'intensity', 0, 10).onChange( value => {
      SCENE.getObjectByName(name).intensity = value;
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'decay', 0, 10).onChange( value => {
      SCENE.getObjectByName(name).decay = value;
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'distance', 0, 500).onChange( value => {
      SCENE.getObjectByName(name).distance = value;
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'angle', 0, 2*Math.PI).onChange( value => {
      SCENE.getObjectByName(name).angle = value;
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'penumbra', 0, 1).onChange( value => {
      SCENE.getObjectByName(name).penumbra = value;
    });
  }
  // font用のGUI
  // ------------------------------------------
  this.font = function (GUI, setting, name, parentName, mat) {
    GUI.controls[name] = {
      setting: setting
    };
    GUI.guis[name] = GUI.gui.addFolder(name);
    GUI.guis[name].add(GUI.controls[name].setting, 'text').onChange( value => {
      GUI.controls[name].setting.text = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'size', 0, 10).onChange( value => {
      GUI.controls[name].setting.size = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'height', 0, 10).onChange( value => {
      GUI.controls[name].setting.height = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'curveSegments', 0, 10).onChange( value => {
      GUI.controls[name].setting.curveSegments = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'bevelEnabled').onChange( value => {
      GUI.controls[name].setting.bevelEnabled = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'bevelThickness', 0, 1).onChange( value => {
      GUI.controls[name].setting.bevelThickness = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'bevelSize', 0, 1).onChange( value => {
      GUI.controls[name].setting.bevelSize = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'bevelOffset', 0, 1).onChange( value => {
      GUI.controls[name].setting.bevelOffset = value;
      create(GUI.controls[name].setting);
    });
    GUI.guis[name].add(GUI.controls[name].setting, 'bevelSegments', 0, 10).onChange( value => {
      GUI.controls[name].setting.bevelSegments = value;
      create(GUI.controls[name].setting);
    });

    function create(setting) {
      const font = basic(name, setting, mat);
      const remover = SCENE.getObjectByName(name);
      const parent = SCENE.getObjectByName(parentName);
      parent.remove(remover);
      disposer(remover);
      parent.add(font.mesh);
      console.log(font.mesh);
    }
  },
  this.set = function(GUI, obj, name) {
    obj.position.set(
      GUI.controls[name].setting.position.posX,
      GUI.controls[name].setting.position.posY,
      GUI.controls[name].setting.position.posZ
    );
    obj.rotation.set(
      GUI.controls[name].setting.rotation.rotX,
      GUI.controls[name].setting.rotation.rotY,
      GUI.controls[name].setting.rotation.rotZ
    );
  }
}

function change(obj, target, axis, value) {
  obj[target][axis] = value;
}

function PosRot(GUI, name) {
  GUI.guis[name].position = GUI.guis[name].addFolder('position');
  GUI.guis[name].rotation = GUI.guis[name].addFolder('rotation');
  GUI.guis[name].position.add(GUI.controls[name].setting.position, 'x', -80, 80).onChange(value => {
    change(SCENE.getObjectByName(name), 'position', 'x', value);
  });
  GUI.guis[name].position.add(GUI.controls[name].setting.position, 'y', -80, 80).onChange(value => {
    change(SCENE.getObjectByName(name), 'position', 'y', value);
  });
  GUI.guis[name].position.add(GUI.controls[name].setting.position, 'z', -80, 80).onChange(value => {
    change(SCENE.getObjectByName(name), 'position', 'z', value);
  });
  GUI.guis[name].rotation.add(GUI.controls[name].setting.rotation, 'x', -Math.PI * 2, Math.PI * 2).onChange(value => {
    change(SCENE.getObjectByName(name), 'rotation', 'x', value);
  });
  GUI.guis[name].rotation.add(GUI.controls[name].setting.rotation, 'y', -Math.PI * 2, Math.PI * 2).onChange(value => {
    change(SCENE.getObjectByName(name), 'rotation', 'y', value);
  });
  GUI.guis[name].rotation.add(GUI.controls[name].setting.rotation, 'z', -Math.PI * 2, Math.PI * 2).onChange(value => {
    change(SCENE.getObjectByName(name), 'rotation', 'z', value);
  });
}

if (CTRL.gui.toggle.datGui) GUI = new CreateGUI();

export { GUI };
