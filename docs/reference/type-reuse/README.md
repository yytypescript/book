---
slug: /reference/type-reuse
---

# Tái sử dụng kiểu

TypeScript có khả năng tạo ra kiểu mới từ kiểu đã có. Trong tài liệu này, chúng ta gọi việc sử dụng lại kiểu hiện có để tạo ra kiểu mới là "tái sử dụng kiểu".

## Khái niệm tái sử dụng kiểu

Trong nhiều ngôn ngữ lập trình, bạn có thể xử lý biến để tạo ra biến khác. Ví dụ, khi cần mảng các key của một object, bạn có thể khai báo riêng mảng key đó. Tuy nhiên, việc trích xuất key từ object sẽ tạo ra code dễ bảo trì hơn khi có thay đổi.

```ts twoslash
const obj = { a: 1, b: 2, c: 3 };
const keys1 = ["a", "b", "c"];
const keys2 = Object.keys(obj); // Dễ bảo trì hơn keys1
```

Đây là ví dụ về tái sử dụng biến. TypeScript cung cấp phiên bản kiểu của việc tái sử dụng biến này, đó chính là tái sử dụng kiểu. Ví dụ, bạn có thể trích xuất kiểu của các key từ kiểu của một object.

```ts twoslash
type Obj = { a: string; b: string; c: string };
type Keys = keyof Obj;
//=> "a" | "b" | "c"
```

Tái sử dụng kiểu chính là phép ẩn dụ của việc tái sử dụng biến.
