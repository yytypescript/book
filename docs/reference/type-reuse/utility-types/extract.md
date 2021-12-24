---
description: 任意の型だけを抽出する
title: "Extract<T, U>"
---

`Extract<T, U>`は、ユニオン型`T`から`U`で指定した型だけを抽出した型を返すユーティリティ型です。

## Extract&lt;T, U>の型引数

### T

型引数`T`には、抽出されるほうのユニオン型を渡します。

### U

型引数`U`には、抽出したい型を渡します。

## Extractの使用例

```ts
type Grade = "A" | "B" | "C" | "D" | "E";
type FailGrade = Extract<Grade, "D" | "E">;
//=> "D" | "E"
```

Extractは2つのユニオン型の共通部分を導き出すことにも使えます。

```ts
type CommonTypes = Extract<"a" | "b" | "c", "b" | "c" | "d">;
// "b" | "c"
```

## 関連情報

[Exclude&lt;T, U>](exclude.md)
