# modules設計
## camera
[README(Now Writing...)](/src/js/modules/camera/)<br>
各ページのカメラワークやOrbitControllerなどのカメラコントローラー系の処理をまとめる。

- 各ページのデフォルトのカメラ設定値(ページ表示時と画面遷移時に呼び出される)
- 各ページのカメラワーク処理
- THREEオブジェクトのコントローラー系クラス

## effects
[README(Now Writing...)](/src/js/modules/effects/)<br>
ポストプロセスのエフェクトを管理するモジュール。<br>

## global
[README(Now Writing...)](/src/js/modules/global/)<br>
モジュール全体で利用する変数や処理をまとめる。

- ページ共通のグローバル変数
- ページ共通のグローバル処理

## launch
[README(Now Writing...)](/src/js/modules/launch/)<br>
openingページの立ち上げからホーム画面のサイトエントリー画面までの一連の処理。
- openingページでのローディング処理
- `SPAオブジェクト`の準備処理
- localStorageへのデータ保存
- サイトエントリー画面の表示

## objects
[README(Now Writing...)](/src/js/modules/objects/)<br>
全ページ分のObject3Dのデータをまとめる。<br>
共通マテリアルやページを跨いで再利用できるオブジェクトを生成。

## pages
[README](/src/js/modules/pages/)<br>
ページ個別の処理をまとめたオブジェクト。

- Webサイト初期表示時
- 画面遷移時

上記の場面で「カメラワーク、各画面内のDOMに関連する処理」を選定する。

## rendering
[README(Now Writing...)](/src/js/modules/rendering/)<br>
各ページのcanvas描画に関連した処理。

## transition
[README](/src/js/modules/transition/)<br>
画面遷移に関連する処理をまとめる。

- SPA処理
- 画面遷移アニメーション

## ui
[README(Now Writing...)](/src/js/modules/ui/)<br>
`stats.js`や`dat.gui.js`などの開発用UIに関連する処理をまとめる。
