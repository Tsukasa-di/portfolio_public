export class Reactive {
  constructor(toDoc, spa, name, flag) {
    this.fromDOM = {
      head: document.head,
      contents: document.querySelector('.CONTENTS')
    };
    this.toDOM = {
      head: toDoc.head,
      contents: toDoc.querySelector('.CONTENTS')
    };
    this.spa = spa;
    this.name = name;
    this.flag = flag;
  }

  pxy() {
    const Reactive = this;
    const handler = {
      set(obj, prop, value) {
        Reflect.set(obj, prop, value);
        Reactive.spa.update(Reactive.name, Reactive.flag);
        return true;
      }
    }
    return new Proxy(this.fromDOM.contents, handler);
  }

  nops() {
    return {
      qs(scope, target) {
        this.fromDOM[scope].querySelector(target).innerHTML = this.toDOM[scope].querySelector(target).innerHTML;
      }
    }
  }

  location(path) {
    history.pushState(null, 'title', path);
  }
}
