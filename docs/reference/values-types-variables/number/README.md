---
sidebar_label: number type
slug: /reference/values-types-variables/number
title: number type
---

number type trong JavaScript là type cho các giá trị số bao gồm số nguyên như 1, -1 và số thập phân như 0.1. Trong các ngôn ngữ như PHP có 2 type riêng biệt cho số: type biểu thị số nguyên (int) và type biểu thị số thập phân (float hoặc double). Các ngôn ngữ như Java còn phân chia thêm type số nguyên thành 32-bit và 64-bit. JavaScript không phân biệt số nguyên và số thập phân ở level type. Cả hai đều được biểu thị bằng number type.

## Numeric literal

Numeric literal trong JavaScript được viết trực tiếp như số thực tế.

<!--prettier-ignore-->
```js
123 // Số nguyên
-123 // Số nguyên (số âm)
20.315 // Số thập phân
```

Số thập phân có thể viết bắt đầu bằng dấu chấm thập phân. Số nguyên cũng có thể viết kết thúc bằng dấu chấm thập phân.

<!--prettier-ignore-->
```js
0.1 === .1
5.0 === 5.
```

### Binary, octal, hexadecimal

Có thể biểu thị số ở dạng binary, octal và hexadecimal. Thêm `0b`, `0o`, `0x` tương ứng trước số muốn biểu thị.

<!--prettier-ignore-->
```ts
0b1010 // Binary
0o755 // Octal
0xfff // Hexadecimal
```

### Numeric separators

Numeric literal trong JavaScript có thể viết với dấu gạch dưới để phân cách cho dễ đọc. Số chữ số phân cách là tùy ý. Có thể chọn theo giá trị muốn biểu thị hoặc theo thói quen của quốc gia, vùng.

<!--prettier-ignore-->
```js
100_000_000 // 100 triệu
```

Tuy nhiên, không thể đặt `_` ở đầu, cuối, trước hoặc sau dấu thập phân, hoặc liên tiếp 2 ký tự trở lên. Nghĩa là không thể viết như sau.

```ts
_100
100_
100_.0
100._0
1__00
```

### Property của numeric literal

Trong JavaScript, khi tham chiếu trực tiếp property của numeric literal, dấu chấm thập phân và dấu chấm property accessor không phân biệt được nên sẽ bị syntax error.

```ts twoslash
// @errors: 1351
5.toString(); // Cách viết này bị syntax error
```

Để tránh, cần viết 2 dấu chấm liên tiếp hoặc bao số trong ngoặc.

<!--prettier-ignore-->
```ts twoslash
5..toString();
(5).toString();
```

## Type annotation của number type

Trong TypeScript, type annotation cho number type sử dụng `number`.

```ts twoslash
const count: number = 123;
```

Có type tên tương tự là `Number` type, nhưng đây là type khác với `number` nên cần chú ý.

## Phạm vi số

number type trong JavaScript là số dấu phẩy động độ chính xác kép theo IEEE 754. Trong 64 bit, 52 bit dùng để lưu số, 11 bit dùng cho vị trí thập phân, 1 bit dùng cho dấu dương âm. Phạm vi số có thể xử lý chính xác là từ `-(2^53 − 1)` đến `2^53 − 1`. Về số nguyên, phạm vi này hẹp hơn type số nguyên 64-bit của các ngôn ngữ khác nên cần chú ý.

## Số đặc biệt

number type trong JavaScript có các giá trị đặc biệt là `NaN` và `Infinity`.

### NaN

`NaN` là biến biểu thị not-a-number (không phải số). Trong JavaScript, khi kết quả xử lý không phải là số, có thể trả về `NaN`. Ví dụ, function `parseInt` chuyển string thành số sẽ trả về `NaN` với input không thể chuyển thành số.

```js twoslash
const price = parseInt("một trăm đồng");
console.log(price);
// @log: NaN
```

Để kiểm tra giá trị có phải `NaN` không, sử dụng `Number.isNaN`.

```ts twoslash
const price = parseInt("một trăm đồng");
if (Number.isNaN(price)) {
  console.log("Không thể chuyển thành số");
}
```

`NaN` đặc biệt ở chỗ so sánh bằng luôn trả về `false`.

```js twoslash
console.log(NaN == NaN);
// @log: false
console.log(NaN === NaN);
// @log: false
```

### Infinity

`Infinity` là biến biểu thị vô cực. Ví dụ, khi chia 1 cho 0, kết quả là giá trị này.
