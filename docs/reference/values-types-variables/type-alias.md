---
sidebar_label: Type alias
---

# Type alias (bí danh kiểu)

TypeScript cho phép đặt tên cho kiểu. Kiểu có tên được gọi là type alias.

## Khai báo type alias

Để khai báo type alias, sử dụng từ khóa `type`. Ví dụ sau đặt tên `StringOrNumber` cho kiểu `string | number`.

```ts twoslash
type StringOrNumber = string | number;
```

Type alias có thể được sử dụng tương tự như các kiểu built-in như `string`, trong type annotation của biến, tham số, giá trị trả về, v.v.

```ts twoslash
type StringOrNumber = string | number;
// ---cut---
const value: StringOrNumber = 123;
```

## Ví dụ sử dụng type alias

Type alias có thể đặt tên cho nhiều loại kiểu khác nhau. Sau đây là một số ví dụ về type alias.

```ts twoslash
// Kiểu primitive
type Str = string;
// Kiểu literal
type OK = 200;
// Kiểu mảng
type Numbers = number[];
// Kiểu object
type UserObject = { id: number; name: string };
// Union type
type NumberOrNull = number | null;
// Kiểu function
type CallbackFunction = (value: string) => boolean;
```

## Mục đích sử dụng của type alias

Type alias tiện lợi khi muốn tái sử dụng cùng một kiểu. Vì định nghĩa kiểu nằm ở một nơi, nên tính bảo trì được cải thiện.

Ngoài ra, việc đặt tên cho kiểu có thể cải thiện khả năng đọc. Khi kiểu có tên, người đọc code dễ dàng hiểu kiểu đó có ý nghĩa gì.

## Thông tin liên quan

[Sự khác biệt giữa interface và type](../object-oriented/interface/interface-vs-type-alias.md)
