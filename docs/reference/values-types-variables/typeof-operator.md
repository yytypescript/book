---
sidebar_label: typeof演算子
---

# typeof演算子 (typeof operator)

JavaScriptの`typeof`演算子では値の型を調べることができます。

```js twoslash
typeof true; //=> "boolean"
typeof 0; //=> "number"
typeof "Hello World"; //=> "string"
typeof undefined; //=> "undefined"
typeof null; //=> "object"
typeof Symbol(); //=> "symbol"
typeof 1n; //=> "bigint"
typeof [1, 2, 3]; //=> "object"
typeof { a: 1, b: 2 }; //=> "object"
typeof (() => {}); //=> "function"
```

## TypeScriptで`typeof`を使うとifやswicthでその型として使うことができる

TypeScriptでは`typeof`演算子をifやswitchと併せてつかうと、条件と合致したときにその変数をその型として扱えるようになります。次の例は`unknown`型とされた変数`n`が`typeof`演算子によって`string`型であると判別された例です。

```ts twoslash
// @noErrors
const n: unknown = "";

if (typeof n === "string") {
  n.toU;
  //   ^|
}
```

## `null`を判別する

`typeof`演算子で特筆すべきなのは、値が`null`の場合です。`typeof null`の演算結果は`"null"`ではなく`"object"`です。誤解が起きやすい部分ですので注意しましょう。特に値がオブジェクトかどうかを判定したいときは、`typeof null`が`"object"`になることを意識して書かないと思いがけない不具合になることがあります。

```js twoslash
// まずい実装
function isObject(value) {
  return typeof value === "object"; // valueがnullになる場合を考慮していない
}

isObject(null); // 戻り値がtrueになってしまう
```

`typeof null`を考慮した実装は次のようになります。

```js twoslash
function isObject(value) {
  return value !== null && typeof value === "object";
}
```

ここで説明したのはJavaScriptのtypeof演算子です。TypeScriptのtypeof型演算子については、typeof型演算子の説明をご覧ください。

[typeof型演算子](../type-reuse/typeof-type-operator.md)

## 配列を判別する

上記例にもあるとおり、配列を`typeof`にかけると`"object"`となります。これは不具合でもなんでもなく、配列はオブジェクトであるのでそのように判別されます。

とはいえそれが配列かどうかを判別する機会は多いため、専用に`Array.isArray()`というメソッドが`Array`オブジェクトにあります。

`Array.isArray()`を使ってtrueの戻り値が帰ってきた場合、その変数は`any[]`型であると判別されます。

```ts twoslash
const n: unknown = [];

// ---cut---
if (Array.isArray(n)) {
  // n is any[]
}
```

`any[]`型を任意の型の配列として判別したい場合は各要素に対して`typeof`や`Array.isArray()`など型を調べる関数を使います。

[unknown](../statements/unknown.md)

[型ガード](../functions/type-guard-functions.md)
