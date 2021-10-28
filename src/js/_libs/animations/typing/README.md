# Typingクラス設計書
## 概要
受け取った文字列を入力し、PCのタイピング演出を行うクラス。<br>
「asyncタイプ」と「inRequestAnimationFrameタイプ」の2種類が用意されている。<br>
前者は呼び出すと非同期で演出処理が走るタイプで、<br>
後者はrequestAnimationFrame関数を実行中に演出処理を行うために設計されたタイプ。

## Constructor
```javascript
Typing(
  target,   // Element
  audios,   // Array
  prcsSum   // Number
)
```
- target<br>
印字する文字列の入力先要素を指定する。
- audios<br>
演出中に流したいオーディオを設定する。<br>
インスタンス化されたAudioコンストラクターを配列型で入力。
- prcsSum<br>
数値が大きいほど、1文字毎のタイピング演出が長くなる。

## Method
### init()
タイピング演出を開始する前に必要な初期化処理。<br>
同じ文字を同じ要素へ印字し直したい場合も、再び`init()`を呼び出す必要がある。<br>
呼び出さない場合は、既に印字された文字列の最後から、再び同じ文字列が追加されていく。
```javascript
init(
  input   // String
)
```
- input<br>
印字したい文字列を入力。

### animate()
```javascript
init(
  type,     // String
  resolve   // Function
)
```
- type<br>
`async`か`inRAF`を設定する。<br>
**async**<br>
`animate()`呼び出し時に非同期として演出処理がタスクキューにストックされる。<br><br>
**inRAF**<br>
`requestAnimationFrame()`処理の中で実行されることを前提に設計されている。<br>
`init()`を`requestAnimationFrame()`の外で実行し、`animate()`を`requestAnimationFrame()`の中で実行する。<br>
また、`animate()`は戻り値を返す。タイピング演出中は`true`を返し、演出終了後は`false`を返す。

- resolve<br>
`async`タイプの時に、タイピング演出終了時に呼び出したいコールバック関数を設定する。<br>
`inRAF`タイプの時には特に設定する必要はない。

### reseter()
target Elementの中の全ての`<span>`を削除する。

## 使用例（type='inRAF'）
```javascript
// 定義
// ------------------------------------------

const target = document.querySelector('#target'),
      typing = new Typing(target, null, 5);
let STATUS = true;

// イベント登録
// ------------------------------------------

target.addEventListener('click', () => {
  typing.reseter();
  typing.init('Typing Now...');
  STATUS = true;
});

// アニメーション
// ------------------------------------------

function render() {
  if (STATUS) {
    STATUS = typing.animate('inRAF');
  }
  requestAnimationFrame(render);
}
render();
```
