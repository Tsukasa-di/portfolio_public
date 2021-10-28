import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Loader } from './loader';
import { members } from './members';

export const loaders = [
  new Loader(
    'TEXTURES',
    new THREE.TextureLoader(),
    members.TEXTURES
  ).load(),
  new Loader(
    'FONTS',
    new THREE.FontLoader(),
    members.FONTS
  ).load(),
  new Loader(
    'MODELS',
    new GLTFLoader(),
    members.MODELS
  ).load()
];
