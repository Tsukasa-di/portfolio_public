import { CTRL } from "../../../../controllers/_app";
import { Typing } from "../../../../_libs/animations/typing/_app";
import { promise } from "../../../../_libs/async/promise";
import { Toggle } from "../../../effects/toggle/toggle";
import { AUDIOS, STATUS } from "../../../global/variables";
import { RENDERING } from "../../../renderings/_app";
import { DOM, typing } from "./members";

export async function performer(start) {
  const effect = new Toggle(AUDIOS.glitchRadio);

  await promise(resolve => {
    typing.i = new Typing(
      DOM.openingP,
      [AUDIOS.whisperNoize, AUDIOS.typeWriting],
      'text'
    );
    typing.i.set('TSUKASA TOMIOKA');
    typing.speed = 14;
    typing.resolve = resolve;
    setTimeout(() => {
      typing.permition = true;
      typing.animate();
    }, 1200);
  });
  await promise(resolve => {
    setTimeout(() => {
      typing.i.reseter();
      typing.i.set('HE\'S VISION');
      typing.speed = 14;
      typing.resolve = resolve;
    }, 1000);
  });
  await promise(resolve => {
    setTimeout(() => {
      typing.i.set('.....');
      typing.speed = 18;
      typing.resolve = resolve;
    }, 250);
  });
  await promise(resolve => {
    setTimeout(() => {
      const text = 'ヒトの心を揺さぶる';
      DOM.openingP.style.fontFamily = 'vdl-pengentle, sans-serif';
      _makeFakeEl(text);
      typing.i.reseter();
      typing.i.set(text);
      typing.speed = 22;
      typing.resolve = resolve;
    }, 1000);
  });
  await promise(resolve => {
    setTimeout(() => {
      typing.permition = false;
      typing.i.reseter();
      RENDERING.home();
      DOM.canvas.style.opacity = 1;
      effect.add('glitch');
      resolve();
    }, 1000);
  });
  await promise(resolve => {
    setTimeout(() => {
      DOM.canvasMask.style.transition = '2.6s';
      DOM.canvasMask.style.opacity = .85;
      resolve();
    }, 500);
  });
  await promise(resolve => {
    setTimeout(() => {
      DOM.canvasMask.style.transition = '0.5s';
      DOM.canvasMask.style.opacity = 1;
    }, 4000);
    setTimeout(() => {
      effect.remove('glitch');
    }, 4500);
    setTimeout(() => {
      DOM.canvasMask.style.transition = '5.0s';
      DOM.canvasMask.style.opacity = .25;
      if (CTRL.audios.bgm) AUDIOS.bgm.play();
      DOM.launched.style.transition = '6.0s';
      DOM.launched.style.opacity = 1;
      DOM.opening.style.opacity = 0;
      start();
      resolve();
    }, 5200);
  });
  await promise(resolve => {
    setTimeout(() => {
      [AUDIOS.whisperNoize, AUDIOS.typeWriting, AUDIOS.glitchRadio].forEach(audio => {
        audio.currentTime = 0;
      });
      DOM.canvasMask.style.transition = '1.2s';
      DOM.opening.style.display = 'none';
      STATUS.home.opening = false;
    }, 1800);
  });
}

function _makeFakeEl(text) {
  const fake = DOM.openingP.appendChild(document.createElement('span'));
  const styles = {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'none',
    width: '100%',
    height: '100%',
    opacity: 0
  };
  Object.entries(styles).forEach(entry => {
    fake.style[entry[0]] = entry[1];
  });
  fake.innerText = text;
}
