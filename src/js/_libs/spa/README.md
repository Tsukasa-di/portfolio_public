# SPA設計
`_libs/node_modules/sitemap.js` で生成した `src/data/sitemap.json` を参照して、<br>
全ページの `document` を読み込み、<br>
`spa/modules/reactive.js` でページ遷移時の挙動を管理しています。

## spa/modules/getSitemap.js
- `src/data/sitemap.json` を参照して、JavaScriptオブジェクトでサイトマップを返す処理

## spa/modules/getDocuments.js
- `getSitemap.js` からサイトマップを受け取って、全ページの `document` を読み込む
- `SPAインスタンス` の `docs` プロパティに格納
- `Elemment` として１ページ毎の `document` を格納しているので、`querySelector` で読み込み可能

## spa/modules/reactive.js
ページ遷移時の処理を管理しており、下記の機能を持っている。

- `#CONTENTS`タグ内の画面遷移
- `head.title`タグの切り替え
- URLの変更、進む/戻るボタン投下時のリロード処理
- `body`タグのクラス変更
- `STATUS`の更新
- ModalやCursorなどリロードが必要な各インスタンスの更新
