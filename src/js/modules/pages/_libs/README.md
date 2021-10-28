# Pageクラス設計
## Constructor
```javascript
Page(
  name,   // String
  init,   // Function
  custom  // Function
)
```

- name<br>
ページ名を入力。現在のパスを読み取って入力することを想定している。(ex.`"about", "works", "home"...`)
- init<br>
ページ読み込み時、ページ遷移時に実行したい処理を記述。
- custom<br>
特別な場面で呼び出したいページ個別の処理を記述。

## Method
### init()
ページを読み込んだ時とページ遷移の際に実行したい処理を記述。<br>

```javascript
init(args) {
  this.init(args);
}
```

【呼び出し例】

```javascript
// ページ遷移処理
// ----------------------------------------
const args = [clickEvent, prePage];
const __page__ = new Page("__page__", init, custom);
__page__.init(...args);
```

### obj()
Pageクラス初期化時に特定したページの「Object3D」が返される関数。

```javascript
obj() {
  return OBJECTS[this.name];
}
```

※OBJECTSオブジェクトについては、[objectsモジュール設計](../objects)を参照。

【呼び出し例】

```javascript
const PAGES = new Page("__page__", init, custom);
SENCE.add(
  PAGES[__page__].obj()
);
```

### camera()
Pageクラス初期化時に特定したページのCAMERAオブジェクトが返される関数。

```javascript
camera() {
  return CAMERA[this.name];
}
```

※CAMERAオブジェクトについては、[cameraモジュール設計](../camera)を参照。

【呼び出し例】

```javascript
const PAGES = new Page("__page__", init, custom);
PAGES[__page__].camera().init();
```
