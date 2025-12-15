---
sidebar_label: Initializer cho field
---

# Initializer cho field (initializer)

Trong TypeScript, có thể chỉ định giá trị khởi tạo cho field của instance bằng initializer. Initializer được viết bên phải tên field là `= giá trị`. Initializer tự động thực thi khi class được instance hóa.

```ts twoslash
class Point {
  x: number = 0;
  y: number = 0;
}
const point = new Point();
console.log(point.x, point.y);
// @log: 0 0
```

Ví dụ trên sử dụng initializer có cùng ý nghĩa với việc khởi tạo field trong constructor như sau:

```ts twoslash
class Point {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}
```

## Initializer và type inference

Khi kiểu của giá trị trong initializer là rõ ràng, TypeScript compiler sẽ suy luận kiểu của field. Do đó, có thể bỏ qua type annotation cho field có initializer.

```ts twoslash
class Point {
  x = 0; // Được suy luận là kiểu number
}
```
