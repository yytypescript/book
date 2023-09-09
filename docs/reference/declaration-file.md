---
sidebar_label: 型定義ファイル
---

# 型定義ファイル (.d.ts)

自身のプロジェクトでTypeScriptでコーディングする場合は型を宣言することにより、IDEやエディターの補完機能やコードチェックを行えます。しかし外部のパッケージ(npm)を利用する場合は型定義ファイルが含まれているとは限りません。

## 型定義ファイルとは

型定義ファイルとはアクセス可能な宣言を記述したファイルです。拡張子は`.d.ts`です。

型定義ファイルは主にパッケージを配布するために作成されます。TypeScriptはJavaScriptにコンパイルされるときに型情報は無くなってしまいます。そのままJavaScriptパッケージを利用すると型定義の恩恵を得ることができません。しかし型定義ファイルを同梱することにより補完やコードチェックとして利用することができます。

残念なことにnpmに公開されているすべてのパッケージに必ずしも定義ファイルが存在するとは限りません。こちらに関しては**型定義ファイルの有無**にて説明します。

### 型定義ファイル出力例

tscコマンドに`-d`オプションをつけてコンパイルを行うとJavaScriptと型定義ファイルを出力することができます。

#### TypeScriptファイル

次のTypeScriptファイル(sample.ts)を`-d`オプションを付けてコンパイルしてみます。

```ts title="sample.ts" twoslash
interface Person {
  firstName: string;
  lastName: string;
}

function greeter(person: Person): string {
  return "Hello, " + person.firstName + " " + person.lastName;
}
```

tscコマンドに`-d`オプションを付けコンパイルを実行する。

```bash
tsc -d
```

#### JavaScriptファイル

sample.tsではInterfaceを使っていますが、JavaScriptにはInterfaceの概念がないため関数のみになりました。また引数の型情報もなくなります。

```js title="sample.js" twoslash
function greeter(person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}
//# sourceMappingURL=sample.js.map
```

#### `d.ts`ファイル

定義情報のみ記載されたファイルが出力されます。

```ts title="sample.d.ts" twoslash
interface Person {
  firstName: string;
  lastName: string;
}
declare function greeter(person: Person): string;
```

## 型定義ファイルの有無

型定義ファイルはパッケージ開発者またはボランティアにより作成されています。

- 型定義ファイル有り
  - TypeScriptで書かれたパッケージ
  - JavaScriptで書かれたパッケージだが`.d.ts`ファイルを同梱している
- 型定義ファイル有りだが別途インストールが必要
  - JavaScriptで書かれたパッケージだが、 DefinitelyTypedに登録されている
- 型定義ファイル無し
  - JavaScriptで書かれたパッケージで型定義ファイルが存在しない

### 型定義ファイル有り

NPMのパッケージの紹介ページを見るとパッケージ名称の右にTSのアイコンが表示されている場合があります。これは型定義ファイルが存在することを示しています。
これは、パッケージ開発者がTypeScriptで開発しているか、JavaScriptで開発しているが型定義ファイルを同梱していることを示しています。型定義ファイルが含まれているパッケージの場合は特別な作業は必要ありません。

例としてdate libraryの[date-fns](https://date-fns.org/)はJavaScriptで構築されていますが、`typings.d.ts`を同封しています。そのままinstallを行うだけで定義ファイルの恩恵を受けられます。

```bash
npm install date-fns
```

型定義ファイル有りの場合は、設定なく型情報を参照することができます。

### 型定義ファイル有りだが別途インストールが必要

NPMのパッケージの紹介ページを見るとパッケージ名称の右にDTのアイコンが表示されている場合があります。これは型定義ファイルがこのパッケージ自身には含まれていないが、[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)に登録されていることを示しています。
この場合は、パッケージをインストールした後に別途型定義ファイルをインストールする必要があります。定義ファイルのインストールも`npm`コマンドを利用します。

例として[Express](https://expressjs.com/)はJavaScriptで構築されていますが、型定義ファイルは`@types/express`というパッケージとして別途インストールする必要があります。

[Express](https://expressjs.com/)本体と定義ファイルのインストール例は次のようになります。

```bash
npm install express --save # express本体のインストール
npm install @types/express --save-dev # 型定義ファイルのインストール
```

### 型定義ファイル無し

型定義ファイルがないライブラリも存在します。その場合は

1. `any`で妥協する
2. 型定義ファイルを作る

型定義ファイルの存在しないライブラリも利用することが可能ですが暗黙的に`any`型になります。また自身で作成しDefinitelyTypedに公開することもできます。

[コントリビュート（貢献）する方法 | Definitely Typed](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/README.ja.md#%E3%82%B3%E3%83%B3%E3%83%88%E3%83%AA%E3%83%93%E3%83%A5%E3%83%BC%E3%83%88%E8%B2%A2%E7%8C%AE%E3%81%99%E3%82%8B%E6%96%B9%E6%B3%95)

## 型定義ファイルで登場するキーワード

ここでは型定義ファイルを読めるようになるために、型定義ファイルでよく利用されるキーワードを紹介します。

### declare

`declare`キーワードを使うことでTypeScriptに変数、関数、クラスなどがJavaScript内に「存在する」ことを伝えることができます。これを「アンビエント宣言」と呼びます。

次のファイルがJavaScriptライブラリとして読み込まれており、グローバル関数として`hello`が使える状態だとします。

```js twoslash
function hello(name) {
  return "Hello, " + name;
}
```

この状態でTypeScriptで`hello`関数を呼び出すと型エラーが発生します。これは、TypeScriptが`hello`関数が存在することを知らないためです。

```ts twoslash
// @errors: 2304
hello("taro");
```

`declare`を利用してアンビエント宣言をすることで、TypeScriptにJavaScript内のどこかに`hello`関数が「存在する」ことを宣言することができます。これによりTypeScriptが`hello`関数を認識できるようになります。

```ts twoslash
declare function hello(name: string): string;

hello("taro");
// @log: "hello, taro"
```

実際のモジュールの型定義ファイルの例として`jest`の型定義ファイルを見てみましょう。`beforeAll`などの関数が型定義ファイル内でアンビエント宣言されているのが確認できます。これによりモジュールの読み込みをしなくても、TypeScriptが`beforeAll`を関数として認識することができます。

```ts title="node_modules/@types/jest/index.d.ts" twoslash
// @noErrors
declare var beforeAll: jest.Lifecycle;

declare namespace jest {
  type Lifecycle = (fn: ProvidesHookCallback, timeout?: number) => any;
}
```

### namespace

`namespace`キーワードを使うことで名前空間を定義することができます。
名前空間を定義することで、型名の衝突を避けることができます。

`Element`という型をライブラリの型として定義してライブラリ利用者が参照できるようにしたいと考えみます。この型はTypeScriptの`lib.dom.d.ts`にすでに定義されているため、そのまま同じグローバルな空間に定義をすると名前が衝突してしまいます。

```ts title="node_modules/typescript/lib/lib.dom.d.ts" twoslash
interface Element
  extends Node,
    ARIAMixin,
    Animatable,
    ChildNode,
    InnerHTML,
    NonDocumentTypeChildNode,
    ParentNode,
    Slottable {
  readonly attributes: NamedNodeMap;
  /** Allows for manipulation of element's class content attribute as a set of whitespace-separated tokens through a DOMTokenList object. */
  readonly classList: DOMTokenList;

  // 省略
}
```

次のコードは`namespace`を使わずにライブラリ独自の型として`Element`を定義している例です。TypeScriptでは同じインターフェースが定義された場合は宣言のマージが発生するため、`lib.dom.d.ts`で定義されている型とマージされるため、`attributes`プロパティなど複数プロパティの指定を求められてしまいます。

```ts twoslash
// hello.d.ts
// @showEmittedFile: index.d.ts
interface Element {
  id: string;
}

// index.ts
// @errors: 2740
const e: Element = {
  id: "1",
};
```

名前空間を定義することで衝突を避けてライブラリ独自の型を定義をすることができます。

```ts twoslash
// @filename: hello.d.ts
namespace Hello {
  interface Element {
    id: number;
  }
}

// @filename: index.ts
// @errors: 2740
const e: Hello.Element = {
  id: 1,
};
```

Reactの型定義ファイルでは、次のように`namespace JSX`で名前空間が定義されて`Element`の型が定義がされています。

`declare global` と `declare namespace`の違いについて
型定義ファイルでは同じ振る舞いをするため違いはない。`declare global`と記述をすることで、グローバルスコープに名前空間を定義するということを開発者の意図として明示できる？

```ts twoslash
// @filename: node_modules/@types/react/index.d.ts
declare global {
  namespace JSX {
    interface Element extends React.ReactElement<any, any> {}

    // 省略
  }
}
```

### module

TypeScript1.5以前では、`module`キーワードが「内部モジュール（名前空間）」を定義するために使用されていました。これは現在の`namespace`の機能と同等です。しかし、この名前がESModuleの「外部モジュール」の定義とキーワード名が重複し、混乱を招いてしまう可能性があったため、TypeScript1.5から「内部モジュール」は「名前空間」と呼ばれるように変更され、`namespace`キーワードが新たに導入されました。

現在では、`module`キーワードは非推奨となっているため、`namespace`キーワードの使用をするようにしてください。

### トリプルスラッシュ・ディレクティブ

型定義ファイルの先頭で見かける3つのスラッシュ(`///`)ではじめるコメント行をトリプルスラッシュ・ディレクティブと呼びます。これは、TypeScript独自の形式でコンパイラに対して指示を出す機能を持っています。

トリプルスラッシュ・ディレクティブにはいくつかの種類が存在しており、ここでは多くの型定義ファイルで目にする代表的なディレクティブを2つ紹介します。

#### `/// <reference path="..." />` (参照ディレクティブ)

参照ディレクティブはコンパイラに型定義ファイル間の依存関係を宣言でき、`path`で指定された型定義ファイルを追加でコンパイル時に読み込むように指示を与えることができます。たとえば、次の例では`index.d.ts`をコンパイラが読み込む際に追加で`global.d.ts`を読み込みます。

```ts title="node_modules/@types/react/index.d.ts" twoslash
// @noErrors
/// <reference path="global.d.ts" />
```

#### `/// <reference types="..." />` (型ディレクティブ)

型ディレクティブはnpmパッケージへの依存関係を宣言できます。宣言されたパッケージの依存を解決する処理はimport文でのパッケージの解決と似た処理のため、型ディレクティブは型のimportのようなものとも考えられます。

次の例はexpressの型定義ファイルの一部です。型ディレクティブで`serve-static`パッケージの型定義ファイルに依存していることが示されています。

```ts title="node_modules/@types/express/index.d.ts" twoslash
// @noErrors
/// <reference types="express-serve-static-core" />
/// <reference types="serve-static" />
```
