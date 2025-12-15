---
description: Làm nghiêm ngặt type check của bind, call, apply
tags: [strict]
---

# strictBindCallApply

`strictBindCallApply` là compiler option làm nghiêm ngặt type check của `bind`, `call`, `apply`.

- Mặc định: `true` nếu [strict](./strict.md) được bật, ngược lại là `false`
- Phiên bản thêm vào: 3.2
- TypeScript khuyến nghị nên bật

## `bind`, `call`, `apply` không được type check

Khi `strictBindCallApply` là `false` (mặc định của TypeScript), không check type của tham số của built-in function `bind`, `call`, `apply`.

```ts twoslash
// @strictBindCallApply: false
// Function có tham số kiểu string
function fn(x: string) {}

// Tham số truyền vào là kiểu number nhưng không cảnh báo
fn.call(undefined, 122);
```

Type annotation của return value của function được gọi bằng `bind`, `call`, `apply` bị bỏ qua, type của return value sẽ là `any`.

```ts twoslash
// @strictBindCallApply: false
function fn(): string {
  return "str";
}
const x = fn.call(undefined);
//    ^?
```

Khi `strictBindCallApply` là `false`, có nguy cơ xảy ra lỗi runtime.

```ts twoslash
function fn(x: string) {
  x.toUpperCase();
}
const x = fn.call(undefined, 123);
// @error: TypeError: x.toUpperCase is not a function
// @strictBindCallApply: false
```

## Type check của `bind`, `call`, `apply`

Đặt `strictBindCallApply` thành `true` để type check `bind`, `call`, `apply`.

```ts twoslash
// @errors: 2345
function fn(x: string) {}
fn.call(undefined, 123);
```

Thêm nữa, type của return value sẽ là return value type của function được gọi.

```ts twoslash
function fn(): string {
  return "str";
}
const x = fn.call(undefined);
//    ^?
```

Nhờ return value có type nên còn có lợi ích là có autocomplete.

```ts twoslash
// @noErrors
function fn(): string {
  return "str";
}
const str = fn.call(undefined);
str.toU;
//     ^|
```

Khuyến nghị nên bật `strictBindCallApply`.

<PostILearned>

strictBindCallApply của TypeScript là compiler option làm nghiêm ngặt type check của bind, call, apply

【Khi false】
❌Không check type của tham số
⚠️Return value trở thành any

【Khi true】
✅Check type của tham số
💚Return value có type
👍Khuyến nghị nên bật

</PostILearned>

## Thông tin liên quan

[strict](./strict.md)
