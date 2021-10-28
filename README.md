# Tsukasa Tomioka Portfolio_ver2
## コマンド一覧
``` bash
# npm run dev
開発環境の立ち上げ
● Gulpの処理（npx gulp）
● Webpackの処理（npx webpack-dev-server --config ./webpack.dev.js）

# npm run build
本番用ファイルのビルド
● Gulpの処理（npx gulp）
● Webpackの処理（npx webpack-dev-server --config ./webpack.prod.js）

# npm run images
画像圧縮書き出し処理

# npm run sitemap
サイトマップの書き出し処理
```

## アプリケーション設計
- [SPA設計](/src/js/modules/transition)
- [ページ個別スクリプトの処理設計](/src/js/modules/pages)
- [Controller-開発補助機能](/src/js/controllers)

## Versions
``` bash
# node
14.17.1
# npm
6.14.13
# gulp
@4.0.2
# webpack
@5.45.1
```

## ディレクトリ構造
```bash
src
  | --- assets
      | --- audio
      | --- fonts
      | --- images
      | --- models
      | --- sass
  | --- contents (サイト更新用ファイル)
  | --- template (pugテンプレートファイル)
  | --- js
      | --- _libs (スクリプト全体で汎用的に使用できるライブラリ)
      | --- modules (アプリケーションのモジュール)
      | --- app.js (夢の箱)
```
