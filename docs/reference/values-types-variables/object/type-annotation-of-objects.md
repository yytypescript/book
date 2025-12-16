---
sidebar_label: Type annotation của object
---

# Type annotation của object

Trong TypeScript, type annotation của object được viết giống như JavaScript object literal, với cặp key và type của value cho từng property.

```ts twoslash
let box: { width: number; height: number };
//       ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^Type annotation
box = { width: 1080, height: 720 };
```

Khi có type annotation cho object, compiler sẽ cảnh báo nếu có lỗi về type.

```ts twoslash
// @errors: 2322 2741
let box: { width: number; height: number };
// Nhầm gán string cho property
box = { width: "1080", height: 720 };
// Quên chỉ định height
box = { width: 1080 };
```

Ký tự phân cách property có thể dùng dấu phẩy `,` như object literal, nhưng khuyến nghị dùng dấu chấm phẩy `;`. Lý do là công cụ format code [Prettier](/tutorials/prettier) sẽ thay thế dấu phẩy bằng dấu chấm phẩy khi sửa type annotation của object.

Type annotation của object có thể xuống dòng. Khi xuống dòng, ký tự phân cách property có thể bỏ qua.

```ts twoslash
let box: {
  width: number;
  height: number;
};
box = { width: 1080, height: 720 };
```

Thay vì type annotation inline, cũng có thể sử dụng type alias.

```ts twoslash
// Type alias
type Box = { width: number; height: number };
let box: Box = { width: 1080, height: 720 };
//       ^^^Type annotation
```

[Type alias](../type-alias.md)

## Type annotation của method

Type annotation của object cũng có thể viết type annotation cho method. Cách viết giống như method syntax của JavaScript với thêm type annotation cho argument và return value.

```ts twoslash
let calculator: {
  sum(x: number, y: number): number;
};

calculator = {
  sum(x, y) {
    return x + y;
  },
};
```

Type annotation của method cũng có thể viết theo function syntax.

```ts twoslash
let calculator: {
  sum: (x: number, y: number) => number;
};
```

Type annotation theo method syntax và function syntax về cơ bản có cùng ý nghĩa, nhưng khi bật compiler option `strictFunctionTypes`, cách viết function syntax sẽ làm việc kiểm tra argument của method nghiêm ngặt hơn, chuyển từ bivariant sang covariant. Chi tiết xem phần giải thích `strictFunctionTypes`.

[strictFunctionTypes](../../tsconfig/strictfunctiontypes.md)

## Type inference của object

Khi gán giá trị object trong khai báo biến, có thể bỏ qua type annotation. Type sẽ được tự động xác định từ giá trị. Đây gọi là type inference.

```ts twoslash
let box = { width: 1080, height: 720 };
//  ^?
```

Type inference cũng hoạt động với object literal có method. Tuy nhiên, với method cần type annotation cho argument.

```ts twoslash
let calculator = {
  sum(x: number, y: number) {
    return x + y;
  },
};
calculator;
// ^?
```

## `Record<Keys, Type>`

Khi định nghĩa type của object key-value giống như associative array, có thể sử dụng utility type `Record`.

```ts twoslash
let foo: Record<string, number>;
foo = { a: 1, b: 2 };
```

[Record](../../type-reuse/utility-types/record.md)

## `object` type

Type annotation của object cũng có thể sử dụng `object` type.

```ts twoslash
let box: object;
box = { width: 1080, height: 720 };
```

Không khuyến nghị sử dụng `object` type. Lý do thứ nhất là `object` type không có thông tin về property nào tồn tại. Do đó, tham chiếu `box.width` sẽ báo compile error.

```ts twoslash
// @errors: 2339
let box: object;
box = { width: 1080, height: 720 };
// ---cut---
box.width;
```

Lý do thứ hai là có thể gán bất kỳ object nào. Có thể gán cả giá trị không mong đợi, khiến khó phát hiện vấn đề trong code.

```ts twoslash
let box: object;
box = { wtdih: 1080, hihget: 720 }; // Lỗi chính tả
```

Khi type annotation cho object, khuyến nghị không sử dụng `object` type mà nên định nghĩa type đến từng property.

<PostILearned>

・Trong TypeScript, type annotation cho object là định nghĩa type cho từng property key
Ví dụ: { width: number; height: number}
・Khi gán object cho biến, type inference hoạt động
・Về mặt an toàn, nên tránh sử dụng object type

</PostILearned>

## Thông tin liên quan

[Sự khác biệt giữa object, Object, {}](./difference-among-object-and-object.md)

[Interface](/reference/object-oriented/interface)
