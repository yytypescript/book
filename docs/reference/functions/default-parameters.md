---
sidebar_label: "Default parameter"
---

# Default parameter

Default parameter cho phép chỉ định giá trị thay thế khi giá trị của tham số là `undefined`.

## Cú pháp default parameter

Trong JavaScript, default parameter được viết bằng cách thêm `=` và giá trị mặc định bên phải tham số.

```js twoslash
// Function declaration
function tên_function(tham_số = giá_trị_mặc_định) {}
// Arrow function
(tham_số = giá_trị_mặc_định) => {};
```

Trong TypeScript, khi viết cả type annotation và default parameter, type annotation được viết trước.

```ts twoslash
interface Kiểu {}
declare const giá_trị_mặc_định: Kiểu;
// ---cut---
// Function declaration
function tên_function(tham_số: Kiểu = giá_trị_mặc_định) {}
// Arrow function
(tham_số: Kiểu = giá_trị_mặc_định) => {};
```

## Giá trị mặc định được sử dụng khi là `undefined`

Trong JavaScript, khi bỏ qua tham số, nó sẽ trở thành `undefined`.

```js twoslash
function foo(x) {
  console.log(x);
}
foo();
// @log: undefined
```

Default parameter sẽ được gán giá trị thay thế khi tham số là `undefined`. Ví dụ, trong lời gọi function sau, không truyền tham số nên `x` là `undefined`. Do đó, giá trị mặc định `1` được gán.

```ts twoslash
function foo(x = 1) {
  console.log(x);
}
foo();
// @log: 1
```

Khi truyền `undefined` làm tham số như sau, giá trị mặc định cũng được gán.

```ts twoslash
function foo(x = 1) {
  console.log(x);
}
// ---cut---
foo(undefined);
// @log: 1
```

Lưu ý rằng khi tham số là `null`, default parameter không được áp dụng.

```js twoslash {4}
function foo(x = 1) {
  console.log(x);
}
foo(null);
// @log: null
```

## Có thể viết ở giữa danh sách tham số

Trong JavaScript, default parameter có thể được viết trước các tham số không có giá trị mặc định.

```js twoslash
function foo(x, y = 2, z) {
  console.log(x, y, z);
}
foo(1, undefined, 3);
// @log: 1 2 3
```

## Có thể viết logic khởi tạo

Trong JavaScript, bạn có thể viết expression làm giá trị mặc định.

```js twoslash
function foo(x = 2 * 2) {}
```

Vì có thể viết expression, nên cũng có thể viết lời gọi function.

```js twoslash
function foo(x = parseInt("1.5")) {}
```

### Không thể viết xử lý không đồng bộ

Tuy nhiên, bạn không thể viết xử lý gọi async function bằng cách sử dụng `await`.

```ts twoslash
// @errors: 2524
async function foo(x = await Promise.resolve(1)) {}
```

## Type inference hoạt động

Trong TypeScript, khi có default parameter, type inference cho tham số sẽ hoạt động. Do đó, bạn có thể bỏ qua type annotation khi có default parameter.

```ts twoslash
function foo(x = 1) {}
//           ^?
```

<PostILearned>

・Default parameter trong JavaScript là giá trị được sử dụng khi tham số là undefined
・Cú pháp: function tên_function(tham_số: Kiểu = giá_trị_mặc_định) {}
・Không trở thành giá trị mặc định khi là null
・Có thể viết ở giữa danh sách tham số
・Cũng có thể viết logic khởi tạo đơn giản
・Trong TypeScript, type inference hoạt động

</PostILearned>
