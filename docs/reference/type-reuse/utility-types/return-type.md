---
description: Lấy kiểu return value của function
title: "ReturnType<T>"
---

`ReturnType<T>` là utility type lấy return value của function type `T`.

## Type argument của ReturnType&lt;T>

### T

Type argument `T` nhận function type.

## Ví dụ sử dụng ReturnType

```ts twoslash
// @errors: 2344
type ReturnType1 = ReturnType<() => string>;
//   ^?
type ReturnType2 = ReturnType<(arg: string) => string | number>;
//   ^?
type ReturnType3 = ReturnType<() => never>;
//   ^?
```

Thường được sử dụng kết hợp với `typeof` để lấy return value của function thực tế:

```ts twoslash
const isEven = (num: number) => {
  return num / 2 === 0;
};

type isEvenRetType = ReturnType<typeof isEven>;
//   ^?
```

`ReturnType<T>` được implement nội bộ bằng `infer`:

```ts twoslash
// @noErrors
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```
