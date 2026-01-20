---
description: 関数の戻り値の型を取得する
title: "ReturnType<T>"
---

`ReturnType<T>`は、関数型`T`の戻り値を取得するユーティリティ型です。

## ReturnType&lt;T>の型引数

### T

型引数`T`には、関数の型を渡します。

## ReturnTypeの使用例

```ts twoslash
// @errors: 2344
type ReturnType1 = ReturnType<() => string>;
//   ^?
type ReturnType2 = ReturnType<(arg: string) => string | number>;
//   ^?
type ReturnType3 = ReturnType<() => never>;
//   ^?
```

多くは`typeof`と併用して実際の関数の戻り値を取得します。

```ts twoslash
const isEven = (num: number) => {
  return num / 2 === 0;
};

type isEvenRetType = ReturnType<typeof isEven>;
//   ^?
```

`ReturnType<T>`は内部的には[`infer`](../conditional-types/infer.md)を使って実装されています。

```ts twoslash
// @noErrors
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```
