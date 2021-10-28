import { RENDERING } from "../../renderings/_app";
import { Typing } from "../../../_libs/animations/typing/_app";
import { AUDIOS, SCENE, STATUS } from "../../global/variables";
import { Glitch } from "./types/glitch";
import { currentRootDir } from "../../../_libs/processing/currentRootDir";
import { fixIndex } from "../../../_libs/processing/fixIndex";
import { menu } from "../../global/menu";

export class TransAnimates {
  constructor() {
    this._instances = {};
    this._log;
    this._pm = function(callback) {
      return new Promise(resolve => {
        callback(resolve);
      });
    }
  }

  init() {
    this._instances.glitch = new Glitch(
      SCENE
    );

    this._instances.typing = new Typing(
      document.querySelector('.transition-loading'),
      [AUDIOS.whisperNoize, AUDIOS.typeWriting],
      'node'
    );
  }

  async animate(event, callback) {
    /*
    ========================================
    定義リスト
    ========================================
    */
    const fixedIndex    = fixIndex(event.target.dataset.link).split('/index.html')[0],
          transPageName = fixedIndex === 'index.html' ? 'home' : fixedIndex,
          loading       = document.querySelector('.transition-loading').style,
          contents      = document.querySelector('.CONTENTS').style,
          samples       = document.querySelector('.samples'),
          transTime     = 1000,
          transTimeS    = '1.0s',
          log           = (_log) => {console.log('%c' + _log, 'color: green;');};
    loading.transition = transTimeS;
    /*
    ========================================
    MENU画面のリセット
    ========================================
    */
   if (menu.status.menu === 'open') menu.reseter();
    /*
    ========================================
    レンダリングの停止と背景の暗転
    ========================================
    */
    this._log = await this._pm( resolve => {
      STATUS.render[currentRootDir()] = false;
      loading.opacity = 1;
      loading.backgroundColor = 'rgba(0,0,0,.5)';
      contents.opacity = 0;
      if (samples) samples.style.opacity = 0;
      resolve('finish change background.');
    });
    /*
    ========================================
    タイピング演出の開始
    ========================================
    */
    this._log = await this._pm( resolve => {
      log(this._log);
      this._instances.typing.reseter();
      if (transPageName === 'home') this._instances.typing.set('Access a P?%$no^back?&@^...[H?_a$');
      else this._instances.typing.set('Access a Piece of His Memory...[' + transPageName.toUpperCase() + ']');
      this._instances.typing.animate('async', 7, resolve);
    });
    /*
    ========================================
    Glitch演出とレンダリングの開始
    ========================================
    */
    this._log = await this._pm( resolve => {
      log(this._log);
      loading.backgroundColor = 'rgba(0,0,0,0)';
      STATUS.render[transPageName] = true;
      RENDERING[transPageName]();
      this._instances.glitch.trans(event, resolve);
    });
    /*
    ========================================
    背景のスタイルを元通りに
    ========================================
    */
    await this._pm( resolve => {
      STATUS.render.init = true //`this._instances.glitch.trans`でcameraアングルを初期化した後に実行
      log(this._log);
      loading.opacity = 0;
      contents.opacity = 1;
      if (samples) samples.style.opacity = 1;
      resolve();
      setTimeout(() => {
        this._instances.typing.reseter();
      }, transTime);
    });
    /*
    ========================================
    SPAページ遷移の処理
    ========================================
    */
    await this._pm( () => {
      callback(); //`spa/events.js`react関数が実行される
    });
  }
}
