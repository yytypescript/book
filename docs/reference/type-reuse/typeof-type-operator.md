# typeof type operator

`typeof` trong TypeScript là type operator trích xuất kiểu từ một biến. Ví dụ dưới đây sử dụng type operator `typeof` với biến `point` để định nghĩa kiểu `Point`:

```ts twoslash
const point = { x: 135, y: 35 };
type Point = typeof point;
//   ^?
```

Lưu ý rằng đây là typeof **type** operator của TypeScript. Mặc dù có cùng tên với typeof operator của JavaScript, nhưng chúng hoàn toàn khác nhau.

[typeof operator](../values-types-variables/typeof-operator.md)
