// Composer
// ----------------------------------------
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { MaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

// Modules
// ----------------------------------------

import { GUI } from '../../ui/dat.gui';
import { RENDERER, CAMERA, SCENE } from '../../global/variables';
import { composer } from '../_app';

const setting = {
  film: {
    scanlinesIntensity: 0.23,
    noiseIntensity: 0.4,
    grayscale: false,
    scanlinesCount: 32
  },
  bloom: {
    strength: 5.1,
    kernelSize: 10,
    sigma: 1.0,
    resolution: 500
  },
  dot: {
    centerX: 0.5,
    centerY: 0.5,
    angle: 1.57,
    scale: 1
  }
}

GUI.controls.effects = {
  setting: setting,
  update: {
    film: function () {
      composer.effects.film.uniforms.grayscale.value = GUI.controls.effects.setting.film.grayscale;
      composer.effects.film.uniforms.nIntensity.value = GUI.controls.effects.setting.film.noiseIntensity;
      composer.effects.film.uniforms.sIntensity.value = GUI.controls.effects.setting.film.scanlinesIntensity;
      composer.effects.film.uniforms.sCount.value = GUI.controls.effects.setting.film.scanlinesCount;
    },
    bloom: function () {
      composer.effects.bloom = new BloomPass(
        GUI.controls.effects.setting.bloom.strength,
        GUI.controls.effects.setting.bloom.kernelSize,
        GUI.controls.effects.setting.bloom.sigma,
        GUI.controls.effects.setting.bloom.resolution
      );
      composer.effect = new EffectComposer(RENDERER);
      composer.effect.addPass(composer.renderPass);
      composer.effect.addPass(composer.effects.bloom);
      composer.effect.addPass(composer.effects.copy);
    },
    dot: function () {
      var dotScreenPass = new THREE.DotScreenPass(new THREE.Vector2(controls.centerX, controls.centerY), controls.angle, controls.scale);
      composer1 = new THREE.EffectComposer(webGLRenderer);
      composer1.addPass(renderScene);
      composer1.addPass(dotScreenPass);
      composer1.addPass(effectCopy);
    }
  }
}
GUI.guis.effects = GUI.gui.addFolder('effects');
GUI.guis.effects.bloom = GUI.guis.effects.addFolder('bloom');
GUI.guis.effects.bloom.add(GUI.controls.effects.setting.bloom, 'strength', 1, 10).onChange(GUI.controls.effects.update.bloom);
GUI.guis.effects.bloom.add(GUI.controls.effects.setting.bloom, 'kernelSize', 1, 100).onChange(GUI.controls.effects.update.bloom);
GUI.guis.effects.bloom.add(GUI.controls.effects.setting.bloom, 'sigma', 1, 10).onChange(GUI.controls.effects.update.bloom);
GUI.guis.effects.bloom.add(GUI.controls.effects.setting.bloom, 'resolution', 0, 1024).onChange(GUI.controls.effects.update.bloom);

GUI.guis.effects.film = GUI.guis.effects.addFolder('film');
GUI.guis.effects.film.add(GUI.controls.effects.setting.film, 'scanlinesIntensity', 0, 1).onChange(GUI.controls.effects.update.film);
GUI.guis.effects.film.add(GUI.controls.effects.setting.film, 'noiseIntensity', 0, 3).onChange(GUI.controls.effects.update.film);
GUI.guis.effects.film.add(GUI.controls.effects.setting.film, 'grayscale').onChange(GUI.controls.effects.update.film);
GUI.guis.effects.film.add(GUI.controls.effects.setting.film, 'scanlinesCount', 0, 2048).step(1).onChange(GUI.controls.effects.update.film);

GUI.guis.effects.dot = GUI.guis.effects.addFolder('dot');
GUI.guis.effects.dot.add(GUI.controls.effects.setting.dot, 'centerX', 0, 1).onChange(GUI.controls.effects.update.dot);
GUI.guis.effects.dot.add(GUI.controls.effects.setting.dot, 'centerY', 0, 1).onChange(GUI.controls.effects.update.dot);
GUI.guis.effects.dot.add(GUI.controls.effects.setting.dot, 'angle', 0, 3.14).onChange(GUI.controls.effects.update.dot);
GUI.guis.effects.dot.add(GUI.controls.effects.setting.dot, 'scale', 0, 10).onChange(GUI.controls.effects.update.dot);

GUI.controls.effects.update.film();
