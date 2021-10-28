# SPA設計
当サイトのSPAの仕組み

- サイト訪問時のローディング画面で全ページの`document`オブジェクトを読み込む
- 画面遷移時は`CONTENTS`クラスが付与されたHTML要素内だけを書き換える
- アニメーションを含めた画面遷移フローは [animationsディレクトリ](/src/js/modules/transition/animations/_app.js) に記述

## 処理の詳細
- [SPAオブジェクトの生成](/src/js/modules/transition/spa)
- [全ページのサイトマップ生成](/src/js/_libs/gulp/sitemap.js)
