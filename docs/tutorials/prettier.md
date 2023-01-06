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
- JSX
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

## なぜPrettierを導入するのか

複数人で開発していると、人によってインデントがズレていたり、オブジェクトの最後のカンマをつけるorつけないといったコードスタイルの違いが発生します。

```ts
// オブジェクトの最後にカンマが付いている
const user1 = {
  name: "太郎",
};

// オブジェクトの最後にカンマが付かない
const user2 = {
  name: "まさる",
};
```

手動でこれらのコードスタイルを統一するには、ガイドラインを作成してチーム内で共有をしてコードレビューで注意深くチェックする必要があります。また、新しいメンバーがチームに参加した際にはルールを共有する手間も発生します。

Prettierを導入してコード整形を自動化することで、簡単にコードのスタイルを統一することができます。開発者は細かいコードスタイルのことを意識する必要がなくなり開発に集中することができるようになるので、より効率的に開発をすることができます。

## このチュートリアルに必要なもの

このチュートリアルで必要なものは次のとおりです。

- Node.js v16以上
- Yarn v1系 (このチュートリアルはv1.22.19で動作確認しています)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

パッケージ管理ツールとしてYarnを利用します。最初にインストールをしておきましょう。すでにインストール済みの方はここのステップはスキップして大丈夫です。

```shell
npm install -g yarn
```

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
yarn add -D prettier@^2
```

バージョンを表示してインストールを確認してください。

```shell
yarn prettier -v
2.8.1
```

## TypeScriptを自動整形する

`prettier`コマンドを利用して、TypeScriptのファイルをPrettierで自動整形してみましょう。

最初に`src`ディレクトリを作成して、`src/helloWorld.ts`を作成してください。

```shell
mkdir src
touch src/helloWorld.ts
```

`helloWorld.ts`の内容を次のように変更します。
このコードは自動整形を確認するために、わざと見づらいコードになっています。

```ts twoslash title="src/helloWorld.ts"
const hello = (name: string) => {
  console.log("Hello,World " + name);
};
```

`prettier`コマンドを実行してみましょう。
コマンドは`prettier [オプション] [ファイル/ディレクトリ]`の形式で実行できます。

次の例では`src`を引数で指定することで`src`ディレクトリ配下のすべてファイルを対象として自動整形を実行します。

```shell
yarn prettier src
const hello = (name: string) => {
  console.log("Hello,World " + name);
};
```

整形結果が表示されていますが、`helloWorld.ts`を確認するとファイル内容が変更されていないことに気づくと思います。`prettier`コマンドをオプションなしで実行した場合は整形結果だけが表示されて、ファイルの書き換えは実行されません。

ファイルの書き換えを一緒に実行する場合は`--write`オプションを指定します。

```shell
yarn prettier --write src
```

実行後に`helloWorld.ts`を確認してみると、次のようにコードが整形されているのが確認できます。

```ts twoslash title="src/helloWorld.ts"
const hello = (name: string) => {
  console.log("Hello,World " + name);
};
```

## Prettierのデフォルトの整形ルール

Prettierはデフォルトの整形ルールが定義されています。先ほどの実行結果を見るとインデントが幅2つのスペースでインデントがされているのが分かります。

代表的な項目のデフォルト値は次のようになっています。
すべての項目のデフォルト値を確認したい場合は、[Prettierの公式ドキュメント](https://prettier.io/docs/en/options.html)を参照してください。

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
先ほど整形した`helloWorld.ts`を別の整形ルールで整形してみます。

```shell
yarn prettier --no-semi --tab-width 4 --write src
```

整形されたコードを見るとセミコロンが消えて、インデント幅が2から4に変更されているのを確認できます。

```ts twoslash title="src/helloWorld.ts"
const hello = (name: string) => {
  console.log("Hello,World " + name);
};
```

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
yarn prettier --write src
```

設定ファイルで記述した整形ルールで`helloWorld.ts`が変更されているのを確認できます。

```ts twoslash title="src/helloWorld.ts"
const hello = (name: string) => {
  console.log("Hello,World " + name);
};
```

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

### 他の整形ルールを確認する

ここで紹介した以外にもいくつかの整形ルールが存在します。
他の整形ルールやCLIコマンドのオプション名、設定ファイルのキー名などを確認したい場合は[Prettierの公式ドキュメント](https://prettier.io/docs/en/options.html)をご参照ください。

### どのような整形ルールがよいのか？

Prettierをプロジェクトに導入する時に整形ルールについて悩む場合があるかもしれません。

整形ルールについては好みの部分も大きいので、プロジェクトの開発者で話し合って決めるようにしましょう。整形ルールを変更したい場合は`prettier`コマンドを実行するだけなので、後から簡単に変更できる前提で決めてしまっても問題ありません。

特にこだわりが無い場合は、Prettierのデフォルトの整形ルールをそのまま利用するのがオススメです。

## Prettierの自動整形を無効にする

`prettier-ignore`をコメントとして記述することで、一部のコードをPrettierの自動整形の対象から除外することができます。

```ts twoslash title="src/helloWorld.ts"
const board1 = [1, 0, 0, 1];

//  prettier-ignore
const board2 = [
  1, 0,
  0, 1
];
```
