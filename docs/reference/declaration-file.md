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

型定義ファイルが含まれているパッケージの場合は特別な作業は必要ありません。

例としてdate libraryの[moment](https://github.com/moment/moment)はJavaScriptで構築されていますが、`moment.d.ts`を同封しています。そのままinstallを行うだけで定義ファイルの恩恵を受けられます。

```bash
npm install moment
```

型定義ファイル有りの場合は、設定なく型情報を参照することができます。

### 型定義ファイル有りだが別途インストールが必要

もし、パッケージに型定義ファイルが同梱されていない場合は別途インストールする必要があります。

[TypeSearch](https://microsoft.github.io/TypeSearch/)からパッケージ名を検索しインストールを行います。TypeSearchのリポジトリは[DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)であり、ここに多くのライブラリの定義ファイルが一元管理されています。定義ファイルのインストールも`npm`コマンドを利用します。

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

実際のモジュールの型定義ファイルの例として`jest`の型定義ファイルを見てみましょう。`beforeAll`などの関数が型定義ファイル内でアンビエント宣言されているのが確認できます。これによりモジュールの読み込みをせずに、これらの関数を直接記述することができます。

```ts title="node_modules/@types/jest/index.d.ts" twoslash
// @noErrors
declare var beforeAll: jest.Lifecycle;

declare namespace jest {
  type Lifecycle = (fn: ProvidesHookCallback, timeout?: number) => any;
}
```

### namespace

### module

### トリプルスラッシュ・ディレクティブ
