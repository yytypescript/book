---
sidebar_label: 関数宣言
---

# 関数宣言 (function declaration)

## 関数宣言構文

JavaScriptの関数宣言はfunction構文を使います。

```js twoslash
function hello() {
  return "hello";
}
```

## 関数宣言構文の型注釈

TypeScriptでは関数宣言の引数と戻り値に型注釈を書けます。

```ts twoslash
function increment(num: number): number {
  return num + 1;
}
```

引数の型注釈を省略した場合、コンパイラーは`any`型と暗黙的に解釈します。

```ts twoslash
// @noImplicitAny: false
function increment(num): number {
  //               ^?
  return num + 1;
}
```

コンパイラーオプションの`noImplicitAny`を`true`に設定することで、引数の型注釈を必須にできます。

```ts twoslash
// @noImplicitAny: true
// @errors: 7006
function increment(num): number {
  return num + 1;
}
```

[noImplicitAny](../tsconfig/noimplicitany.md)

次の例のように定義済みの関数プロパティに再代入する形で関数を上書きする場合は`button.onclick`の引数`event`の型が`MouseEvent`と定義されているため、その型情報から代入する関数の引数の型を省略しても、`event`の型を`MouseEvent`と推論してくれます。

```ts twoslash
// @errors: 2339
const button = document.createElement("button");
button.onclick = function (event) {
  //                       ^?
  console.log(event.target);
  console.log(event.hoge);
};
```

戻り値の型注釈を省略した場合、コンパイラーがコードから型推論します。

```ts twoslash
function increment(num: number) {
  return num + 1;
}
const value = increment(1);
//            ^?
```

`return`が複数あり違う型を返している場合推論される型はユニオン型になります。

```ts twoslash
function getFirst(items: number[]) {
  if (typeof items[0] === "number") {
    return items[0];
  }
  return null;
}

getFirst([1, 2, 3]);
// ^?
```
