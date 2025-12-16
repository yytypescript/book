---
title: Sự khác biệt giữa object, Object, {}
image: /img/difference-among-object-and-object.png
---

Trong TypeScript, khi type annotation cho object, thông thường sẽ chỉ định cả type của property.

```ts twoslash
let obj: { a: number; b: number };
```

[Type annotation của object](type-annotation-of-objects.md)

Khác với type annotation thông thường như vậy, cũng có cách type annotation đại khái "là object" mà không chỉ định type của property. Đó là sử dụng `object` type, `Object` type, hoặc `{}` type.

```ts twoslash
let a: object;
let b: Object;
let c: {};
```

Tất cả những type này đều cho phép gán bất kỳ giá trị nào là object type.

```ts twoslash
const a: object = {}; // OK
const b: Object = {}; // OK
const c: {} = {}; // OK
```

<!-- textlint-disable prh -->

## Sự khác biệt giữa object type, Object type, {} type

<!-- textlint-enable prh -->

`object` type, `Object` type, `{}` type có phần tương đồng, nhưng `object` type có điểm khác biệt với 2 type còn lại.

### object type

`object` type là type chỉ cho phép gán object. Vì giá trị trong JavaScript được chia thành primitive type hoặc object, nên có thể nói `object` type là type không cho phép gán primitive type.

```ts twoslash
// @errors: 2322
let a: object;
a = { x: 1 }; // OK
a = [1, 2, 3]; // OK. Array là object
a = /a-z/; // OK. Regular expression là object

// Primitive type là NG
a = 1;
a = true;
a = "string";
```

[Tất cả những gì không phải primitive đều là object](non-primitives-are-objects.md)

<!-- textlint-disable prh -->

### Object type

<!-- textlint-enable prh -->

`Object` type là interface. Có thể gán bất kỳ giá trị nào có property như `valueOf`. Do đó, `Object` type cũng có thể gán mọi primitive type ngoại trừ `null` và `undefined`. Vì các primitive type như string, number có thể có property thông qua auto-boxing.

```ts twoslash
// @errors: 2322
let a: Object;
a = {}; // OK

// Primitive type có thể boxing thì OK
a = 1; // OK
a = true; // OK
a = "string"; // OK

// null và undefined là NG
a = null;
a = undefined;
```

[Boxing](../boxing.md)

`Object` type [được khuyến nghị không nên sử dụng trong tài liệu chính thức của TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#number-string-boolean-symbol-and-object). Lý do là vì có thể gán cả primitive type. Nếu muốn cho phép gán bất kỳ object nào, nên cân nhắc sử dụng `object` type thay thế.

### {} type

`{}` type là type biểu thị object không có property. Có thể gán bất kỳ giá trị nào có thể có property. Điểm này giống với `Object` type, có thể gán mọi type ngoại trừ `null` và `undefined`.

```ts twoslash
// @errors: 2322
let a: {};
a = {}; // OK

// Primitive type có thể boxing thì OK
a = 1; // OK
a = true; // OK
a = "string"; // OK

// null và undefined là NG
a = null;
a = undefined;
```

<!-- textlint-disable prh -->

### Phạm vi gán của object type, Object type, {} type

<!-- textlint-enable prh -->

Tổng hợp phạm vi gán của `object` type, `Object` type, `{}` type như hình sau.

![](difference-among-object-and-object/image1.png)

<!-- textlint-disable prh -->
<PostILearned>

TypeScript có các type tương tự là object, Object, {}. Tất cả đều là type chỉ "object".

✅Sự khác biệt giữa object, Object, {}
1️⃣object type: Chỉ cho phép gán object
2️⃣Object type, {} type: Cho phép gán object và primitive type ngoại trừ null, undefined

</PostILearned>

<!-- textlint-enable prh -->
