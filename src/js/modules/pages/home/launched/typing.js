import { Typing } from "../../../../_libs/animations/typing/_app";

export async function typing() {
  const title = document.querySelector('.page-title');
  const menus = document.querySelectorAll('.CONTENTS .launched .ui .menu .TRANSITION');
  const type = {
    title: new Typing(title),
    menu: {}
  };
  const status = {};

  menus.forEach( el => {
    el.style.width = el.clientWidth + 'px';
    el.style.height = el.clientHeight + 'px';

    const title = el.innerText.split(' ')[1];
    status[title] = true;
    type.menu[title] = new Typing(el);

    el.addEventListener('mouseenter', e => { if(status[title]) {
      status[title] = false;
      type.menu[title].reseter();
      type.menu[title].set('- ' + title);
      type.menu[title].animate('async', 15, () => {
        el.addEventListener('mouseleave', e => { status[title] = true; });
      });
    } });
  });

  type.title.set('TSUKASA TOMIOKA PORTFOLIO SITE.');
  type.title.animate('async', 22);
}
