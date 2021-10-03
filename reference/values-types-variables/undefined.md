# undefined型

JavaScriptのundefinedは未定義を表すプリミティブな値です。変数に値がセットされていないとき、戻り値が無い関数、オブジェクトに存在しないプロパティにアクセスしたとき、配列に存在しないインデックスでアクセスしたときなどに現れます。

```javascript
let name;
console.log(name); //=> undefined

function func() {}
console.log(func()); //=> undefined

const obj = {};
console.log(obj.name); //=> undefined

const arr = [];
console.log(arr[1]); //=> undefined
```

## undefinedリテラル

JavaScriptでは同じプリミティブ型でも、論理型や数値型がリテラルがあるのに対し、`undefined`にはリテラルはありません。実は`undefined`は変数です。グローバル定数のようなものと理解して構いません。

## undefinedの型注釈

TypeScriptでundefined型の型注釈を行うには、`undefined`を用います。

```typescript
const x: undefined = undefined;
```

戻り値のない関数は`undefined`になりますが、TypeScriptで戻り値なしを型注釈で表現する場合、`undefined`ではなく`void`を用います。詳しくは関数の説明をご覧ください。

{% page-ref page="../functions/void-type.md" %}

