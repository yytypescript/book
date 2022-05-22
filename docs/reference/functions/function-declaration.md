---
sidebar_label: 関数宣言
---

# 関数宣言 (function declaration)

関数宣言はJavaScriptで関数を定義する構文です。

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
