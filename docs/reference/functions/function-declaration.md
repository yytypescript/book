---
sidebar_label: Function declaration
---

# Function declaration

Function declaration là cú pháp để định nghĩa function trong JavaScript.

## Cú pháp function declaration

Function declaration trong JavaScript sử dụng cú pháp function.

```js twoslash
function hello() {
  return "hello";
}
```

## Type annotation cho function declaration

Trong TypeScript, bạn có thể viết type annotation cho tham số và giá trị trả về của function declaration.

```ts twoslash
function increment(num: number): number {
  return num + 1;
}
```

Khi bỏ qua type annotation cho tham số, compiler sẽ ngầm hiểu nó là kiểu `any`.

```ts twoslash
// @noImplicitAny: false
function increment(num): number {
  //               ^?
  return num + 1;
}
```

Bằng cách đặt compiler option `noImplicitAny` thành `true`, bạn có thể bắt buộc type annotation cho tham số.

```ts twoslash
// @noImplicitAny: true
// @errors: 7006
function increment(num): number {
  return num + 1;
}
```

[noImplicitAny](../tsconfig/noimplicitany.md)

Khi bỏ qua type annotation cho giá trị trả về, compiler sẽ suy luận kiểu từ code.

```ts twoslash
function increment(num: number) {
  return num + 1;
}
const value = increment(1);
//            ^?
```

Khi có nhiều `return` và trả về các kiểu khác nhau, kiểu được suy luận sẽ là union type.

```ts twoslash
function getFirst(items: number[]) {
  if (typeof items[0] === "number") {
    return items[0];
  }
  return null;
}

getFirst([1, 2, 3]);
// ^?
```
