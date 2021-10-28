const DOM = {};
DOM.html = document.querySelector('html');
let currentScroll = 0;

function ScreenLock() {
  currentScroll = DOM.html.scrollTop;
  DOM.html.style.width = "100%";
  DOM.html.style.position = "fixed";
  DOM.html.style.top = -currentScroll + "px";
}

function ScreenUnlock() {
  DOM.html.style.position = "initial";
  DOM.html.scrollTop = currentScroll;
}

export { ScreenLock, ScreenUnlock };
