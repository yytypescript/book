---
title: JSX
slug: /reference/jsx
---

JSX（JavaScript XML）は、コンポーネント指向のJavaScriptライブラリやフレームワーク（特にReact）で一般的に採用されている、JavaScriptの拡張構文です。JSXを用いると、JavaScriptのコード内にHTMLタグのような構文が埋め込み可能となり、より直感的かつ読みやすい形でUIのコードを表現することができます。それによって、開発者のコーディング体験や開発、デバッグの効率が上がります。

## JSXとECMAScriptの違い

JavaScriptの文法はECMAScriptという言語仕様で規定されています。一方、JSXはJavaScriptの構文を独自に拡張した言語です。そのため、JSXはECMAScriptの言語仕様に盛り込まれていません。ブラウザがJavaScriptエンジンを実装する場合は、ECMAScript(標準)に準拠するため、ブラウザで直接JSXを解釈し、実行することができない現状があります。この問題を解消するためには、JSXをブラウザが認識できるJavaScriptに変換する、いわゆるトランスパイルという過程が必要となります。このトランスパイル作業を助けるツールとして、BabelやTypeScriptコンパイラーが使われます。

## JSX構文とHTML構文の違い

初見では異なると気づきにくいかもしれませんが、実はJSXとHTMLはまったく同じではありません。構文のレベルにおいてJSXとHTMLの間には複数の違いが存在します。一例を挙げると、属性名の表記方法や、スタイルの指定方法、自己終了タグの書き方などが異なります。これらの詳細については後程の「属性」セクションでより詳しく説明します。覚えておくべき重要なポイントとしては、JSXがHTMLとJavaScriptのハイブリッドであるため、両者の規則や慣例を調和させる形で設計されているという点です。

## JSX構文

### 要素

JSXでもっとも一般的な形式は、ネスト可能な要素（タグ）を使ってコンポーネントを表現するものです。

```tsx twoslash
const element = <br />;
// 描画結果: <br/>
```

### 入れ子の要素

JSX要素はHTMLのようにネストすることができます。たとえば、`div`要素内に2つの`br`要素がネストされている状況を考えてみましょう。

```tsx twoslash
const element = (
  <div>
    <br />
    <br />
  </div>
);
// 描画結果: <div><br/><br/></div>
```

これらは簡単な例ですが、属性や子要素を追加してより複雑なコンポーネントを表現することも可能です。

### テキスト要素

JSX内では、要素に直接テキストを書くことができます。

```tsx twoslash
const element = <h1>I'm a text element.</h1>;
// 描画結果: <h1>I&#x27;m a text element.</h1>
```

上記のように、要素の中に直接テキストを書くと、そのテキストはそのままの形で出力されます。

#### 空白と要素

JSXでは、要素間のスペースは自動的に無視されます。たとえば、

<!--prettier-ignore-->
```tsx twoslash
const element = (
  <p>
    This is a
    <strong>pen</strong>
    .
  </p>
);
// 描画結果: <p>This is a<strong>pen</strong>.</p>
```

上記のコードは「This is a**pen**.」として「a」と「pen」の分かち書きがない状態でレンダリングされてしまいます。

これを回避するには、文字列をJavaScriptの式として書くことです。

<!--prettier-ignore-->
```tsx twoslash
const element = (
  <p>
    This is a{" "}
    <strong>pen</strong>
    .
  </p>
);
// 描画結果: <p>This is a<!-- --> <strong>pen</strong>.</p>
```

こうすると、正しく「This is a pen.」としてレンダリングされます。

### 属性

JSX属性の名前は、JavaScriptの命名規則に従いcamelCaseで記述することが推奨されています。この命名規則は、HTML内のアトリビュートとは異なる点に注意が必要です。

### 標準HTML属性

JSXでは、HTML属性と同じように要素に属性を与えることができます。

```tsx twoslash
const element1 = <img src="image.jpg" alt="A beautiful scene" />;
const element2 = <a href="http://example.com">Visit our website</a>;
```

ただし、`class`属性はJavaScriptの予約語であるため、代わりに`className`を使用します。たとえば、次のコードでは`h1`要素に`className`属性を適用しています。

```tsx twoslash
const element = <h1 className="greeting">Hello, world!</h1>;
// 描画結果: <h1 class='greeting'>Hello, world!</h1>
```

JSXで用いる属性は、JavaScriptのDOMのプロパティ名です。したがって、いくつかのHTML属性はJSXでは異なる名前を持ちます。次の表は、いくつかの一般的なHTML属性と対応するJSX属性名を示しています。

| HTML          | JSX           |
| ------------- | ------------- |
| `class`       | `className`   |
| `tabindex`    | `tabIndex`    |
| `for`         | `htmlFor`     |
| `colspan`     | `colSpan`     |
| `maxlength`   | `maxLength`   |
| `cellpadding` | `cellPadding` |
| `cellspacing` | `cellSpacing` |
| `rowspan`     | `rowSpan`     |

### スタイル属性

HTMLでは、スタイル属性は一般的に文字列です。

```html
<div style="background-color: yellow; color: blue;">Hello!</div>
```

一方、JSXではスタイル属性はオブジェクトでなければなりません。

```jsx
<div style={{ backgroundColor: "yellow", color: "blue" }}>Hello!</div>;
// 描画結果: <div style='background-color:yellow;color:blue'>Hello!</div>
```

### 真偽属性

真偽属性は要素に特定の特性を指定します。たとえば、input要素には"disabled"というboolean型の属性があり、その値に真を指定するとinput要素は無効になります。

```tsx twoslash
const element = <input disabled />;
// 描画結果: <input disabled=''/>
```

属性の値として`{true}`を付けて明示的に指定することもできます。

```tsx twoslash
const element = <input disabled={true} />;
// 描画結果: <input disabled=''/>
```

しかし、一般的には属性値がtrueの場合、値の部分を省略することが推奨されます。このように記述すると、コードが短くシンプルになるためです。したがって、上記の例のように属性名のみを指定することで、その属性を有効にすることができます。

### 式

JSX内ではJavaScriptの式を埋め込むことが可能です。これにより、動的な値をJSX内に簡単に導入することができます。

### 基本的な式

JavaScriptの式をJSX内部に埋め込むためには、波カッコ`{}`を使います。次の例では、変数`name`の値を`<h1>`要素内に埋め込んでいます。

```tsx twoslash
const name = "Josh Perez";
const greeting = <h1>Hello, {name}</h1>;
// 描画結果: <h1>Hello, <!-- -->Josh Perez</h1>
```

ここでは、JavaScriptの変数を埋め込んでいますが、式としての評価結果が挿入されるので、JavaScriptの演算やメソッドの呼び出しも可能です。

```tsx twoslash
const a = 10;
const b = 20;
const sum = <h1>{a + b}</h1>;
// 描画結果: <h1>30</h1>

const name = "Josh Perez";
const greeting = <h1>Hello, {name.toUpperCase()}</h1>;
// 描画結果: <h1>Hello, <!-- -->JOSH PEREZ</h1>
```

### 条件式

JavaScriptのif文は式ではなく文であるため、JSXの式の中に直接書くことはできません。条件式が必要な場合には三項演算子を用います。

```tsx twoslash
const isUser = true;
const greeting = isUser ? <h1>Welcome back!</h1> : <h1>Please sign up.</h1>;
```

このように、三項演算子`条件式 ? 真の場合の値 : 偽の場合の値`を使うことで、JSX内で条件によって表示を切り替えることが可能です。

### 短絡評価

JavaScriptの論理演算子を使用して、短絡評価を行うことも可能です。これを使用すると、特定の条件下でのみ要素を表示したり、デフォルトの値を提供したりします。

### 論理AND演算子(`&&`)による短絡評価

論理AND演算子`&&`は、最初の要素が`false`またはfalsyな値（`false`、`null`、`undefined`、`""`、`0`、`NaN`）の場合その値をそのまま返し、それ以外の場合には2番目の値を返します。

```tsx twoslash
declare const isLoggedIn: boolean;
// ---cut---
const message = isLoggedIn && <h1>Welcome back!</h1>;
```

この例では、`isLoggedIn`がtruthyの場合にのみ、`<h1>Welcome back!</h1>`が表示されます。

### 論理OR演算子(`||`)による短絡評価

論理OR演算子 `||`は、最初のオペランドがtruthyな値の場合にその値をそのまま返し、それ以外の場合には2番目の値を返します。

```tsx twoslash
declare const isLoggedIn: boolean;
// ---cut---
const message = isLoggedIn || <h1>Please sign up.</h1>;
```

この例では、`isLoggedIn`がfalsyな値（`undefined`、`null`、`""`、`0`、`NaN`）の場合にのみ、`<h1>Please sign up.</h1>`が表示されます。

### Null合体演算子(`??`)による短絡評価

Null合体演算子(nullish coalescing operator)`??`は、最初のオペランドが`null`または`undefined`の場合にのみ2番目の値を返します。そのため、最初のオペランドが`false`、`0`、`NaN`、空文字列であっても、その値が保持されます。

```tsx twoslash
declare const input: { name?: string };
// ---cut---
const message = input.name ?? <p>No input provided.</p>;
```

この例では、`input.name`が`null`または`undefined`の場合にのみ、`<p>No input provided.</p>`が表示されます。

### ループ(反復処理)

JavaScriptの`for-of`ループなど、JSX内では文を直接使用することができないため、配列の反復処理を行う際は`Array.prototype.map`関数のような式を使用します。式とは、値を返すコードの片段のことで、それに対して文は値を生成しません。JSXは基本的には式ベースのシンタックスですので、式が使われます。

`Array.prototype.map`関数は配列の各要素に対して関数を適用し、その結果で新たな配列を作成します。これを利用して、一連の要素を作ることができます。次にサンプルコードを示します。

```tsx twoslash
const numbers = [1, 2, 3];
const list = (
  <ul>
    {numbers.map((number) => (
      <li key={number.toString()}>{number}</li>
    ))}
  </ul>
);
// 描画結果: <ul><li>1</li><li>2</li><li>3</li></ul>
```

この例では、`numbers`という配列の各要素に対して関数が適用され、その結果から新たな`<li>`要素で構成された配列が作成されます。そして、その配列は`<ul>`要素に展開され`list`に代入されます。

また、Reactでは配列内の要素に一意な`key`プロパティを追加することが推奨されます。これは、ReactがDOMの変更を効率的に追跡するために使用されます。上記の例では、`key`として数値を文字列に変換したものを使用しています。

### 自己終了タグ

JSXでは、XMLのように自己終了タグ(self-closing tags)が使用できます。これは、開始タグと終了タグの間に何も内容を持たない要素について使用します。

```tsx twoslash
const element = <img src="myImage.jpg" alt="" />;
```

その要素が内容を持たない場合でも、`<img></img>`のように書くことは文法的には可能です。しかし、一般的には`<img />`のように自己終了タグを書くことが推奨されます。これは可読性の観点から、タグが内容を持たないことを明示するためです。

### フラグメント

一般的にJSX要素は、ひとつの親要素内にすべての子要素をネストしなければなりません。これは、JSXが最終的にひとつのルートノードを返すことを要求するためです。しかし、この要求はしばしばReactのDOM構造に余計な要素を追加することを強制してしまいます。これを解決するためにReactが提供する機能が「フラグメント」です。

フラグメントを使うと、ひとつの親要素なしに、複数の要素を同時に返すことができます。これにより、無駄なDOMノードの生成を防ぎつつ、構造をくずさずに複数の要素をレンダリングすることができます。

### JSXでのフラグメントの使用

フラグメントは`<React.Fragment>`タグを使って明示的に表現することができます。次の例では、`h1`と`h2`要素がフラグメント内にまとめられています。

```tsx twoslash
const element = (
  <React.Fragment>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </React.Fragment>
);
// 描画結果: <h1>Hello!</h1><h2>Good to see you here.</h2>
```

ただ、より簡潔にフラグメントを表現するために`<>...</>`というショートハンド（短縮形）がよく使われます。次の例では、`<React.Fragment>`タグが`<>...</>`に置き換えられています。

```tsx twoslash
const element = (
  <>
    <h1>Hello!</h1>
    <h2>Good to see you here.</h2>
  </>
);
// 描画結果: <h1>Hello!</h1><h2>Good to see you here.</h2>
```

いずれの形式でも、フラグメントを使うことで`h1`と`h2`要素は同一階層に配置され、それらをラップする余計なHTML要素を追加せずにレンダリングされます。フラグメントは、Reactアプリケーションのレンダリングパフォーマンスを持続的に向上させるツールとなります。

### JSX内のコメント

コメントはコードの読み易さを向上させる重要な要素です。しかし、JSX内のコメントは少し特殊で、明示的にJavaScriptのブロック、つまり波カッコ `{}` 内に書く必要があります。

### 一行コメント

JSX内では一行コメントを書く方法は次の通りです。

```tsx twoslash
const element = <div>{/* This is a comment */}</div>;
// 描画結果: <div></div>
```

このように、コメントは `{/* */}` の形式で書かれます。この書き方により、コメントはブラウザに表示されず、ただ開発者を支援するために存在します。

### ジェネリクス

ジェネリクスを活用することで、一度定義したコンポーネントや関数を、各種の型に対応可能な形で再利用できます。ここではジェネリクス型を用いたReactコンポーネントの定義とその利用について、詳しく見ていきましょう。

[ジェネリクス](../generics/README.md)

### ジェネリックコンポーネントの定義

まず初めに、型変数`T`を用いたコンポーネントを定義します。ここでは`ItemType`という名前で型を作り、それがプロパティ`prop`を介して型`T`を受け取るように設計します。

```tsx twoslash
type ItemType<T> = {
  prop: T;
};

const Item = <T,>({ prop }: ItemType<T>) => <>{prop}</>;
```

上記の`Item`という名前のコンポーネントには、ジェネリクス型を適用しています。そのため、あらゆる型を`prop`として受け取ることが可能になります。

注目すべき点として、`<T>`の書き方について説明します。もしジェネリクスとして `<T>`だけを記述する場合、TypeScriptはそれがJSXのタグと混同してしまう可能性があります。これは、TypeScriptのパーサーが `<T>`と読み取ったとき、それがジェネリクス開始を示すものなのかJSX要素の開始を示すものなのかを特定するのが難しいためです。この混同を避けるためには、ジェネリクスの開始を示す `<T>`に `,`を追加し、`<T,>`と記述する必要があります。

### ジェネリックコンポーネントの利用

ここで、上記で定義したジェネリクス型のコンポーネントを利用してみます。

```tsx twoslash
// @errors: 2322
type ItemType<T> = {
  prop: T;
};
const Item = <T,>({ prop }: ItemType<T>) => <>{prop}</>;
// ---cut---
const item1 = <Item<string> prop="a" />; // OK
const item2 = <Item<number> prop="a" />; // Error
```

`Item`コンポーネントに対して`string`という型引数を渡し、その`prop`プロパティとして`a`という文字列値を渡しています。これは問題ありません。しかし、次の行では、`Item`コンポーネントに対して`number`という型引数を渡しているのに、その`prop`プロパティとして`a`という文字列値を渡しています。これにより、TypeScriptは型エラーを発生させます。これで、型安全性が確保されていることが確認できます。

## JSXのベストプラクティス

JSXにおけるベストプラクティスは、効果的で読みやすいコードを書くために役立ちます。次にいくつかの主要なベストプラクティスを示します。

### コンポーネント名は常に大文字ではじめる

Reactは小文字で始まるコンポーネントをDOMタグとして認識します。したがって、コンポーネント名は常に大文字ではじめることを推奨します。

```tsx twoslash
// Good
const MyComponent = () => {
  return <div />;
};

// Bad
const myComponent = () => {
  return <div />;
};
```

### マルチラインのJSXはカッコで囲む

複数行に渡るJSXは可読性を上げるためにカッコで囲むことを推奨します。

```tsx {3-7,12-14} twoslash
// Good
const Good = () => {
  return (
    <div>
      <h1>Hello, world!</h1>
    </div>
  );
};

// Bad
const Bad = () => {
  // prettier-ignore
  return <div>
    <h1>Hello, world!</h1>
  </div>;
};
```

### 自己終了タグを利用する

通常、JSX要素は開始タグと終了タグの間に子要素を配置して記述します。しかし内容が空の場合、すなわち子要素を持たない場合、自己終了タグという短縮形を使用することができます。自己終了タグでは、開始タグと終了タグをひとつのタグにまとめることができます。

次の2つの表現は同等です：

```tsx twoslash
// 長いバージョン
const a = <input></input>;
// 短いバージョン（自己終了タグ）
const b = <input />;
```

前者の例では、`<input></input>`という形で開始タグと終了タグを明示的に記述しています。一方、後者の例では、`<input />`という形で開始タグと終了タグをひとつにまとめた自己終了タグを利用しています。どちらの記述も完全に同じ動作をしますが、後者の形が簡潔であり一般的に好まれます。

### `true`の場合は真偽属性を省略する

JSXでは、属性の値が`true`の場合、その属性名だけ記述することで属性の値を省略することが可能です。この書き方を真偽属性と呼びます。

次の2つの表現は同等です：

```tsx twoslash
// 長いバージョン
const a = <input required={true} />;
// 短いバージョン（真偽属性）
const b = <input required />;
```

前者の例では、`required`という属性に対して`{true}`（即ち真）を明示的に設定しています。一方、後者の例では、属性が真であることを示すために`required`という属性名だけを記述しています。どちらの記述も完全に同じ動作をしますが、後者の形が簡潔であり一般的に好まれます。

### マップ関数内で一意の`key`プロパティを使用する

`map`関数を使用してリストを作成する際には、各要素に一意の`key`プロパティを付与することを推奨します。これによりReactは変更、追加、削除を効率的に適用できます。

```tsx twoslash
declare const numbers: number[];
// ---cut---
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

## JSXとコンパイル

JSXはJavaScriptの一部ではないため、ブラウザで直接実行することはできません。デフォルトでは、JSX構文はJavaScript構文にないものであり、そのまま実行してもブラウザは理解できません。そのため、JSXをJavaScriptにコンパイル（または変換）する必要があります。

TypeScriptでは、こうしたJSXのコンパイル方法を指定するために、"jsx"という名前のフラグを `tsconfig.json` 内で設定します。このフラグには次の5つの値を設定することができます。

1. "react"：この設定を選択すると、JSXはJavaScriptへと変換されます。そして、出力される.jsファイルでは、それぞれのJSX要素は対応する`React.createElement`呼び出しに変換されます。これはReactというライブラリが、JSXをどのように標準的なJavaScriptに変換するかを指定しています。
2. "react-jsx"：元のJSX要素は`_jsx`呼び出しに変換され、出力された.jsファイルに含まれます。これにより、ある程度のパフォーマンスの向上が期待できます。
3. "react-jsxdev"：こちらも元のJSX要素は`_jsx`呼び出しに変換されますが、このモードは開発環境でのみ使用することを目的としています。ここで生成される`_jsxの`呼び出しは、開発中のデバッグを容易にするような追加のランタイムチェックを含みます。
4. "preserve"：このモードはJSXをそのままの形で出力ファイルに残します。つまり、元のJSX構文は変更されず、出力されるファイル拡張子は.jsxであることが期待されます。さらなる変換ステップ（たとえばBabel等のトランスパイラ）のためにJSXをそのまま保持する必要がある場合に使用します。
5. "react-native"：このオプションもJSXをそのままの形で出力します。ただし、出力するファイル拡張子は.jsのままであることが期待されます。これは主にReact Nativeの開発環境で使用されます。

上記の設定により、JSXの構文をどのようにJavaScriptにコンパイルするかを制御できます。そして、TypeScriptとJSXを一緒に使う際には、これらの設定が不可欠となります。

それぞれのフラグでどのようにコンパイルされるのか、次のサンプルコードのコンパイル結果を見てみましょう。

```tsx twoslash title="コンパイル前のTypeScript"
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="reactのコンパイル結果(JavaScriptコード)"
// @jsx: react
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="react-jsxのコンパイル結果(JavaScriptコード)"
// @jsx: react-jsx
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="react-jsxdevのコンパイル結果(JavaScriptコード)"
// @jsx: react-jsxdev
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="preserveのコンパイル結果(JavaScriptコード)"
// @jsx: preserve
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```

```tsx twoslash title="react-nativeのコンパイル結果(JavaScriptコード)"
// @jsx: react-native
// @showEmit
const HelloWorld = () => <h1>Hello world</h1>;
```
