import { CTRL } from "../../../controllers/_app";
import { Slider } from "../../../_libs/slider/_app";
import { SCREEN } from "../../global/variables";

export function slider() {
  const DOM = {
    shadow: document.querySelector('.shadow'),
    slider: document.querySelector('.MODULES-slider'),
    img: document.querySelectorAll('.slide img')[0]
  };

  new Slider(
    CTRL.settings.slider().el,
    CTRL.settings.slider().param
  );

  // 画像の高さを取得し、.shadow要素の高さを確定する
  function shadowFix(target) {
    DOM.shadow.style.width = target.clientWidth - 5 + 'px';
    DOM.shadow.style.height = target.clientHeight - 5 + 'px';
    DOM.shadow.style.top = '5px';
    DOM.shadow.style.left = '5px';
    DOM.slider.style.opacity = 1;
  } shadowFix(DOM.img);
  DOM.img.addEventListener('load', e => {
    shadowFix(e.target);
  });

  // スライドのホバーアニメーション
  document.querySelectorAll('.slide').forEach(slide => {
    const imgEl = slide.querySelector('img');
    slide.addEventListener('mouseenter', () => {
      DOM.shadow.style.boxShadow = '0px 0px 8.0rem rgba(255,255,255,.7)';
      imgEl.style.opacity = 1;
    });
    slide.addEventListener('mouseleave', () => {
      DOM.shadow.style.boxShadow = '0px 0px 8.0rem rgba(255,255,255,0)';
      if (!SCREEN.TABLET()) imgEl.style.opacity = .7;
    });
  });
}
