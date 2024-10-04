---
description: nullとundefinedを除外する
title: "NonNullable<T>"
---

`NonNullable<T>`は、ユニオン型`T`から`null`と`undefined`を取り除いたユニオン型を返すユーティリティ型です。

名前は`NonNullable`ですが`undefined`も取り除くことができます。

## NonNullable&lt;T>の型引数

### T

型引数`T`には、`null`と`undefined`を取り除きたいユニオン型を渡します。

## NonNullableの使用例

```ts twoslash
type String1 = NonNullable<string>;
//   ^?
type String2 = NonNullable<string | null>;
//   ^?
type String3 = NonNullable<string | undefined>;
//   ^?
type String4 = NonNullable<string | null | undefined>;
//   ^?
```

`NonNullable<null>`と`NonNullable<undefined>`は`never`型になります。

```ts twoslash
type Never1 = NonNullable<null>;
//   ^?
type Never2 = NonNullable<undefined>;
//   ^?
```
