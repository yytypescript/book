---
sidebar_label: string型
title: string型 (文字列型)
---

## String literal

<!-- textlint-disable prh -->

Trong các ngôn ngữ như Java, dấu ngoặc kép biểu thị string literal (String型), dấu ngoặc đơn biểu thị char literal (char型), nghĩa là type thay đổi theo loại dấu ngoặc dùng.

<!-- textlint-enable prh -->

Trong khi đó JavaScript, dù dùng dấu ngoặc kép hay đơn đều là string type giống nhau. Điểm này giống PHP. Ngoài ra dùng backtick (`` ` ``) cũng là string type.

<!--prettier-ignore-->
```ts twoslash
"Hello";
'Hello';
`Hello`;
```

Nếu chuỗi chứa cùng dấu ngoặc, phải escape bằng backslash `\`.

<!--prettier-ignore-->
```ts twoslash
'He said "madam, I\'m Adam."'
"He said \"madam, I'm Adam.\""
```

String literal dùng dấu ngoặc kép và đơn không thể xuống dòng giữa chuỗi. Muốn xuống dòng cần dùng escape sequence như `\n`.

### Template literal

Trong JavaScript, chuỗi được bao bởi backtick `` ` `` gọi là template literal. Template literal cho phép xuống dòng và chèn expression (expression interpolation).

Để xuống dòng, chỉ cần xuống dòng thực tế trong template literal, sẽ được phản ánh đúng như vậy.

```ts twoslash
console.log(`実際に改行を
してみる`);
// @log: 実際に改行を<br />してみる
```

Để chèn expression, viết theo cú pháp `${expression}`.

```ts twoslash
const count = 10;
console.log(`現在、${count}名が見ています。`);
// @log: 現在、10名が見ています。
```

Phần expression không chỉ là biến, còn có thể viết biểu thức tính toán hoặc hàm.

<!--prettier-ignore-->
```ts twoslash
`税込み${Math.floor(100 * 1.1)}円`
```

### Nên dùng `'`, `"`, hay `` ` `` cho string literal?

Như đã nói, JavaScript có 3 loại dấu ngoặc để biểu thị chuỗi, vậy nên dùng loại nào? Ở đây giới thiệu cách phân biệt theo Prettier - code formatter của JavaScript.
Lưu ý đây không phải câu trả lời đúng hay de facto standard, nếu team có quy chuẩn riêng thì nên tuân theo quy chuẩn đó.

1. Cơ bản dùng `"`
1. Nếu chuỗi chứa `"` thì dùng `'`
1. Khi cần string interpolation thì dùng `` ` ``

#### Cơ bản dùng `"`

Với chuỗi thông thường không có string interpolation bên trong thì dùng `"`.

#### Nếu chuỗi chứa `"` thì dùng `'`

Nếu chuỗi chứa `"` thì dùng `'` thay vì escape.

#### Khi cần string interpolation thì dùng `` ` ``

Khi cần tính toán expression thì dùng template literal `` ` ``.

## Type annotation của string

Type annotation của string trong TypeScript dùng `string`.

```ts twoslash
const message: string = "Hello";
```

Có type `String` tên khá giống, nhưng cần lưu ý đây khác với `string`.

## Nối chuỗi

Nối chuỗi trong JavaScript dùng toán tử nối chuỗi (`+`). Toán tử tương tự cũng được dùng cho phép cộng number型.

<!--prettier-ignore-->
```ts twoslash
"hello" + "world"
```

Trong PHP, toán tử nối chuỗi (`.`) và toán tử cộng số (`+`) là 2 toán tử khác nhau, nhưng JavaScript dùng cùng dấu cộng cho cả nối chuỗi và phép cộng, nên những người từ PHP chuyển sang JavaScript cần chú ý.
