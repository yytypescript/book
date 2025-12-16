---
sidebar_label: Index signature
---

# Index signature

Trong TypeScript, có trường hợp muốn chỉ định type của property mà không chỉ định tên field của object. Lúc này có thể sử dụng index signature. Ví dụ, object có tất cả property là type `number` được type annotation như sau.

```ts twoslash
let obj: {
  [K: string]: number;
};
```

Phần biểu thị tên field là `[K: string]`. `K` ở đây là type variable. Có thể đặt tên type variable tùy ý. Thường dùng `K` hoặc `key`. Phần `string` biểu thị type của tên field. Type của tên field trong index signature chỉ có thể chỉ định `string`, `number`, `symbol`.

Với object có index signature, có thể gán property mà tên field chưa được định nghĩa. Ví dụ, với index signature `{ [K: string]: number }`, nếu value là type number, có thể gán vào các field chưa định nghĩa như `a`, `b`.

```ts twoslash
let obj: {
  [K: string]: number;
};

obj = { a: 1, b: 2 }; // OK
obj.c = 4; // OK
obj["d"] = 5; // OK
```

Khi bật compiler option `noUncheckedIndexedAccess`, với index signature, type của property tự động trở thành union type của type chỉ định và undefined. Điều này để biểu thị chính xác rằng khi property không tồn tại, giá trị sẽ là `undefined`.

```ts twoslash
const obj: { [K: string]: number } = { a: 1 };
const b: number | undefined = obj.b;
console.log(b);
// @log: undefined
```

[noUncheckedIndexedAccess](../../tsconfig/nouncheckedindexedaccess.md)

## Index signature sử dụng Record&lt;K, T>

Index signature cũng có thể biểu thị bằng utility type `Record<K, T>`. Hai type annotation sau có cùng ý nghĩa.

```ts twoslash
let obj1: { [K: string]: number };
let obj2: Record<string, number>;
```

[Record&lt;Keys, Type>](../../type-reuse/utility-types/record.md)

## Thông tin liên quan

[Mapped Types](../../type-reuse/mapped-types.md)
