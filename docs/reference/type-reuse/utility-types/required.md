---
description: Biến tất cả property thành bắt buộc
title: Required<T>
---

`Required<T>` là utility type loại bỏ `?` (nghĩa là optional) khỏi tất cả các property của `T`.

## Type argument của Required&lt;T>

### T

Type argument `T` nhận kiểu biểu diễn object type.

## Ví dụ sử dụng Required

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type RequiredPerson = Required<Person>;
//    ^?
```

`RequiredPerson` ở trên sẽ giống với kiểu sau:

```ts twoslash
type RequiredPerson = {
  surname: string;
  middleName: string;
  givenName: string;
};
```

## Implementation của Required

`Required<T>` được implement như sau:

```ts twoslash
// @noErrors: 2300
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

So sánh với `Partial<T>` sẽ thấy sự khác biệt:

```ts twoslash
// @noErrors: 2300
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

Phần khác nhau là `-?` và `?`. `?` là optional modifier, làm cho property trở thành optional. `-?` có nghĩa là loại bỏ optional modifier. Do đó, `Required<T>` tạo ra kiểu với `?` (nghĩa là optional) bị loại bỏ khỏi tất cả các property của `T`.
Dấu `-` này được gọi là mapping modifier.

## Thông tin liên quan

[Partial&lt;T>](partial.md)

[Mapped Types](../mapped-types.md)
