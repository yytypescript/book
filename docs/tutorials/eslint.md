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

- Node.js v24以上
- NPM v11以上 (Node.jsに同梱)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

## 背景知識

[背景知識]: #背景知識

### TypeScriptの書き方はさまざま

TypeScriptに限らず、プログラミング言語には文法があります。文法を守って書かれたコードは、エラーなく実行やコンパイルができます。

プログラムは文法さえ守れば、誰が書いても一字一句同じコードになるかというと、そうではありません。たとえば、文字列はシングルクォート、ダブルクォート、バッククォートの3通りで書けます。シングルクォートとダブルクォートは機能上の違いがありません。バッククォートは[テンプレートリテラル](/reference/values-types-variables/string#テンプレートリテラル)と言い、文字列リテラルとは仕様が異なります。しかし、次の例のような単純な文字列では、この3つは同じ意味になります。

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
- `console.log`は消しましょう。
- `any`型は使わないでください。

このようなルールを取りまとめて規約を作るのですが、実用的な規約に仕上げるにはかなりの労力を要します。実務では、公開されている規約を借りてくるほうが現実的です。

公開されている規約には主に次のものがあります。これらは実際に多くのプロジェクトで利用されています。

- [Google JavaScript Style Guide]
- [JavaScript Standard Style]
- [Airbnb JavaScript Style Guide]

[google javascript style guide]: https://google.github.io/styleguide/jsguide.html
[javascript standard style]: https://standardjs.com/rules.html
[airbnb javascript style guide]: https://github.com/airbnb/javascript

<!-- regression test: 上記のURLが有効かどうかを確認してください。 -->

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

ESLintを導入すると、開発者は規約の運用や心理的ストレスから解放され、**開発などのより重要な仕事に集中できるようになります**。

<PostILearned>

📝TypeScriptは同じ意味でも異なる書き方が可能
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

### ESLintはJavaScriptとTypeScriptの両方をリントできる

元々ESLintはJavaScriptをリントするために作られ、現在もコアがサポートしているのはJavaScriptのみです。ESLintは「プラグイン」という機能拡張を行える仕組みがあり、これを利用してTypeScriptもリントできるようになっています。

## プロジェクトを作成する

ここからはESLintの導入方法や使い方をチュートリアル形式で説明していきます。ぜひお手元の環境で実際にトライしてみてください。

まず、このチュートリアルに使うプロジェクトを作成します。

```shell
mkdir eslint-tutorial
cd eslint-tutorial
```

プロジェクトルートに`package.json`を作ってください。その内容は次のようにします。

```json title="package.json"
{
  "name": "eslint-tutorial",
  "license": "UNLICENSED",
  "type": "module"
}
```

さらに、TypeScriptをインストールし、TypeScriptの設定ファイル`tsconfig.json`を作成します。

```shell
npm install -D typescript
```

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "bundler",
    "strict": true,
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "skipLibCheck": true
  }
}
```

ESLintの設定ファイルは従来、JavaScriptで書く必要がありましたが、最新のESLintではTypeScriptで書くこともでき、このチュートリアルでもTypeScriptで書いていきます。しかしながら、ESLintのTypeScriptの設定ファイル対応が完全ではない問題が残っています。それを解消するため`jiti`をインストールしておきます。

<!-- npm init @eslint/config よりも jiti を先なのは、npm init @eslint/config コマンドがjitiに依存しており、実行時に「A config file was generated, but the config file itself may not follow your linting rules.」という警告が出るためです。 -->

<!-- regression test: jitiがない状態でnpx eslintを実行すると、「Error: The 'jiti' library is required for loading TypeScript configuration files. Make sure to install it.」というエラーが発生することを確認してください。この確認は、eslintのセットアップ後に、npm uninstall -D jitiを実行して、jitiを削除した後に行ってみてください。もし発生しない場合は、jitiが不要になったということになるため、問題として報告してください。 -->

```shell
npm install -D jiti
```

## ESLintを導入する

次のコマンドを実行してESLintをインストールしましょう。

```shell
npm init -y @eslint/config@latest
```

<!-- regression test: tmuxを用いてnpm init -y @eslint/config@latestを実行してください。AIエージェントが使えるターミナルはTTYがオフになっている場合があるためです。tmux new-session -d -s eslint -c "$PWD" -x 256 -e NO_COLOR= -e FORCE_COLOR= 'npm init -y @eslint/config@latest; sleep infinity'。 tmux capture-pane -p -e -t eslint -S - -E - | tamlで結果を確認しながら、tmux send-keys -t eslint enter でエンターキーを押したり、オプションを選択する場合は、tmux send-keys -t eslint tab でタブキーを押したりして、ESLintのインストールを完了させてください。なお、left, down, rightキーではオプションの選択はできません。ウィザードは色情報が必要になるので、capture-paneの結果をtamlコマンドに渡して、色情報を可視化しながら行ってください。-->

:::info
Next.jsは最初からESLintが導入されています。実務でNext.jsプロジェクトでESLintを使う場合は、導入ステップは省略できます。
:::

上のコマンドを実行すると、ESLintの構成について質問されます。次のように答えを選択してください。

```taml
> npx
> "create-config"

<bold>@eslint/create-config: v1.11.0</bold>

<green>✔</green> <bold>What do you want to lint?</bold> <dim>·</dim> <cyan>javascript</cyan>
<green>✔</green> <bold>How would you like to use ESLint?</bold> <dim>·</dim> <cyan>problems</cyan>
<green>✔</green> <bold>What type of modules does your project use?</bold> <dim>·</dim> <cyan>esm</cyan>
<green>✔</green> <bold>Which framework does your project use?</bold> <dim>·</dim> <cyan>none</cyan> <bgBrightBlue> None of theseを選択してください </bgBrightBlue>
<green>✔</green> <bold>Does your project use TypeScript?</bold> <dim>·</dim> No<dim> / </dim><cyan>Yes</cyan> <bgBrightBlue> Yesを選択してください </bgBrightBlue>
<green>✔</green> <bold>Where does your code run?</bold> <dim>·</dim> <cyan>browser</cyan>
<green>✔</green> <bold>Which language do you want your configuration file be written in?</bold> <dim>·</dim> <cyan>ts</cyan> <bgBrightBlue> TypeScriptを選択してください </bgBrightBlue>
<blue>ℹ</blue> <bold>The config that you've selected requires the following dependencies:</bold>`

<bold>eslint, @eslint/js, globals, typescript-eslint</bold>
<green>✔</green> <bold>Would you like to install them now?</bold> <dim>·</dim> No<dim> / </dim><cyan>Yes</cyan>
<green>✔</green> <bold>Which package manager do you want to use?</bold> <dim>·</dim> <cyan>npm</cyan>
<bold>☕️Installing...</bold>

up to date, audited 226 packages in 545ms

116 packages are looking for funding
  run `npm fund` for details

found <bold><green>0</green></bold> vulnerabilities
<green>✔</green> <bold>Successfully created /path/to/eslint-tutorial/eslint.config.ts file.</bold>
```

<!-- regression test: 出力結果が上のようになっているか確認してください。eslint.config.tsへのパス、所要時間などの環境依存は確認対象外。パッケージ数の数値も対象外。tmuxではtmux capture-pane -p -e -t eslint -S - -E -で出力を取得できます。 -->

ESLintが正しくインストールされたか、バージョンを表示して確認してください。

```shell
npx eslint -v
v9.39.2
```

<!-- regression test: インストールされたESLintのメジャーバージョンが上記と一致することを確認してください。 -->

ちなみにこの`npx`コマンドは、Nodeモジュール(ライブラリ)の実行ファイルを起動するツールです。`npx eslint`を実行すると、`./node_modules/.bin/eslint`が実行されます。

コマンドが完了すると、次のようなディレクトリ構造になっているはずです。

```text title="完了後のディレクトリ構造"
.
├── eslint.config.ts
├── node_modules/
├── package-lock.json
├── package.json
└── tsconfig.json
```

`eslint.config.ts`は、ESLintの設定ファイルです。このファイルには、ESLintのルールを設定します。設定ファイルの内容は次のようになっているはずです。(見やすさのため、改行やインデントを調整しています)

```ts title="eslint.config.ts"
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
]);
```

<!-- regression test: 設定ファイルの内容が上のようになっているか確認してください。ただし、インデントや字下げの差は無視してください。また、コンパイルエラーが発生しないか確認してください。 -->

## ESLintでJavaScriptをリントしよう

[eslintでjavascriptをリントしよう]: #eslintでjavascriptをリントしよう

まずは、ESLintを使ってJavaScriptの言語仕様の範囲でリントを試していきましょう。TypeScriptの言語仕様である型注釈やTypeScriptの型情報を使わない範囲でのリントを試していきます。

### ESLintのルールを設定する

ESLintには「ルール(rule)」という概念があります。ルールはチェックの最小単位です。たとえば、ルールには次のようなものがあります。

- `no-console`: `console.log`を書いてはならない
- `camelcase`: 変数名はキャメルケースにすること

ESLintには200を超えるルールがあります。[全ルールのリストは公式ドキュメント](https://eslint.org/docs/rules/)にあります。

<!-- regression test: 上記のURLが有効かどうかを確認してください。 -->

ESLintでは、複数のルールを組み合わせてコーディング規約を組み立てていきます。

ルールには、重大度(severity)という重み付けが設定できます。重大度は、`off`、`warn`と`error`の3種類です。`off`はルールを無効化し、チェックを行わなくする設定です。`warn`は発見した問題を警告として報告します。報告はするものの、`eslint`コマンドの終了コードには影響しません。`error`は発見した問題をエラーとして報告し、終了コードを1にする効果があります。それぞれの重大度は、`0`から`2`までの数値で設定することもできます。

<figure><figcaption>ESLintの重大度</figcaption>

| 重大度 | 数値 | 効果                             |
| ------ | ---- | -------------------------------- |
| off    | 0    | ルールをオフにする               |
| warn   | 1    | 警告するが終了コードに影響しない |
| error  | 2    | 警告し、終了コードを1にする      |

</figure>

ルールは設定ファイルの`rules`フィールドに、`ルール名: 重大度`のキーバリュー形式で書きます。まずは、`no-console`をルールに追加してみましょう。

```ts {13-17} title="eslint.config.ts"
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    rules: {
      "no-console": "warn",
    },
  },
]);
```

<!-- regression test: 上記のコードがコンパイルエラーが発生しないか確認してください。 -->

ルールによっては、細かく設定できるものもあります。たとえば、`camelcase`です。これは変数名がキャメルケースかをチェックするルールです。変数の種類によっては、キャメルケース以外が使いたい場合があります。たとえば、プロパティ名はアンダースコアを使いたいことがあるかもしれません。ウェブAPIによっては、JSONオブジェクトがスネークケース(`foo_bar`のようなアンダースコア区切り)を採用している場合があるからです。この場合、`ルール名: [重大度, 設定値]`のような配列形式で設定することで、細かいルール設定ができます。次の例は、プロパティ名に限ってはキャメルケースを強制しない設定です。試しに、この設定を加えてみましょう。

```ts {16} title="eslint.config.ts"
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    rules: {
      "no-console": "warn",
      camelcase: ["warn", { properties: "never" }],
    },
  },
]);
```

<!-- regression test: 上記のコードがコンパイルエラーが発生しないか確認してください。 -->

:::note ここまでのふりかえり

- package.jsonを作りました。
- eslintをインストールしました。
- 設定ファイルに次のルールを追加しました。
  - `no-console`: `console.log`をコードに残しておいてはいけない。
  - `camelcase`: 変数名はキャメルケースにすること(プロパティ名を除く)。

:::

### コードをチェックする

設定ファイルが準備できたので、コードを作り、ESLintでチェックしてみましょう。

`src`ディレクトリを作成し、その中にファイル`hello-world.ts`を作ってください。`hello-world.ts`の内容は次のようにします。ファイルとしてはTypeScriptですが、まずはJavaScriptの構文の範囲でESLintを貯めすため、JavaScriptのコードとしても読み込めるようにしておきます。

```ts twoslash title="src/hello-world.ts"
export const hello_world = "Hello World";
console.log(hello_world);
```

`hello-world.ts`が加わったディレクトリ構造が、次のようになっているか確認してください。

```txt
.
├── eslint.config.ts
├── node_modules/
├── package-lock.json
├── package.json
├── src
│   └── hello-world.ts
└── tsconfig.json
```

この`hello-world.ts`は、わざとコーディング規約に違反するコードになっています。1行目の変数`hello_world`はキャメルケースになっていません。2行目では、使ってはいけない`console.log`が使われています。

では、ESLintでチェックを実行してみましょう。チェックは、`eslint`コマンドを起動するだけです。

```shell title="ESLintでチェックする"
npx eslint
```

これを実行すると、次の出力が表示されます。

```taml
<underline>/path/to/eslint-tutorial/src/hello-world.ts</underline>
  <dim>1:14</dim>  <yellow>warning</yellow>  Identifier 'hello_world' is not in camel case  <dim>camelcase</dim>
  <dim>2:1</dim>   <yellow>warning</yellow>  Unexpected console statement                   <dim>no-console</dim>

<bold><yellow>✖ 2 problems (0 error, 2 warnings)</yellow></bold>
```

<!-- regression test: コマンドの結果が上記の内容と一致するか確認してください。プロジェクトディレクトリへのパスは完全に一致してなくても構いません。 -->

#### 結果の読み方

チェックした結果、問題点が見つかると表形式で詳細が表示されます。各行は4つの列からなります。左から順に、コードの行番号列番号、重大度、問題点の説明、ルール名です。

```taml
  <red>╭── 行番号と列番号</red>
  <red>│</red>     <yellow>╭── 重大度</yellow>
  <red>1:14</red>  <yellow>warning</yellow>  <blue>Identifier 'hello_world' is not in camel case</blue>  <green>camelcase</green>
  <red>2:1</red>   <yellow>warning</yellow>  <blue>Unexpected console statement</blue>                   <green>no-console</green>
                 <blue>│</blue>                                              <green>╰── ルール名</green>
                 <blue>╰── 問題点の説明</blue>
```

結果に表示されている内容だけでは、どうして問題点になっているのか、どう直したらいいのかが分からないことがあります。その場合は、ルール名からESLintのドキュメントでルールの詳細を調べます。たとえば、上の結果ではルール名に`no-console`が挙がっていますが、この文字列をもとにルールの詳細を探します。`no-console`の詳細ページは、<https://eslint.org/docs/rules/no-console>にあります。

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

### コードを修正してエラーを解消する

```ts twoslash title="src/hello-world.ts"
export const hello_world = "Hello World";
console.log(hello_world);
```

上のコードをESLintでチェックした結果、2つの問題点が指摘されました。

- 1行目: 変数名`hello_world`がキャメルケースではない
- 2行目: `console.log`は使ってはいけない

このエラーを解消したいので、`hello-world.ts`を編集してみましょう。変数名`hello_world`は`helloWorld`に変更します。2行目の`console.log`は削除しましょう。修正後のコードは次のようになります。

```ts twoslash title="src/hello-world.ts"
export const helloWorld = "Hello World";
```

再びESLintでチェックして、もう問題がなくなっているか確認してみましょう。

```shell
npx eslint
```

この実行結果に何も出力されなければ、問題点が解消されています。

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

### コードを自動修正する

ESLintのルールの中には、コードの自動修正ができるものがあります。たとえば、ESLint公式が提供しているESLint Stylisticプラグインの[`semi`ルール](https://eslint.style/rules/semi)があります。これは、文末セミコロンをつけるつけないを定めるルールで、これは自動修正に対応しています。ここでは、`semi`を使ってESLintの自動修正をためしてみましょう。

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

まず、ESLint Stylisticプラグインをインストールします。

```shell
npm install -D @stylistic/eslint-plugin
```

まず、設定ファイル`eslint.config.ts`の`rules`に`semi`を追加します。

```ts {4,7-13,24} title="eslint.config.ts"
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin"; // この行を追加

export default defineConfig([
  // 次の要素を追加
  {
    plugins: {
      "@stylistic": stylistic,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended,
  {
    rules: {
      "no-console": "warn",
      camelcase: ["warn", { properties: "never" }],
      "@stylistic/semi": ["warn", "always"], // この行を追加
    },
  },
]);
```

<!-- regression test: 上記のコードがコンパイルエラーが発生しないか確認してください。 -->

このルール設定では、`"always"`を指定しています。これは、文末セミコロンを必須にする設定です。

つぎに、`hello-world.ts`のコードのセミコロンを消して保存してください。

```ts twoslash title="src/hello-world.ts"
// prettier-ignore
export const helloWorld = "Hello World"
```

自動修正の前にチェックだけを実行し、`semi`についての問題が報告されるか確認します。

```shell
npx eslint
```

次のような結果が表示されれば、追加した`semi`ルールが効いていることになります。

```taml
<underline>/path/to/eslint-tutorial/src/hello-world.ts</underline>
  <dim>1:40</dim>  <yellow>warning</yellow>  Missing semicolon  <dim>@stylistic/semi</dim>

<bold><yellow>✖ 1 problem (0 errors, 1 warning)</yellow></bold>
<bold><yellow>  0 errors and 1 warning potentially fixable with the `--fix` option.</yellow></bold>
```

<!-- regression test: コマンドの結果が上記の内容と一致するか確認してください。プロジェクトディレクトリへのパスは完全に一致してなくても構いません。 -->

ESLintでコードを自動修正するには、`eslint`コマンドに`--fix`オプションをつけます。次のコマンドを実行し、自動修正してみましょう。

```shell
npx eslint --fix
```

自動修正が成功していれば、出力は何も表示されずに処理が終了します。自動修正が効いているかを確認するために、`hello-world.ts`を開いてみてください。文末にセミコロンが追加されているでしょうか。追加されていれば自動修正成功です。

<!-- regression test: hello-world.tsが自動修正されているか確認してください。 -->

:::note ここまでのふりかえり

- `src/hello-world.ts`を作りました。
- `npx eslint`を実行し、`src`ディレクトリをチェックしてみました。
- コードを手直しして、ESLintのチェックを通過する流れを体験しました。(`camelcase`, `no-console`)
- `npx eslint --fix`を実行し、ESLintの自動修正機能を試しました。(`semi`)

:::

### ESLintにはどんなルールがある？

ここまでのチュートリアルでは3つのルールを扱いました(`camelcase`、`no-console`、`semi`)。ESLintにはもっと多くのルールがあります。ルール数は200を超えます。

ルールの一覧は、[公式ドキュメントのRules](https://eslint.org/docs/rules/)や[ESLint Stylisticプラグインのルール一覧](https://eslint.style/rules/)で確認できます。一覧では、どのルールが自動修正に対応しているかも確認できます。

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

### ルールを部分的に無効化する

`eslint.config.ts`で設定した規約はプロジェクト全体に及びます。コードを書いていると、どうしても規約を破らざるをえない部分が出てくることがあります。その場合は、コードのいち部分について、ルールを無効化することもできます。

部分的にルールを無効にするには、その行の前にコメント`eslint-disable-next-line`を追加します。たとえば、次の例ように書いておくと、変数名`hello_world`がキャメルケースでなくても、ESLintは警告を出さなくできます。

```ts twoslash
// eslint-disable-next-line camelcase
export const hello_world = "Hello World";
```

この方法はいざというときに知っておくとよいというものです。ルール無効化コメントだらけになってしまうと本末転倒です。節度を持って使うのが望ましいです。

## ESLintでTypeScriptをリントしよう

[eslintでtypescriptをリントしよう]: #eslintでtypescriptをリントしよう

ここまでのチュートリアルでは、JavaScriptの文法の範疇でESLintをかける方法を学んできました。ここからは、TypeScriptの文法や型システムにまで範囲を広げてESLintを使う方法を学んでいきます。

そもそもESLintでは、TypeScriptはチェックできません。これを補うのが[TypeScript ESLint]です。これは、上のESLint導入ウィザードで導入済みなので、追加でインストールする必要はありません。

[typescript eslint]: https://typescript-eslint.io/

<!-- regression test: 上のリンクが有効かどうかを確認してください。 -->

また、`eslint.config.ts`もすでに次のようにTypeScript ESLintの設定が追加済みであるはずなので、設定の変更も必要ありません。

```ts {2,18} title="eslint.config.ts"
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint"; // TypeScript ESLintをインポート
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    plugins: {
      "@stylistic": stylistic,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  tseslint.configs.recommended, // TypeScript ESLintの有効化
  {
    rules: {
      "no-console": "warn",
      camelcase: ["warn", { properties: "never" }],
      "@stylistic/semi": ["warn", "always"],
    },
  },
]);
```

<!-- regression test: チュートリアルを進めながら作ってきた手元のコードが上記のコードと一致するか確認してください。コメントの有無の差異は無視してください。 -->

### TypeScript ESLintにはどんなルールがある？

TypeScript ESLintを導入すると、100以上のルールが追加されます。追加されるルールの一覧は、[TypeScript ESLintのドキュメント](https://typescript-eslint.io/rules/)で確認できます。

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

### TypeScriptをチェックする

すでに、TypeScript ESLintが有効化されているので、さっそくTypeScriptをチェックしてみましょう。

TypeScriptには`any`型という特殊な型があります。これは、どんな型でも代入を許す反面、型チェックを行わないため、安全なコードを書くためには避けたい型です。`any`の禁止はTypeScriptコンパイラでは強制できないため、TypeScript ESLintで取り扱うチェックとしてぴったりのトピックです。

[any型](../reference/values-types-variables/any.md)

では、`hello-world.ts`の`helloWorld`変数に`any`型を指定して、ESLintでチェックしてみましょう。

```ts twoslash title="src/hello-world.ts"
export const helloWorld: any = "Hello World";
//                       ^^^
```

そうしたら、ESLintを実行してみましょう。

```shell
npx eslint
```

すると、次の結果が出力されるはずです。

```taml
<underline>/path/to/eslint-tutorial/src/hello-world.ts</underline>
  <dim>1:26</dim>  <red>error</red>  Unexpected any. Specify a different type  <dim>@typescript-eslint/no-explicit-any</dim>

<bold><red>✖ 1 problem (1 error, 0 warnings)</red></bold>
```

<!-- regression test: コマンドの結果が上記の内容と一致するか確認してください。プロジェクトディレクトリへのパスは完全に一致してなくても構いません。 -->

出力にあるとおり、`any`型が使われていることを警告してくれています。

### 型情報をチェックに活用しよう

TypeScript ESLintのルールは主に2種類に分類されます。ひとつは、TypeScriptの構文情報だけでチェックできるルールです。もうひとつは、TypeScriptの型情報をチェックに活用するルールです。上で試した`no-explicit-any`ルールは、構文情報だけでチェックできるルールでした。

たとえば、次のコードは`C`の分岐が欠けていて問題のあるコードです。こうした問題はTypeScriptコンパイラでは発見できません。また、構文情報だけに頼ったチェックでは`Choice`型がどんな値を取りうるのか不明なため、問題が見つけられません。

```ts twoslash
type Choice = "A" | "B" | "C";

export function func(choice: Choice) {
  switch (choice) {
    case "A":
      break;
    case "B":
      break;
  }
}
```

こういった場面では、型情報をチェックに活用するルールが役立ちます。TypeScript ESLintの[`switch-exhaustiveness-check`ルール](https://typescript-eslint.io/rules/switch-exhaustiveness-check)は、型情報をチェックに活用するルールの一例です。これは、型情報を参照しながら、switch文の分岐が網羅されているかをチェックするルールです。

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

では、実際に上のコードを`switch-exhaustiveness-check`ルールでチェックしてみましょう。

型情報のルール群を有効化するには、`eslint.config.ts`に次のように設定を追加します。具体的には、`languageOptions`に`parserOptions.projectService=true`を追加します。加えて、`recommendedTypeChecked`も追加しておくと、型情報のルールのうちTypeScript ESLintが推奨するものが有効化されます。最後に、`recommendedTypeChecked`に含まれていない`switch-exhaustiveness-check`ルールを有効化します。

```ts {18,22,28} title="eslint.config.ts"
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  {
    plugins: {
      "@stylistic": stylistic,
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { projectService: true },
    },
  },
  tseslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  {
    rules: {
      "no-console": "warn",
      camelcase: ["warn", { properties: "never" }],
      "@stylistic/semi": ["warn", "always"],
      "@typescript-eslint/switch-exhaustiveness-check": "warn",
    },
  },
]);
```

<!-- regression test: 上記のコードがコンパイルエラーが発生しないか確認してください。 -->

`hello-world.ts`を次のように変更して、ESLintを実行してみましょう。

```ts twoslash title="src/hello-world.ts"
type Choice = "A" | "B" | "C";

export function func(choice: Choice) {
  switch (choice) {
    case "A":
      break;
    case "B":
      break;
  }
}
```

`npx eslint`の結果は次のようになるはずです。

```taml
<underline>/path/to/eslint-tutorial/src/hello-world.ts</underline>
  <dim>4:11</dim>  <yellow>warning</yellow>  Switch is not exhaustive. Cases not matched: "C"  <dim>@typescript-eslint/switch-exhaustiveness-check</dim>

<bold><yellow>✖ 1 problem (0 errors, 1 warning)</yellow></bold>
```

<!-- regression test: コマンドの結果が上記の内容と一致するか確認してください。プロジェクトディレクトリへのパスは完全に一致してなくても構いません。 -->

`switch-exhaustiveness-check`ルールで`C`の分岐が欠けていることを警告してくれています。

以上で、ESLintでTypeScriptをリントするチュートリアルは終わりです。

## VS CodeとESLintを統合しよう

[vs codeとeslintを統合しよう]: #vs-codeとeslintを統合しよう

<!-- regression test: この手順はAIによる回帰テストでは実行できないので、手動で確認してください。 -->

:::info
このステップはVS Codeを使っている方向けの内容です。WebStormなどのJetBrains IDEを使っている方は、[JetBrains IDEとESLintを統合しよう]を参照してください。これからVS Codeを導入する方は、[VS Codeの公式サイト](https://code.visualstudio.com/download)からダウンロードしてください。
:::

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

ここでは、Visual Studio Code(VS Code)に、ESLintを組み込む方法を説明します。

ESLintはコマンドひとつでコーディング規約をチェックできるようになり、それだけでも便利です。しかし、VS CodeとESLintを統合するとさらに便利になります。コードを書いているときに、リアルタイムで問題点のフィードバックが得られるようになるからです。

<figure><figcaption>ESLintのエラーがVS Codeに表示される様子</figcaption>

![](/img/tutorial/eslint/vscode-eslint-example.png)

</figure>

VS CodeとESLintを統合するには、[ESLintの拡張](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)をVisual Studio Codeのマーケットプレイスからインストールするだけです。

<!-- regression test: 上の段落に含まれるリンクが有効かどうかを確認してください。 -->

![](/img/tutorial/eslint/vscode-marketplace.png)

## JetBrains IDEとESLintを統合しよう

[jetbrains ideとeslintを統合しよう]: #jetbrains-ideとeslintを統合しよう

<!-- regression test: この手順はAIによる回帰テストでは実行できないので、手動で確認してください。 -->

:::info
このステップはJetBrains IDE(WebStorm、IntelliJ IDEA、PyCharmなど)を使っている方向けの内容です。VS Codeを使っている方は、[VS CodeとESLintを統合しよう]を参照してください。
:::

ここでは、WebStormなどのJetBrains IDEに、ESLintを組み込む方法を説明します。

ESLintはコマンドひとつでコーディング規約をチェックできるようになり、それだけでも便利です。しかし、JetBrains IDEとESLintを統合するとさらに便利になります。コードを書いているときに、リアルタイムで問題点のフィードバックが得られるようになるからです。

<figure><figcaption>ESLintのエラーがWebStormに表示される様子</figcaption>

![](/img/tutorial/eslint/webstorm-eslint-example.png)

</figure>

WebStormは、ESLint統合機能がデフォルトで入っているので、プラグインなどをインストールする必要はありません。ESLintを有効にするには、「Preferences」を開き、検索に「eslint」と入力します(①)。絞り込まれたメニューから「ESLint」を開きます(②)。「Automatic ESLint configuration」にチェックを入れます(③)。最後に「OK」を押すと設定完了です(④)。

![](/img/tutorial/eslint/webstorm-eslint-config.png)
