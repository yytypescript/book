---
sidebar_label: ESLintでコーディング規約を自動化しよう
---

# ESLintでTypeScriptのコーディング規約チェックを自動化しよう

本章では、<ruby>ESLint<rt>イーエスリント</rt></ruby>を使って、TypeScriptをチェックするためのノウハウをチュートリアル形式で学びます。

## 本章で学べること

本章では次のことを学んでいただきます。

- コーディング規約の必要性とコーディング規約の問題点
- ESLintでJavaScriptやTypeScriptをチェックする方法
- ESLintのルールの設定のしかた
- Airbnbのコーディング規約をESLintで活用する術
- エラーを解消する方法
- チェックを部分的に無効化する方法
- VS CodeやJetBrains IDEとESLintを統合する方法

チュートリアルをやり終えると、ご自身のプロジェクトにESLintを導入できるようになったりと、実務で役立つ基本的なスキルが身につくはずです。

## 本章の流れと読み進め方

本章は次の3部構成です。

- [背景知識]
- [ESLintでJavaScriptをリントしよう]
- [ESLintでTypeScriptをリントしよう]

本章の前半は座学です。「コーディング規約」や「リンター」が何か知らない方向けに、その背景知識を解説します([背景知識])。すでにコーディング規約やリンターが分かっている方、すぐに手を動かしたい方は、ここは読み飛ばしても構いません。

本章の後半はチュートリアルです。本章のゴールは、TypeScriptをESLintでチェックできるようになることです。しかしながら、ESLintでTypeScriptを扱うのは発展的な用法です。そこで、チュートリアルの流れとしては、まず基礎編として、JavaScriptをESLintで扱う方法を学びます([ESLintでJavaScriptをリントしよう])。その後、TypeScriptをESLintを扱う方法を学んでいただきます([ESLintでTypeScriptをリントしよう])。

章末にはおまけとして次のチュートリアルも用意してあります。関心と余力がある方はこちらもご覧ください。

- [VS CodeとESLintを統合しよう]
- [JetBrains IDEとESLintを統合しよう]

## このチュートリアルに必要なもの

このチュートリアルで必要なものは次のとおりです。

- Node.js v16以上
- NPM v7系以上
- Yarn v1系 (このチュートリアルはv1.22.18で動作確認しています)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

パッケージ管理ツールとしてYarnを利用します。最初にインストールをしておきましょう。すでにインストール済みの方はここのステップはスキップして大丈夫です。

```shell
npm install -g yarn
```

## 背景知識

[背景知識]: #背景知識

### TypeScriptの書き方はさまざま

TypeScriptに限らず、プログラミング言語には文法があります。文法を守って書かれたコードは、エラーなく実行やコンパイルができます。

プログラムは文法さえ守れば、誰が書いても一字一句同じコードになるかというと、そうではありません。たとえば、TypeScriptでは文末のセミコロンが省略できます。次の2行のコードの違いは、セミコロンの有無です。どちらも文法的に正しく、どちらを使うかは好みの問題です。

```ts twoslash
// prettier-ignore
console.log("OK")
console.log("OK");
```

文字列はシングルクォート、ダブルクォート、バッククォートの3通りで書けます。シングルクォートとダブルクォートは機能上の違いがありません。バッククォートは[テンプレートリテラル](/reference/values-types-variables/string#テンプレートリテラル)と言い、文字列リテラルとは仕様が異なります。しかし、次の例のような単純な文字列では、この3つは同じ意味になります。

```ts twoslash
// prettier-ignore
console.log('OK');
console.log("OK");
console.log(`OK`);
```

この例は、どれを使うか意見が割れるところです。本書独自の調査では、「原則的にどれをもっとも多く使うか？」という問いに対し、シングルクォートが55%ともっとも多く、次にダブルクォートが29%、バッククォートは16%という回答が得られました。(回答数232件)

<figure><img src="/img/tutorial/eslint/string-quotes-chart.svg" width="320" /></figure>

上でとりあげた例はほんの一例です。意味が同じで書き方が異なる例は、数多くあります。

### 書き方の違いが問題になることも

書き方の違いが問題なることがあります。たとえば、プログラムを共同で開発する場合です。人によって書き方が異なると、その違いが気になったり驚いたりして、コードの本筋が頭に入ってこないことがあります。インデントの幅が統一されていないと、コードが読みにくくなることもあります。結果的に、**書き方に違いがあるとプログラムの保守性を損ねる**一因になります。

### コーディング規約で書き方を統一

理想は、誰が書いても同じコードになることです。そのためにはどうしたらよいでしょうか。解決策のひとつは、書き方のルールを決めることです。コードの**書き方の取り決めは「コーディング規約(coding standards)」**と呼ばれます。

コーディング規約では、たとえば、次のようなことを決めます。

- 変数名はキャメルケースにしましょう。
- `function`の中カッコは関数名と同じ行に書きましょう。(次の行に置いてはなりません)
- `console.log`は消しましょう。
- if文の条件式で変数代入してはいけません。たとえば`if (data = getData())`はだめ。

このようなルールを取りまとめて規約を作るのですが、実用的な規約に仕上げるにはかなりの労力を要します。実務では、公開されている規約を借りてくるほうが現実的です。

公開されている規約には主に次のものがあります。これらは実際に多くのプロジェクトで利用されています。

- [Google JavaScript Style Guide]
- [JavaScript Standard Style]
- [Airbnb JavaScript Style Guide]

[google javascript style guide]: https://google.github.io/styleguide/jsguide.html
[javascript standard style]: https://standardjs.com/rules.html
[airbnb javascript style guide]: https://github.com/airbnb/javascript

コーディング規約をチームのみんなで守れば、書き方を統一しやすくなります。

### コーディング規約の問題点

コーディング規約にも問題点があります。

#### 運用の手間は少なくない

開発者ひとりひとりが規約を守れば、コーディング規約は機能します。しかし、ヒューマンエラーは起きるものです。規約を知った上で破る場合もありますが、多いのは知らずに破ってしまうことや、間違えてしまうことです。もしも、規約が守られなければ、規約は形式上のものになってしまいます。そうなると、書き方を統一するという目標は達成できなくなってしまいます。

ヒューマンエラーを防ぐには、コードが**規約に準拠しているかを日々点検しなければなりません**。しかし、これには多くの労力がかかります。もっと重要な仕事がある中で、点検を行うのは無理な場合もあるかもしれません。規約を正しく運用するには、多くの手間がかかるのです。

#### コミュニケーション上の心理的な負担が増す

コーディング規約は、何が正しく、何が間違いかを定めます。すると、明らかに誤りと判断できるコードが出てきます。他者が書いたコードの誤りを指摘する場面も出てきます。**人の仕事の誤りを指摘するのは難しいものです**。想像以上に心理的な負担になります。指摘する側は相手の心象を悪くしないよう、伝え方に苦慮します。指摘される側も、前向きに受け取れない場合もあります。相手との対人関係によっては、指摘することが遠慮される場合もあります。

### コーディング規約の自動化

書き方を統一するには、コーディング規約は不可欠です。しかし、運用の手間や心理的な課題もあります。これを解決する手助けとなるのがESLintです。**ESLintは、JavaScriptやTypeScriptのコードがコーディング規約に準拠しているかをチェックするツール**です。

ESLintは、コマンドひとつでチェックが行なえます。チェックは数秒で完了し、すぐに結果がわかります。そのため、点検の手間がほぼなくなります。

加えて、自動修正機能もあります。コードによっては、ESLintが規約に準じたコードに直せる場合もあります。この機能を利用できる場合は、規約違反箇所を修正する手間もなくせます。

不思議なもので、同じ指摘でも人に言われるより、機械に指摘されたほうが気が楽なものです。ESLintでは機械的に問題を指摘してくれるため、コミュニケーション上の心理的負担も軽減できます。

ESLintを導入すると、開発者は規約の運用や心理的ストレスから開放され、**開発などのより重要な仕事に集中できるようになります**。

<PostILearned>

📝TypeScriptは同じ意味処理でも異なる書き方が可能
💥チーム開発では書き方の違いが問題になることも…
🤝書き方統一のためにコーディング規約を導入しよう
😵でも、規約には運用の手間や心理的な課題もある
✅この課題はESLintで解決できる！

</PostILearned>

### リンターとは

ESLintは一般的に「リンター(linter)」というジャンルのツールです。リンターは、プログラムを**静的に解析し、バグや問題点を発見するツール**を言います。リンターを使って、問題点を解析することを「リントする(lint)」と言います。

リント(lint)の由来は紡績です。羊毛や綿花から、繊維をつむぐ際に不要になるホコリのような糸くずをリントと呼びます。紡績ではリントを取り除く工程があり、これにちなんでプログラミングでもリントという名前が使われだしたと言われています。

### コンパイラとリンターの違い

コンパイラの本質は、ある言語から別の言語に変換することです。TypeScriptコンパイラの場合は、TypeScriptからJavaScriptへの変換です。

リンターの本質は、プログラムの問題点を指摘することです。言語から言語への変換は行いません。

実際は、TypeScriptコンパイラもプログラムの問題点を報告します。たとえば、コンパイラオプション[`noUnusedLocals`](/reference/tsconfig/nounusedlocals)を有効にすると、未使用の変数をチェックできます。ESLintにもこれと同等のチェックがあります。こうした点はリンターの機能と重複する部分です。

類似のチェック機能があるものの、両者は得意分野が異なります。TypeScriptコンパイラは型のチェックが充実しています。型の側面から問題点を発見するのが得意です。一方、ESLintはインデントや命名規則などのコーディングスタイルや、どのようなコードを書くべきか避けるべきかの意思決定、セキュリティやパフォーマンスに関する分野でのチェックが充実しています。どちらも相互補完的な関係です。したがって、コンパイラとリンターの両方を導入すると、より幅広いチェックが行えるようになります。

<figure>
<figcaption>TypeScriptコンパイラとESLintの得意分野の比較</figcaption>

|                      | TypeScriptコンパイラ | ESLint |
| -------------------- | :------------------: | :----: |
| 言語から言語への変換 |          ○           |        |
| 型のチェック         |          ○           |        |
| 構文チェック         |          ○           |   ○    |
| コーディングスタイル |                      |   ○    |
| コードの意思決定     |                      |   ○    |
| セキュリティ         |                      |   ○    |
| パフォーマンス       |                      |   ○    |

</figure>

<PostILearned>

🧵リンター：コードを静的解析し問題点を指摘するツール。ESLintはリンター。
🔀コンパイラ：静的解析もするが、別言語への変換が主目的。tscはコンパイラ。

⚖️tscとESLintの相違点
・tsc：型のチェックが得意
・ESLint：コーディング規約のチェックが得意

</PostILearned>

## ESLintでJavaScriptをリントしよう

[eslintでjavascriptをリントしよう]: #eslintでjavascriptをリントしよう

ここからはESLintの導入方法や使い方をチュートリアル形式で説明していきます。ぜひお手元の環境で実際にトライしてみてください。

### プロジェクトを作成する

まず、このチュートリアルに使うプロジェクトを作成します。

```shell
mkdir eslint-tutorial
cd eslint-tutorial
```

プロジェクトルートにpackage.jsonを作ってください。その内容は次のようにします。

```json title="package.json"
{
  "name": "eslint-tutorial",
  "license": "UNLICENSED"
}
```

### ESLintを導入する

ESLintはYarnでインストールしましょう。ESLintは開発時だけ使うパッケージなので、`yarn add`コマンドには`-D`オプションをつけてインストールします。

```shell
yarn add -D 'eslint@^8'
```

:::info
Next.jsは最初からESLintが導入されています。実務でNext.jsプロジェクトでESLintを使う場合は、導入ステップは省略できます。
:::

ESLintが正しくインストールされたか、バージョンを表示して確認してください。

```shell
npx eslint -v
v8.15.0
```

ちなみにこの`npx`コマンドは、Nodeモジュール(ライブラリ)の実行ファイルを起動するツールです。`npx eslint`を実行すると、`./node_modules/.bin/eslint`が実行されます。

### ESLintの設定ファイルを作る

ESLintの設定ファイル`.eslintrc.js`をプロジェクトルートに作ってください。

```shell
touch .eslintrc.js
```

```text title="設定ファイル作成後のディレクトリ構造"
.
├── .eslintrc.js
├── node_modules
├── package.json
└── yarn.lock
```

設定ファイルの内容は次のようにします。

```js twoslash title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
```

この設定内容は次で説明します。

#### `root`

`eslint`コマンドを実行したディレクトリを起点に、ディレクトリをさかのぼって設定ファイルを探す仕様がESLintにはあります。たとえば、ディレクトリ`/a/b/`でコマンドを実行した場合、ESLintは次の順で設定ファイルを探します。

1. `/a/b/.eslintrc.js`
1. `/a/.eslintrc.js`
1. `/.eslintrc.js`

この探索はルートディレクトリに達するまでさかのぼります。探索中に複数の設定ファイルが見つかった場合は、設定内容がマージされていきます。この仕様は便利な反面、プロジェクト外の設定ファイルまで見にいってしまう危険性もあります。設定ファイルの探索範囲をしぼるためにも、`root`に`true`を設定するのがお勧めです。これがある設定ファイルが見つかると、これ以上ディレクトリをさかのぼらなくなります。

#### `env`

`env`はチェック対象のJavaScript/TypeScriptコードがどの実行環境で使われるかをESLintに伝えるためのオプションです。これを設定すると、ESLintがグローバル変数を認識するようになります。たとえば、`browser: true`を設定すると、`window`や`alert`などのグローバル変数が認識されます。`es2021`を設定すると、ES2021までに導入されたグローバル変数が認識されます。他にも`node`などの指定ができます。指定できる実行環境の一覧は[公式ドキュメント](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments)をご覧ください。

この設定は、ESLintの[no-undefルール](https://eslint.org/docs/rules/no-undef)に関係します。このルールは未定義の変数をチェックするルールです。グローバル変数は定義せずに利用できる変数です。ESLintはどのグローバル変数が定義済みかを知らないと、このルールを正しく適用できません。そのため、`env`オプションは正しく設定する必要があります。

#### `parserOptions`

##### `ecmaVersion`

`parserOptions`はチェック対象のJavaScriptがどの構文を使っているかをESLintに伝えるためのオプションです。`ecmaVersion`は、どのバージョンのECMAScriptの構文を使うかを指定します。`"latest"`を設定すると、最新のECMAScriptの構文を使うという指定になります。デフォルトではECMAScript 5になっています。これはかなり古いバージョンです。実務ではES5で開発することはまれなので、ここは必ず指定しましょう。なお、`env`オプションで`es2022`などECMAScriptのバージョンを指定している場合、`ecmaVersion`にも自動的に`es2022`が設定されます。どちらも同じバージョンを指定する場合は、`ecmaVersion`の指定は省略できます。

##### `sourceType`

JavaScriptにはスクリプトモードとモジュールモードがあります。`sourceType`はJavaScriptコードがどちらのモードで書かれるかを指定するオプションです。モジュールモードでは、`import`文や`export`文といった追加の構文がサポートされます。`sourceType`のデフォルト値は`"script"`(スクリプトモード)です。実務で開発する場合は、モジュールモードでJavaScript/TypeScriptを書くほうが普通なので、`sourceType`には`"module"`(モジュールモード)を指定しましょう。

### ESLintのルールを設定する

ESLintには「ルール(rule)」という概念があります。ルールはチェックの最小単位です。たとえば、ルールには次のようなものがあります。

- `no-console`: `console.log`を書いてはならない
- `camelcase`: 変数名はキャメルケースにすること
- `semi`: 文末セミコロンは省略しない

ESLintには200を超えるルールがあります。[全ルールのリストは公式ドキュメント](https://eslint.org/docs/rules/)にあります。

ESLintでは、複数のルールを組み合わせてコーディング規約を組み立てていきます。

ルールには、重大度(severity)という重み付けが設定できます。重大度は、`off`、`warn`と`error`の3種類です。`off`はルールを無効化し、チェックを行わなくする設定です。`warn`は発見した問題を警告として報告します。報告はするものの、`eslint`コマンドの終了コードには影響しません。`error`は発見した問題をエラーとして報告し、終了コードを1にする効果があります。それぞれの重大度は、`0`から`2`までの数値で設定することもできます。

<figure><figcaption>ESLintの重大度</figcaption>

| 重大度 | 数値 | 効果                             |
| ------ | ---- | -------------------------------- |
| off    | 0    | ルールをオフにする               |
| warn   | 1    | 警告するが終了コードに影響しない |
| error  | 2    | 警告し、終了コードを1にする      |

</figure>

ルールは`.eslintrc.js`の`rules`フィールドに、`ルール名: 重大度`のキーバリュー形式で書きます。まずは、`no-console`をルールに追加してみましょう。

```js twoslash {11-13} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
  },
};
```

ルールによっては、細かく設定できるものもあります。たとえば、`camelcase`です。これは変数名がキャメルケースかをチェックするルールです。変数の種類によっては、キャメルケース以外が使いたい場合があります。たとえば、プロパティ名はアンダースコアを使いたいことがあるかもしれません。ウェブAPIによっては、JSONオブジェクトがスネークケース(`foo_bar`のようなアンダースコア区切り)を採用している場合があるからです。この場合、`ルール名: [重大度, 設定値]`のような配列形式で設定することで、細かいルール設定ができます。次の設定例は、プロパティ名に限ってはキャメルケースを強制しない設定です。試しに、この設定を`.eslintrc.js`に加えてみましょう。

```js twoslash {13} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
  },
};
```

:::note ここまでのふりかえり

- package.jsonを作りました。
- eslintをインストールしました。
- 設定ファイル`.eslintrc.js`を作りました。
- 設定ファイルには次のルールを追加しました。
  - `no-console`: `console.log`をコードに残しておいてはいけない。
  - `camelcase`: 変数名はキャメルケースにすること(プロパティ名を除く)。

:::

### JavaScriptをチェックする

設定ファイルが準備できたので、JavaScriptファイルを作り、ESLintでチェックしてみましょう。

まず、`src`ディレクトリを作ってください。

```shell
mkdir src
```

`src`ディレクトリにJavaScriptファイル`helloWorld.js`を作ってください。

```shell
touch src/helloWorld.js
```

`helloWorld.js`が加わったディレクトリ構造が、次のようになっているか確認してください。

```txt
.
├── .eslintrc.js
├── node_modules
├── package.json
├── src
│   └── helloWorld.js
└── yarn.lock
```

`helloWorld.js`の内容は次のようにします。

```js twoslash title="src/helloWorld.js"
export const hello_world = "Hello World";
console.log(hello_world);
```

この`helloWorld.js`は、わざとコーディング規約に違反するコードになっています。1行目の変数`hello_world`はキャメルケースになっていません。2行目では、使ってはいけない`console.log`が使われています。

では、ESLintでチェックを実行してみましょう。チェックは、`eslint`コマンドを起動するだけです。`eslint`コマンドは第一引数に、チェック対象のファイル名やディレクトリ名を指定します。ここでは、`src`ディレクトリ全体をチェックするために、引数は`src`にします。

```shell title="srcディレクトリをESLintでチェックする"
npx eslint src
```

これを実行すると、次の出力が表示されます。

![](/img/tutorial/eslint/terminal-npx-eslint-src.svg)

#### 結果の読み方

チェックした結果、問題点が見つかると表形式で詳細が表示されます。各行は4つの列からなります。左から順に、コードの行番号列番号、重大度、問題点の説明、ルール名です。

![](/img/tutorial/eslint/error-meaning.svg)

結果に表示されている内容だけでは、どうして問題点になっているのか、どう直したらいいのかが分からないことがあります。その場合は、ルール名からESLintのドキュメントでルールの詳細を調べます。たとえば、上の結果ではルール名に`no-console`が挙がっていますが、この文字列をもとにルールの詳細を探します。`no-console`の詳細ページは、<https://eslint.org/docs/rules/no-console>にあります。

### コードを修正してエラーを解消する

```js twoslash title="src/helloWorld.js"
export const hello_world = "Hello World";
console.log(hello_world);
```

上のコードをESLintでチェックした結果、2つの問題点が指摘されました。

- 1行目: 変数名`hello_world`がキャメルケースではない
- 2行目: `console.log`は使ってはいけない

このエラーを解消したいので、`helloWorld.js`を編集してみましょう。変数名`hello_world`は`helloWorld`に変更します。2行目の`console.log`は削除しましょう。修正後のコードは次のようになります。

```js twoslash title="src/helloWorld.js"
export const helloWorld = "Hello World";
```

再びESLintでチェックして、もう問題がなくなっているか確認してみましょう。

```shell
npx eslint src
```

この実行結果に何も出力されなければ、問題点が解消されています。

### コードを自動修正する

ESLintのルールの中には、コードの自動修正ができるものがあります。たとえば、[`semi`](https://eslint.org/docs/rules/semi)は、文末セミコロンをつけるつけないを定めるルールですが、これは自動修正に対応しています。ここでは、`semi`を使ってESLintの自動修正をためしてみましょう。

まず、設定ファイル`.eslintrc.js`の`rules`に`semi`を追加します。

```js twoslash {14} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
    semi: ["error", "always"],
  },
};
```

このルール設定では、`"always"`を指定しています。これは、文末セミコロンを必須にする設定です。

つぎに、`src/helloWorld.js`のコードのセミコロンを消して保存してください。

```js twoslash title="src/helloWorld.js"
// prettier-ignore
export const helloWorld = "Hello World"
```

自動修正の前にチェックだけを実行し、`semi`についての問題が報告されるか確認します。

```shell
npx eslint src
```

次のような結果が表示されれば、追加した`semi`ルールが効いていることになります。

![](/img/tutorial/eslint/terminal-npx-eslint-src-semi.svg)

ESLintでコードを自動修正するには、`eslint`コマンドに`--fix`オプションをつけます。次のコマンドを実行し、自動修正してみましょう。

```shell
npx eslint src --fix
```

自動修正が成功していれば、出力は何も表示されずに処理が終了します。自動修正が効いているかを確認するために、`src/helloWorld.js`を開いてみてください。文末にセミコロンが追加されているでしょうか。追加されていれば自動修正成功です。

:::note ここまでのふりかえり

- `src/helloWorld.js`を作りました。
- `npx eslint src`を実行し、`src`ディレクトリをチェックしてみました。
- コードを手直しして、ESLintのチェックを通過する流れを体験しました。(`camelcase`, `no-console`)
- `npx eslint src --fix`を実行し、ESLintの自動修正機能を試しました。(`semi`)

:::

### ESLintにはどんなルールがある？

ここまでのチュートリアルでは3つのルールを扱いました(`camelcase`、`no-console`、`semi`)。ESLintにはもっと多くのルールがあります。ルール数は200を超えます。

ルールの一覧は、[公式ドキュメントのRules](https://eslint.org/docs/rules/)にあります。この一覧では、どのルールが自動修正に対応しているかも確認できます。

### Shareable configを導入する

ESLintのルールは数があまりにも多いため、ルールをひとつひとつ調べて導入していくのは大変です。そこで、お勧めなのがshareable configの活用です。

shareable configは、誰かが設定したルールのプリセットです。これを導入すると、自分でルールを設定する手間が省けます。

有名なshareable configのひとつに、ESLint公式が公開している`eslint:recommended`があります。これを導入すると、[Rulesの一覧](https://eslint.org/docs/rules/)でチェックマークがついているルールが一括して有効化されます。これは公式が提供してるため有名ですが、有効になっているルールが少ないため、実務では物足りなさがあるかもしれません。

第三者が公開しているshareable configもあり、次にあげるものは実務でも広く使われています。

| 名前                        | 作成        | 準拠するコーディング規約                                        |
| --------------------------- | ----------- | --------------------------------------------------------------- |
| [eslint-config-airbnb]      | Airbnb      | [Airbnb JavaScript Style Guide]、[Airbnb React/JSX Style Guide] |
| [eslint-config-airbnb-base] | Airbnb      | [Airbnb JavaScript Style Guide]                                 |
| [eslint-config-standard]    | Standard JS | [JavaScript Standard Style]                                     |
| [eslint-config-google]      | Google      | [Google JavaScript Style Guide]                                 |

[airbnb react/jsx style guide]: https://github.com/airbnb/javascript/tree/master/react
[eslint-config-airbnb]: https://www.npmjs.com/package/eslint-config-airbnb
[eslint-config-airbnb-base]: https://www.npmjs.com/package/eslint-config-airbnb-base
[eslint-config-standard]: https://www.npmjs.com/package/eslint-config-standard
[eslint-config-google]: https://www.npmjs.com/package/eslint-config-google

上のshareable configはコーディング規約に基づいて作成されているため、文書としてのコーディング規約とESLintの設定をセットでプロジェクトに導入できる利点があります。

このチュートリアルでは、人気のAirbnbのものを使っていきます。Airbnbの設定には、[eslint-config-airbnb]と[eslint-config-airbnb-base]の2つがあります。前者は、React向けの設定が追加で盛り込まれています。今回はReactは扱わないので、よりシンプルな後者を導入します。

<figure><figcaption>各shareable configのインストール件数の推移</figcaption><iframe src="https://npmcharts.com/compare/eslint-config-airbnb-base,eslint-config-airbnb,eslint-config-standard,eslint-config-google?interval=30&log=false&minimal=true" height="500" width="100%"></iframe></figure>

まず、Yarnで`eslint-config-airbnb-base`をインストールします。その際、合わせて`eslint-plugin-import`も導入します。

```shell
yarn add -D \
  'eslint-config-airbnb-base@^15' \
  'eslint-plugin-import@^2'
```

次に、設定ファイル`.eslintrc.js`の`rules`を消します。その上で、`extends: ["airbnb-base"]`を追加してください。

```js twoslash {11} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["airbnb-base"],
};
```

これで、shareable configの導入は完了です。

チェックを試すために、`src/helloWorld.js`を次の内容に置き換えてください。

```js twoslash title="src/helloWorld.js"
export const hello_world = "Hello World";
console.log(hello_world);
```

このコードはAirbnbの規約にわざと違反する内容になっています。

最後に`eslint`を実行し、チェックを動かしてみましょう。

```shell
npx eslint src
```

すると、次のような結果が得られるはずです。

![](/img/tutorial/eslint/terminal-npx-eslint-src-airbnb.svg)

ここで報告されている問題点は、次のような内容になります。

- `import/prefer-default-export`: デフォルトエクスポートを使わければなりません。
- `camelcase`: 変数`hello_world`はキャメルケースでなければなりません。
- `quotes`: 文字列リテラルはシングルクォートで囲む必要があります。
- `no-console`: `console.log`は残しておいてはいけません。

続いて、shareable configのルールを上書きする方法を学んでいきましょう。

上の結果では、`import/prefer-default-export`違反が報告されていました。これは、名前付きエクスポート(`export const helloWorld = "..."`)ではなく、デフォルトエクスポート(`export default "..."`)にすべきというエラーです。しかし、ここでは名前付きエクスポートを使いたいので、このルールをオフにすることで警告されないようにしてみましょう。ルールを上書きするには、`.eslintrc.js`の`rules`に`"import/prefer-default-export": "off"`を追加します。

```js twoslash {12-14} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["airbnb-base"],
  rules: {
    "import/prefer-default-export": "off",
  },
};
```

さらに、文字列リテラルはダブルクォートのほうを使いたいので、`rules`に`quotes: ["error", "double"]`を追加します。

```js twoslash {14} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["airbnb-base"],
  rules: {
    "import/prefer-default-export": "off",
    quotes: ["error", "double"],
  },
};
```

再び`eslint`を実行して、ルールの上書きが効いているか確認してみましょう。

```shell
npx eslint src
```

次のように、出力結果からデフォルトエクスポートと文字列クォートについての警告が消えていれば、ルールが効いています。

![](/img/tutorial/eslint/terminal-npx-eslint-src-airbnb-with-rules.svg)

### ルールを部分的に無効化する

`.eslintrc.js`で設定した規約はプロジェクト全体に及びます。コードを書いていると、どうしても規約を破らざるをえない部分が出てくることがあります。その場合は、コードのいち部分について、ルールを無効化することもできます。

部分的にルールを無効にするには、その行の前にコメント`eslint-disable-next-line`を追加します。たとえば、次の例ように書いておくと、変数名`hello_world`がキャメルケースでなくても、ESLintは警告を出さなくできます。

```js twoslash
// eslint-disable-next-line camelcase
export const hello_world = "Hello World";
```

この方法はいざというときに知っておくとよいというものです。ルール無効化コメントだらけになってしまうと本末転倒です。節度を持って使うのが望ましいです。

:::note ここまでのふりかえり

- shareable configの`eslint-config-airbnb-base`を導入しました。
- これのルールを一部上書きしてみました。
  - `import/prefer-default-export`を無効化
  - `quotes`の指定をシングルクォートからダブルクォートに変更
- ルール無効化コメント`// eslint-disable-next-line`を試しました。

:::

## ESLintでTypeScriptをリントしよう

[eslintでtypescriptをリントしよう]: #eslintでtypescriptをリントしよう

ここまでのチュートリアルでは、JavaScriptにESLintをかける方法を学んできました。ここからは、TypeScriptにESLintを使う方法を学んでいきます。

そもそもESLintでは、TypeScriptはチェックできません。これを補うのが[TypeScript ESLint]です。これを導入するとESLintでTypeScriptがチェックできるようになります。

[typescript eslint]: https://typescript-eslint.io/

### プロジェクトを作成する {#create-typescript-project}

ここからは別のプロジェクトを作り、その新プロジェクトでチュートリアルを進めていきます。空のディレクトリを作り、その中に最低限のpackage.jsonを配置してください。

```shell
mkdir eslint-typescript-tutorial
cd eslint-typescript-tutorial/
echo '{"name": "eslint-typescript-tutorial","license": "UNLICENSED"}' > package.json
```

### TypeScriptを導入する

TypeScript ESLintを使うには、TypeScript環境を構築しておく必要があります。まず、`typescript`を導入しておいてください。合わせてNode.jsの型定義`@types/node`もインストールしておきます。この型情報は、`.eslintrc.js`などのNode.js環境で実行されるファイルをESLintでチェックするときに利用されます。

```shell
yarn add -D 'typescript@^4.6' '@types/node@^16'
```

TypeScriptコンパイラの設定ファイルも作っておきます。

```shell
touch tsconfig.json
```

tsconfig.jsonの内容はこうします。

```json title="tsconfig.json"
{
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

続いて、`src`ディレクトリにTypeScriptファイル`helloWorld.ts`を追加します。内容は空で構いません。

```shell
mkdir src
touch src/helloWorld.ts
```

コンパイルもできるか試してみましょう。

```shell
npx tsc
```

コンパイルが成功すると、`dist/helloWorld.js`が生成されます。

この段階では、ディレクトリ構成が次のようになっているはずです。

```text title="ディレクトリ構成"
.
├── dist
│   └── helloWorld.js
├── node_modules
├── package.json
├── src
│   └── helloWorld.ts
├── tsconfig.json
└── yarn.lock
```

### TypeScript ESLintを導入する

ESLint本体と[TypeScript ESLint]の両方をインストールします。

```shell
yarn add -D \
  'eslint@^8' \
  '@typescript-eslint/parser@^5' \
  '@typescript-eslint/eslint-plugin@^5'
```

TypeScript ESLintは2つのパッケージから成ります。`@typescript-eslint/parser`は、ESLintにTypeScriptの構文を理解させるためのパッケージです。`@typescript-eslint/eslint-plugin`は、TypeScript向けのルールを追加するパッケージです。

ESLintがインストールされ、実行可能になっているかバージョンを表示して確認しましょう。

```shell
npx eslint -v
v8.15.0
```

### TypeScript ESLintにはどんなルールがある？

ESLintの[200以上のルール](https://eslint.org/docs/rules/)に加えて、TypeScript ESLintを導入すると、100以上のルールが追加されます。追加されるルールの一覧は、[TypeScript ESLintのドキュメント](https://typescript-eslint.io/rules/)で確認できます。

:::note ここまでのふりかえり

- 新規プロジェクト`eslint-typescript-tutorial`を作成しました。
- TypeScriptをインストールし、`tsconfig.json`を設定しました。
- 中身が空の`src/helloWorld.ts`を作成し、コンパイルしてみました。
- ESLintとTypeScript ESLintをインストールしました。

:::

### TypeScript向けのshareable configを導入する

コーディング規約[Airbnb JavaScript Style Guide]に準拠したshareable configをインストールします。

```shell
yarn add -D \
  'eslint-config-airbnb-base@^15' \
  'eslint-plugin-import@^2' \
  'eslint-config-airbnb-typescript@^17'
```

`eslint-config-airbnb-base`はJavaScript向けのshareable configです。これを上書きして、TypeScript ESLintのルールを追加したり、TypeScriptコンパイラがチェックするためESLintでチェックする必要がないルールを除外する設定を加えるのが`eslint-config-airbnb-typescript`です。`eslint-plugin-import`は依存関係上、導入が必要なパッケージです。

### TypeScript ESLintの設定ファイルを作る

TypeScript ESLintを動かすためには、次の2つの設定ファイルを作る必要があります。

- tsconfig.eslint.json
- .eslintrc.js

これらファイルをプロジェクトルートに作成してください。

```shell
touch tsconfig.eslint.json .eslintrc.js
```

```text title="作成後のディレクトリ構造"
.
├── .eslintrc.js
├── dist
│   └── helloWorld.js
├── node_modules
├── package.json
├── src
│   └── helloWorld.ts
├── tsconfig.eslint.json
├── tsconfig.json
└── yarn.lock
```

#### tsconfig.eslint.json

TypeScript ESLintは、チェック時に型情報を利用するために、TypeScriptコンパイラを使います。その際のコンパイラ設定を`tsconfig.eslint.json`に書きます。コンパイラ設定は、`tsconfig.json`の内容を`extends`で継承しつつ、上書きが必要なところだけ記述していきます。

```json title="tsconfig.eslint.json"
{
  "extends": "./tsconfig.json"
}
```

今回は、TypeScriptファイルに加えて、ESLintの設定ファイル`.eslintrc.js`自体もESLintのチェック対象に含めたいので、`allowJs`の追加と`include`の上書きをします。

```json {2-5} title="tsconfig.eslint.json"
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "allowJs": true
  },
  "include": ["src", ".*.js"]
}
```

`".*.js"`は、`.eslintrc.js`などドット始まりのJSファイルにマッチするパターンです。パターンマッチにしておくことで、将来的に導入される他の設定ファイルもチェック対象に含めるようにできます。

また、テストフレームワーク「Jest」の設定ファイルでは、`jest.config.js`のようにドットはじまりでないJSファイルもありえます。このようなファイルが追加されるのを見越して、`"*.js"`もあらかじめ追加しておくとよいです。

```json {5} title="tsconfig.eslint.json"
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "allowJs": true
  },
  "include": ["src", ".*.js", "*.js"]
}
```

このように、TypeScript ESLintでチェックする対象は、`include`に追加していく必要があります。

`tsconfig.eslint.json`が正しく設定されているか、次のコマンドを実行して出力を確認してください。

```shell
npx tsc --showConfig --project tsconfig.eslint.json
```

設定が正しいと、次のような出力になるはずです。

```text
{
    "compilerOptions": {
        "outDir": "./dist",
        "allowJs": true
    },
    "files": [
        "./src/helloWorld.ts",
        "./.eslintrc.js"
    ],
    "include": [
        "src",
        ".*.js",
        "*.js"
    ]
}
```

#### .eslintrc.js

次にESLintの設定ファイル`.eslintrc.js`を作ります。内容は次のとおりにしてください。

```js twoslash {3-4,12-13,15,18-19,23} title=".eslintrc.js"
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "double"],
  },
};
```

`root`、`env`、`parserOptions`の`ecmaVersion`と`sourceType`については[前のチュートリアル](#eslintの設定ファイルを作る)の解説をご覧ください。まだ説明していない、追加のオプションは次で説明します。

#### `parser`

```js twoslash {3}
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  // ...
};
```

`parser`で設定したパーサーを使って、ESLintはJavaScriptやTypeScriptの構文を解析します。上の例では、TypeScriptパーサーを指定しています。この指定がないと、ESLintはTypeScriptを解釈できず、エラーが発生します。

TypeScriptはJavaScriptの構文を拡張した言語です。なので、このパーサーさえ入れておけば、TypeScriptに限らずJavaScriptのこのパーサーひとつで対応できます。要するに、このパーサーひとつで、TypeScriptとJavaScriptのファイルどちらもリントできるようになります。

#### `plugins`

```js twoslash {3}
module.exports = {
  // ...
  plugins: ["@typescript-eslint"],
  // ...
};
```

ESLintは公式が提供するルールに加えて、第三者が作成したルールを使うこともできます。第三者が作成したルールはプラグインという形で公開されています。この`plugins`フィールドにプラグインを追加すると、ルールが追加できます。上の例では、TypeScript ESLint独自のルールを追加するために、`@typescript-eslint`を設定しています。

#### `parserOptions` {#parser-options-2}

```js twoslash {3-7}
module.exports = {
  // ...
  parserOptions: {
    // ...
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  // ...
};
```

`project`と`tsconfigRootDir`はTypeScript ESLint独自のオプションです。`tsconfigRootDir`はプロジェクトルートの絶対パスを指定します。`project`は、ESLint実行時に使うコンパイラ設定ファイルを`tsconfigRootDir`からの相対パスで指定します。これらの設定は、TypeScript ESLintが型情報を参照するために必要な設定です。

#### `ignorePatterns`

```js twoslash {3}
module.exports = {
  // ...
  ignorePatterns: ["dist"],
  // ...
};
```

`ignorePatterns`はESLintのチェック対象外にするファイルやディレクトリを指定するオプションです。TypeScriptプロジェクトでは、コンパイルで生成されるJavaScriptは、リントしないのが普通です。なので、`dist`ディレクトリをチェック対象外にしておきます。

#### `extends`

```js twoslash {3-7}
module.exports = {
  // ...
  extends: [
    "airbnb-base", // ①
    "airbnb-typescript/base", // ②
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // ③
  ],
  // ...
};
```

`extends`はshareable configを使うための設定です。①は、JavaScript向けのルールです。これを拡張してTypeScript ESLintのルールにも範囲を広げたのが②です。①と②は上の順番でないと正しく設定されないので注意してください。

③はTypeScript ESLintが提供する推奨ルールセットで、型情報を要するルールを含みます。このルールセットでどのルールが有効になるかは、[公式ドキュメント](https://typescript-eslint.io/rules/)をご覧ください。

#### `rules`

```js twoslash {3-6}
module.exports = {
  // ...
  rules: {
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "double"],
  },
  // ...
};
```

ここの`rules`は、shareable configで有効化されたルールを上書きするのに用いています。TypeScript ESLintで追加されたルールは、`@typescript-eslint/`が接頭辞になります。

:::note ここまでのふりかえり

- コーディング規約Airbnb JavaScript Style Guideに準拠したshareable configをインストールしました。
- TypeScript ESLintの設定ファイルを作りました。
  - tsconfig.eslint.json
  - .eslintrc.js

:::

### TypeScriptをチェックする

TypeScript ESLintを使う準備ができたので、いよいよTypeScriptをチェックしてみたいと思います。

まず、空だった`src/helloWorld.ts`に次のコードを書いて保存してください。

```ts twoslash title="src/helloWorld.ts"
export const hello_world = "Hello World";
console.log(hello_world);
```

そうしたら、ESLintを実行してみましょう。

```shell
npx eslint .
```

すると、次の結果が出力されるはずです。

![](/img/tutorial/eslint/terminal-npx-eslint-src-typescript.svg)

2つの問題点が報告されています。1つ目は、変数名の命名規則が守られていない点についてのエラーです。2つ目は、`console.log`が使われている点についての警告です。

これらの問題点を修正してみましょう。`src/helloWorld.ts`を次の内容に変更し、保存してください。

```ts twoslash title="src/helloWorld.ts"
export const helloWorld = "Hello World";
```

再びESLintを実行して、問題点が解消されているか確認してみましょう。

```shell
npx eslint .
```

出力結果に何も表示されていなければ、問題点が解決されています。

以上で、ESLintでTypeScriptをリントするチュートリアルは終わりです。

## VS CodeとESLintを統合しよう

[vs codeとeslintを統合しよう]: #vs-codeとeslintを統合しよう

ここでは、Visual Studio Code(VS Code)に、ESLintを組み込む方法を説明します。

ESLintはコマンドひとつでコーディング規約をチェックできるようになり、それだけでも便利です。しかし、VS CodeとESLintを統合するとさらに便利になります。コードを書いているときに、リアルタイムで問題点のフィードバックが得られるようになるからです。

<figure><figcaption>ESLintのエラーがVS Codeに表示される様子</figcaption>

![](/img/tutorial/eslint/vscode-eslint-example.png)

</figure>

VS CodeとESLintを統合するには、[ESLintの拡張](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)をVisual Studio Codeのマーケットプレイスからインストールするだけです。

![](/img/tutorial/eslint/vscode-marketplace.png)

## JetBrains IDEとESLintを統合しよう

[jetbrains ideとeslintを統合しよう]: #jetbrains-ideとeslintを統合しよう

ここでは、WebStormなどのJetBrains IDEに、ESLintを組み込む方法を説明します。

ESLintはコマンドひとつでコーディング規約をチェックできるようになり、それだけでも便利です。しかし、JetBrains IDEとESLintを統合するとさらに便利になります。コードを書いているときに、リアルタイムで問題点のフィードバックが得られるようになるからです。

<figure><figcaption>ESLintのエラーがWebStormに表示される様子</figcaption>

![](/img/tutorial/eslint/webstorm-eslint-example.png)

</figure>

WebStormは、ESLint統合機能がデフォルトで入っているので、プラグインなどをインストールする必要はありません。ESLintを有効にするには、「Preferences」を開き、検索に「eslint」と入力します(①)。絞り込まれたメニューから「ESLint」を開きます(②)。「Automatic ESLint configuration」にチェックを入れます(③)。最後に「OK」を押すと設定完了です(④)。

![](/img/tutorial/eslint/webstorm-eslint-config.png)
