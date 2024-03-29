export const OP = {
  node: {
    qs(selector, scope) {
      return (scope || document).querySelector(selector);
    },
    qsAll(selectors, scope) {
      return (scope || document).querySelectorAll(selectors);
    },
    create(type) {
      return document.createElement(type);
    },
    setAttr(target, key, value) {
      target.setAttribute(key, value);
    },
    append(parent, target) {
      parent.appendChild(target);
    },
    html(target, value) {
      target.innerHTML = value;
    },
    on(target, eventType, callback, passive) {
      target.addEventListener(eventType, callback, {passive: passive});
    },
    off(target, eventType, callback, passive) {
      target.removeEventListener(eventType, callback, {passive: passive});
    }
  }
}
