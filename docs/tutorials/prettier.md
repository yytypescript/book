# Prettierでコード整形を自動化しよう

このチュートリアルでは、コードフォーマッターの「Prettier」を使いTypeScriptのコードフォーマットを自動化することを学びます。

## 本章で学べること

本章ではPrettierを導入してコード整形を自動化することを目標に次のことを学びます。

- Prettierの導入方法
- Prettierの実行方法
- 整形ルールの設定方法

## Prettierとは

Prettierはコードのフォーマットを自動整形するツールです。Prettierがサポートしている形式は幅広く次の形式をサポートしています。
また、プラグインを利用することでPHPなどの他の言語のフォーマットを行うこともできます。

- JavaScript
- TypeScript
- [JSX](./../reference/jsx/README.md)
- Flow
- JSON
- HTML
- Vue
- Angular
- Ember
- Css
- Less
- SCSS
- styled-components
- styled-jsx
- GraphQL
- Markdown
- MDX
- YAML
- Svelte

## なぜPrettierを導入するのか

複数人で開発していると、人によってインデントがズレていたり、オブジェクトの最後のカンマをつけるorつけないといったコードスタイルの違いが発生します。

<!-- prettier-ignore -->
```ts
// オブジェクトの最後にカンマが付いている
// 文字列はダブルクォート
// 行末にセミコロンが付いている
const user1 = {
  name: "太郎",
  age: 20,
};

// オブジェクトの最後にカンマが付かない
// 文字列はシングルクォート
// 行末にセミコロンが付かない
const user2 = {
  name: 'まさる',
  age: 30
}
```

手動でこれらのコードスタイルを統一するには、ガイドラインを作成してチーム内で共有をしてコードレビューで注意深くチェックする必要があります。また、新しいメンバーがチームに参加した際にはルールを共有する手間も発生します。

Prettierを導入してコード整形を自動化することで、簡単にコードのスタイルを統一することができます。開発者は細かいコードスタイルのことを意識する必要がなくなり開発に集中することができるようになるので、より効率的に開発をすることができます。

## このチュートリアルに必要なもの

このチュートリアルで必要なものは次のとおりです。

- Node.js v24以上
- npm v11以上 (Node.jsに同梱)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

## プロジェクトを作成する

このチュートリアルに使うプロジェクトを作成します。

```shell
mkdir prettier-tutorial
cd prettier-tutorial
```

プロジェクトのルートにpackage.jsonを作成してください。内容は次のようにします。

```json title="package.json"
{
  "name": "prettier-tutorial",
  "license": "UNLICENSED"
}
```

## Prettierをインストール

Prettierは開発時にだけ使うパッケージなので`-D`オプションをつけてインストールします。

```shell
npm install -D prettier
```

バージョンを表示してインストールを確認してください。

```shell
npx prettier -v
3.7.4
```

<!-- regression test: 上記とメジャーバージョンが一致しているか確認してください。 -->

## TypeScriptを自動整形する

`prettier`コマンドを利用して、TypeScriptのファイルをPrettierで自動整形してみましょう。

最初に`src`ディレクトリを作成して、`src/hello-world.ts`を作成してください。

```shell
mkdir src
touch src/hello-world.ts
```

`hello-world.ts`の内容を次のように変更します。
このコードは自動整形を確認するために、わざと見づらいコードになっています。

<!--prettier-ignore-->
```ts twoslash title="src/hello-world.ts"
const hello = ( name: string) =>   {
console.log("Hello,World "
+ name)

}
```

`prettier`コマンドを実行してみましょう。
コマンドは`prettier [オプション] [ファイル/ディレクトリ]`の形式で実行できます。

次の例では`src`を引数で指定することで`src`ディレクトリ配下のすべてファイルを対象として自動整形を実行します。

```shell
npx prettier src
```

整形結果が表示されていますが、`hello-world.ts`を確認するとファイル内容が変更されていないことに気づくと思います。`prettier`コマンドをオプションなしで実行した場合は整形結果だけが表示されて、ファイルの書き換えは実行されません。

<!-- regression test: 上と同じ体験ができたか確認してください。 -->

ファイルの書き換えを一緒に実行する場合は`--write`オプションを指定します。

```shell
npx prettier --write src
```

実行後に`hello-world.ts`を確認してみると、次のようにコードが整形されているのが確認できます。

```ts twoslash title="src/hello-world.ts"
const hello = (name: string) => {
  console.log("Hello,World " + name);
};
```

<!-- regression test: 上のように整形されているか確認してください。 -->

## Prettierのデフォルトの整形ルール

Prettierはデフォルトの整形ルールが定義されています。先ほどの実行結果を見るとインデントが幅2つのスペースでインデントがされているのが分かります。

代表的な項目のデフォルト値は次のようになっています。
すべての項目のデフォルト値を確認したい場合は、[Prettierの公式ドキュメント](https://prettier.io/docs/en/options.html)を参照してください。

<!-- regression test: 上記のリンクが正しいか確認してください。 -->

| 項目            | デフォルト値   |
| --------------- | -------------- |
| 1行の最大文字数 | 80             |
| インデント幅    | 2              |
| インデント      | スペース       |
| セミコロン      | つける         |
| クォート        | ダブルクォート |

## Prettierの整形ルールを設定する

### CLIオプションで設定

整形ルールは`prettier`コマンドを実行する時にオプションとして指定することができます。
先ほど整形した`hello-world.ts`を別の整形ルールで整形してみます。

```shell
npx prettier --no-semi --tab-width 4 --write src
```

整形されたコードを見るとセミコロンが消えて、インデント幅が2から4に変更されているのを確認できます。

<!--prettier-ignore-->
```ts twoslash title="src/hello-world.ts"
const hello = (name: string) => {
    console.log("Hello,World " + name)
}
```

<!-- regression test: 上のように整形されているか確認してください。 -->

### 設定ファイルを作成する

Prettierは整形ルールを設定ファイルに記述することもできます。

プロジェクトのルートに`.prettierrc`を作成します。

```shell
touch .prettierrc
```

次に`.prettierrc`を次のように変更します。

```json title=".prettierrc"
{
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true
}
```

設定ファイルが作成できたら、`prettier`コマンドを実行してみましょう。
Prettierはプロジェクトルートに`.prettierrc`が存在する場合は自動で設定ファイルを読み込んで整形ルールを設定してくれます。

```shell
npx prettier --write src
```

設定ファイルで記述した整形ルールで`hello-world.ts`が変更されているのを確認できます。

<!--prettier-ignore-->
```ts twoslash title="src/hello-world.ts"
const hello = (name: string) => {
  console.log('Hello,World ' + name);
};
```

<!-- regression test: 上のように整形されているか確認してください。 -->

上記の例ではJSONフォーマットで設定ファイルを作成しましたが、PrettierはJSON以外にもJS,YAML,TOMLのフォーマットをサポートしています。

```js twoslash title="prettier.config.js"
module.exports = {
  tabWidth: 2,
  semi: true,
  singleQuote: true,
};
```

```yaml title=".prettierrc.yml"
tabWidth: 2
semi: true
singleQuote: true
```

```toml title=".prettierrc.toml"
tabWidth = 2
semi = true
singleQuote = true
```

`.prettierrc`以外でも自動で設定ファイルとして認識可能なファイル名がいくつか存在します。
フォーマットとファイル名の組み合わせは次のとおりです。

| フォーマット | ファイル名                                                                              |
| :----------- | :-------------------------------------------------------------------------------------- |
| json         | `.prettierrc`, `.prettierrc.json`, `.prettierrc.json5`                                  |
| js           | `.prettierrc.js`, `.prettierrc.cjs`, `prettier.config.js`, <br /> `prettier.config.cjs` |
| yaml         | `.prettierrc`, `.prettierrc.yml`, `.prettierrc.yaml`                                    |
| toml         | `.prettierrc.toml`                                                                      |

### EditorConfigを利用する

Prettierは[EditorConfig](https://editorconfig.org/)という、プロジェクト参加者の間でインデントのスタイルや改行文字の種類などを統一させる仕組みに対応しています。プロジェクトルートに`.editorconfig`というファイルを置くと、対応しているテキストエディターやIDE、Prettier等がそれを読み込んで、インデントスタイル等を書かれた内容に合わせます。

`.editorconfig`ファイルの例を次に示します。

```ini title=".editorconfig"
root = true

[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.md]
trim_trailing_whitespace = false
```

このファイルがプロジェクトルートにあると、Prettierはそれを検知し、`.prettierrc`がなくてもスペース2つでフォーマットします。シングルクォートを使うか・セミコロンを挿入するか等の設定をしたい場合は`.prettierrc`を別途作成する必要がありますが、`tabWidth`・`useTabs`・`endOfLine`の項目は指定しなくてよくなります。

Prettierの他にも、VSCodeは[プラグイン](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)経由で対応している他、IntelliJ IDEAやVisual Studioも対応しています。それらのエディターでファイルの新規作成を行うと、`.editorconfig`に書かれたルールに沿うようにエディターの設定が一時的に変更されます。

### 他の整形ルールを確認する

ここで紹介した以外にもいくつかの整形ルールが存在します。
他の整形ルールやCLIコマンドのオプション名、設定ファイルのキー名などを確認したい場合は[Prettierの公式ドキュメント](https://prettier.io/docs/en/options.html)をご参照ください。

<!-- regression test: 上記のリンクが正しいか確認してください -->

### どのような整形ルールがよいのか？

Prettierをプロジェクトに導入する時に整形ルールについて悩む場合があるかもしれません。

整形ルールについては好みの部分も大きいので、プロジェクトの開発者で話し合って決めるようにしましょう。整形ルールを変更したい場合は`prettier`コマンドを実行するだけなので、後から簡単に変更できる前提で決めてしまっても問題ありません。

特にこだわりが無い場合は、Prettierのデフォルトの整形ルールをそのまま利用するのがオススメです。

## Prettierの自動整形を無効にする

`prettier-ignore`をコメントとして記述することで、一部のコードをPrettierの自動整形の対象から除外することができます。

```ts twoslash title="src/hello-world.ts"
const board1 = [1, 0, 0, 1];

// prettier-ignore
const board2 = [
  1, 0,
  0, 1
];
```

<!-- regression test: prettier-ignoreが正しく機能しているか確認してください。 -->
