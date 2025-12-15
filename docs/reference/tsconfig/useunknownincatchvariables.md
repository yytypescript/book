---
description: Xử lý e trong catch(e) bắt exception là unknown type
tags: [strict]
---

# useUnknownInCatchVariables

`useUnknownInCatchVariables` là compiler option xử lý `e` trong `catch(e)` bắt exception là unknown type.

- Mặc định: `true` nếu [strict](./strict.md) được bật, ngược lại là `false`
- Phiên bản thêm vào: 4.4
- TypeScript khuyến nghị nên bật

## Giải thích

JavaScript có thể throw bất kỳ giá trị nào làm exception. Do đó giá trị bắt được là `any` type.

```ts twoslash
// @useUnknownInCatchVariables: false
// case 1
try {
  throw new Error();
} catch (err) {
  //       ^?
}

// case 2
try {
  throw "This is an error!";
} catch (err) {
  //       ^?
}

// case 3
try {
  throw undefined;
} catch (err) {
  //       ^?
}
```

Sự hỗn loạn này cuối cùng được sắp xếp trong TypeScript 4.0. Bằng cách ghi rõ `unknown` type cho giá trị bắt được, có thể đạt được type safe mặc dù không biết type của giá trị bắt được.

```ts twoslash
// @useUnknownInCatchVariables: false
// case 1
try {
  throw new Error();
} catch (err) {
  //       ^?
}

// case 2
try {
  throw "This is an error!";
} catch (err: unknown) {
  //       ^?
}

// case 3
try {
  throw undefined;
} catch (err: unknown) {
  //       ^?
}
```

Option này làm tính năng này luôn được bật. Giá trị exception bắt được sẽ được phân tích là `unknown` type mà không cần ghi rõ type.

```ts twoslash
// case 1
try {
  throw new Error();
} catch (err) {
  //       ^?
}

// case 2
try {
  throw "This is an error!";
} catch (err) {
  //       ^?
}

// case 3
try {
  throw undefined;
} catch (err) {
  //       ^?
}
```

Ngoài ra, nếu muốn nới lỏng ràng buộc này, tức muốn là `any` type thay vì `unknown` type, hãy ghi rõ `any` type cho giá trị bắt được.
