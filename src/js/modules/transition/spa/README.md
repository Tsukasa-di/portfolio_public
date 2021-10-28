# SPAオブジェクト
Single Page Applicationを実現するためのオブジェクト。

```javascript
SPA = {
  init: init,
  update: update,
  launch: launch,
  events: {},
  animates: {},
  docs: {}
}
```

## initプロパティ
エントリー画面で「ENTRY SITE」ボタンがクリックされた時に呼び出される。<br>
--> [SPA.init()が実行されるファイル](/src/js/modules/launch/entry/definitions.js)

- ページ遷移イベントの登録
- ページ遷移アニメーションの登録
- 前ページ/次ページに遷移するイベントの登録

## updateプロパティ
画面遷移時に自動で実行したい処理を記述。<br>
`CONTENTSクラス`が付与されたHTML要素が書き換わると自動で呼び出される。<br>
--> [react関数によって実現](/src/js/modules/transition/spa/react.js)

## launchプロパティ
SPAオブジェクトを起動するための準備処理。<br>
Webサイトにアクセスした後のローディング時に実行される。<br>
--> [実行されるファイル](/src/js/modules/launch/loading/_app.js)<br><br>

下記2点の準備を行う。<br>

- [サイトマップ(/src/contents/sitemap.json)](/src/contents/sitemap.json)の読み込み
- 読み込んだサイトマップから全ページの`document`オブジェクトを`SPA.docs`へ格納

## animatesプロパティ
画面遷移時のアニメーション処理するプロパティ。<br>
下記のファイルで組んでいる`TransAnimates`クラスのインスタンスが格納される。<br>
--> [/src/js/modules/transition/animations/_app.js](/src/js/modules/transition/animations/_app.js)<br>

## eventsプロパティ
画面遷移を発火させるイベントが登録される。<br>
