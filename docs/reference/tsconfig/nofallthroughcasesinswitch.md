---
description: Cấm fallthrough trong switch statement
---

# noFallthroughCasesInSwitch

`noFallthroughCasesInSwitch` là compiler option cấm fallthrough trong switch statement.

- Mặc định: `false`
- Phiên bản thêm vào: 1.8

## Giải thích

`fallthrough` có nghĩa là không thực hiện `break` hoặc `return` trong `case` statement của `switch`. Chỉ khi `case` statement không rỗng thì mới kiểm tra nghiêm ngặt xem có `break` hay `return` hay không.

```ts twoslash
function daysOfMonth(month: number): number {
  let days: number = 31;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      break;
    case 2:
      days = 28;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
    default:
      throw new Error("INVALID INPUT");
  }

  return days;
}
```

Đã định nghĩa function `daysOfMonth()` để tính số ngày của một tháng nhưng function này có `fallthrough`. Khi bật option này sẽ báo lỗi như sau:

```ts twoslash
// @noFallthroughCasesInSwitch: true
// @errors: 7029
function daysOfMonth(month: number): number {
  let days: number = 31;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      break;
    case 2:
      days = 28;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
    default:
      throw new Error("INVALID INPUT");
  }

  return days;
}
```

`case 1, case 3, case 5, ....` không được coi là `fallthrough` vì phần thực thi của `case` statement chỉ có `break` và không làm gì cả.

Để tránh lỗi này, thiết kế sao cho mỗi `case` đều có `break` hoặc `return`.

```ts twoslash
function daysOfMonth(month: number): number {
  let days: number = 31;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      break;
    case 2:
      days = 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    default:
      throw new Error("INVALID INPUT");
  }

  return days;
}
```
