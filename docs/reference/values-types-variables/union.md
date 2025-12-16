---
sidebar_label: Union type
---

# Union type (kiểu hợp)

Union type trong TypeScript là cách biểu diễn "một trong các kiểu".

## Type annotation của union type

Type annotation của union type được viết bằng cách nối 2 kiểu trở lên bằng ký hiệu pipe (`|`). Ví dụ, để biểu diễn kiểu number hoặc kiểu undefined, viết `number | undefined`.

```ts twoslash
let numberOrUndefined: number | undefined;
```

`|` cũng có thể đặt ở đầu danh sách kiểu. Tiện lợi khi xuống dòng theo từng kiểu vì các cột được căn thẳng hàng.

<!--prettier-ignore-->
```ts twoslash
type ErrorCode =
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405;
```

## Cách viết khi dùng union type cho phần tử mảng

Khi dùng union type làm phần tử mảng, cần chú ý cách viết. Ví dụ, hãy xem xét việc khai báo kiểu mảng gồm `string` hoặc `number`. Biểu diễn `string` hoặc `number` bằng union type là `string | number`. Kiểu mảng được biểu diễn bằng cách thêm `[]` vào kiểu phần tử. Nếu nối trực tiếp, có thể nghĩ đến kiểu sau, nhưng đây là sai.

```ts twoslash
type List = string | number[];
```

Vì điều này có nghĩa là kiểu `string` hoặc kiểu `number[]`. Cách viết đúng như sau. Đặc biệt khi viết mảng dạng `T[]`, cần `()` nên hãy chú ý.

```ts twoslash
type List = (string | number)[];
```

## Union type và narrowing

Khi muốn xác định union type `string | null` là `string` hay `null`, sử dụng narrowing (thu hẹp) của TypeScript. Có nhiều cách để thu hẹp, ví dụ điển hình là câu lệnh if. Khi kiểm tra biến có phải kiểu string hay không trong điều kiện phân nhánh, cùng một biến trong nhánh đó sẽ được xác định là kiểu `string` thay vì `string | null`.

```ts twoslash
// @errors: 2322
const maybeUserId: string | null = localStorage.getItem("userId");

const userId: string = maybeUserId; // Có thể là null nên không thể gán.

if (typeof maybeUserId === "string") {
  const userId: string = maybeUserId; // Trong nhánh này đã được thu hẹp thành kiểu string nên có thể gán.
}
```

[Thu hẹp kiểu bằng control flow analysis và type guard](../statements/control-flow-analysis-and-type-guard.md)

## Thông tin liên quan

[Discriminated union](discriminated-union.md)
