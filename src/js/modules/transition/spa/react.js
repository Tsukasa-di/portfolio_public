import { PATHS } from "../../global/variables";
import { SPA } from "./_app";
import { Reactive } from "./_libs/Reactive";

export function react(doc, path, name, flag) {
  const react = new Reactive(doc, SPA, name, flag),
        pxy   = react.pxy();

  // URLの書き換え
  // ------------------------------------------
  react.location(PATHS.root + path);

  // .CONTENTS要素の書き換え
  // ------------------------------------------
  pxy.innerHTML = react.toDOM.contents.innerHTML;

  // head要素内の書き換え
  // ------------------------------------------
  react.nops().qs.bind(react)('head', 'title');
}
