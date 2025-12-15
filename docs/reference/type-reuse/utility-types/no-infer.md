---
description: Ngăn chặn type inference
title: NoInfer<T>
---

`NoInfer<T>` là utility type để ngăn chặn type inference của `T`.

## Type argument của NoInfer&lt;T>

### T

Type argument `T` nhận kiểu muốn ngăn chặn inference.

## Ví dụ sử dụng NoInfer

Trước tiên là ví dụ không sử dụng NoInfer. Định nghĩa function `getIndexFromArray` sử dụng generics:

```ts
function getIndexFromArray<T extends string>(elements: T[], item: T): number {
  return elements.findIndex((element) => element === item);
}

type Fruit = "grape" | "apple" | "banana";
const fruits: Fruit[] = ["grape", "apple", "banana"];
getIndexFromArray(fruits, "apple");
getIndexFromArray(fruits, "peach");
```

Khi đó `T` bị suy luận là `"grape" | "apple" | "banana" | "peach"`. Tuy nhiên, chúng ta chỉ muốn cho phép các phần tử có trong mảng làm argument thứ 2. Do đó, bằng cách sử dụng `NoInfer`, có thể ngăn chặn type inference của `T`.

```ts twoslash
function getIndexFromArray<T extends string>(
  elements: T[],
  item: NoInfer<T>
): number {
  return elements.findIndex((element) => element === item);
}

type Fruit = "grape" | "apple" | "banana";
const fruits: Fruit[] = ["grape", "apple", "banana"];
getIndexFromArray(fruits, "apple");
// @errors: 2345
getIndexFromArray(fruits, "peach");
```

## Thông tin liên quan

[Type Inference](../../values-types-variables/type-inference.md)
