---
sidebar_label: Function declaration và hoisting
---

# Function declaration và hoisting

Một ví dụ về sự khác biệt giữa function declaration và function expression trong JavaScript là hoisting. Function declaration có hoisting, còn function expression thì không.

Đầu tiên, hãy xem ví dụ về function declaration. Trong đoạn code sau, function declaration của function `hello` nằm ở dòng thứ 3. Và function `hello` được thực thi trước khi khai báo.

```js twoslash
hello();

function hello() {
  console.log("Hello World");
}
```

Đoạn code này gọi function `hello` trước dòng khai báo function, nhưng không bị lỗi và "Hello World" được in ra bình thường. Đây là do function declaration có hoisting.

Tiếp theo, hãy xem ví dụ về function expression. Đoạn code dưới đây định nghĩa function `hello` bằng function expression.

```js twoslash
hello();

const hello = function () {
  console.log("Hello World");
};
```

Khi thực thi đoạn code này như JavaScript, lỗi "ReferenceError: Cannot access 'hello' before initialization" sẽ xảy ra ở dòng 1. Khi định nghĩa function bằng function expression, không có hoisting nên lỗi này xảy ra.

Như vậy, có sự khác biệt về hoisting giữa function declaration và function expression. Với function expression, bạn cần chú ý đến thứ tự giữa định nghĩa function và thực thi function.

Trong TypeScript, khi cố gắng gọi function expression trước khi định nghĩa, compiler sẽ cảnh báo.

```ts twoslash
hello();
// @errors: 2448 2454

const hello = function () {};
```

Với function declaration, không xảy ra lỗi giống như JavaScript.

Vì được thực thi nhờ hoisting, compiler không có cảnh báo.

```ts
hello(); // Hello World

function hello() {
  console.log("Hello World");
}
```
