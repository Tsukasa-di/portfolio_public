import { screen } from "./screen";

// Paths
// ----------------------------------------

const PATHS = {
  root: location.origin + '/'
}

// Status
// ----------------------------------------

const STATUS = {
  render: {
    init: true
  },
  home: {
    opening: true,
    raycaster: false
  },
  transition: {
    clear: true
  }
}

// Screen
// ----------------------------------------

const SCREEN = screen;

// Objects
// ----------------------------------------

const OBJECTS = {
  op: {}
};

// Audio
// ----------------------------------------

const AUDIOS = {};

// Loaders
// ----------------------------------------

const LOADERS = {
  TEXTURES  : {},
  FONTS     : {},
  MODELS    : {}
}

// Renderer
// ----------------------------------------
const CANVAS = document.querySelector('#dreams');
const RENDERER = new THREE.WebGLRenderer({
  canvas: CANVAS,
  alpha: true,
  powerPreference: 'high-performance'
});
RENDERER.shadowMap.enabled = true;
RENDERER.setSize(SCREEN.WIDTH(), SCREEN.HEIGHT());
RENDERER.setPixelRatio(window.devicePixelRatio);

// Scene
// ----------------------------------------
const SCENE = new THREE.Scene();
SCENE.fog = new THREE.Fog(0x222222, 10, 150);
const CAMERA = new THREE.PerspectiveCamera(45, SCREEN.WIDTH() / SCREEN.HEIGHT(), 1, 500);

export { CANVAS, RENDERER, SCENE, CAMERA, SCREEN, LOADERS, AUDIOS, OBJECTS, PATHS, STATUS };
