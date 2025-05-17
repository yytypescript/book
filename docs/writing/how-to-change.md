# 環境構築からプルリクエストまでの流れ

環境構築から執筆、公開までの流れと手順を説明します。

## 編集環境のセットアップ

リポジトリをGitHub上でフォークし、フォークしたリポジトリをチェックアウトします。(当リポジトリにコミット権限がある方はフォークする必要はありません。)

```shell
# 一般の方
git clone git@github.com:自分のアカウント/フォーク先のリポジトリ名.git

# 当プロジェクトにコミット権限がある方
git clone git@github.com:yytypescript/book.git
```

必要なツールをインストールします。

```shell
yarn
```

開発サーバーを起動します。

```shell
yarn start
```

開発サーバーの起動には結構な時間がかかります。プロセスを停止せずにお待ちください。

開発サーバーが起動したら、ブラウザで`http://localhost:3000`を開きます。

## ブランチを作る

ブランチを作成します。

```bash
git checkout -b ブランチ名
```

masterブランチには直接pushできません。そのため変更はブランチで行う必要があります。

## コンテンツを作る

### 新規ページを追加する場合

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

### 既存ページを変更する場合

既存ページを変更する場合は、docsディレクトリから当該ファイルを探して編集してください。

### 既存ページを移動する場合

1. ファイルを移動、またはファイル名を変更します。
2. `sidebars.js`の該当ページのパスを新しいパスに更新します。
3. `vercel.json`の`redirects`に旧URLから新URLへのリダイレクト設定を追加します。
4. `yarn build`を実行し、リンク切れがないか確認します。

たとえば、`docs/tutorials/setup.md` を `docs/getting-started/setup.md` に移動した場合は、`sidebars.js` の
`"tutorials/setup"` を `"getting-started/setup"` に修正し、`vercel.json` の `redirects` には次の設定を追加します。

```json title="vercel.json"
{ "source": "/tutorials/setup", "destination": "/getting-started/setup" }
```

これらの変更後、`yarn build` を実行してリンク切れがないか確認します。

### コンテンツ編集時に知っておくとよいこと

[VS Code](vscode.md)

[Markdown](markdown.md)

[ファイル構成](file-structure.md)

## コミットする

作成したファイルを編集したらコミットします。

```shell
git add docs/カテゴリ名/サブカテゴリ名/new-page.md
git commit -m "「新しいページ」を追加しました。"
```

:::tip
このプロジェクトは日本語話者向けなので、コミットメッセージは日本語で構いません。

コミットメッセージの例:

- 「型注釈」を追加しました。
- 「関数」にサンプルコードを追加しました。
- 誤字「使用」を「仕様」に修正しました。

:::

## コンテンツを校正する

### コードスタイルの校正

Prettierとmarkdownlintで、Markdownの記法スタイルやコードブロック内のTypeScriptコードスタイルを修正します。

```shell
yarn markdownlint:fix
yarn prettier:fix
```

:::tip
Prettierの自動整形をさせたくないコードブロックには`<!--prettier-ignore-->`をつけます。

````markdown
<!--prettier-ignore-->
```ts
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

### 日本語の校正

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

<!--textlint-disable prh-->

textlintのprhルールが無効になるエリア

<!--textlint-enable prh-->

...
```

注意点として、コメントの前後には空行が必要です。

```markdown title="NG"
<!--textlint-disable-->

無効化したいテキスト

<!--textlint-enable-->
```

```markdown title="OK"
<!--textlint-disable-->

無効化したいテキスト

<!--textlint-enable-->
```

:::

### 校正結果をコミットする

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

## プルリクエストを送る

:::caution
プルリクエストを送る前に**できるだけ**コミットが1つになっているか確認してください。
:::

変更内容をpushします。

```shell
git push -u origin ブランチ名
```

プルリクエストの作成時には[GitHubのキーワードを用いたissueの関連付け機能]を用いて、対応したissueをプルリクエストに関連付けてください。これには2つの目的があります。ひとつは、プルリクエストの経緯をたどれるようにすることです。もうひとつは、プルリクエストがマージされた際に、issueが自動クローズされるようにするためです。たとえば、issue #123を解決するプルリクエストであれば、本文中に次のようなキーワードを書きます。

[githubのキーワードを用いたissueの関連付け機能]: https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword

```markdown
Close #123
```

これはチケット駆動プロセスで必要となる手順です。

[チケット駆動](ticket-driven.md)

プルリクエストが作成されると、CIが走りコードスタイルなどのチェックが行われます。CIに問題がなければメンテナーによってマージされます。マージ権限がある方は、CIの結果を確認の上、問題なければ自分でマージして構いません。
