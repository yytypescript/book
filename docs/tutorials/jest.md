# Jestでテストを書こう

このチュートリアルでは、テストフレームワーク「Jest」を使い、ユニットテストをTypeScriptで書くことを学びます。

## 本章で学べること

本章では、簡単な関数のテストをJestで書くことを目標に、次のことを学びます。

- Jestを使ってTypeScriptの関数をテストする方法
- Jestの導入方法
- Jestでのテストの書き方
- テストの実行方法
- 結果の見方

本章の目的はJestを完全に理解することではありません。むしろ、Jestがどういったものなのか、その雰囲気を実際に体験することに主眼を置いています。そのため、内容はかなり最低限のものとなりますが、逆に言えば少しの時間でJestを試してみれるシンプルな内容にまとまってますから、ぜひ手を動かしてみてください。

## Jestとは

JestはJavaScriptのテストフレームワークです。TypeScriptでテストを書くこともできます。Jestは、フロントエンドライブラリのReactやVueなどのテストだけでなく、Node.js向けのパッケージのテストも行えます。要するに、JavaScriptやTypeScriptで書かれたコードであれば、そのほとんどはJestでテストが行えます。

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

まず、このチュートリアルに使うプロジェクトを作成します。

```shell
mkdir jest-tutorial
cd jest-tutorial
```

プロジェクトルートにpackage.jsonを作ってください。

```shell
touch package.json
```

package.jsonの内容は次のようにします。

```json title="package.json"
{
  "name": "jest-tutorial",
  "license": "UNLICENSED"
}
```

## TypeScriptのインストール

プロジェクトにTypeScriptをインストールします。

```shell
yarn add -D typescript
```

次に、tsconfig.jsonを生成します。

```shell
yarn tsc --init
```

## Jestをインストールする

Jestをプロジェクトにインストールしましょう。インストールが必要なパッケージは、次の3つです。

1. jest
2. ts-jest
3. @types/jest

これらのインストールは次のコマンドで、一度にインストールできます。

```shell
yarn add -D 'jest@^28.0.0 ts-jest@^28.0.0' '@types/jest@^28.0.0'
```

`jest`はJest本体です。JavaScriptだけのプロジェクトであれば、このパッケージを入れるだけでテストが始められます。`ts-jest`は、JestをTypeScriptに対応させるためのものです。`ts-jest`を入れると、TypeScriptで書いたテストコードを、コンパイルの手間なしにそのまま実行できるようになります。`@types/jest`はJestのAPIの型定義ファイルです。TypeScriptの型情報を付与されるので、テストコードの型チェックが行えるようになります。

## Jestの設定ファイルを作る

JestはそのままではTypeScriptを直接テストできません。なので、ここではJestでTypeScriptコードがテストできるように設定を加えます。

次のコマンドを実行すると、Jestの設定ファイル`jest.config.js`が生成されます。

```shell
yarn ts-jest config:init
```

生成された`jest.config.js`の内容は次のようになります。

```ts twoslash title="jest.config.js"
/** @type {import("ts-jest/dist/types").InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
};
```

この`@type`のコメントはエディターに型情報を与えるためのものです。これを書いておくことで、エディター上で入力補完が効くようになります。

## チェックポイント

ここまでに作成したファイルに漏れがないか確認しましょう。

```text
├── jest.config.js ... Jestの設定ファイル
├── node_modules ... jestやtypescriptがインストールされたフォルダ
├── package.json
├── tsconfig.json ... TypeScriptの設定ファイル
└── yarn.lock
```

## Jestが動くかを確認する

ここでは、実際のテストコードを書く前に、Jestでテストコードが実行できる状態になっているかを、動作確認用のテストファイルを作って確かめます。

Jestで実行できるテストファイルには命名規則があります。ファイル名が`.test.ts`または`.spec.ts`で終わるものが、テストファイルになります。動作確認用のファイルとして、`check.test.ts`を作ってください。

```shell
touch check.test.ts
```

`check.test.ts`の内容は次のようにします。

```ts twoslash title="check.test.ts"
// @types: jest
test("check", () => {
  console.log("OK");
});
```

ファイルを保存したら、`jest`コマンドを実行してみてください。

```shell
yarn jest
```

すると、次のような結果が出るはずです。

![](/tutorials/jest/check-jest-works.svg)

結果に`check.test.ts`が「PASS」と表示されていれば、テストファイルが実行されていることになります。

問題なく実行されていることが確認できたら、`check.test.ts`は削除してください。

```shell title="削除するコマンド"
rm check.test.ts
```

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

まず、この関数を書いたファイルを作ります。ファイル名は`isZero.ts`にしてください。

```shell
touch isZero.ts
```

このファイルを作ると、プロジェクトのファイル構成は次のようになります。

```text
├── isZero.ts ... テスト対象ファイル
├── jest.config.js
├── node_modules
├── package.json
├── tsconfig.json
└── yarn.lock
```

`isZero.ts`の内容は次のようにします。

```ts twoslash title="isZero.ts"
function isZero(value: number): boolean {
  return value === 0;
}
// 注意: このままではテストできません。
```

このままでは`isZero`関数はテストできません。Jestでテストできるようにするには、関数をエクスポートする必要があります。関数をエクスポートするために、`function`の前に`export`キーワードを追加してください。

```ts twoslash title="isZero.ts" {1}
export function isZero(value: number): boolean {
  return value === 0;
}
```

## テストコードを書く

上の`isZero`関数をテストするコードを書きます。

Jestではテストコードはテスト対象と別のファイルに書きます。テストファイルを作りましょう。ファイル名は、テストしたいファイル名に、`.test.ts`をつけたものにします。テスト対象ファイルが`isZero.ts`なので、ここでは`isZero.test.ts`というファイル名にします。

```shell
touch isZero.test.ts
```

このファイルを作ると、プロジェクトのファイル構成は次のようになります。

```text
├── isZero.ts ... テスト対象ファイル
├── isZero.test.ts ... テストコードのファイル
├── jest.config.js
├── node_modules
├── package.json
├── tsconfig.json
└── yarn.lock
```

テスト対象の関数をテストコードで扱うには、まず関数をインポートする必要があります。`import`文を使って、`isZero`関数を読み込みましょう。

```ts twoslash title="isZero.test.ts"
// @filename: isZero.ts
export function isZero(value: number): boolean {
  return value === 0;
}

// @filename: isZero.test.ts
// ---cut---
import { isZero } from "./isZero";
```

次に、1つ目のテストケースを追加します。このテストケースは、`isZero`関数に`0`を渡したら`true`が返るかをチェックするものです。

```ts twoslash {3-5} title="isZero.test.ts"
// @types: jest
// @filename: isZero.ts
export function isZero(value: number): boolean {
  return value === 0;
}

// @filename: isZero.test.ts
// ---cut---
import { isZero } from "./isZero";

test("0を渡したらtrueになること", () => {
  const result = isZero(0);
  expect(result).toBe(true);
});
```

Jestでは`expect`関数とマッチャーを使い、結果が期待する値になっているかを記述します。マッチャーは、`expect`関数の戻り値に生えているメソッドです。上の例では、`toBe`がマッチャーになります。このメソッドの引数には期待値を書きます。上のテストケースでは、`true`が期待値なので、`toBe(true)`と記述しています。

`toBe`マッチャーは、JavaScriptの厳密等価比較(`===`)と同じです。したがって、`expect(result).toBe(true)`は内部的に`result === true`かを評価します。もし、この評価が真なら、テストは合格します。逆に、偽ならテストは不合格となります。

マッチャーは、`toBe`以外にもさまざまなものがあります。このチュートリアルでは細かく解説しないので、詳しく知りたい方は、[公式ドキュメントのリファレンス](https://jestjs.io/ja/docs/expect)をご覧ください。

## テストを実行する

1つ目のテストケースができたので、Jestでテストを実行してみましょう。

```shell
yarn jest
```

テスト結果は次のように表示されていれば、テストの実行ができています。

![](/tutorials/jest/yarn-jest-isZero-1.svg)

## テストケースを追加する

さらにテストケースを追加してみましょう。今度は、`isZero`関数に`1`を渡して、戻り値が`false`になるかをチェックするケースを追加します。

```ts twoslash {8-11} title="isZero.test.ts"
// @types: jest
// @filename: isZero.ts
export function isZero(value: number): boolean {
  return value === 0;
}

// @filename: isZero.test.ts
// ---cut---
import { isZero } from "./isZero";

test("0を渡したらtrueになること", () => {
  const result = isZero(0);
  expect(result).toBe(true);
});

test("1を渡したらfalseになること", () => {
  const result = isZero(1);
  expect(result).toBe(false);
});
```

テストケースを追加したら、再びJestを実行し、テストコードを走らせます。

```shell
yarn jest
```

今度は次のような結果になるはずです。

![](/tutorials/jest/yarn-jest-isZero-2.svg)

以上でJestを体験してみるチュートリアルは完了です。
