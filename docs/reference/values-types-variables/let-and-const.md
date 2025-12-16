# Khai báo biến: let và const

Variable declaration trong JavaScript có `let` và `const`.

## Khai báo biến với let

Cách viết khai báo biến bằng `let` như sau.

```ts twoslash
let x = 1;
```

`let` cho phép gán lại giá trị.

```ts twoslash
let x = 1;
x = 2; // Có thể gán lại
```

`let` có thể định nghĩa biến không có giá trị khởi tạo. Giá trị của biến không có giá trị khởi tạo là `undefined`.

```js twoslash
let x; // Không có giá trị khởi tạo
x = 1; // Gán sau
```

## Khai báo biến với const

Cách viết khai báo biến bằng `const` như sau. Giá trị khởi tạo là bắt buộc.

```js twoslash
const y = 2;
```

`const` không cho phép gán lại giá trị cho biến.

```js twoslash
const y = 1;
y = 1;
// @error: TypeError: Assignment to constant variable.
```

## Phân biệt cách dùng let và const

Khi lần đầu viết JavaScript, có thể phân vân nên dùng `let` hay `const` để khai báo biến. Khuyến nghị là cơ bản dùng `const` để khai báo biến, chỉ dùng `let` khi cần thiết. Khai báo biến bằng `const` ngăn chặn việc gán lại, tránh việc biến bị thay đổi ngoài ý muốn, giúp code an toàn hơn.

<PostILearned>

・Variable declaration trong JavaScript có let và const
・let cho phép gán lại, const không cho phép gán lại
・Cơ bản nên dùng const

</PostILearned>

## const không bảo vệ mutable object

const chỉ khai báo tên biến không thể gán lại. const không có hiệu quả bảo vệ khiến property của mutable object trở nên immutable. Điểm này thường bị hiểu lầm.

Ví dụ, khi khai báo object bằng const, không thể gán lại cho bản thân biến. Tuy nhiên có thể thay đổi object property.

```ts twoslash
// @errors: 2588
const obj = { a: 1 };
obj = { a: 2 }; // Không thể gán lại
obj.a = 2; // Có thể thay đổi property
```

Để làm object immutable trong TypeScript, cần đặt property thành read-only.

[readonly property](./object/readonly-property.md)

Array cũng là một loại object nên tương tự. Không thể gán lại cho bản thân biến. Tuy nhiên có thể thay đổi element của array.

```ts twoslash
// @errors: 2588
const arr = [1, 2];
arr = [3, 4]; // Không thể gán lại
arr.push(3); // Có thể thay đổi element
```

Để làm array immutable trong TypeScript cần dùng read-only array.

[Read-only array](./array/readonly-array.md)

Cũng có phương pháp làm object hoặc array immutable bằng const assertion.

[const assertion](./const-assertion.md)
