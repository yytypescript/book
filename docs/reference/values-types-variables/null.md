---
sidebar_label: Kiểu null
---

# Kiểu null

null trong JavaScript là giá trị biểu thị không có giá trị.

## null literal

null literal trong JavaScript là `null`.

```ts twoslash
const x = null;
```

## Type annotation của null

Để type annotation cho null trong TypeScript, sử dụng `null`.

```ts twoslash
const x: null = null;
```

## Lưu ý về toán tử typeof

JavaScript có toán tử typeof để kiểm tra type của giá trị. Cần lưu ý khi dùng `typeof` với `null` sẽ trả về `"object"`.

```ts twoslash
console.log(typeof null);
// @log: "object"
```

Chi tiết về toán tử typeof xem tại phần "Toán tử typeof".

[Toán tử typeof (typeof operator)](typeof-operator.md)
