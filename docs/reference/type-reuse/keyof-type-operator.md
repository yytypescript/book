# keyof type operator

`keyof` là type operator trả về tên các property của một object type dưới dạng kiểu. Ví dụ, khi sử dụng `keyof` với một kiểu có property `name`, bạn sẽ nhận được string literal type `"name"`.

```ts twoslash
type Person = {
  name: string;
};
type PersonKey = keyof Person;
//    ^?
```

Khi sử dụng `keyof` với object type có từ 2 property trở lên, kết quả sẽ là union type kết hợp các string literal type của từng tên property bằng `|`.

```ts twoslash
type Book = {
  title: string;
  price: number;
  rating: number;
};
type BookKey = keyof Book;
//   ^?
// Có ý nghĩa tương đương với
// type BookKey = "title" | "price" | "rating";
```

Khi sử dụng `keyof` với index type, kết quả sẽ là kiểu của index key.

```ts twoslash
type MapLike = { [K: string]: any };
type MapKeys = keyof MapLike;
//    ^?
```

Với index type có key là `string`, kết quả trả về sẽ là `string | number` thay vì chỉ `string`. Lý do là vì truy cập key kiểu number như `obj[0]` tương đương với `obj["0"]`.

Khi sử dụng `keyof` với Mapped Types, kết quả sẽ là kiểu của các key đó.

```ts twoslash
type MapLike = { [K in "x" | "y" | "z"]: any };
type MapKeys = keyof MapLike;
//    ^?
```

Khi sử dụng `keyof` với object type không có property nào, kết quả sẽ là kiểu `never`.

```ts twoslash
type What = keyof {};
//   ^?
```

Khi sử dụng `keyof` với kiểu `any`, kết quả sẽ là kiểu `string | number | symbol`.

```ts twoslash
type AnyKeys = keyof any;
//    ^?
```

## Ưu điểm của keyof

Ưu điểm của `keyof` là tăng khả năng bảo trì code. Nếu bạn định nghĩa union type của các tên property riêng biệt với object type, khi thay đổi property của object type, bạn cũng phải sửa union type đó. Nếu sử dụng `keyof` để trích xuất key từ object type, bạn chỉ cần thay đổi ở object type.

Ngoài ra, hãy tưởng tượng một object có hàng chục property. Nếu bạn cần định nghĩa union type của các tên property đó và phải copy tất cả tên property, rất dễ bỏ sót hoặc viết sai. Trong trường hợp này, `keyof` rất tiện lợi và an toàn vì không cần phải copy thủ công.

## keyof thường được sử dụng cùng Mapped Types

keyof thường được sử dụng kết hợp với Mapped Types hơn là sử dụng riêng lẻ.

[Mapped Types](mapped-types.md)
