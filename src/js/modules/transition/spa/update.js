import { PAGES } from "../../pages/_app";
import { onCursor } from "../../global/events";
import { menu } from "../../global/menu";
import { SCREEN, STATUS } from "../../global/variables";
import { SPA } from "./_app";

export function update(name, flag) {
  console.log('%cSPA', 'background: blue; color: white;', SPA);
  console.log('%cSTATUS', 'background: blue; color: white;', STATUS);

  // body要素にページのクラスを付与
  // ------------------------------------------
  if (document.body.classList) document.body.classList.forEach(c => {
    document.body.classList.remove(c);
  });
  document.body.classList.add(name.toUpperCase());

  // SCREENの調整に必要な処理を実行
  // ------------------------------------------
  SCREEN.adjust();

  // .TRANSITION要素を再取得
  // ------------------------------------------
  if (flag) SPA.events.click();

  // ページ個別のスクリプトを実行
  // ------------------------------------------
  if (flag) PAGES[name].init();

  // Cursorの再起動
  // ------------------------------------------
  onCursor.init();

  // MENUを初期化
  // ------------------------------------------
  if (menu.status.init) menu.update();

  STATUS.transition.clear = true;
}
