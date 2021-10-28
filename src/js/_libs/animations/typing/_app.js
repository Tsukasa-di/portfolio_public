import { asyncAnimate } from "./_libs/asyncAnimate";
import { processing } from "./_libs/processing";

export class Typing {
  constructor(target, audios = null, mode = 'text') {
    this._input;
    this._inputAry;
    this._mode = mode;
    this._try = true;
    this._prcsStr = ('ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz' + '0123456789').split('');
    this._typeTarget = target;
    this._stack = '';
    this._NUMS = {
      prcsSum: 5,
      prcsCount: 0,
      typeCount: 0,
      randNum: 0
    }
    this._audio = {
      play() {
        if (audios) {
          audios.forEach(audio => {
            audio.play();
          });
        }
      },
      pause() {
        if (audios) {
          audios.forEach(audio => {
            audio.pause();
          });
        }
      }
    }
  }

  set(input) {
    // animate()を呼び出す前に必要な初期化処理
    // ------------------------------------------
    this._inputAry = input.split('');
    this._try = true;
    this._NUMS.typeCount = 0;
    this._NUMS.prcsCount = 0;
    if (this._mode === 'node') {
      this._typeTarget.appendChild(
        document.createElement('span')
      );
    }
  }

  reseter() {
    // typeTargetの全ての<span>を削除する
    // ------------------------------------------
    if (this._mode === 'text') {
      this._typeTarget.innerText = '';
      this._stack = '';
    }
    else while (this._typeTarget.lastChild) this._typeTarget.removeChild(this._typeTarget.lastChild);
  }

  animate(type = 'async', prcsSum = 5, resolve = null) {
    const Typing = this;
    Typing._audio.play();
    Typing._NUMS.prcsSum = prcsSum;

    async function roop() {
      if (Typing._NUMS.typeCount == Typing._inputAry.length) {
        // 全ての文字を印字し終わった後の処理
        // ------------------------------------------
        Typing._audio.pause();
        Typing._try = false;
        if (resolve) resolve('finish run typing.');
      } else if (type === 'async' && Typing._try === true) {
        // 非同期タイプが設定された時の処理
        // ------------------------------------------
        asyncAnimate(Typing, Typing._NUMS.prcsSum, roop)
      } else if (type === 'inRAF' && Typing._try === true) {
        // requestAnimationFrameタイプが設定された時の処理
        // ------------------------------------------
        processing(type, Typing, Typing._NUMS.prcsCount++, roop, null);
      }
    }

    roop();
    return Typing._try;
  }
}
