---
sidebar_label: 関数宣言と巻き上げ
---

# 関数宣言と巻き上げ (hoisting)

JavaScriptの関数宣言と関数式の違いが現れるひとつの例は巻き上げ(hoisting)です。関数宣言には巻き上げがあり、関数式には巻き上げがありません。

まずは関数宣言の例を見てみましょう。次のコードは、3行目に`hello`関数の関数宣言があります。そして、その宣言の前で`hello`関数を実行しています。

```js
hello();

function hello() {
  console.log("Hello World");
}
```

このコードは、`hello`関数の定義行より前でその関数を呼び出しているのに、エラーにはならず問題なく"Hello World"が出力されます。これは関数宣言には巻き上げがあるためです。

次に関数式の例を見てみましょう。下のコードは`hello`関数を関数式を使って定義するようにしたものです。

```js
hello();

const hello = function () {
  console.log("Hello World");
};
```

このコードをJavaScriptとして実行してみると、1行目で「ReferenceError: Cannot access 'hello' before initialization」というエラーが起こります。関数式で関数を定義した場合は巻き上げがないため、このようなエラーが発生します。

以上のように、関数宣言と関数式には巻き上げの有無の違いがあります。関数式の場合は、関数定義と実行の順番を意識する必要が出てくるわけです。

TypeScriptでは、定義前の関数を呼び出そうとするとコンパイラーが指摘してくれます。

```ts twoslash
hello();
// @errors: 2448 2454

const hello = function () {};
```
