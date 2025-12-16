---
sidebar_label: Type annotation trong khai báo biến
---

# Type annotation trong khai báo biến

Trong TypeScript, khi khai báo biến, bạn có thể chỉ định giá trị nào có thể được gán cho biến đó. Chỉ định này được gọi là type annotation (chú thích kiểu). Type annotation trong khai báo biến được viết bằng cách đặt kiểu ở bên phải tên biến như sau:

```ts twoslash
const num: number = 123;
//       ^^^^^^^^ Type annotation
```

Các ngôn ngữ như Java cũng cho phép khai báo kiểu cho biến, nhưng vị trí viết tên biến và kiểu là ngược lại. Nếu bạn quen với các ngôn ngữ này, hãy lưu ý điểm khác biệt.

```java
Int num = 123; // Java
```
