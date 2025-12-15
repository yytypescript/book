# Companion Object Pattern

Trong TypeScript có một kỹ thuật cho phép đặt cùng tên cho cả value và type, và sử dụng cả hai mà không phân biệt. Điều này được gọi là companion object.
Điều này hữu ích khi bạn muốn có factory method và object giống như class nhưng không cần tạo class.

## Companion Object

Ví dụ sau là object `Rectangle` có method `from()` để tạo hình chữ nhật (Rectangle) và type `Rectangle` của object được tạo ra. Những tên này có thể được định nghĩa mà không xung đột, và khi gọi từ bên ngoài có thể sử dụng cùng tên.

Giả sử type và value (object có factory method) sau tồn tại trong cùng file `rectangle.ts`.

```ts twoslash
export type Rectangle = {
  height: number;
  width: number;
};

export const Rectangle = {
  from(height: number, width: number): Rectangle {
    return {
      height,
      width,
    };
  },
};
```

Định nghĩa cùng tên cho cả value và type. Hãy thử import từ bên ngoài.

```ts twoslash
// @filename: rectangle.ts
export type Rectangle = {
  height: number;
  width: number;
};

export const Rectangle = {
  from(height: number, width: number): Rectangle {
    return {
      height,
      width,
    };
  },
};
// @filename: index.ts
// ---cut---
import { Rectangle } from "./rectangle";

const rec: Rectangle = Rectangle.from(1, 3);

console.log(rec.height);
// @log: 1
console.log(rec.width);
// @log: 3
```

Như vậy, phần import chỉ có `Rectangle` nên dễ nhìn. Tham khảo, Rectangle trong `Rectangle.from()` là value, còn Rectangle trong `const rec: Rectangle` là type. Như vậy trong TypeScript có thể sử dụng đồng thời value và type cùng tên.
