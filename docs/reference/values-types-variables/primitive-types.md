---
sidebar_label: Kiểu primitive
---

# Kiểu primitive (primitive types)

Data type trong JavaScript được phân loại thành primitive type và object.

## Đặc tính immutable

Đặc điểm thứ nhất của primitive type trong JavaScript là không thể thay đổi giá trị trực tiếp. Nghĩa là immutable. Ngược lại, object có đặc tính mutable - có thể thay đổi giá trị sau này.

## Không có property

Đặc điểm thứ hai của primitive type trong JavaScript là cơ bản không có property. Primitive type `null` và `undefined` không có property.

```js
null.toString(); // Gây lỗi
```

Tuy nhiên, primitive type như string hay number có thể xử lý như object có property.

```js
"name".length; // 4
```

Như vậy, việc có thể xử lý primitive type như object là đặc điểm của JavaScript. JavaScript có chức năng tự động chuyển đổi primitive type sang object. Chức năng này gọi là autoboxing hoặc auto-boxing.

[Boxing](boxing.md)

## Các loại primitive type

Primitive type có 7 loại sau.

<!-- textlint-disable prh -->

1. Kiểu boolean (kiểu logic): Giá trị boolean `true` hoặc `false`.
2. Kiểu number (kiểu số): Số như `0` hay `0.1`.
3. Kiểu string (kiểu chuỗi): Chuỗi như `"Hello World"`.
4. Kiểu undefined: Type biểu thị giá trị chưa được định nghĩa.
5. Kiểu null: Type biểu thị không có giá trị.
6. Kiểu symbol: Giá trị duy nhất và immutable.
7. Kiểu bigint (số nguyên lớn): Số nguyên lớn như `9007199254740992n` mà kiểu number không xử lý được.
<!-- textlint-enable prh -->

Ngoài các primitive type trên, tất cả đều có thể coi là object trong JavaScript. Array, regular expression object v.v. đều là object.

<PostILearned>

・Primitive type của JS là immutable và không có property
・Có "autoboxing" cho phép xử lý primitive như object
・Primitive có 7 loại: boolean, number, string, undefined, null, symbol, bigint
・Ngoài ra tất cả đều là object

</PostILearned>
