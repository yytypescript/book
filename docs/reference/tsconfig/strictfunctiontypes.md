---
description: Làm nghiêm ngặt check variance của parameter type
tags: [strict]
---

# strictFunctionTypes

`strictFunctionTypes` là compiler option làm nghiêm ngặt check variance của parameter type.

- Mặc định: `true` nếu [strict](./strict.md) được bật, ngược lại là `false`
- Phiên bản thêm vào: 2.6
- TypeScript khuyến nghị nên bật

## Bivariance của parameter là không an toàn

Function trong TypeScript có tính chất bivariance của parameter (parameter bivariance). Hãy xem từng bước để hiểu rõ:

Đầu tiên, xét phạm vi của 3 type sau:

1. `number`
2. `number | null`
3. `number | null | undefined`

`number` là type hẹp hơn `number | null`. Phạm vi của `number | null` gồm các giá trị number type như `1`, `0.5` và null type. Phạm vi của `number` type chỉ gồm number type. `number | null | undefined` là type rộng nhất trong các type trên.

| Type                                             | Độ rộng phạm vi | Ví dụ giá trị                      |
| ------------------------------------------------ | --------------- | ---------------------------------- |
| `number`                                         | Hẹp             | `1`, `0.5`...                      |
| <code>number &#124; null</code>                  | Rộng            | `1`, `0.5`..., `null`              |
| <code>number &#124; null &#124; undefined</code> | Rộng hơn        | `1`, `0.5`..., `null`, `undefined` |

Tiếp theo, xét biến `func` sau. Type của biến này là function nhận parameter `number | null`:

```ts twoslash
let func: (n: number | null) => any;
```

Giá trị type nào có thể gán vào biến `func` này? Đương nhiên, function cùng type với type annotation có thể gán được:

```ts twoslash
let func: (n: number | null) => any;
// ---cut---
func = (n: number | null) => {}; // OK
```

Function nhận `number | null | undefined` rộng hơn parameter `number | null` thì có gán được không? Điều này cũng OK:

```ts twoslash
let func: (n: number | null) => any;
// ---cut---
func = (n: number | null | undefined) => {}; // OK
```

Đặc tính có thể mở rộng phạm vi parameter type như vậy được gọi là **contravariance của parameter (parameter contravariance)**.

Function nhận `number` hẹp hơn parameter `number | null` thì có gán được không? Trong TypeScript điều này cũng có thể gán được:

```ts twoslash
// @strictFunctionTypes: false
let func: (n: number | null) => any;
// ---cut---
func = (n: number) => {}; // OK
```

Đặc tính có thể thu hẹp phạm vi parameter type như vậy được gọi là **covariance của parameter (parameter covariance)**.

Function type trong TypeScript có cả hai đặc tính contravariance và covariance của parameter. Hai đặc tính này gộp lại được gọi là **bivariance của parameter**.

Bivariance của parameter có khía cạnh nguy hiểm. Vì đang gán function chỉ nhận `number` vào function `func` có thể nhận `null`. Nếu truyền `null` vào `func`, sẽ xảy ra lỗi runtime:

```ts twoslash
// Function type có thể nhận null
let func: (n: number | null) => any;
// Gán function chỉ nhận number
func = (n: number) => n.toString();
// func có thể truyền null → Mâu thuẫn gây lỗi runtime
func(null);
// @error: Cannot read properties of null (reading 'toString')
// @strictFunctionTypes: false
```

Để tránh lỗi runtime như vậy, parameter type chỉ nên cho phép contravariance. Và nếu là covariance thì nên báo compile error. Tuy nhiên, TypeScript cho phép parameter type là bivariance (tức covariance cũng OK) nên không an toàn.

## `strictFunctionTypes` không cho phép covariance của parameter

Giải quyết vấn đề trên là compiler option `strictFunctionTypes`. Đặt thành `true` thì parameter sẽ trở thành contravariant. Nếu parameter là covariant thì TypeScript sẽ cảnh báo:

```ts twoslash
// @errors: 2322
let func: (n: number | null) => any;
// Invariant
func = (n: number | null) => {}; // OK
// Contravariant
func = (n: number | null | undefined) => {}; // OK
// Covariant
func = (n: number) => {}; // NG
```

`strictFunctionTypes` giúp ngăn chặn lỗi runtime không mong muốn. Khuyến nghị nên set `strictFunctionTypes` thành `true`.

## Method type không được check

Check của `strictFunctionTypes` chỉ áp dụng cho function type. Không áp dụng cho method type:

```ts twoslash
interface Obj {
  // Method type
  method(n: number | null): any;
}
const obj: Obj = {
  method: (n: number) => {}, // Không được check
};
```

Ngay cả với method của interface, **method được định nghĩa bằng function type** sẽ được check bởi `strictFunctionTypes`:

```ts twoslash
// @errors: 2322
interface Obj {
  // Function type
  method: (n: number | null) => any;
}
const obj: Obj = {
  method: (n: number) => {}, // Check hoạt động
};
```

<PostILearned>

⚙️strictFunctionTypes của TypeScript là compile option làm nghiêm ngặt check variance của parameter type
☹️Parameter của TypeScript là bivariant nên không an toàn
🔥Có thể xảy ra lỗi runtime
✅strictFunctionTypes biến thành contravariant
👍Option khuyến nghị nên bật

</PostILearned>

## Thông tin liên quan

[strict](./strict.md)
