# Tsukasa Tomioka Portfolio_ver3
## Getting Started
``` bash
# パッケージのインストール
npm i

# npm run dev
開発環境の立ち上げ
● Gulpの処理（npx gulp）
● 開発用Webpackの処理（npx webpack-dev-server --config ./webpack.dev.js）

# npm run build
本番用ファイルのビルド
● Gulpの処理（npx gulp）
● 本番用Webpackの処理（npx webpack-dev-server --config ./webpack.prod.js）

# npm run assets
素材ファイルの書き出し処理
```

## Versions
``` bash
# node
18.15.0
# npm
9.6.2
# gulp
4.0.2
# webpack
5.77.0
```

## アプリケーション設計
### JavaScriptのワークフロー
サイト起動と同時に `src/js/launch/app.js` の処理が走り、<br>
DOM、SPA、音源素材、プロジェクトに必要な各インスタンスのロードが始まります。<br>
<br>
また、当プロジェクトでは独自に開発した簡易的なSPAを実装しており、<br>
`src/js/_libs/spa/` 配下に必要なオブジェクトがまとめられています。<br>
<br>
プロジェクトを大まかに理解するのに必要な情報を、<br>
下記の README.md にまとめているのでご参照ください。

- [ローンチ設計](/src/js/launch/)
- [SPA設計](/src/js/_libs/spa/)
- [オブジェクトのグローバル管理](/src/js/global/)

## ディレクトリ構造
```bash
src
  | --- assets
      | --- audios
      | --- images
  | --- contents (サイト更新用ファイル)
  | --- data (ディレクトリ全体で使用するデータ一式)
  | --- template (pugテンプレートファイル)
  | --- js
      | --- _libs (スクリプト全体で汎用的に使用できるライブラリ)
          | --- culc (値算出ライブラリ)
          | --- modal (MENUとWORKSのMODALを処理するライブラリ)
          | --- node_modules (Gulp内部で扱うライブラリ)
          | --- operator (DOM操作など汎用的に活用できるライブラリ)
          | --- spa (独自SPAライブラリ)
          | --- ui (CursorシステムなどUI系のライブラリ)
      | --- audio (BGMとSEを処理するモジュール)
      | --- global (グローバルなオブジェクトを準備するライブラリ)
      | --- launch (アプリケーションを立ち上げるライブラリ)
      | --- stage (画面背景 `#STAGE` のアニメーションを扱うライブラリ)
      | --- app.js
```
