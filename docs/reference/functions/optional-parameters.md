---
sidebar_label: Optional parameter
---

# Optional parameter (tham số tùy chọn)

Optional parameter là tính năng riêng của TypeScript cho phép bỏ qua argument khi truyền vào. Optional parameter được biểu diễn bằng cách viết dấu hỏi `?` sau tên argument.

## Cú pháp optional parameter

```ts twoslash
interface Type {}
// ---cut---
// @noImplicitAny: false
function functionName(argName?: Type) {}
//                           ^Dấu hiệu optional parameter
```

Optional parameter có thể bỏ qua argument khi gọi function.

```ts twoslash
function hello(person?: string) {}
hello(); // Có thể gọi mà bỏ qua argument
hello("alice"); // Gọi không bỏ qua cũng OK
```

## Khi bỏ qua sẽ thành `undefined`

Type của optional parameter là [union type](./../values-types-variables/union.md) của type và `undefined`. Union type nghĩa là "một trong các type". Trong ví dụ trên, argument `person` có type là `string | undefined`.

```ts twoslash
function hello(person?: string) {}
//             ^?
```

Khi bỏ qua argument, giá trị runtime của optional parameter sẽ là `undefined`.

```ts twoslash
function hello(person?: string) {
  console.log(person);
}
hello();
// @log: undefined
```

## Xử lý optional parameter

Optional parameter có type là union type với `undefined`, nên không thể sử dụng trực tiếp. Ví dụ, code sau gọi method `toUpperCase` của string. Code này sẽ gây compile error. Bởi vì `person` có thể là type `undefined`. Và `undefined` không có method `toUpperCase`.

```ts twoslash
// @errors: 18048
function hello(person?: string) {
  return "Hello " + person.toUpperCase();
}
```

Để giải quyết vấn đề này, có 2 cách sau.

### Gán giá trị default

Viết phân nhánh trường hợp argument là `undefined` bằng câu lệnh `if`, và gán giá trị default tại đó.

```ts twoslash {2-4}
function hello(person?: string) {
  if (typeof person === "undefined") {
    person = "anonymous";
  }
  return "Hello " + person.toUpperCase();
}
```

Cũng có thể gán giá trị default bằng nullish coalescing assignment operator `??=`.

```ts twoslash {2}
function hello(person?: string) {
  person ??= "anonymous";
  return "Hello " + person.toUpperCase();
}
```

Ngoài ra, cũng có thể làm tương tự bằng cách chỉ định default parameter. Trong hầu hết các trường hợp, nên sử dụng default parameter.

```ts twoslash {1-2}
function hello(person: string = "anonymous") {
  //                          ^^^^^^^^^^^^^default parameter
  return "Hello " + person.toUpperCase();
}
```

[Default parameter](./default-parameters.md)

### Tách xử lý

Một cách khác để xử lý optional parameter là tách xử lý.

```ts twoslash {2-4}
function hello(person?: string) {
  if (typeof person === "undefined") {
    return "Hello ANONYMOUS";
  }
  return "Hello " + person.toUpperCase();
}
```

## Sự khác biệt với `T | undefined`

Optional parameter được hiểu là union type `T | undefined`. Nếu vậy, viết type của argument là `T | undefined` thì cũng giống nhau. Tại sao TypeScript lại chuẩn bị cách viết khác là dấu hỏi `?`? Có sự khác biệt không?

Điều này tạo ra **sự khác biệt về việc có thể bỏ qua argument hay không** từ phía gọi. Optional parameter có thể bỏ qua chính argument, nhưng argument có type `T | undefined` không thể bỏ qua.

Ví dụ, function với optional parameter sau có thể gọi mà không có argument.

```ts twoslash
function hello(person?: string) {}
hello(); // Có thể gọi mà bỏ qua argument
```

Mặt khác, argument có union type với `undefined` như sau sẽ gây compile error nếu không có argument.

```ts twoslash
// @errors: 2554
function hello(person: string | undefined) {}
hello();
```

Để gọi function này, cần truyền `undefined`.

```ts twoslash {2}
function hello(person: string | undefined) {}
hello(undefined);
```

## Không thể viết argument thường sau optional parameter

Optional parameter bắt buộc phải viết cuối cùng. Nếu viết argument thường sau optional parameter như sau, sẽ xảy ra compile error.

```ts twoslash
// @errors: 1016
function func(foo?: string, bar: string) {}
```
