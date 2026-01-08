# 環境構築からプルリクエストまでの流れ

環境構築から執筆、公開までの流れと手順を説明します。

## issueの確認

本プロジェクトでは[チケット駆動](ticket-driven.md)を原則としています。加えようとしている変更についてのissueがあるか、十分に議論が交されているかなどを確認してください。

## 編集環境のセットアップ

リポジトリをGitHub上でフォークし、フォークしたリポジトリをチェックアウトします。(当リポジトリにコミット権限がある方はフォークする必要はありません。)

```shell
# 一般の方
git clone git@github.com:自分のアカウント/フォーク先のリポジトリ名.git

# 当プロジェクトにコミット権限がある方
git clone git@github.com:yytypescript/book.git
```

[Devbox](https://devbox.sh/)を使って再現性のある環境を構築します。DevboxではNode.jsやBunなど執筆に必要なツールの導入のために利用しています。まだインストールしていない方は[Devboxの公式サイトのインストール手順](https://www.jetify.com/docs/devbox/installing-devbox)を参照してください。

Devboxで開発用シェルを起動します。

```shell
devbox shell
```

:::info Direnvをご利用ください(任意だが推奨)
毎回`devbox shell`を実行するのが面倒な場合は、[Direnv](https://direnv.net/)をお使いください。Direnvを導入している方は次のコマンドを実行して、`.envrc`の実行を許可してください。

```shell
direnv allow
```
:::

必要なパッケージをインストールします。

```shell
bun install
```

開発サーバーを起動します。

```shell
task start
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
4. `task build`を実行し、リンク切れがないか確認します。

たとえば、`docs/tutorials/setup.md` を `docs/getting-started/setup.md` に移動した場合は、`sidebars.js` の
`"tutorials/setup"` を `"getting-started/setup"` に修正し、`vercel.json` の `redirects` には次の設定を追加します。

```json title="vercel.json"
{ "source": "/tutorials/setup", "destination": "/getting-started/setup" }
```

これらの変更後、`task build` を実行してリンク切れがないか確認します。

### コンテンツ編集時に知っておくとよいこと

[VS Code](vscode.md)

[Markdown](markdown.md)

[ファイル構成](file-structure.md)

## 変更をチェックする

変更をチェックするには、`task check`を実行してください。

```shell
task check
```

このコマンドは、コードスタイル、Markdown、日本語、型チェックを行います。もしチェックに失敗した場合は、後述の「トラブルシューティング」を参照してください。

チュートリアルに変更を加えた場合は、可能であれば回帰テストを行ってください。

- [チュートリアル回帰テストを行う(コンテナ)](tutorial-regression-test-on-container.md): 大抵のチュートリアルはコンテナ版で十分です。
- [チュートリアル回帰テストを行う(macOS)](tutorial-regression-test-on-macos.md): Homebrewが必要など、特殊なチュートリアルはこちらをお使いください。

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


## トラブルシューティング

### `task check:format`(Prettier)が失敗する

`task format`を実行して自動修正を行ってください。

:::caution
`task format`はファイルを変更します。万が一に備えて、`git add`や`git commit`などをして、簡単に元に戻せるようにしてから実行してください。
:::

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

### `task check:markdown`(markdownlint)が失敗する

markdownlintで指摘されたエラーの詳細は[markdownlintのドキュメント](https://github.com/DavidAnson/markdownlint/blob/main/doc/Rules.md)をご覧ください。

markdownlintのエラーの中には、`task check:markdown:fix`を実行することで自動修正できるものがあります。そうでないエラーは手動で修正してください。


:::caution
`task check:markdown:fix`はファイルを変更します。万が一に備えて、`git add`や`git commit`などをして、簡単に元に戻せるようにしてから実行してください。
:::

### `task check:japanese`(textlint)が失敗する

textlintのエラーが出ない書き方が望ましいです。textlintのエラーの中には、`task check:japanese:fix`を実行することで自動修正できるものがあります。そうでないエラーは手動で修正してください。

:::caution
`task check:japanese:fix`はファイルを変更します。万が一に備えて、`git add`や`git commit`などをして、簡単に元に戻せるようにしてから実行してください。
:::

場合によって、textlintを無効にしたいことがあるかもしれません。無効化したい部分はコメントで囲みます。

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