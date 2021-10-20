# 執筆をはじめる

## 編集環境のセットアップ

リポジトリをGitHub上でフォークし、フォークしたリポジトリをチェックアウトします。

```shell
git clone git@github.com:自分のアカウント/フォーク先のリポジトリ名.git
```

必要なツールをインストールします。

```shell
yarn
```

開発サーバーを起動します。

```shell
yarn start
```

開発サーバーが起動したら、ブラウザで`http://localhost:3000`を開きます。

## 新しいページを作る

### 作業のとりかかり

docsディレクトリに新規ページのMarkdownファイルを追加します。

```shell
mkdir -p docs/カテゴリ名/サブカテゴリ名
touch docs/カテゴリ名/サブカテゴリ名/new-page.md
```

`sidebars.js`に新規ページへのパスを追加します。パスには拡張子`.md`を含めません。

```js title="sidebars.js"
module.exports = {
  // ...
  tutorialSidebar: [
    {
      type: "category",
      label: "カテゴリ名",
      items: [
        {
          type: "category",
          label: "サブカテゴリ名",
          items: [
            // highlight-next-line
            "カテゴリ名/サブカテゴリ名/new-page",
          ],
        },
      ],
    },
  ],
};
```

ここまで完了したら、作成したファイルを編集していきます。

### 編集後にやること

作成したファイルを編集したらコミットします。

```shell
git add docs/カテゴリ名/サブカテゴリ名/new-page.md
git commit -m "「新しいページ」を追加しました。"
```

:::tip
コミットメッセージは日本語で構いません。

コミットメッセージの例:

- 「型注釈」を追加しました。
- 「関数」にサンプルコードを追加しました。
- 誤字「使用」を「仕様」に修正しました。

:::

#### コンテンツの自動修正

##### コードスタイルの修正

Prettierとmarkdownlintで、Markdownの記法スタイルやコードブロック内のTypeScriptコードスタイルを修正します。

```shell
yarn markdownlint:fix
yarn prettier:fix
```

:::tip
Prettierの自動整形をさせたくないコードブロックには`<!--prettier-ignore-->`をつけます。

````markdown
<!--prettier-ignore-->
```typescript
type Code =
  | 1
  | 2
  | 3;
```
````

:::

:::tip
markdownlintで指摘されたエラーの詳細は[markdownlintのドキュメント](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)をご覧ください。
:::

##### 日本語の校正

textlintで日本語に問題がないかチェックします。

```shell
yarn textlint
```

textlintで問題が指摘された箇所で、変更すべきところを変更します。

:::tip
textlint指摘箇所をすべて直していい場合は`yarn textlint:fix`で一括修正できます。
:::

:::tip textlintを部分的に無効化する

textlintのエラーが出ない書き方が望ましいです。場合によって、textlintを無効にしたいことがあるかもしれません。無効化したい部分はコメントで囲みます。

```markdown
...

<!-- textlint-disable prh -->

textlintのprhルールが無効になるエリア

<!-- textlint-enable prh -->

...
```

注意点として、コメントの前後には空行が必要です。

```markdown title="NG"
<!-- textlint-disable -->
無効化したいテキスト
<!-- textlint-enable -->
```

```markdown title="OK"
<!-- textlint-disable -->

無効化したいテキスト

<!-- textlint-enable -->
```

:::

##### 自動修正内容をコミット

自動修正の結果は差分で確認します。

```shell
git diff
```

:::tip
自動修正による変更をもとに戻すには、`git checkout`を使います。
:::

自動修正の内容に問題がなければコミットします。

```shell
git add docs/カテゴリ名/サブカテゴリ名/new-page.md
git commit --amend # 直前のコミットに含めて、コミットを1つにする方法です
```

### プルリクエストを送る

:::caution
プルリクエストを送る前にコミットが1つになっているか確認してください。
:::

変更内容をpushします。

```shell
git push
```

GitHub上でプルリクエストを作成します。プルリクエストが作成されると、CIが走りコードスタイルなどのチェックが行われます。CIに問題がなければマージされます。
