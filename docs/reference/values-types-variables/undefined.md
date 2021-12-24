# undefined型

JavaScriptのundefinedは未定義を表すプリミティブな値です。変数に値がセットされていないとき、戻り値が無い関数、オブジェクトに存在しないプロパティにアクセスしたとき、配列に存在しないインデックスでアクセスしたときなどに現れます。

```js twoslash
let name;
console.log(name);
// @log: undefined

function func() {}
console.log(func());
// @log: undefined

const obj = {};
console.log(obj.name);
// @log: undefined

const arr = [];
console.log(arr[1]);
// @log: undefined
```

## undefinedリテラル

JavaScriptでは同じプリミティブ型でも、論理型や数値型がリテラルがあるのに対し、`undefined`にはリテラルはありません。実は`undefined`は変数です。グローバル定数のようなものと理解して構いません。

## undefinedの型注釈

TypeScriptでundefined型の型注釈を行うには、`undefined`を用います。

```ts
const x: undefined = undefined;
```

戻り値のない関数は`undefined`になりますが、TypeScriptで戻り値なしを型注釈で表現する場合、`undefined`ではなく`void`を用います。詳しくは関数の説明をご覧ください。

[戻り値がない関数とvoid型 (void type)](../functions/void-type.md)
