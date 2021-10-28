export function entry() {
  import('./definitions').then( module => {
    module.init();

    Object.keys(module.dom).forEach(prop => {
      module.dom[prop].style.transition = module.trans;
    });

    module.dom.global.style.opacity = 1;
    module.dom.nowLoading.style.opacity = 0;
    setTimeout(() => {
      module.dom.contents.style.opacity = 1;
      module.dom.canvas.style.opacity = 1;
    }, 500);

    Object.keys(module.events).forEach(event => {
      module.dom.checker.addEventListener(event, module.events[event]);
    });
  });
}
