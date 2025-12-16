---
sidebar_label: Rest parameter
---

# Rest parameter (tham số còn lại / tham số có độ dài thay đổi)

Function thông thường có số lượng tham số cố định. Trong JavaScript, bạn cũng có thể tạo function không cố định số lượng tham số. Tham số không cố định số lượng được gọi là variadic arguments (tham số có độ dài thay đổi). Trong JavaScript, variadic arguments được gọi là rest parameter (tham số còn lại).

## Cách viết rest parameter

Trong JavaScript, để viết rest parameter, thêm `...` trước tham số.

```js twoslash
function func(...params) {
  // ...
}
```

Rest parameter nhận được sẽ thành array.

```js twoslash
function func(...params) {
  console.log(params);
}
func(1, 2, 3);
// @log: [ 1, 2, 3 ]
```

Cũng có thể tạo function có cả tham số thông thường và rest parameter.

```js twoslash
function func(param1, ...params) {
  console.log(param1, params);
}
func(1, 2, 3);
// @log: 1 [ 2, 3 ]
```

Rest parameter bắt buộc phải là tham số cuối cùng. Không thể có nhiều rest parameter. Cũng không thể đặt tham số thông thường sau rest parameter.

```js twoslash
// @errors: 1014
// Code gây syntax error
function func(...params1, ...params2) {}
function func(...params, param1) {}
```

## Type annotation cho rest parameter

Trong TypeScript, để type annotation cho rest parameter, viết type của array. Ví dụ, nếu rest parameter có type number, viết `number[]`.

```ts twoslash
function func(...params: number[]) {
  // ...
}
```

## Truyền array làm rest parameter

JavaScript có method built-in `Math.max()`. Method này trả về giá trị lớn nhất trong các số được truyền vào tham số. Function này yêu cầu rest parameter.

```js twoslash
Math.max(1, 10, 100);
// @log: 100
```

Rest parameter khi nhận sẽ thành array, nhưng khi gọi function không thể gộp thành một array để truyền.

```ts twoslash
// @errors: 2345
const scores: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const highest = Math.max(scores);
```

Nếu truyền array trực tiếp như thế này, bên trong function `max` sẽ hiểu là được truyền một tham số có type `number[][]`. Vì type rest parameter mà `max` mong đợi là `number[]`, nên code này không hoạt động đúng. Để truyền array vào rest parameter, sử dụng spread syntax. Spread syntax được viết là `...`.

```ts twoslash
const scores: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const highest = Math.max(...scores);
```

Rest parameter và spread syntax đều có cùng ký hiệu `...`, nhưng spread syntax là để tách array thành các tham số riêng lẻ.
