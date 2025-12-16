---
sidebar_label: Type annotation của array
---

# Type annotation của array

Trong TypeScript có 2 cách để type annotation cho array.

## Type\[]

Cách đầu tiên là thêm `[]` sau kiểu của phần tử. Ví dụ, type annotation cho array kiểu number viết là `number[]`.

```ts twoslash
let array: number[];
array = [1, 2, 3];
```

## Array&lt;T>

Cách thứ hai là sử dụng `Array<T>`. `T` là kiểu của phần tử. Ví dụ, type annotation cho array kiểu number viết là `Array<number>`.

```ts twoslash
let array: Array<number>;
array = [1, 2, 3];
```

## Nên dùng Type\[] hay Array&lt;T>?

Type annotation cho array trong TypeScript có 2 cách là `Type[]` và `Array<T>`, nhưng sự khác biệt chỉ là cách viết. Ý nghĩa trong code, tức là nội dung kiểm tra của compiler, đều giống nhau. Do đó, việc chọn cách viết nào tùy thuộc vào sở thích của người viết. Tuy nhiên, trong project nên thống nhất sử dụng một cách viết.
