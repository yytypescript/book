# Câu lệnh if-else

Trong JavaScript, điều kiện phân nhánh sử dụng cú pháp if-else giống như Java hoặc PHP.

```js twoslash
if (value === 0) {
  // ...
} else {
  // ...
}
```

JavaScript cũng có else-if. Cần có khoảng trắng giữa else và if như `else if`.

```js twoslash
if (value === 0) {
  // ...
} else if (value === 1) {
  // ...
} else {
  // ...
}
```

if-else trong JavaScript là câu lệnh (statement), không phải biểu thức (expression), nên không thể gán trực tiếp điều kiện phân nhánh cho biến.

```js
// Không thể viết như thế này
const result = if (value === 0) "OK" else "NG";
```

Nếu muốn sử dụng điều kiện phân nhánh dưới dạng biểu thức, sử dụng toán tử ba ngôi (ternary operator).

```js twoslash
const result = value === 0 ? "OK" : "NG";
```

[Toán tử ba ngôi (ternary operator)](ternary-operator.md)

Nếu viết logic tương tự đoạn code trên bằng if-else, cần khai báo biến để gán kết quả bằng `let` trước block `if`.

```js twoslash
let result;
if (value === 0) {
  result = "OK";
} else {
  result = "NG";
}
```

## Thông tin liên quan

[Câu lệnh switch](switch.md)
