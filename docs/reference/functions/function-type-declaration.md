---
sidebar_label: Khai báo kiểu function
---

# Khai báo kiểu function (function type declaration)

Trong TypeScript, bạn có thể khai báo kiểu của function. Khai báo kiểu function là việc định nghĩa interface của function mà không chỉ ra implementation.

## Cú pháp khai báo kiểu function

Khai báo kiểu function sử dụng [type alias](../values-types-variables/type-alias.md). Cú pháp như sau:

```ts twoslash
type kiểu_tham_số = any;
type kiểu_giá_trị_trả_về = any;
// ---cut---
type tên_kiểu = (tên_tham_số: kiểu_tham_số) => kiểu_giá_trị_trả_về;
```

Ví dụ, khai báo kiểu cho function nhận kiểu number và trả về kiểu number:

```ts twoslash
type Increment = (num: number) => number;
```

## Sử dụng khai báo kiểu làm type annotation

Khai báo kiểu function đã định nghĩa có thể được sử dụng làm type annotation cho [arrow function](./arrow-functions.md).

```ts twoslash
type Increment = (num: number) => number;
// ---cut---
const increment: Increment = (num: number): number => num + 1;
//               ^^^^^^^^^Type annotation
```

Cũng có thể sử dụng cho type annotation của [function expression](./function-expression.md).

```ts twoslash
type Increment = (num: number) => number;
// ---cut---
const increment: Increment = function (num: number): number {
  return num + 1;
};
```

Tuy nhiên, không thể sử dụng cho type annotation của [function declaration](./function-declaration.md).

## Bỏ qua type annotation trong function implementation

Khi sử dụng khai báo kiểu function làm type annotation, type annotation cho tham số và giá trị trả về ở phía implementation có thể được bỏ qua.

```ts twoslash
type Increment = (num: number) => number;
// ---cut---
const f1: Increment = (num: number): number => num + 1;
// ↓Cú pháp rút gọn
const f2: Increment = (num) => num + 1;
```

Trong code thực tế, thường viết dạng rút gọn.

## Khai báo kiểu function bằng method syntax

Trong TypeScript, ngoài cách khai báo kiểu function bằng arrow function syntax, còn có thể khai báo bằng method syntax.

```ts twoslash title="Method syntax"
type kiểu_tham_số = any;
type kiểu_giá_trị_trả_về = any;
// ---cut---
type tên_kiểu = {
  (tên_tham_số: kiểu_tham_số): kiểu_giá_trị_trả_về;
};
```

Arrow function syntax và method syntax chỉ khác cách viết. Hai khai báo kiểu sau là cùng kiểu.

```ts twoslash
// Khai báo kiểu bằng arrow function syntax
type Increment1 = (num: number) => number;
// Khai báo kiểu bằng method syntax
type Increment2 = {
  (num: number): number;
};
```

Thông thường, khai báo kiểu bằng arrow function syntax. Vì arrow function syntax ngắn gọn và đơn giản hơn.

Khai báo kiểu bằng method syntax đôi khi được sử dụng cho khai báo kiểu của [overload function](./overload-functions.md).

## Khai báo kiểu function từ function

Trong TypeScript, bạn có thể khai báo kiểu function từ implementation của function. Sử dụng [type operator `typeof`](../type-reuse/typeof-type-operator.md) trên giá trị function.

```ts twoslash
// Implementation của function
function increment(num: number): number {
  return num + 1;
}
// Khai báo kiểu function
type Increment = typeof increment;
//   ^?
```

<PostILearned>

・Trong TypeScript có thể khai báo kiểu function
Ví dụ: type Func = (n: number) => number
・Kiểu đã định nghĩa có thể sử dụng trong type annotation
・Trong trường hợp đó, type annotation phía implementation có thể bỏ qua
・Cũng có khai báo kiểu dạng method
・Thông thường sử dụng khai báo kiểu dạng arrow function
・Cũng có thể suy ra kiểu từ function bằng typeof

</PostILearned>
