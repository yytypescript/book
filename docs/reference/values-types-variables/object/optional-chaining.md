---
sidebar_label: オプショナルチェーン
---

# オプショナルチェーン (optional chaining)

JavaScriptのオプショナルチェーン`?.`は、オブジェクトのプロパティが存在しない場合でも、エラーを起こさずにプロパティを参照できる安全な方法です。

## プロパティ参照がエラーになる問題

JavaScriptでは`null`や`undefined`のプロパティを参照するとエラーが発生します。

```js twoslash
const book = undefined;
const title = book.title;
// @error: TypeError: Cannot read property 'title' of undefined

const author = null;
const email = author.email;
// @error: TypeError: Cannot read property 'email' of null
```

エラーを避けるには、値が`null`や`undefined`でないかチェックする必要があります。

```js twoslash
const book = undefined;
const title = book === null || book === undefined ? undefined : book.title;
console.log(title);
// @log: undefined

const book = { title: "サバイバルTypeScript" };
const title = book === null || book === undefined ? undefined : book.title;
console.log(title);
// @log: "サバイバルTypeScript"
```

ネストしたオブジェクトの場合、チェック処理はいっそう複雑になってきます。

```js twoslash
const book = { author: { email: "alice@example.com" } };
const authorEmail =
  book === null || book === undefined
    ? undefined
    : book.author === null || book.author === undefined
    ? undefined
    : book.author.email;
```

チェックすればエラーなく動きますが、記述量が多くなるという課題もあります。

## オプショナルチェーン

JavaScriptのオプショナルチェーンは`null`や`undefined`のプロパティを誤って参照しないようにしつつ、記述量を抑えられる書き方です。オプショナルチェーンは`?.`演算子を用いて書きます。

```js twoslash
const book = undefined;
const title = book?.title;
//                ^^オプショナルチェーン
console.log(title);
// @log: undefined

const book = { title: "サバイバルTypeScript" };
const title = book?.title;
console.log(title);
// @log: "サバイバルTypeScript"
```

オプショナルチェーンはネストして使うこともできます。

```js twoslash
const book = undefined;
const authorEmail = book?.author?.email;
console.log(authorEmail);
// @log: undefined

const book = { author: { email: "alice@example.com" } };
const authorEmail = book?.author?.email;
console.log(authorEmail);
// @log: "alice@example.com"
```

もしも`?.`に先行する変数やプロパティの値が`null`または`undefined`のときは、その先のプロパティは評価されず、`undefined`が返ります。

```js twoslash
const book = null;
console.log(book?.title);
// @log: undefined

const book = { author: null };
console.log(book.author?.name);
// @log: undefined
```

## 関数呼び出し

関数を呼び出すときにもオプショナルチェーンが使えます。関数に使う場合は、引数カッコの前に`?.`を書きます。

```js twoslash
const increment = undefined;
const result = increment?.(1);
console.log(result);
// @log: undefined

const increment = (n) => n + 1;
const result = increment?.(1);
console.log(result);
// @log: 2
```

メソッドを呼び出すときも同様の書き方です。

```js twoslash
const book = { getPrice: undefined };
console.log(book.getPrice?.());
// @log: undefined

const book = {
  getPrice() {
    return 0;
  },
};
console.log(book.getPrice?.());
// @log: 0
```

## 配列要素の参照

配列要素を参照する際にもオプショナルチェーンが使えます。要素を参照する場合は、カギカッコの前に`?.`を書きます。

```js twoslash
const books = undefined;
const title = books?.[0];
console.log(title);
// @log: undefined

const books = ["サバイバルTypeScript"];
const title = books?.[0];
console.log(title);
// @log: "サバイバルTypeScript"
```

## TypeScriptでの型

TypeScriptでオプショナルチェーンを使った場合、得られる値の型は、最後のプロパティの型と`undefined`のユニオン型になります。

```ts twoslash
let book: undefined | { title: string };
const title = book?.title;
//    ^?
```

## TypeScriptのコンパイル結果

TypeScriptのコンパイラーオプション`target`が`es2020`以上のときは、オプショナルチェーンはそのままJavaScriptにコンパイルされます。

```ts twoslash
// @target: es2020
// @showEmit
let book: undefined | { title: string };
// ---cut---
const title = book?.title;
// ---cut-after---
```

`target`が`es2019`以前の場合は、次のような三項演算子を用いたコードにコンパイルされます。

```ts twoslash
// @target: es2019
// @showEmit
let book: undefined | { title: string };
// ---cut---
const title = book?.title;
// ---cut-after---
```

## Null合体演算子と組み合わせる

オプショナルチェーンが`undefined`を返したときに、デフォルト値を代入したい場合があります。その際には、Null合体演算子`??`を用いると便利です。

```js twoslash
const book = undefined;
const title = book?.title ?? "デフォルトタイトル";
console.log(title);
// @log: "デフォルトタイトル"
```

<TweetILearned>

・JavaScriptのオプショナルチェーン?.は安全にプロパティを参照する方法
・値がnullかundefinedのときundefinedが返る
・a?.b?.cのようにネストも可能
・関数は?.()
・配列は?.[]
・TypeScriptでは値の型とundefinedのユニオン型になる
・Null合体演算子と相性がいい

</TweetILearned>

## 関連情報

[配列要素へのアクセス](../array/how-to-access-elements-in-an-array.md)

[三項演算子 (ternary operator)](../../statements/ternary-operator.md)
