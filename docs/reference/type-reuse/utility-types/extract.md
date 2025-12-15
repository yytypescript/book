---
description: Trích xuất chỉ kiểu tùy ý
title: "Extract<T, U>"
---

`Extract<T, U>` là utility type trả về kiểu sau khi trích xuất chỉ kiểu được chỉ định trong `U` từ union type `T`.

## Type argument của Extract&lt;T, U>

### T

Type argument `T` nhận union type sẽ được trích xuất từ đó.

### U

Type argument `U` nhận kiểu muốn trích xuất.

## Ví dụ sử dụng Extract

```ts twoslash
type Grade = "A" | "B" | "C" | "D" | "E";
type FailGrade = Extract<Grade, "D" | "E">;
//   ^?
```

Extract cũng có thể được sử dụng để tìm phần giao của 2 union type:

```ts twoslash
type CommonTypes = Extract<"a" | "b" | "c", "b" | "c" | "d">;
//   ^?
```

## Thông tin liên quan

[Exclude&lt;T, U>](exclude.md)
