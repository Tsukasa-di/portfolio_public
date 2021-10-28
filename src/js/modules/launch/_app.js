import { currentRootDir } from "../../_libs/processing/currentRootDir";
import { PATHS, RENDERER, SCREEN } from "../global/variables";
import { storage } from "./opening/storage";
import { promise } from "../../_libs/async/promise";
import { entry } from "./entry/_app";
import { opening } from "./opening/_app";
import { loading } from "./loading/_app";
import { PAGES } from "../pages/_app";
import { onResize } from "../global/events";
import { swiper } from "../../_libs/operations/swiper";

export async function launch(init) {
  if (!SCREEN.TABLET()) document.body.style.overflow = 'hidden';
  /*
  ========================================
  Tablet画面時の初期処理
  ========================================
  */
  if (SCREEN.TABLET()) {
    const status = { screenCheck: false };
    await promise( resolve => {
      onResize.bind({ status: status, resolve: resolve })();
      initScreen(status);
      window.addEventListener('resize', onResize.bind({ status: status, resolve: resolve }));
    });
    await promise( resolve => {
      status.swiper = !SCREEN.adjust();
      swiper(SCREEN, document.querySelector('.MODULES-swiper'), status, resolve);
    });
  } else await promise( resolve => { resolve(); });
  /*
  ========================================
  LocalStorageのフラグチェック
  ========================================
  */
  const flag = await promise(resolve => {
    // storage.clear();
    resolve(storage.getFlag('flag'));
  });
  /*
  ========================================
  Openingを開始するかどうか判定
  ========================================
  */
  await promise( () => {
    if (currentRootDir() === 'home' && flag || (currentRootDir() != 'opening' && currentRootDir() != 'home')) {
      PAGES[currentRootDir()].camera();
      loading().then(() => {
        entry();
        init();
      });
    } else {
      if (currentRootDir() === 'home' && !flag) {
        fetch(PATHS.root + 'opening/index.html')
          .then( response => response.text() )
          .then( string => new DOMParser().parseFromString(string, 'text/html') )
          .then( doc => {
            document.querySelector('.CONTENTS').innerHTML = doc.querySelector('.CONTENTS').innerHTML;
            document.body.classList.remove('HOME');
            document.body.classList.add('OPENING');
            history.pushState(null, 'title', PATHS.root + 'opening');
            PAGES[currentRootDir()].camera();
            opening(init);
          } );
      } else {
        PAGES[currentRootDir()].camera();
        opening(init);
      }
    }
  });
};

function initScreen(status) {
  const over = 50;
  const target = document.querySelector('.MODULES-screen_checker');
  function set(width, height, html) {
    target.style.width = height + 'px';
    target.style.height = html - over + 'px';
    document.body.style.height = height + 'px';
    document.body.style.marginTop = over + 'px';
    RENDERER.setSize(width, height);
    RENDERER.setPixelRatio(window.devicePixelRatio);
    SCREEN.HEIGHT = function () {
      return height;
    };
  }
  if (status.screenCheck) {
    const width = SCREEN.WIDTH();
    const height = outerHeight;
    set(width, height, document.querySelector('html').clientWidth);
  } else {
    const width = outerHeight;
    const height = innerWidth;
    set(width, height, document.querySelector('html').clientHeight);
  }
}
