# プロジェクトのローンチ設計
DOM、SPA、音源素材、プロジェクトに必要な各インスタンスをロードし、<br>
ローディング画面のアニメーションを走らせます。<br>
<br>
ロード完了後にローディング画面がフェードアウトし、<br>
`ENTRY SITE` ボタン投下の待機状態となります。

## launch/app.js
- `init()` で初期設定 -> ロード(`launch/modules/load.js`) -> 待機(`launch/modules/prepare.js`) の順で非同期処理
- ローディングアニメーションは (`launch/modules/loading.js`) で管理
- ローディングアニメーション終了後に `Launchクラス` の `finish()` の処理が走ります

## launch/modules/load.js
- 音源素材、SPAインスタンス、プロジェクトに必要な各インスタンスを並列処理でロード
- ロード完了のステータスは  `Launchクラス` の `statusプロパティ` で管理

## launch/modules/prepare.js
- ロード完了後の待機状態の記述
- `DOM.OPENING.button` をクリックすればサイトのトップページ画面に遷移する
