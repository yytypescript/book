---
description: 型推論を防ぐ
title: NoInfer<T>
---

`NoInfer<T>`は、`T`の型推論を防ぐためのユーティリティ型です。

## NoInfer&lt;T>の型引数

### T

型引数`T`には推論を防ぎたい型を代入します。

## NoInferの使用例

まずはNoInferを使用しなかった場合の例です。ジェネリクスを使って`getElementFromArray`という関数を定義します

```ts
function getElementFromArray<T extends string>(elements: T[], item: T): number {
  return elements.findIndex((element) => element === item);
}

type Fruit = "grape" | "apple" | "banana";
const fruits: Fruit[] = ["grape", "apple", "banana"];
getElementFromArray(fruits, "apple");
getElementFromArray(fruits, "peach");
```

上の例だと`getElementFromArray`の第二引数には配列に含まれていない`peach`という文字列を指定することができてしまいます。しかし配列に含まれている要素のみを許容したいです。そこで`NoInfer`を利用することにより`T`の型推論を防ぐことができます。

```ts twoslash
function getElementFromArray<T extends string>(
  elements: T[],
  item: NoInfer<T>
): number {
  return elements.findIndex((element) => element === item);
}

type Fruit = "grape" | "apple" | "banana";
const fruits: Fruit[] = ["grape", "apple", "banana"];
getElementFromArray(fruits, "apple");
// @errors: 2345
getElementFromArray(fruits, "peach");
```

## 関連情報

[Infer](../../values-types-variables/type-inference.md)
