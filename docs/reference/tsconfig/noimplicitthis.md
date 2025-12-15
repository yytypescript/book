---
description: Bắt buộc type annotation cho this
tags: [strict]
---

# noImplicitThis

`noImplicitThis` là compiler option bắt buộc type annotation cho this.

- Mặc định: `true` nếu [strict](./strict.md) được bật, ngược lại là `false`
- Phiên bản thêm vào: 2.0
- TypeScript khuyến nghị nên bật

## Giải thích

Named function và anonymous function khác với arrow function ở chỗ `this` được xác định tại runtime. Do đó, khi sử dụng `this` bên trong, chúng được xem như có type `any` tại thời điểm viết function.

Ví dụ, xét function `lengthOfDiagonal()` tính độ dài đường chéo. Nếu (ngang, dọc) là (width, height) thì function sẽ như sau:

```ts twoslash
// @noErrors
function lengthOfDiagonal(): number {
  return (this.width ** 2 + this.height ** 2) ** (1 / 2);
}
```

Gán function này vào instance của object có property `width, height` thì có thể tính độ dài đường chéo:

```ts twoslash
declare function lengthOfDiagonal(): number;

// ---cut---
const area = {
  width: 3,
  height: 4,
  diagonal: lengthOfDiagonal,
};

console.log(area.diagonal());
// @log: 5
```

Nếu nhầm lẫn gõ `width` thành `witch` thì function này sẽ không trả về kết quả như mong muốn:

```ts twoslash
declare function lengthOfDiagonal(): number;

// ---cut---
const area = {
  witch: 3,
  height: 4,
  diagonal: lengthOfDiagonal,
};

console.log(area.diagonal());
// @log: NaN
```

Khi bật option này, `this` đang bị nhận dạng là type `any` sẽ không thể thực thi được trừ khi làm rõ type của nó:

```ts twoslash
// @noImplicitThis: true
// @errors: 2683
function lengthOfDiagonal(): number {
  return (this.width ** 2 + this.height ** 2) ** (1 / 2);
}
```

Để tránh lỗi này, phải chỉ rõ `this` là gì. Chi tiết về `this` parameter có ở trang function, vui lòng tham khảo:

[this引数 (this parameter)](../functions/this-parameters.md)

```ts twoslash
type Area = {
  width: number;
  height: number;
  diagonal(): number;
};

function lengthOfDiagonal(this: Area): number {
  return (this.width ** 2 + this.height ** 2) ** (1 / 2);
}

const area: Area = {
  width: 3,
  height: 4,
  diagonal: lengthOfDiagonal,
};
```
