---
sidebar_label: Kiểu bigint
title: Kiểu bigint (số nguyên lớn)
---

Kiểu bigint trong JavaScript là primitive type có thể xử lý số nguyên lớn hơn kiểu number.

## bigint literal

bigint literal trong JavaScript được viết bằng cách thêm `n` vào cuối giá trị số nguyên.

```ts twoslash
const x = 100n;
```

Để sử dụng bigint literal trong TypeScript, cần set compiler option target là es2020 trở lên.

## Type annotation của bigint

Để type annotation cho bigint trong TypeScript, sử dụng `bigint`.

```ts twoslash
const x: bigint = 100n;
```

## Hàm BigInt

bigint có thể được tạo bằng hàm BigInt. Hàm BigInt nhận argument đầu tiên là số hoặc chuỗi.

```ts twoslash
const x = BigInt(100);
const y = BigInt("9007199254740991");
```

Để sử dụng hàm BigInt trong TypeScript, cần set compiler option lib là es2020 trở lên.

## Tính toán bigint với number

bigint và number không thể tính toán trực tiếp với nhau. Cần chuyển đổi về cùng một type.

```ts twoslash
// @errors: 2365
2n + 3;
```

Trừ khi number có phần thập phân, an toàn hơn là chuyển về bigint có phạm vi biểu diễn rộng hơn.

```ts twoslash
const i = 2n + BigInt(3);
console.log(i);
// @log: 5n
```

## Lưu ý khi dùng bigint

Truyền bigint trực tiếp vào `JSON.stringify()` sẽ phát sinh TypeError.

```ts twoslash
JSON.stringify(12n);
// @error: TypeError: Do not know how to serialize a BigInt
```

Truyền object chứa bigint vào `JSON.stringify()` cũng phát sinh TypeError.

```ts twoslash
JSON.stringify({ x: 12n });
// @error: TypeError: Do not know how to serialize a BigInt
```
