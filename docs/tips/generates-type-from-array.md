# Tạo type từ array

Có không ít collection được định nghĩa với kỳ vọng hoạt động như đơn vị. Lần này tập trung vào array trong các collection và giới thiệu cách tạo type từ chúng.

## Muốn tạo type tiền tệ từ array tiền tệ

Giả sử bạn đang phát triển service có thể sử dụng ngoại tệ quốc tế. Giả sử các đồng tiền được hỗ trợ được lưu trong array như sau.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"];
```

Trong trường hợp như vậy, nếu có thể tạo type tiền tệ (union type) mà không thay đổi nhiều JavaScript asset này thì sẽ tiện lợi trong tương lai. Nghĩa là union type như sau.

```ts twoslash
type Currency = "CNY" | "EUR" | "GBP" | "JPY" | "KRW" | "USD";
```

### `typeof`

Đây không phải `typeof` của JavaScript mà là `typeof` của TypeScript. `typeof` cho biết TypeScript nhận diện biến đó là type gì.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"];

type Currency = typeof currencies;
//   ^?
```

Có lẽ nhiều người đã đoán trước, nhưng kết quả là `string[]`. Vậy làm thế nào để lấy được giá trị constant thay vì `string`? Đó là thêm `as const` vào object muốn lấy giá trị constant.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = typeof currencies;
//   ^?
```

Đã lấy được constant (literal type) nhưng vẫn là array. Để lấy dưới dạng union type, cần đảo ngược cách suy nghĩ.

#### Muốn lấy literal type ở vị trí nào

Ví dụ muốn lấy `'GBP'`. `'GBP'` ở vị trí thứ 2 nên lấy type ở vị trí thứ 2 của `currencies` sẽ có được literal type mong muốn.

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = (typeof currencies)[2];
//   ^?
```

Đã lấy được `'GBP'`.

### Muốn lấy tất cả literal type

Đây là vấn đề chính. Không thể viết như sau nên cần nghĩ cách thông minh hơn.

```ts
type Currency = typeof currencies[0] | typeof currencies[1] | typeof currencies[2] | ....
```

Từ đó, điều đến trong đầu là index khi đang thực hiện `typeof`. Thực ra đây cũng là literal type và có nghĩa là lấy literal type của `2` trong `currencies`.

Array là object gán phần tử vào index kiểu number, nên bằng cách sử dụng `number` thay cho index literal type

```ts twoslash
const currencies = ["CNY", "EUR", "GBP", "JPY", "KRW", "USD"] as const;

type Currency = (typeof currencies)[number];
//   ^?
```

có thể lấy được union type mong muốn.
