# typeof演算子 \(Typeof operator\)

JavaScriptの`typeof`演算子では値の型を調べることができます。

ここではJavaScriptのtypeof演算子を説明します。TypeScriptのtypeof型演算子については、typeof型演算子をご覧ください。

TODO: 「typeof型演算子」へリンクする。

```javascript
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

```javascript
// まずい実装
function isObject(value) {
  return typeof value === "object"; // valueがnullになる場合を考慮していない
}

isObject(null); // 戻り値がtrueになってしまう
```

`typeof null`を考慮した実装は次のようになります。

```javascript
function isObject(value) {
  return value !== null && typeof value === "object";
}
```

