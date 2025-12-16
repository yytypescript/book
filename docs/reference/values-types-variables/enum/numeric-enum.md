---
sidebar_label: Numeric enum
---

# Numeric enum

Numeric enum trong TypeScript là loại enum điển hình nhất. Giá trị của các member được đánh số thứ tự từ `0` trở đi theo thứ tự từ trên xuống.

```ts twoslash
enum Position {
  Top, // 0
  Right, // 1
  Bottom, // 2
  Left, // 3
}
```

Có thể gán giá trị cho member. Khi gán giá trị, các member tiếp theo sẽ được đánh số thứ tự tiếp nối.

```ts twoslash
enum Position {
  Top = 1, // 1
  Right, // 2
  Bottom, // 3
  Left, // 4
}
```
