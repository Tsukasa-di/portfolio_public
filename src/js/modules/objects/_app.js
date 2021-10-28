import { OBJECTS } from "../global/variables";
import { SceneAddition } from "./_libs/sceneAddition";
import { settings } from "./settings/_app";
import { toys } from "./objs/toys/_app";
import { models } from "./objs/models/_app";
import { world } from "./objs/world/_app";
import { lights } from "./objs/lights/_app";
import { launch } from "./launch";
import { fonts } from "./objs/fonts/_app";

class Creator {
  constructor() {
    this.targets = {};
  }

  init() {
    this.targets = {
      lights: lights,
      toys: toys,
      models: models,
      world: world,
    }
  }

  create() {
    Object.entries(this.targets).forEach(entry => {
      OBJECTS[entry[0]] = entry[1]();
    });
    return OBJECTS;
  }
}

class OPENING extends SceneAddition {
  constructor(name = 'Objects Group') {
    super(name);
    this.setting = () => {
      settings.set.opening();
    }
  }

  listing() {
    this.creations.push(
      OBJECTS.lights.spotLight,
      OBJECTS.lights.globalLight,
    )
  }
}

class HOME extends SceneAddition {
  constructor(name = 'Objects Group') {
    super(name);
  }

  listing() {
    this.creations.push(
      OBJECTS.world.core
    )
  }
}

class ABOUT extends SceneAddition {
  constructor(name = 'Objects Group') {
    super(name);
    this.setting = () => {
      settings.set.about();
    }
  }

  listing() {
    this.creations.push(
      OBJECTS.world.globalPlane,
      // OBJECTS.world.plane,
      OBJECTS.world.star,
      OBJECTS.lights.spotLight,
      OBJECTS.lights.globalLight,
      // OBJECTS.models.laptop,
      OBJECTS.models.staircase,
      OBJECTS.models.photo_frames,
      OBJECTS.models.jet,
      OBJECTS.models.sofa,
      OBJECTS.toys.teddy,
      OBJECTS.toys.drawing_vehicle,
      // OBJECTS.fonts.profile,
      // OBJECTS.fonts.workFeeling
    )
  }
}

class WORKS extends SceneAddition {
  constructor(name = 'Objects Group') {
    super(name);
    this.setting = () => {
      settings.set.works();
    }
  }

  listing() {
    this.creations.push(
      OBJECTS.world.star,
      OBJECTS.world.globalPlane,
      OBJECTS.lights.spotLight,
      OBJECTS.lights.globalLight,
      OBJECTS.models.desk,
      OBJECTS.models.desk_chair,
      OBJECTS.models.teddy,
      OBJECTS.models.book_holder,
      OBJECTS.models.tv_cabinet,
      OBJECTS.models.laptop,
    )
  }
}

OBJECTS.creator = new Creator();
OBJECTS.op.opening = new OPENING('OPENING');
OBJECTS.op.home = new HOME('HOME');
OBJECTS.op.about = new ABOUT('ABOUT');
OBJECTS.op.works = new WORKS('WORKS');
OBJECTS.launch = launch;
