---
description: Cấm biến không được sử dụng
---

# noUnusedLocals

`noUnusedLocals` là compiler option cấm biến không được sử dụng.

- Mặc định: `false`
- Phiên bản thêm vào: 2.0

## Giải thích

Cấm biến đã khai báo nhưng không được sử dụng.

```ts twoslash
function add(n1: number, n2: number): number {
  const message: string = `the sum is ${n1 + n2}`;

  return n1 + n2;
}
```

Khi bật option này sẽ báo lỗi như sau:

```ts twoslash
// @noUnusedLocals: true
// @errors: 6133
function add(n1: number, n2: number): number {
  const message: string = `the sum is ${n1 + n2}`;

  return n1 + n2;
}
```
