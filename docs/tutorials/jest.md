# Jestでテストを書こう

このチュートリアルでは、テストフレームワーク「Jest」を使い、ユニットテストをTypeScriptで書くことを学びます。

## 本章で学べること

本章では、簡単な関数やReactコンポーネントのテストをJestで書けるようになることを目標に、次のことを学びます。

- Jestの導入方法
- Jestを使ってTypeScriptの関数やReactコンポーネントをテストする方法
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

## Jest実行環境の準備

### プロジェクトを作成する

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

### TypeScriptのインストール

プロジェクトにTypeScriptをインストールします。

```shell
yarn add -D typescript
```

次に、tsconfig.jsonを生成します。

```shell
yarn tsc --init
```

### Jestをインストールする

Jestをプロジェクトにインストールしましょう。インストールが必要なパッケージは、次の3つです。

1. jest
2. ts-jest
3. @types/jest

これらのインストールは次のコマンドで、一度にインストールできます。

```shell
yarn add -D jest@^28.0.0 ts-jest@^28.0.0 @types/jest@^28.0.0
```

`jest`はJest本体です。JavaScriptだけのプロジェクトであれば、このパッケージを入れるだけでテストが始められます。`ts-jest`は、JestをTypeScriptに対応させるためのものです。`ts-jest`を入れると、TypeScriptで書いたテストコードを、コンパイルの手間なしにそのまま実行できるようになります。`@types/jest`はJestのAPIの型定義ファイルです。TypeScriptの型情報を付与されるので、テストコードの型チェックが行えるようになります。

### Jestの設定ファイルを作る

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

### チェックポイント

ここまでに作成したファイルに漏れがないか確認しましょう。

```text
├── jest.config.js ... Jestの設定ファイル
├── node_modules ... jestやtypescriptがインストールされたフォルダ
├── package.json
├── tsconfig.json ... TypeScriptの設定ファイル
└── yarn.lock
```

### Jestが動くかを確認する

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

これでJestの実行環境が整いました。ここからは、TypeScriptのテスト対象コードを書いて、それを実際にテストしていきます。

## 関数のテスト

まずは関数のテストを作成・実行してみましょう。

### テストする関数

具体的には、次のような簡単な関数のテストを書くことを例に進めていきます。

```ts twoslash
function isZero(value: number): boolean {
  return value === 0;
}
```

この`isZero`関数は、数値がゼロかどうかを判定するものです。

### テスト対象のファイルを作る

まず、この関数を書いたファイルを作ります。ファイル名は`isZero.ts`にしてください。

```shell
touch isZero.ts
```

このファイルを作ると、プロジェクトのファイル構成は次のようになります。

```text
├── izZero.ts ... テスト対象ファイル
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

### テストコードを書く

上の`isZero`関数をテストするコードを書きます。

Jestではテストコードはテスト対象と別のファイルに書きます。テストファイルを作りましょう。ファイル名は、テストしたいファイル名に、`.test.ts`をつけたものにします。テスト対象ファイルが`isZero.ts`なので、ここでは`isZero.test.ts`というファイル名にします。

```shell
touch isZero.test.ts
```

このファイルを作ると、プロジェクトのファイル構成は次のようになります。

```text
├── izZero.ts ... テスト対象ファイル
├── izZero.test.ts ... テストコードのファイル
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

### テストを実行する

1つ目のテストケースができたので、Jestでテストを実行してみましょう。

```shell
yarn jest
```

テスト結果は次のように表示されていれば、テストの実行ができています。

![](/tutorials/jest/yarn-jest-isZero-1.svg)

### テストケースを追加する

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

関数のテストについては以上です。

## Reactコンポーネントのテスト

ここでは、Reactコンポーネントのテストを作成・実行してみましょう。
Reactでコンポーネントが作れることを前提にしますので、Reactの基本的な使い方を知りたいという方は[Reactでいいねボタンを作ろう](./react-like-button-tutorial.md)をご参照ください。

:::info
このセクションから読んで頂くこともできるよう、ここからは前セクション「関数のテスト」で使ったディレクトリとは異なる、新しいディレクトリで進めます。
:::

### Reactプロジェクトの作成

テストに使用するためのReactプロジェクトを作成します。下記コマンドを実行してください。

```shell
npx create-react-app jest-tutorial-react --template typescript
```

上記を実行すると次のように聞かれることがありますが、`y`を押して`create-react-app`をインストールしてください。時間がかかることもあるので、のんびり待ちましょう。

```shell
Need to install the following packages:
  create-react-app
Ok to proceed? (y)
```

成功すると今いるディレクトリ配下に`jest-tutorial-react`というディレクトリが作られます。
そのまま下記コマンドを実行して`jest-tutorial-react`に移動しましょう。

```shell
cd jest-tutorial-react
```

`jest-tutorial-react`配下のファイル構成は次のようになっているはずです。

```text
├── README.md
├── node_modules
├── package-lock.json
├── package.json
├── public
├── src
└── tsconfig.json
```

ここで次のコマンドを実行してください。

```shell
yarn start
```

自動的にブラウザが開かれて次の画像のように表示されれば、プロジェクト作成が成功しています。

![ひながた初期状態の画面](react-like-button-tutorial/screen1.png)

### テストするコンポーネント

ここでは、次のような簡単なボタンコンポーネントのテストを書くことを例に進めていきます。

![ボタン上の文字がクリックによってON,OFFと切り替わる様子](jest/simpleButton.gif)

見てのとおり、はじめは`OFF`となっているボタン上の文字が、ボタンをクリックするたびに`ON`/`OFF`と切り替わります。
このコンポーネントについて次の2点をテストしていきます。

- はじめは`OFF`と表示されていること
- ボタンをクリックすると表示が`ON`に切り替わること

### テスト対象のコンポーネントを作る

テストを作成するために、まずは対象コンポーネントを実装していきます。
`src`ディレクトリ配下に、`SimpleButton.tsx`という名前でファイルを作成してください。

```shell
cd src
touch SimpleButton.tsx
```

このファイルを作ると、`src`ディレクトリのファイル構成は次のようになります。

```text
├── App.css
├── App.test.tsx
├── App.tsx
├── index.css
├── index.tsx
├── logo.svg
├── react-app-env.d.ts
├── reportWebVitals.ts
├── setupTests.ts
└── SimpleButton.tsx
```

`SimpleButton.tsx`の内容は次のようにします。

```tsx twoslash title="SimpleButton.tsx"
import { useState } from "react";

export const SimpleButton: () => JSX.Element = () => {
  const [state, setState] = useState(false);
  const handleClick = () => {
    setState(!state);
  };
  return <button onClick={handleClick}>{state ? "ON" : "OFF"}</button>;
};
```

ここで、この`SimpleButton`コンポーネントの挙動を確認してみましょう。
`index.tsx`ファイルを次のようにして保存してください。

```tsx twoslash title="index.tsx"
// @noErrors
import React from "react";
import ReactDOM from "react-dom/client";
import { SimpleButton } from "./SimpleButton";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SimpleButton />
  </React.StrictMode>
);
```

そのうえで下記コマンドを実行しましょう。

```shell
yarn start
```

すると、ブラウザが自動で立ち上がり、次のようなボタンが表示されます。
初めは`OFF`と表示され、クリックにより`ON`と`OFF`が交互に切り替わることを確認してください。

![ボタン上の文字がクリックによってON,OFFと切り替わる様子](jest/simpleButton.gif)

:::info
ボタンが小さければ、ブラウザの拡大率を上げてみると大きく表示されます。
:::

これで今回テストするコンポーネントを作成できました。

### コンポーネントのテスト方法

Reactコンポーネントをテストする方法は多くありますが、ここでは比較的よく用いられる2つの手法を紹介します。

まずひとつがJestの「スナップショットテスト」機能を用いる方法、そしてもうひとつは`@testing-library/react`というReactコンポーネントのテストに特化したライブラリを使用する方法です。後ほど述べるように両者は組み合わせて使うこともできます。

Jestの「スナップショットテスト」とは簡単に言えば、ある瞬間におけるコンポーネントの全体の状態を確かめるテストです。
「スナップショットテスト」は便利である一方、コンポーネントの中で本当に確認したい箇所だけを検証するテストや、コンポーネントに対して特定の操作を施すテストを作成したいこともあります。`@testing-library/react`は、そのようなテストを可能にするライブラリです。

それでは、それぞれの手法を用いたテストを実際に作ってみましょう。

### Jestを用いた「スナップショットテスト」の作り方とやり方

Jestの「スナップショットテスト」とは、まずはコンポーネントのDOMをまるごと保存し、その保存したDOMと、テスト実行時にコンポーネントを描画して生成したDOMとが一致するかを確認するテストです(DOMとは何かがよく分からない場合、ここではひとまず「コンポーネントを表すオブジェクト」程度に捉えてください)。保存されたDOMを「スナップショット」と呼びます。

:::caution
本来、スナップショットテストの対象はコンポーネントおよびDOMに限られたものではありません。幅広い対象にスナップショットテストが実施できます。詳しくはJestの[公式ドキュメント](https://jestjs.io/ja/docs/snapshot-testing#%E3%82%B9%E3%83%8A%E3%83%83%E3%83%97%E3%82%B7%E3%83%A7%E3%83%83%E3%83%88%E3%83%86%E3%82%B9%E3%83%88%E3%81%AFreact%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%A7%E3%81%AE%E3%81%BF%E5%88%A9%E7%94%A8%E3%81%A7%E3%81%8D%E3%81%BE%E3%81%99%E3%81%8B)をご参照ください。
:::

スナップショットテストを実際にやってみましょう。
先ほどと同じ`src`ディレクトリ配下で`SimpleButton.test.tsx`というファイルを作成します。

```shell
touch SimpleButton.test.tsx
```

スナップショットテストは次の2ステップから成ります。

1. スナップショットを検証したい状態にコンポーネントを持っていく
2. スナップショットに照合する

ここではボタンが描画されてまだ何も操作されていない状態、つまりボタンにOFFと表示されている状態についてスナップショットテストを実施することを考えます。描画されたばかりの状態を検証したいので、描画してすぐにスナップショット照合を行えばよいことになります。

この考えをもとに、実際のコードを書いてみましょう。
コンポーネントの描画には`@testing-library/react`の`render`関数を、スナップショットの照合にはJestの`toMatchSnapshot()`関数をそれぞれ使用して次のように書くことができます。

```tsx twoslash title="SimpleButton.test.tsx"
// @noErrors
import { render } from "@testing-library/react";
import { SimpleButton } from "./SimpleButton";

test("描画されてすぐはOFFと表示されている", () => {
  const view = render(<SimpleButton />);
  expect(view.container).toMatchSnapshot();
});
```

:::info
Jest単体ではReactコンポーネントの描画ができません。そこで、コンポーネントの描画をするためのライブラリを導入する必要があります。多くのライブラリがありますが、ここでは後ほど紹介する`@testing-library/react`を用いました。
:::

テストファイルが作成できたら、`yarn test`コマンドを実行します。

```shell
yarn test
```

そうすると次のように表示され、テストが実行されて成功した(`PASS`した)ことがわかります。

![SimpleButtonコンポーネントのテストがPASSした結果画面](jest/result_pass.png)

さて、このとき`src`ディレクトリの中に`__snapshots__`というディレクトリが自動で追加されているはずです。これはJestがスナップショットテスト用のファイルを保存していくためのフォルダです。
Jestのスナップショットテストは初回実行時にスナップショットテスト用のファイルを生成し、2回目から照合を行います。いまは初回実行だったため、ファイルとその置き場であるディレクトリが自動で生成されました。

ここでスナップショットテストについてもう少しだけ知るために、生成されたスナップショットテスト用のファイルの中身を覗いてみましょう。

`__snapshots__`ディレクトリの中に作られた`SimpleButton.test.tsx.snap`は次のようになっています。

```txt twoslash title='SimpleButton.test.tsx.snap'
// Jest Snapshot v1, https://goo.gl/fbAQLP
exports[`描画されてすぐはOFFと表示されている 1`] = `
<div>
  <button>
    OFF
  </button>
</div>
`;
```

このように、スナップショットテスト用のファイルはテストケースの名前と、そのテストケースで使われるスナップショットで構成されています。

さて、今回生成されたスナップショットは`OFF`というテキストを持った`button`タグと、その親要素である`div`タグで構成されています。
これは、まさに先ほど作った`SimpleButton`コンポーネントのDOMに一致します(`div`要素はReactの起動時に自動生成される要素です)。
このスナップショットテストは実行のたびに、`SimpleButton`コンポーネントを描画して、たった今作られたこのスナップショットとの違いが生まれていないかを確認してくれます。
たとえば、もしも何かの手違いで`SimpleButton`コンポーネントが描画されたときに`ON`と表示されるようになっていたら、このスナップショットテストに引っかかるのです。

ここで、実際に失敗する様子も確認してみましょう。`SimpleButton`コンポーネントが描画されたときに`ON`と表示されるよう変更を加えます。

```tsx twoslash {4,5} title="SimpleButton.tsx"
import { useState } from "react";

export const SimpleButton: () => JSX.Element = () => {
  const [state, setState] = useState(true);
  // falseからtrueに変更               ^^^^
  const handleClick = () => {
    setState(!state);
  };
  return <button onClick={handleClick}>{state ? "ON" : "OFF"}</button>;
};
```

この状態で`yarn start`コマンドを実行すると、描画されたボタンの文字の初期値が`ON`になっていることが分かります。

さて、ここで`yarn test`コマンドを実行します。

```shell
yarn test
```

先ほどのスナップショットテストが実行されますが、今回はテストが通らず、描画されたコンポーネントとスナップショットの差分が表示されます。

![SimpleButtonコンポーネントのテストがFAILし、描画されたコンポーネントとスナップショットの差分が表示されている結果画面](jest/result_fail.png)

今回はボタン内テキストの初期値を変更しましたが、たとえば`button`タグから`div`タグへの変更や`button`タグへのクラスの追加など、DOMに対する変更のほとんどをスナップショットテストで検知できます。

スナップショットテストの詳しいやり方やベストプラクティスなど、さらに詳しい情報に触れたい方はJestの[公式ドキュメント](https://jestjs.io/ja/docs/snapshot-testing)をご参照ください。

### `@testing-library/react`を用いたテストの作り方とやり方

:::caution

執筆中

コンポーネントを操作し、コンポーネントの一部分の状態を確かめるようなテストを`@testing-library/react`で実現する方法

:::

以上でJestを体験してみるチュートリアルは完了です。
