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
import { RENDERER, CAMERA, SCENE } from "../global/variables";

class Composer {
  constructor(toggle) {
    this.renderPass = new RenderPass(SCENE, CAMERA);
    this.effects = {
      copy: new ShaderPass(CopyShader),
      film: new FilmPass(0.2, 0.74, 92, false),
      bloom: new BloomPass(3, 25, 5.0, 256),
      glitch: new GlitchPass(64),
    };
    this.effect = new EffectComposer(RENDERER);

    this.toggle = toggle;
  }

  update(delta) {
    if (this.toggle) this.effect.render(delta);
    else RENDERER.render(SCENE, CAMERA);
  }

  init() {
    this.effects.film.renderToScreen = true;
    this.effects.copy.renderToScreen = true;
    this.effects.glitch.renderToScreen = true;
    this.effects.glitch.goWild = true;

    this.effect.addPass(this.renderPass);
  }
};
const composer = new Composer(true);
composer.init();

export { composer };
