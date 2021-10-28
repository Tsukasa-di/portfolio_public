import { trigger } from "./trigger";

export function init(_this) {
  _this.DOM.triggers.prev = _this.slider.querySelector('.prev');
  _this.DOM.triggers.next = _this.slider.querySelector('.next');
  _this.DOM.inner = _this.slider.querySelector('.slider-inner');
  _this.DOM.wrap = _this.slider.querySelector('.slider-wrap');
  _this.DOM.slides = _this.slider.querySelectorAll('.slide');
  _this.PARAM.slide.num = _this.DOM.slides.length;
  _calc(_this);
  trigger(_this);
}

function _calc(_this) {
  _this.DOM.inner.style.width =
    (
      (
        (_this.PARAM.slide.width * _this.PARAM.slide.num) +
        (_this.PARAM.slide.margin * _this.PARAM.slide.num)
      ) -
      _this.PARAM.slide.margin
    ) + 'px';

  _this.DOM.wrap.style.width = _this.PARAM.slide.width + 'px';

  _this.DOM.slides.forEach((slide, i, ary) => {
    slide.style.width = _this.PARAM.slide.width + 'px';
    if (ary.length - 1 != i) slide.style.marginRight = _this.PARAM.slide.margin + 'px';
  });

  _this.PARAM.slide.value = _this.PARAM.slide.width + _this.PARAM.slide.margin;
}
