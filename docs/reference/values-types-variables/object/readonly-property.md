---
sidebar_label: Readonly property của object type
---

# Readonly property của object type

Trong TypeScript, có thể đặt property của object thành read-only. Thêm modifier `readonly` vào property muốn đặt thành read-only. Khi cố gán giá trị cho property read-only, TypeScript compiler sẽ cảnh báo không thể gán.

```ts twoslash
// @errors: 2540
let obj: {
  readonly foo: number;
};
obj = { foo: 1 };
obj.foo = 2;
```

## readonly không áp dụng đệ quy

`readonly` chỉ đặt property được chỉ định thành read-only. Khi object có cấu trúc lồng nhau, `readonly` không áp dụng cho property của object bên trong. Nghĩa là nó không áp dụng đệ quy.

Ví dụ, nếu property `foo` là `readonly` nhưng property `foo.bar` không phải `readonly`, việc gán vào `foo` sẽ báo compile error, nhưng gán trực tiếp vào `foo.bar` sẽ không báo compile error.

```ts twoslash
// @errors: 2540
let obj: {
  readonly foo: {
    bar: number;
  };
};
obj = {
  foo: {
    bar: 1,
  },
};
obj.foo = { bar: 2 };
obj.foo.bar = 2; // Không báo compile error
```

Nếu muốn đặt property thành read-only một cách đệ quy, cần thêm `readonly` vào từng property con và cháu.

```ts twoslash
let obj: {
  readonly foo: {
    readonly bar: number;
  };
};
```

## readonly chỉ có tác dụng tại compile time

`readonly` là khái niệm chỉ tồn tại trong thế giới type của TypeScript. Nghĩa là property được chỉ định read-only chỉ được kiểm tra tại compile time. Sau khi compile thành JavaScript, property từng có `readonly` vẫn có thể gán giá trị được.

Ví dụ, với code chỉ định property `foo` là `readonly`, code gán vào `foo` sẽ được phát hiện là error tại compile time.

```ts twoslash
// @errors: 2540
const obj: { readonly foo: number } = { foo: 1 };
obj.foo = 2; // Báo compile error
```

Tuy nhiên, trong JavaScript code sau khi compile, ký hiệu `readonly` sẽ biến mất nên sẽ không được phát hiện là error tại runtime.

```ts twoslash title="JavaScript code sau khi compile"
// @noErrors
// @showEmit
// @alwaysStrict: false
const obj: { readonly foo: number } = { foo: 1 };
obj.foo = 2; // Không báo runtime error
```

Việc không có kiểm tra tại runtime thoạt nhìn có vẻ nguy hiểm, nhưng nếu không bỏ qua compile error và sửa đúng cách thì sẽ không có vấn đề lớn.

## Cách đặt tất cả property thành read-only cùng lúc

Trong TypeScript, để đặt property thành read-only, cần thêm modifier `readonly` vào từng property. Khi số lượng property nhiều, việc thêm `readonly` sẽ tốn công sức và lượng code nhiều.

Trong trường hợp đó, có thể sử dụng utility type `Readonly`. `Readonly` là type đặt tất cả property thành read-only.

```ts twoslash
let obj: Readonly<{
  a: number;
  b: number;
  c: number;
  d: number;
  e: number;
  f: number;
}>;
```

[Readonly&lt;T>](../../type-reuse/utility-types/readonly.md)

## Thông tin liên quan

[Readonly modifier của class](../../object-oriented/class/readonly-modifier-in-classes.md)

[Readonly modifier của interface](../../object-oriented/interface/readonly-modifier-in-interfaces.md)

[Read-only array](../array/readonly-array.md)

[const assertion](./../const-assertion.md)
