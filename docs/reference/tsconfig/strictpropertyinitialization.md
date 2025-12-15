---
description: Bắt buộc khởi tạo class property
tags: [strict]
---

# strictPropertyInitialization

`strictPropertyInitialization` là compiler option bắt buộc khởi tạo class property.

- Mặc định: `true` nếu [strict](./strict.md) được bật, ngược lại là `false`
- Phiên bản thêm vào: 2.7
- TypeScript khuyến nghị nên bật

:::caution

Để option này có hiệu lực, cần set [`strictNullChecks`](./strictnullchecks.md) thành `true`.

:::

## Giải thích

Đặt `strictPropertyInitialization` thành `true` để cảnh báo các class property chưa được khởi tạo giá trị.

```ts twoslash
// @errors: 2564
class Foo {
  prop: number;
}
```

Khởi tạo phải được thực hiện bằng một trong các cách sau:

1. Khởi tạo trong constructor
1. Khởi tạo bằng initializer
1. Type annotate bằng union type với undefined

Dưới đây là ví dụ khởi tạo trong constructor:

```ts twoslash
class Foo {
  prop: number;

  constructor() {
    this.prop = 1;
  }
}
```

Dưới đây là ví dụ khởi tạo bằng [initializer](../object-oriented/class/field-initializers.md):

```ts twoslash
class Foo {
  prop: number = 1;
  //           ^^^initializer
}
```

Khi type của property là [union type](../values-types-variables/union.md) với `undefined`, không cảnh báo ngay cả khi không khởi tạo:

```ts twoslash
class Foo {
  prop: number | undefined;
}
```

Khi property là optional cũng không cảnh báo:

```ts twoslash
class Foo {
  prop?: number;
}
```

<PostILearned>

strictPropertyInitialization của TypeScript là compiler option bắt buộc khởi tạo property.

⚠️strictNullChecks cũng cần set thành true
✅Bắt buộc khởi tạo trong constructor HOẶC initializer
🙆🏻‍♂️Type annotate bằng union type với undefined là OK

</PostILearned>

## Thông tin liên quan

[strict](./strict.md)

[フィールド (field)](../object-oriented/class/fields.md)
