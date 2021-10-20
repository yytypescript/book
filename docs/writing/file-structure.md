# ファイル構成

どこにどのようなファイルがあるかを説明します。

このリポジトリのファイル構成は次のようになっています。

```tree
├── .markdownlint.yaml ... markdownlintの設定
├── .prettierrc ... prettierの設定
├── .textlintrc ... textlintの設定
├── docs/ ... ⭐️本書のコンテンツ(文書・画像)
├── docusaurus.config.js ... Docusaurusの設定
├── prh/ ... textlintのprhルールの定義
├── sidebars.js ... ⭐️サイドバー(目次)の設定
├── src/ ... Docusaurusを拡張するプログラムなど
└── static/ ... Docusaurus用の静的ファイル
```

執筆者が変更を加える上で重要になるのは、`docs`ディレクトリと`sidebars.js`です。
