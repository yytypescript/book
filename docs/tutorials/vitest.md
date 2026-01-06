# Vitestでテストを書こう

このチュートリアルでは、テストフレームワーク「Vitest」を使い、ユニットテストをTypeScriptで書くことを学びます。

## 本章で学べること

本章では、簡単な関数のテストをVitestで書くことを目標に、次のことを学びます。

- Vitestを使ってTypeScriptの関数をテストする方法
- Vitestの導入方法
- Vitestでのテストの書き方
- テストの実行方法
- 結果の見方

本章の目的はVitestを完全に理解することではありません。むしろ、Vitestがどういったものなのか、その雰囲気を実際に体験することに主眼を置いています。そのため、内容はかなり最低限のものとなりますが、少しの時間でVitestを試してみれるシンプルな内容にまとまっています。ぜひ手を動かしてみてください。

## Vitestとは

Vitestとは、高速な実行速度と直感的な操作性を兼ね備えたモダンなJavaScriptテスティングフレームワークです。TypeScriptやESモジュール、JSXなどモダンなスタックを標準でサポートします。フロントエンドのUIテストだけでなく、ロジックの検証やサーバーサイド開発など、JavaScript/TypeScriptを用いるあらゆるプロジェクトで汎用的に利用できるのが特徴です。

## このチュートリアルに必要なもの

このチュートリアルで必要なものは次のとおりです。

- Node.js v24以上
- npm v11以上 (Node.jsに同梱)

Node.jsの導入については、[開発環境の準備](./setup.md)をご覧ください。

<!-- regression test: node -v と npm -v の結果を確認し、環境が適合していない場合、問題として報告してください。 -->

## プロジェクトを作成する

まず、このチュートリアルに使うプロジェクトを作成します。

```shell
mkdir vitest-tutorial
cd vitest-tutorial
```

次の内容で`package.json`を作成します。

```json title="package.json"
{
  "name": "vitest-tutorial",
  "version": "1.0.0",
  "license": "UNLICENSED",
  "type": "module"
}
```

## TypeScriptのインストール

プロジェクトにTypeScriptをインストールします。

```shell
npm install -D typescript
```

<!-- regression test: インストールされたTypeScriptのバージョンは執筆時点で5.9.3でした。TypeScriptのバージョンが異なることで、チュートリアルが通らなかった場合、問題として報告してください。 -->

次に、`tsconfig.json`を作成します。

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

このチュートリアルでは、`tsc`を使ってコンパイルすることがないため、`tsconfig.json`を用意する目的はエディターにコンパイル設定を伝えることです。

:::info コンパイルオプションについての補足

上の`tsconfig.json`は、Next.jsやReactなどバンドラーを用いる一般的なフロントエンドの開発を念頭に置いた設定になっています。ちなみに、Vitestもバンドラーを内蔵しています。フロントエンドの開発でVitestを使う場合は、この設定が多くのケースに対応できるはずなので、特に気にせず読み飛ばしてもかまいませんが、Node.jsサーバーサイドアプリケーションや、Node.js向けのライブラリの開発などバンドラーを用いない場合には、注意点がいくつかあります。

- `target: esnext`は、最新のECMAScriptの文法をサポートするための設定です。多くのバンドラーは最新のECMAScriptをサポートしています。もし、バンドラーを用いずに古いバージョンのJavaScriptをサポートする必要がある場合には、`es2020`や`es2019`など目的に合わせたバージョンを指定してください。
- `moduleResolution: bundler`は、バンドラーのモジュール解決の仕組みと同じルールをTypeScriptコンパイラーに適用するための設定です。もし、Node.js向けの開発などバンドラーを用いない場合には、この設定を除いてください。
- `isolatedModules: true`は、各ファイルを完全に独立した記述になるように制約する設定で、バンドラーがTS→JSへの変換を安全にできるように保証します。

他の設定は、フロントエンド、バックエンドどちらでもよく使う設定です。

- `strict: true`は、型のチェックなどを厳しい基準で行い、バグの原因になりやすい記述をエラーとして検出するための設定です。
- `verbatimModuleSyntax: true`は、インポート文が勝手に最適化・削除されるのを防ぎ、コードに書かれた通りのモジュール構文を出力するように強制するための設定です。
- `skipLibCheck: true`は、`node_modules`にインストールした外部ライブラリの型定義ファイルのチェックをスキップするための設定です。

:::

## Vitestをインストールする

Vitestをプロジェクトにインストールしましょう。

```shell
npm install -D vitest
```

<!-- regression test: インストールされたVitestのバージョン(npx vitest --version)は執筆時点で"vitest/4.0.16 darwin-arm64 node-v24.1.0"でした。Vitestのバージョンが異なることで、チュートリアルが通らなかった場合、問題として報告してください。 -->

## チェックポイント

ここまでに作成したファイルに漏れがないか確認しましょう。

```text
├── node_modules ... vitestやtypescriptがインストールされたフォルダ
├── package-lock.json
├── package.json
└── tsconfig.json ... TypeScriptの設定ファイル
```

<!-- regression test: 上のファイル構成が正しいか確認してください。 -->

## Vitestが動くかを確認する

ここでは、実際のテストコードを書く前に、Vitestでテストコードが実行できる状態になっているかを、動作確認用のテストファイルを作って確かめます。

Vitestで実行できるテストファイルには命名規則があります。ファイル名が`.test.ts`または`.spec.ts`で終わるものが、テストファイルになります。動作確認用のファイルとして、`check.unit.test.ts`を作ってください。内容は次のようにします。

```ts twoslash title="check.unit.test.ts"
import { test } from "vitest";

test("check", () => {
  console.log("Hello, World!");
});
// ---cut-after---
// @filename: vitest.d.ts
declare module "vitest" {
  export const test: (name: string, fn: () => void) => void;
  export const expect: (value: any) => {
    toBe: (value: any) => boolean;
  };
}
```

<!-- regression test: 上のコードがコンパイルエラーになっていないことを確認してください。 -->

:::info `unit`についての補足

Vitestとしては、`.test.ts`や`.spec.ts`で終わるファイルをテストファイルとして認識されますが、実務では単体テスト(unit test)、結合テスト(integration test)、コンポーネントテスト(component test)など、さまざまなレベルのテストを書くことになります。Vitestは、こうしたレベルを横断して利用できます。テストの実行はレベルごとに分けて行えるように備えておくほうがスケールしやすいです。そのためには、ファイル名でレベルを表すことが重要です。このチュートリアルでは、こうした実務的な背景を念頭に置き、単体テストのテストファイル名には`.unit`をつけることにしています。

:::

ファイルを保存したら、`vitest`コマンドを実行してみてください。

```shell
npx vitest
```

<!-- regression test: tmuxを用いてvitestを実行してください。AIエージェントが使えるターミナルはTTYがオフになっている場合があるためです。tmux new-session -d -s vitest -c "$PWD" -x 256 'npx vitest' -->

すると、次のようにテストが実行されます。ターミナルに「Hello, World!」という出力とともに、実行したテストファイル名や実行時間などが表示されます。

```taml
<bold><bgBlue> DEV </bgBlue></bold> <blue>v4.0.16 </blue><brightBlack>/path/to/vitest-tutorial</brightBlack>

<brightBlack>stdout<dim> | check.unit.test.ts > check</dim></brightBlack>
Hello, World!

 <green>✓</green> check.unit.test.ts <dim>(1 test)</dim><green> 2<dim>ms</dim></green>
   <green>✓</green> check<green> 1<dim>ms</dim></green>

<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>   Start at </dim> 22:07:32
<dim>   Duration </dim> 276ms<dim> (transform 208ms, setup 0ms, import 214ms, tests 2ms, environment 0ms)</dim>

<bold><bgGreen> PASS </bgGreen></bold> <green>Waiting for file changes...</green>
       <dim>press </dim>h to show help, press q to quit
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。vitest-tutorialディレクトリのパス、実行時間の差異は無視してください。バージョンはメジャーバージョンのみを確認してください。tmuxでの結果確認はtmux capture-pane -pt vitestでできます。 -->

Vitestはデフォルトでウォッチモードで起動します。ウォッチモードでは、ファイルを保存するたびに自動でテストを実行してくれます。試しに、`console.log`の行を変更してみてください。

```ts twoslash title="check.unit.test.ts" {4}
import { test } from "vitest";

test("check", () => {
  console.log("Hello, Vitest!");
});
// ---cut-after---
// @filename: vitest.d.ts
declare module "vitest" {
  export const test: (name: string, fn: () => void) => void;
  export const expect: (value: any) => {
    toBe: (value: any) => boolean;
  };
}
```

<!-- regression test: 上のコードがコンパイルエラーになっていないことを確認してください。 -->

テストが自動で再実行された結果、ターミナルには「Hello, Vitest!」と表示されたはずです。

```taml
<bold><bgBlue> RERUN </bgBlue></bold> <dim><blue>check.unit.test.ts </blue></dim><blue>x1 </blue>

<brightBlack>stdout<dim> | check.unit.test.ts > check</dim></brightBlack>
Hello, Vitest!

 <green>✓</green> check.unit.test.ts <dim>(1 test)</dim><green> 1<dim>ms</dim></green>
   <green>✓</green> check<green> 1<dim>ms</dim></green>

<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>   Start at </dim> 22:10:32
<dim>   Duration </dim> 7ms

<bold><bgGreen> PASS </bgGreen></bold> <green>Waiting for file changes...</green>
       <dim>press </dim>h to show help, press q to quit
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。 -->

問題なく実行されていることが確認できたら、<kbd>Q</kbd> を押してVitestを終了し、`check.unit.test.ts`を削除してください。

<!-- regression test: Vitestが終了したことを確認してください。tmuxではtmux send-keys -t vitest qでキーを送信できます。 -->

## このチュートリアルでテストする関数

ここからは、TypeScriptのテスト対象コードを書いて、それをテストしていきます。

具体的には、次のような簡単な関数のテストを書くことを例に進めていきます。

```ts twoslash
function isZero(value: number): boolean {
  return value === 0;
}
```

この`isZero`関数は、数値がゼロかどうかを判定するものです。

## テスト対象のファイルを作る

まず、この関数を書いたファイルを作ります。ファイル名は`is-zero.ts`にしてください。このファイルを作ると、プロジェクトのファイル構成は次のようになります。

```text
├── is-zero.ts ... テスト対象ファイル
├── node_modules
├── package-lock.json
├── package.json
└── tsconfig.json
```

<!-- regression test: 上のファイル構成が正しいか確認してください。 -->

`is-zero.ts`の内容は次のようにします。

```ts twoslash title="is-zero.ts"
function isZero(value: number): boolean {
  return value === 0;
}
```

<!-- regression test: 上のコードがコンパイルエラーになっていないことを確認してください。 -->

このままでは`isZero`関数はテストできません。テストコードからこの関数を呼び出せるようにするには、関数をエクスポートする必要があります。関数をエクスポートするために、`function`の前に`export`キーワードを追加してください。

```ts twoslash title="is-zero.ts" {1}
export function isZero(value: number): boolean {
  return value === 0;
}
```

<!-- regression test: 上のコードがコンパイルエラーになっていないことを確認してください。 -->

## テストコードを書く

上の`isZero`関数をテストするコードを書きます。

テストコードはテスト対象と別のファイルに書きます。テストファイルを作りましょう。ファイル名は、テストしたいファイル名に、`.test.ts`をつけたものにします。テスト対象ファイルが`is-zero.ts`なので、ここでは`is-zero.unit.test.ts`というファイル名にします。このファイルを作ると、プロジェクトのファイル構成は次のようになります。

```text
├── is-zero.ts ... テスト対象ファイル
├── is-zero.unit.test.ts ... テストコードのファイル
├── node_modules
├── package-lock.json
├── package.json
└── tsconfig.json
```

<!-- regression test: 上のファイル構成が正しいか確認してください。 -->

テスト対象の関数をテストコードで扱うには、まず関数をインポートする必要があります。`import`文を使って、`isZero`関数を読み込みましょう。

```ts twoslash title="is-zero.unit.test.ts"
import { expect, test } from "vitest";
import { isZero } from "./is-zero";
// ---cut-after---
// @filename: vitest.d.ts
declare module "vitest" {
  export const test: (name: string, fn: () => void) => void;
  export const expect: (value: any) => {
    toBe: (value: any) => boolean;
  };
}
// @filename: is-zero.ts
export declare function isZero(value: number): boolean;
```

<!-- regression test: 上のコードがコンパイルエラーになっていないことを確認してください。 -->

次に、1つ目のテストケースを追加します。このテストケースは、`isZero`関数に`0`を渡したら`true`が返るかをチェックするものです。

```ts twoslash title="is-zero.unit.test.ts" {4-7}
import { expect, test } from "vitest";
import { isZero } from "./is-zero";

test("0を渡したらtrueになること", () => {
  const result = isZero(0);
  expect(result).toBe(true);
});
// ---cut-after---
// @filename: vitest.d.ts
declare module "vitest" {
  export const test: (name: string, fn: () => void) => void;
  export const expect: (value: any) => {
    toBe: (value: any) => boolean;
  };
}
// @filename: is-zero.ts
export declare function isZero(value: number): boolean;
```

<!-- regression test: 上のコードがコンパイルエラーになっていないことを確認してください。 -->

Vitestでは`expect`関数とマッチャーを使い、結果が期待する値になっているかを記述します。マッチャーは、`expect`関数の戻り値に生えているメソッドです。上の例では、`toBe`がマッチャーになります。このメソッドの引数には期待値を書きます。上のテストケースでは、`true`が期待値なので、`toBe(true)`と記述しています。

`toBe`マッチャーは、JavaScriptの厳密等価比較(`===`)と同じです。したがって、`expect(result).toBe(true)`は内部的に`result === true`かを評価します。もし、この評価が真なら、テストは合格します。逆に、偽ならテストは不合格となります。

マッチャーは、`toBe`以外にもさまざまなものがあります。このチュートリアルでは細かく解説しないので、詳しく知りたい方は、[公式ドキュメントのリファレンス](https://vitest.dev/api/expect.html)をご覧ください。

<!-- regression test: 上のURLがリンク切れになっていないことを確認してください。 -->

## テストを実行する

1つ目のテストケースができたので、Vitestでテストを実行してみましょう。

```shell
npx vitest
```

テストが成功すると、次のように表示されます。

```taml

<bold><bgBlue> DEV </bgBlue></bold> <blue>v4.0.16 </blue><brightBlack>/path/to/vitest-tutorial</brightBlack>

 <green>✓</green> is-zero.unit.test.ts <dim>(1 test)</dim><green> 1<dim>ms</dim></green>
   <green>✓</green> 0を渡したらtrueになること<green> 0<dim>ms</dim></green>

<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>   Start at </dim> 05:55:55
<dim>   Duration </dim> 109ms<dim> (transform 47ms, setup 0ms, import 52ms, tests 1ms, environment 0ms)</dim>

<bold><bgGreen> PASS </bgGreen></bold> <green>Waiting for file changes...</green>
       <dim>press </dim>h to show help, press q to quit
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。 -->

## テストケースを追加する

さらにテストケースを追加してみましょう。今度は、`isZero`関数に`1`を渡して、戻り値が`false`になるかをチェックするケースを追加します。

```ts twoslash title="is-zero.unit.test.ts" {9-12}
import { expect, test } from "vitest";
import { isZero } from "./is-zero";

test("0を渡したらtrueになること", () => {
  const result = isZero(0);
  expect(result).toBe(true);
});

test("1を渡したらfalseになること", () => {
  const result = isZero(1);
  expect(result).toBe(false);
});
// ---cut-after---
// @filename: vitest.d.ts
declare module "vitest" {
  export const test: (name: string, fn: () => void) => void;
  export const expect: (value: any) => {
    toBe: (value: any) => boolean;
  };
}
// @filename: is-zero.ts
export declare function isZero(value: number): boolean;
```

テストケースを追加したらテストが再実行され、ターミナルには次のようにテスト数が増えたことが表示されます。

```taml
<bold><bgBlue> RERUN </bgBlue></bold> <dim><blue>is-zero.unit.test.ts </blue></dim><blue>x1 </blue>

 <green>✓</green> is-zero.unit.test.ts <dim>(2 tests)</dim><green> 1<dim>ms</dim></green>
   <green>✓</green> 0を渡したらtrueになること<green> 0<dim>ms</dim></green>
   <green>✓</green> 1を渡したらfalseになること<green> 0<dim>ms</dim></green>

<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>2 passed</green></bold><brightBlack> (2)</brightBlack>
<dim>   Start at </dim> 05:58:37
<dim>   Duration </dim> 9ms

<bold><bgGreen> PASS </bgGreen></bold> <green>Waiting for file changes...</green>
       <dim>press </dim>h to show help, press q to quit
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。 -->

以上でVitestを体験してみるチュートリアルは完了です。

## 補足: 非ウォッチモードでテストを実行する

ウォッチモードではなく、1回だけテストを実行する場合は、`vitest run`コマンドを使います。

```shell
npx vitest run
```

テストが成功すると、次のように表示されます。

```taml
<bold><bgCyan> RUN </bgCyan></bold> <cyan>v4.0.16 </cyan><brightBlack>/path/to/vitest-tutorial</brightBlack>

 <green>✓</green> is-zero.unit.test.ts <dim>(2 tests)</dim><green> 1<dim>ms</dim></green>
   <green>✓</green> 0を渡したらtrueになること<green> 0<dim>ms</dim></green>
   <green>✓</green> 1を渡したらfalseになること<green> 0<dim>ms</dim></green>

<dim> Test Files </dim> <bold><green>1 passed</green></bold><brightBlack> (1)</brightBlack>
<dim>      Tests </dim> <bold><green>2 passed</green></bold><brightBlack> (2)</brightBlack>
<dim>   Start at </dim> 06:04:24
<dim>   Duration </dim> 102ms<dim> (transform 41ms, setup 0ms, import 46ms, tests 1ms, environment 0ms)</dim>
```

<!-- regression test: ターミナルの出力が上のようになっているか確認してください。 -->
