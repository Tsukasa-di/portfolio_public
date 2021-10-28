let m;

export function performer(resolve) {
  m = {
    els: document.querySelectorAll('.launching span'),
    count: 0,
    first: true
  };
  nowloading();
  resolve();
}

function nowloading() {
  if (m.count % 3 === 0 && !m.first) {
    setTimeout(() => {
      m.count = 0;
      m.first = true;
      m.els.forEach( node => {
        node.style.opacity = 0;
      });
      nowloading();
    }, 1800);
  } else {
    setTimeout(() => {
      if (m.count <= 2) m.els[m.count].style.opacity = 1;
      m.count++;
      m.first = false;
      nowloading();
    }, 500);
  }
}
