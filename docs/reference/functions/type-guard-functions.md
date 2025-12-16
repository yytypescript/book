---
sidebar_label: Type guard function
---

# Type guard function (hàm bảo vệ kiểu)

Compiler của TypeScript phân tích type của biến tại mỗi vị trí trong control flow như `if` hay `switch`, tính năng này được gọi là [control flow analysis](../statements/control-flow-analysis-and-type-guard.md) (phân tích luồng điều khiển).

Bằng cách sử dụng type guard trong các cấu trúc điều khiển như `if` hay `switch` để áp dụng control flow analysis, bạn có thể thu hẹp biến tại mỗi vị trí thành type cụ thể.

TypeScript có sẵn các type guard như `typeof` và `instanceof`, ngoài ra người dùng cũng có thể tự định nghĩa type guard.

## Type guard function do người dùng định nghĩa

Để tạo type guard function do người dùng định nghĩa, bạn sử dụng annotation đặc biệt gọi là type predicate (vị từ kiểu). Type predicate annotation có thể áp dụng cho function có kiểu trả về boolean, và được viết ở phần annotation kiểu trả về như sau.

```ts twoslash
class Animal {}
class Duck {}
// ---cut---
function isDuck(animal: Animal): animal is Duck {
  return animal instanceof Duck;
}
```

Phần `animal is Duck` là type predicate. Với điều này, trong block `if` khi function `isDuck()` trả về `true`, `animal` sẽ được hiểu là type `Duck`.

```ts twoslash
// @errors: 2339
class Animal {}
class Duck {
  public quacks(): void {}
}
declare function isDuck(animal: Animal): animal is Duck;

const animal = new Animal();
// ---cut---
// Ở đây quacks() không tồn tại
animal.quacks();

if (isDuck(animal)) {
  animal.quacks();
  // ...
}
```

Tuy nhiên, đây chỉ là làm cho TypeScript hiểu rằng đó là type đó, không thể khẳng định rằng nó đúng với JavaScript.

```ts twoslash
function isUndefined(value: unknown): value is undefined {
  return typeof value === "number";
}
```

Function `isUndefined()` ở trên rõ ràng là sai, nhưng TypeScript không đưa ra cảnh báo nào cho lỗi này.

## Type predicate

Trong phần giải thích type guard function, chúng ta đã sử dụng thuật ngữ type predicate ngay từ đầu, hãy xem chi tiết hơn một chút.

Tách từ type predicate ra thì được "type + predicate". Nghĩa là predicate về type. Thuật ngữ predicate ban đầu có nguồn gốc từ logic học, và hiểu ý nghĩa của nó sẽ giúp hiểu sâu hơn về type guard function.

Ví dụ, type predicate `animal is Duck` được sử dụng như annotation kiểu trả về của type guard function `isDuck`, nhưng nhìn vào thân function thì thực chất chỉ là function trả về giá trị boolean.

```ts twoslash
class Animal {}
class Duck {}
// ---cut---
function isDuck(animal: Animal): animal is Duck {
  //                             ^^^^^^^^^^^^^^: type predicate
  return animal instanceof Duck; // Chỉ đơn giản trả về giá trị boolean
}
```

Ban đầu, predicate (vị từ) trong logic học là thứ biểu diễn thuộc tính hoặc quan hệ mà đối tượng có. Ví dụ, khi có mệnh đề P "X là số nguyên tố (X is a prime number)", có thể biểu diễn predicate như P(x) với X là biến. Predicate P(X) này trả về true nếu biến X là số nguyên tố như 3, và trả về false nếu là số không nguyên tố như 4. Đây chính xác là function trả về true hoặc false (giá trị chân lý).

Như vậy, predicate là mệnh đề chứa biến (= phán đoán có giá trị chân lý). Type predicate (predicate về type) có thể gọi là "mệnh đề lấy type làm biến". Type predicate như `x is number` biểu diễn phán đoán về type mà biến x có là "x là type number".

```ts
function isNumber(x: unknown): x is number {
  return typeof x === "number";
}
```

Trong ví dụ trước, function `isDuck` là function nhận biến `animal` và trả về giá trị chân lý về mệnh đề `animal is Duck`.

Như đã thấy trong phần giải thích type guard function, việc sử dụng type predicate trong type annotation khác với việc chỉ đơn giản annotation là function trả về type `boolean`, và để thực hiện thu hẹp type trong control flow analysis cần phải sử dụng type predicate.

```ts twoslash
// Có type predicate annotation nên hoạt động như type guard function
function typeGuard(x: unknown): x is number {
  return typeof x === "number";
}
// Chỉ là function trả về giá trị boolean, không hoạt động như type guard function
function notTypeGuard(x: unknown): boolean {
  return typeof x === "number";
}

declare const input: number | string;

// Có thể thu hẹp type
if (typeGuard(input)) {
  input;
  // ^?
} else {
  input;
  // ^?
}

// Không thể thu hẹp type
if (notTypeGuard(input)) {
  input;
  // ^?
} else {
  input;
  // ^?
}
```

Như vậy, type guard function có type predicate có thể thực hiện thu hẹp type tĩnh trong control flow, nhưng function chỉ có annotation trả về type `boolean` thì không thể thu hẹp type như vậy. Hãy chú ý rằng nếu chỉ đơn giản annotation kiểu trả về là `boolean` thì sẽ không hoạt động như type guard.

Tuy nhiên, từ TypeScript 5.5, function như sau không có type predicate annotation cũng hoạt động như type guard function. Vì có thể suy luận type predicate từ thân function, nên type predicate `x is number` được suy luận và trở thành type guard function.

```ts twoslash
// Function không có annotation kiểu trả về này được suy luận với type predicate x is number
function noAnnotation(x: unknown) {
  return typeof x === "number";
}
```

:::caution
Từ phiên bản 5.5 trở đi, nếu chỉ annotation là function trả về type boolean thì vẫn không thể sử dụng như type guard function.
:::

Với sự tăng cường tính năng type predicate này, có thể suy luận type chính xác mà không cần viết type predicate cho callback function sử dụng trong method `filter` của array, v.v.

## Thông tin liên quan

[Thu hẹp type với control flow analysis và type guard](../statements/control-flow-analysis-and-type-guard.md)
