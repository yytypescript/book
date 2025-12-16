---
sidebar_label: Function expression
---

# Function expression

Function expression là một trong những cách tạo function trong JavaScript, sử dụng function **expression**.

## Cú pháp function expression

Cú pháp function expression giống với [function declaration].

[function declaration]: ./function-declaration.md

<!--prettier-ignore-->
```js twoslash
// @noImplicitAny: false
function tên_function(tham_số) {
  // Nội dung xử lý
};
```

[Function declaration] là statement, còn function expression là expression. Expression là thứ mà khi được đánh giá sẽ trả về một giá trị. Vì function expression trở thành giá trị, nó có thể được gán trực tiếp vào biến.

```js twoslash
// @noImplicitAny: false
const tên_biến = function tên_function(tham_số) {
  // Nội dung xử lý
};
```

## Bỏ qua tên function

<!--textlint-disable prh-->

Function expression có thể bỏ qua tên function. Vì không có tên, nó còn được gọi là anonymous function hoặc unnamed function.

<!--textlint-enable prh-->

```js twoslash
const tên_biến = function () {};
//                     ^Bỏ qua tên function
```

Để gọi function expression, bạn sử dụng tên biến.

```js twoslash
const tên_biến = function () {};
// ---cut---
tên_biến(); // Gọi function
```

Ví dụ, nếu viết lại function increment được viết bằng function declaration sau:

```js twoslash
function increment(n) {
  return n + 1;
}
```

Thành function expression, sẽ trở thành:

```js twoslash
const increment = function (n) {
  return n + 1;
};
```

Function expression cũng có thể được gán trực tiếp vào property của object.

```ts twoslash
const myObject = {
  methodName: function () {},
};
```

Function expression cũng có thể được truyền trực tiếp làm tham số của function khác. Ví dụ, function expression được sử dụng khi chỉ định xử lý khi button được click.

```js twoslash
button.addEventListener("click", function (event) {
  console.log("Button clicked");
});
```

## Function expression và type annotation

Trong TypeScript, bạn có thể viết type annotation cho tham số giống như function declaration.

```ts twoslash
const increment = function (n: number) {
  //                         ^^^^^^^^Type annotation cho tham số
  return n + 1;
};
```

Khi bỏ qua type annotation cho tham số, kiểu của nó sẽ là `any`.

```ts twoslash
const increment = function (n) {};
//                          ^?
// @noImplicitAny: false
```

Khi gán function expression vào biến có kiểu function, ngay cả khi bỏ qua type annotation cho tham số, type inference vẫn hoạt động. Vì kiểu của tham số có thể được biết từ thông tin kiểu của biến.

```ts twoslash
type UseString = (value: string) => void;
let useString: UseString; // Biến kiểu function
useString = function (value) {}; // Gán function expression vào biến kiểu function
//                    ^?
```

Trong function expression của TypeScript, bạn cũng có thể viết type annotation cho giá trị trả về.

```ts twoslash
const getZero = function (): number {
  //                         ^^^^^^Type annotation cho giá trị trả về
  return 0;
};
```

Khi bỏ qua type annotation cho giá trị trả về, kiểu sẽ được suy luận từ logic của function.

```ts twoslash
const getZero = function () {
  return 0;
};
const num = getZero();
//    ^?
```

## Tên function của function expression

Trong JavaScript, khi viết tên function trong function expression, tên function đó chỉ có thể được tham chiếu từ bên trong xử lý của function. Điều này được sử dụng khi viết recursive function. Ví dụ sau là function tính giai thừa của số `n` được cho. Tên function `fact` chỉ có thể được sử dụng bên trong function đó. Từ bên ngoài function, phải gọi bằng `factorial`.

```js twoslash
const factorial = function fact(n) {
  if (n <= 1) {
    return 1;
  }
  return n * fact(n - 1); // Gọi đệ quy bằng tên function
};
```

Ví dụ trên cũng có thể được viết lại thành gọi đệ quy bằng tên biến như sau.

```js {6} twoslash
//                        ↓Bỏ qua tên function
const factorial = function (n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1); // Gọi đệ quy bằng tên biến
};
```

<PostILearned>

・Function expression là function sử dụng function expression
・Function expression có thể bỏ qua tên function. Được gọi là anonymous function.
・Function expression có thể được gán trực tiếp vào biến hoặc tham số
・Cách viết type annotation giống với function declaration
・Tên function của function expression chỉ có thể tham chiếu từ bên trong function

</PostILearned>

## Thông tin liên quan

[Sự khác biệt giữa function expression và arrow function](function-expression-vs-arrow-functions.md)

[Function declaration](./function-declaration.md)

[Arrow function](./arrow-functions.md)
