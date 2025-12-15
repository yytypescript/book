---
description: Loại bỏ null và undefined
title: "NonNullable<T>"
---

`NonNullable<T>` là utility type trả về union type sau khi loại bỏ `null` và `undefined` khỏi union type `T`.

Mặc dù tên là `NonNullable` nhưng cũng có thể loại bỏ `undefined`.

## Type argument của NonNullable&lt;T>

### T

Type argument `T` nhận union type muốn loại bỏ `null` và `undefined`.

## Ví dụ sử dụng NonNullable

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

`NonNullable<null>` và `NonNullable<undefined>` trở thành kiểu `never`:

```ts twoslash
type Never1 = NonNullable<null>;
//   ^?
type Never2 = NonNullable<undefined>;
//   ^?
```
