---
description: Cấm tham số không được sử dụng
---

# noUnusedParameters

`noUnusedParameters` là compiler option cấm tham số không được sử dụng.

- Mặc định: `false`
- Phiên bản thêm vào: 2.0

## Giải thích

Cấm tham số trong function không được sử dụng.

```ts twoslash
// @noUnusedParameters: false
function add(n1: number, n2: number, n3: number): number {
  return n1 + n2;
}
```

Khi bật option này sẽ báo lỗi như sau:

```ts twoslash
// @noUnusedParameters: true
// @errors: 6133

function add(n1: number, n2: number, n3: number): number {
  return n1 + n2;
}
```

Để tránh lỗi này, đổi tên tham số không sử dụng thành tên bắt đầu bằng `_`:

```ts twoslash
function add(n1: number, n2: number, _n3: number): number {
  return n1 + n2;
}
```
