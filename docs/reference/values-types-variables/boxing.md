---
sidebar_label: "ボックス化"
---

# ボックス化 (boxing)

多くの言語では、プリミティブは一般的にフィールドやメソッドを持ちません。プリミティブをオブジェクトのように扱うには、プリミティブをオブジェクトに変換する必要があります。プリミティブからオブジェクトへの変換をボックス化(boxing)と言います。

```js twoslash
// プリミティブ型
const str = "abc";
// ラッパーオブジェクトに入れる
const strObject = new String(str);
// オブジェクトのように扱う
strObject.length; // フィールドの参照
strObject.toUpperCase(); // メソッド呼び出し
```

上の例は、JavaScriptでボックス化のイメージを書いたものです。実際のコードでは、プリミティブ型を`String`のようなラッパーオブジェクトにわざわざ入れる必要はありません。JavaScriptには自動ボックス化という仕組みがあるからです。

## 自動ボックス化

JavaScriptでは、プリミティブ型の値でもフィールドを参照できたり、メソッドが呼び出せます。

```js twoslash
const str = "abc";
// オブジェクトのように扱う
str.length; // フィールドの参照
str.toUpperCase(); // メソッド呼び出し
```

プリミティブ型の値はオブジェクトではないため、このような操作ができるのは変です。ボックス化する必要があるように思えます。しかし、このようなことができるのは、JavaScriptが内部的にプリミティブ型の値をオブジェクトに変換しているからです。この暗黙の変換を自動ボックス化(auto-boxing)と呼びます。

## ラッパーオブジェクト

JavaScriptの自動ボックス化で変換先となるオブジェクトをラッパーオブジェクト(wrapper object)と呼びます。プリミティブ型とラッパーオブジェクトの対応は次の表のとおりです。

| プリミティブ型 | ラッパーオブジェクト |
| -------------- | -------------------- |
| `boolean`      | `Boolean`            |
| `number`       | `Number`             |
| `string`       | `String`             |
| `symbol`       | `Symbol`             |
| `bigint`       | `BigInt`             |

プリミティブ型の`undefined`と`null`にはラッパーオブジェクトがありません。したがって、メソッドやフィールドの参照は常にエラーが発生します。

```js twoslash
null.toString();
// @error: TypeError: Cannot read property 'toString' of null
undefined.toString();
// @error: TypeError: Cannot read property 'toString' of undefined
```

## MDNの読み方

JavaScriptを学ぶ過程で一度はお世話になるドキュメントが[MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript)です。自動ボックス化とラッパーオブジェクトを意識すると、MDNのドキュメントが理解しやすくなります。

たとえば、数値の`toString`メソッドの説明は、MDNでは[「Number.prototype.toString()」というタイトルのページ](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toString)に書かれています。`toString`がプリミティブ型の`number`に生えているものだと思っていると、「Number.prototypeは何だろう」「数値型を調べているはずなのに、なぜNumberオブジェクトのページに書いてあるんだろう」などといった疑問を持つかもしれません。

自動ボックス化とラッパーオブジェクトを知っていると、この疑問が解消します。`number`にはメソッドもフィールドもありません。メソッドなどがあるように見えるのは、自動ボックス化で`number`が`Number`オブジェクトに変換されるためです。したがって、`toString`の説明が`Number`オブジェクトのページに書いてあることが腑に落ちます。また、`Number.prototype`が表す意味は「`Number`オブジェクトのインスタンスに生えている」だとということも理解できます。

## ラッパーオブジェクトとTypeScriptの型

TypeScriptでは、ラッパーオブジェクトの型も定義されています。次のように、ラッパーオブジェクトの型を使って、型注釈を書くこともできます。ラッパーオブジェクト型の変数にプリミティブ型の値を代入するのも可能です。

```ts twoslash
// @target: es2020
const bool: Boolean = false;
const num: Number = 0;
const str: String = "";
const sym: Symbol = Symbol();
const big: BigInt = 10n;
```

しかし、ラッパーオブジェクト型はプリミティブ型に代入できません。

```ts twoslash
// @errors: 2322
const n1: Number = 0;
const n2: number = n1;
```

ラッパーオブジェクト型は演算子が使えません。

```ts twoslash
// @errors: 2362
const num: Number = 1;
num * 2;
```

ラッパーオブジェクト型は、そのインターフェースを満たしたオブジェクトであれば、プリミティブ型の値以外も代入できます。

```ts twoslash
const boolLike = {
  valueOf(): boolean {
    return true;
  },
};
const bool: Boolean = boolLike;
```

プリミティブ型の代わりに、ラッパーオブジェクト型を型注釈に使う利点はありません。型注釈にはプリミティブ型を使いましょう。

```ts twoslash
// ❌間違い
const num1: Number = 0;
// ✅正しい
const num2: number = 0;
```

<TweetILearned>

・ボックス化とはプリミティブをオブジェクトに変換すること
・JavaScriptでプリミティブがオブジェクトのように扱えるのは、自動ボックス化のおかげ
・TypeScriptではラッパーオブジェクト(例:String)よりもプリミティブ型(例:string)で型注釈すべし

</TweetILearned>

## 関連情報

[プリミティブ型 (primitive types)](primitive-types.md)
