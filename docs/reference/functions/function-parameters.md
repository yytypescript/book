---
sidebar_label: Tham số function
---

# Tham số function (function parameter)

## Số lượng tham số

Trong function của JavaScript, function có thể được gọi ngay cả khi số lượng tham số mà function mong đợi và số lượng tham số được truyền khi gọi function không khớp. Nghĩa là JavaScript không kiểm tra tham số. Ví dụ, gọi function mong đợi nhận 1 tham số với 2 tham số cũng không gây lỗi.

```js twoslash
function increment(n) {
  return n + 1;
}
increment(1, 2); // OK
```

Ngược lại, trong JavaScript, function cũng được thực thi khi có ít tham số. Trong trường hợp này, giá trị của tham số không được truyền sẽ là `undefined`.

```js twoslash
function foo(a, b) {
  console.log(b);
}
foo(1); // Thiếu tham số
// @log: undefined
```

Về cơ bản, việc truyền nhiều tham số hơn không gây vấn đề cho việc thực thi function. Vì có thể bỏ qua các tham số thừa. Tuy nhiên, trong trường hợp muốn kiểm tra nghiêm ngặt số lượng tham số, bạn kiểm tra số lượng tham số bằng property `length` của biến `arguments`.

```js twoslash
function foo(a, b) {
  if (arguments.length > 2) {
    throw new Error("Số lượng tham số tối đa là 2");
  }
}
foo(1, 2); // OK
foo(1, 2, 3); // Error
```

Trong JavaScript, để kiểm tra số lượng tham số như trên, bạn cần viết logic cho việc đó.

Trong TypeScript, sẽ xảy ra compile error nếu số lượng tham số của function không khớp.

```ts twoslash
// @noImplicitAny: false
// @errors: 2554
function increment(n) {
  return n + 1;
}
increment(1, 2); // Nhiều tham số
increment(); // Thiếu tham số
```

Do đó, trong TypeScript không cần viết logic kiểm tra như JavaScript.

## Kiểu của tham số

JavaScript cũng không kiểm tra kiểu của tham số. Một số ngôn ngữ lập trình khác như Java hoặc PHP có tính năng định nghĩa kiểu của tham số function, khi giá trị có kiểu khác với kiểu mà function mong đợi được truyền vào, sẽ xảy ra lỗi trước khi function được thực thi. JavaScript không có tính năng này. Ví dụ, function mong đợi tham số kiểu string vẫn được thực thi ngay cả khi truyền giá trị kiểu null.

```js twoslash
function len(str) {
  return str.length;
}
console.log(len(null));
```

Tham số `str` của function `len` này được giả định là kiểu string, nhưng giá trị được truyền là `null`. Dù vậy, function vẫn được thực thi và chỉ xảy ra lỗi khi cố tham chiếu property `length` không tồn tại trên `null`.

Trong JavaScript, khi muốn làm nghiêm ngặt kiểu của tham số, cần viết xử lý kiểm tra. Ví dụ, kiểm tra xem tham số có phải là primitive type như number hoặc string được thực hiện bằng toán tử `typeof`.

```js twoslash
function len(str) {
  if (typeof str !== "string") {
    throw new Error("str phải là kiểu string");
  }
  return str.length;
}
len("a"); // OK
len(1); // Error
```

Trong TypeScript, bạn có thể viết type annotation cho tham số của function. Khi viết type annotation, nếu viết kiểu không mong muốn cho tham số, sẽ xảy ra compile error.

```ts twoslash
// @errors: 2345
function len(str: string) {
  return str.length;
}
len("a"); // OK
len(1); // Error
```

Do đó, trong TypeScript không cần viết xử lý kiểm tra kiểu như JavaScript.
