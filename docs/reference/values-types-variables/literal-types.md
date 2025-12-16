---
sidebar_label: Kiểu literal
---

# Kiểu literal (literal type)

TypeScript cho phép biểu diễn kiểu mà chỉ có thể gán một giá trị cụ thể của primitive type. Kiểu như vậy được gọi là literal type.

Ví dụ, đây là type annotation cho phép gán giá trị số. Với số, bạn có thể gán 1, 100, hay bất kỳ số nào.

```ts twoslash
let x: number;
x = 1;
```

Với literal type, bạn có thể tạo kiểu chỉ cho phép gán giá trị 1.

```ts twoslash
// @errors: 2322
let x: 1;
x = 1;
x = 100;
```

## Những thứ có thể biểu diễn dưới dạng literal type

Các primitive type có thể biểu diễn dưới dạng literal type như sau:

- true và false của kiểu boolean
- Giá trị của kiểu number
- Chuỗi của kiểu string

```ts twoslash
const isTrue: true = true;
const num: 123 = 123;
const str: "foo" = "foo";
```

## Mục đích sử dụng của literal type

Thông thường, literal type được sử dụng để biểu diễn magic number hoặc state. Trong trường hợp đó, thường kết hợp với union type.

```ts twoslash
let num: 1 | 2 | 3 = 1;
```

[Union type](union.md)

[Discriminated union](discriminated-union.md)
