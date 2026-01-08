# gpts

このディレクトリではサバイバルTypeScriptのGPTsのデータを管理しています。

## ファイル

- crete-knowledge.ts: ドキュメント一覧から知識データを自動生成するスクリプト
- docs.json: 自動生成した知識データ
- prompt.txt: GPTsのプロンプトテキスト

## 知識データの作り方

リポジトリのルートディレクトリで次のnpmスクリプトを実行してください。
環境構築を簡略化するためにnpmスクリプトはbunでの実行を想定しています。

```sh
bun run create-gpts-knowledge
```
