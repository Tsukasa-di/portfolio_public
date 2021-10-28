# pagesモジュール設計
ページ個別の処理をまとめたオブジェクト。

- Webサイト初期表示時
- 画面遷移時

上記の場面で「カメラワーク、各画面内のDOMに関連する処理」を選定する。

## PAGESオブジェクト
`modules/pages/_app.js`

```javascript
import { Page } from "./_libs/page.js";

// 各ページ個別のオブジェクトを生成
// ----------------------------------------
const __page__ = new Page("__page__", init, custom);

export const PAGES = {
  __page__: __page__ // __page__には各ページ名が入る
}
```

### 活用例
```javascript
import { PAGES } from 'src/js/modules/pages/_app';

// ページ遷移時の設定例
// ----------------------------------------
SENCE.remove(
  PAGES[currentPage].obj()
);
SENCE.add(
  PAGES[nextPage].obj()
);
PAGES[nextPage].camera().init();
```

### ページ個別のオブジェクトを生成する雛形
[Pageクラス設計書](/src/js/modules/pages/_libs)
