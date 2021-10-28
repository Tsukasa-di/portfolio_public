let currentValue = 0, targetValue = 0, nextLimit;

export function trigger(_this) {
  currentValue = 0, targetValue = 0
  nextLimit =
    - (
      Number(_this.DOM.inner.style.width.split('px')[0]) -
      _this.PARAM.slide.value +
      _this.PARAM.slide.margin
    );
  const obj = _this.DOM.triggers;
  Object.keys(obj).forEach( key => {
    obj[key].addEventListener(_this.eventType, click.bind(_this));
  });
  _this.DOM.triggers.prev.classList.add('unactive');
}

function click(e) {
  if (e.target.classList.value.includes('next') && currentValue > nextLimit) {
    targetValue = this.PARAM.slide.value;
    this.DOM.inner.style.transform =
      'translateX(' +
      (currentValue - targetValue) +
      'px)';
    currentValue -= targetValue;
    unactiveCheck(this);
  } else if (e.target.classList.value.includes('prev') && currentValue < 0) {
    targetValue = this.PARAM.slide.value;
    this.DOM.inner.style.transform =
      'translateX(' +
      (currentValue + targetValue) +
      'px)';
    currentValue += targetValue;
    unactiveCheck(this);
  }
}

function unactiveCheck(_this) {
  if (currentValue > nextLimit) _this.DOM.triggers.next.classList.remove('unactive');
  else _this.DOM.triggers.next.classList.add('unactive');
  if (currentValue < 0) _this.DOM.triggers.prev.classList.remove('unactive');
  else _this.DOM.triggers.prev.classList.add('unactive');
}
