# Tạo type của tất cả phần tử từ array

Ở trang trước, đã giới thiệu cách tạo type của tất cả phần tử từ array.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = (typeof currencies)[number];
//   ^?
```

Cách viết `typeof currencies[number]` có thể khó hiểu khi lần đầu nhìn thấy. Vì vậy sẽ giải thích chi tiết hơn.

## Quan sát code ở trang trước

Về code tạo type của một phần tử từ array, tiếp tục từ trang trước, xác nhận lại với array tiền tệ.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
type Currency = (typeof currencies)[2];
//   ^?
```

Ở đây, `2` trong `typeof currencies[2]` được giải thích là literal type ở trang trước, nhưng có thực sự như vậy không? Hãy xác nhận bằng code sau.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
const index = 2 as const;
// @errors: 2749
type Currency = (typeof currencies)[index];
```

Code trong đó `2` được hiểu là value đã bị lỗi.

Vậy hãy thử code mà rõ ràng là literal type.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
type Index = 2;
type Currency = (typeof currencies)[Index];
//   ^?
```

Như vậy đã rõ ràng `2` trong `typeof currencies[2]` là literal type.

## Literal type của số và `number` type

Mối quan hệ giữa literal type của `2` và `number` type có thể biểu diễn bằng tập hợp là `2`⊂`number`. Nói cách khác, `number` type hoạt động như một trong các literal type của số như `0`, `1`, `2`...

Khi nói đến "một trong các type" thì đó là union type.

[Union type](../reference/values-types-variables/union.md)

Hãy thử sử dụng union type của literal thay cho `number` type.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;
type Currency = (typeof currencies)[0 | 1 | 2 | 3 | 4 | 5];
//   ^?
```

Với type `0 | 1 | 2 | 3 | 4 | 5` cũng có thể tạo type của tất cả phần tử từ array `currencies`. Như vậy có thể thấy `number` type hoạt động như wildcard của literal type số.

## Tổng quát hóa

Để kết thúc trang này, đây là code tổng quát hóa.

```ts twoslash
type List = (string | number | boolean)[];
type Elem = List[number];
//   ^?
```

Từ type `List`, bằng cách viết `List[number]` đã tạo được `string | number | boolean` là type của tất cả phần tử.

### Giới thiệu anti-pattern

Có thể tạo cùng type bằng index cụ thể như sau, nhưng hãy chú ý đây là anti-pattern.

```ts twoslash
type List = (string | number | boolean)[];
type Elem = List[0]; // Cách viết nên tránh
//   ^?
```

Lý do cách viết này là anti-pattern là vì có thể gây nhầm lẫn type `List` là tuple type. `List[0]` tạo type từ phần tử cụ thể, nên có thể gây hiểu lầm rằng type của mỗi phần tử không giống nhau, nghĩa là `List` là tuple type chứ không phải array type. Vì array type coi type của tất cả phần tử là giống nhau, nên cách viết `List[number]` là phù hợp.
