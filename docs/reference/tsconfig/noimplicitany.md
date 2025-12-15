---
description: Cấm any type ngầm định
tags: [strict]
---

# noImplicitAny

`noImplicitAny` là compiler option cấm any type ngầm định.

- Mặc định: `true` nếu [strict](./strict.md) được bật, ngược lại là `false`
- Phiên bản thêm vào: -
- TypeScript khuyến nghị nên bật

## Vấn đề của any ngầm định

Khi không có type annotation và không thể type inference, TypeScript sẽ đặt type của biến là `any`. Điều này được gọi là any ngầm định. Đặc biệt, any ngầm định thường xảy ra ở tham số và property.

```ts twoslash title="Ví dụ xảy ra any ngầm định"
// @noImplicitAny: false
function foo(param) {}
//           ^?

class Bar {
  private prop;
  //      ^?
}
```

Biến có type là any không được type check nên nguy cơ bug tăng cao.

```ts twoslash
function increment(number) {
  console.log(number + 1);
}
increment("1");
// @log: "11"
increment(undefined);
// @log: NaN
// @noImplicitAny: false
```

## Ngăn chặn any ngầm định với `noImplicitAny`

Đặt `noImplicitAny` thành `true` để tránh biến trở thành any ngầm định. TypeScript sẽ cảnh báo khi phát hiện biến có any ngầm định.

```ts twoslash title="Ví dụ any ngầm định được cảnh báo"
// @noImplicitAny: true
// @errors: 7006 7008
function foo(param) {}

class Bar {
  private prop;
}
```

## Type của return value của function

Return value của function trong nhiều trường hợp được infer nên không trở thành any ngầm định. Do đó, ngay cả khi không có type annotation cho return value, `noImplicitAny` cũng không cảnh báo (đối tượng của `noImplicitAny` chỉ là "any ngầm định").

```ts twoslash
function foo() {
  //     ^?
  return 1;
}
```

<PostILearned>

😢TypeScript đặt type thành any khi không có type annotation HOẶC không thể type inference (any ngầm định)
🙅‍♂️noImplicitAny là compiler option cấm any ngầm định
😊Đặt thành true để cảnh báo any ngầm định
✅Option khuyến nghị nên bật

</PostILearned>

## Thông tin liên quan

[strict](./strict.md)

[any型](../values-types-variables/any.md)

[関数宣言](../functions/function-declaration.md)

[フィールド](../object-oriented/class/fields.md)
