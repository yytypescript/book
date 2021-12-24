---
sidebar_label: typeof演算子
---

# typeof演算子 (typeof operator)

JavaScriptの`typeof`演算子では値の型を調べることができます。

```js
typeof true; //=> "boolean"
typeof 0; //=> "number"
typeof "Hello World"; //=> "string"
typeof undefined; //=> "undefined"
typeof null; //=> "object"
typeof Symbol(); //=> "symbol"
typeof 1n; //=> "bigint"
typeof [1, 2, 3]; //=> "object"
typeof { a: 1, b: 2 }; //=> "object"
```

`typeof`演算子で特筆すべきなのは、値が`null`の場合です。`typeof null`の演算結果は`"null"`ではなく`"object"`です。誤解が起きやすい部分なので注意しましょう。特に値がオブジェクトかどうかを判定したいときは、`typeof null`が`"object"`になることを意識して書かないと思いがけない不具合になることがあります。

```js
// まずい実装
function isObject(value) {
  return typeof value === "object"; // valueがnullになる場合を考慮していない
}

isObject(null); // 戻り値がtrueになってしまう
```

`typeof null`を考慮した実装は次のようになります。

```js
function isObject(value) {
  return value !== null && typeof value === "object";
}
```

ここで説明したのはJavaScriptのtypeof演算子です。TypeScriptのtypeof型演算子については、typeof型演算子の説明をご覧ください。

[typeof型演算子](../type-reuse/typeof-type-operator.md)
