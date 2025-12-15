---
sidebar_label: Distributive Conditional Types
---

# Distributive Conditional Types

Distributive Conditional Types (có thể được gọi là kiểu điều kiện phân phối, phân phối union type, v.v.) chỉ tính chất khi [Conditional Types](./README.md) được áp dụng cho [generic type](../../generics/README.md) và type argument là [union type](../../values-types-variables/union.md), thì điều kiện sẽ được áp dụng riêng lẻ (= phân phối) cho từng thành viên cấu thành union type đó.

Ví dụ, có kiểu như sau:

```ts twoslash
type ToArray<T> = T extends any ? T[] : never;
```

Khi đó `ToArray<number>` là `number[]`, `ToArray<string>` là `string[]`, nhưng khi truyền union type `number | string` cho `T`, kết quả sẽ như sau:

```ts twoslash
type ToArray<T> = T extends any ? T[] : never;
// ---cut---
type NumOrStrArray = ToArray<number | string>;
//    ^?
```

Kiểu này được giải quyết theo luồng như sau:

1. Conditional Types được áp dụng cho generic type và union type (`number | string`) được truyền vào, nên đáp ứng điều kiện phân phối.

   ```ts twoslash
   type ToArray<T> = T extends any ? T[] : never;

   type NumOrStrArray = ToArray<number | string>;
   ```

2. `ToArray` được phân phối cho từng phần tử riêng lẻ của union.

   ```ts twoslash
   type ToArray<T> = T extends any ? T[] : never;
   // ---cut---

   type NumOrStrArray = ToArray<number> | ToArray<string>;
   ```

3. Mỗi phần tử trở thành `number[]` và `string[]`, cuối cùng nhận được kiểu `number[] | string[]`.

   ```ts twoslash
   type NumOrStrArray = number[] | string[];
   ```

Tính chất này chỉ xảy ra khi generics được sử dụng trong Conditional Types. Ví dụ, với type alias như sau, phân phối không xảy ra:

```ts twoslash
type ToArray2<T> = T[];

type NumOrStrArray2 = ToArray2<number | string>;
//     ^?
```

Việc phân phối có xảy ra hay không tạo ra sự khác biệt như sau, nên hãy sử dụng phù hợp với mục đích:

```ts twoslash
type ToArray<T> = T extends any ? T[] : never;
type NumOrStrArray = ToArray<number | string>;
type ToArray2<T> = T[];
type NumOrStrArray2 = ToArray2<number | string>;
// ---cut---
// 分配有り
let numOrStrArray: ToArray<number | string> = [1, 2, 3]; // OK
numOrStrArray = ["a", "b", "c"]; // OK
// @errors: 2322
numOrStrArray = [1, 2, "a"]; // NG
// 分配無し
let numOrStrArray2: ToArray2<number | string> = [1, 2, 3]; // OK
numOrStrArray2 = ["a", "b", "c"]; // OK
numOrStrArray2 = [1, 2, "a"]; // OK
```

## Cách ngăn chặn phân phối

Nếu muốn sử dụng Conditional Types nhưng không muốn phân phối, bạn có thể tránh phân phối bằng cách bao type variable trong `[]`.

```ts twoslash
type NotDistribute<T> = [T] extends [string] ? true : false;
```

Kiểu `NotDistribute` này trả về `true` với kiểu `string`, nhưng trả về `false` với kiểu `string | number`. Bởi vì kiểu `string | number` không phải là subtype của kiểu `string` (tức là `string | number extends string` là false), nên `false` được trả về.

```ts twoslash
type NotDistribute<T> = [T] extends [string] ? true : false;
// ---cut---
type A = NotDistribute<string>;
//   ^?
type B = NotDistribute<number>;
//   ^?
type C = NotDistribute<string | number>;
//   ^?
```
