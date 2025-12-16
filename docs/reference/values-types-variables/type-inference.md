# Type inference trong khai báo biến

TypeScript có tính năng gọi là type inference (suy luận kiểu). Type inference là **tính năng cho phép compiler tự động xác định kiểu**. Lập trình viên có thể tận dụng type inference để bỏ qua type annotation, giảm lượng code cần viết.

```ts twoslash
// @errors: 2322
let x = 1; // Có nghĩa giống như let x: number = 1;
x = "hello";
```

Trong ví dụ trên, giá trị `1` được gán cho biến `x`. Tại thời điểm này, compiler tự động xác định kiểu của biến `x` là `number` từ giá trị được gán. Bạn có thể bỏ qua việc viết type annotation `x: number`.

Mặc dù không có type annotation được viết, `x` đã được suy luận là kiểu `number`, nên việc gán lại giá trị string `hello` cho `x` sẽ gây ra lỗi compile do không khớp kiểu.
