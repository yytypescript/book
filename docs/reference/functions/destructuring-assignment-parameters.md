---
sidebar_label: "Destructuring assignment parameter"
---

# Destructuring assignment parameter

Trong JavaScript, cú pháp destructuring assignment cũng có thể được sử dụng cho tham số của function. Khi tham số là object hoặc array, destructuring assignment parameter rất tiện lợi nếu bạn chỉ muốn sử dụng một phần của object hoặc array đó trong function.

## Cú pháp destructuring assignment parameter

Trong JavaScript, cú pháp destructuring assignment parameter cho object được viết bằng cách đặt tên property của object trong ngoặc nhọn. Tên tham số phải trùng với tên property.

```js twoslash
function foo({ a, b }) {
  console.log(a, b);
}
foo({ a: 1, b: 2, c: 3 });
// @log: 1 2
```

Để nhận property với tên tham số khác, bạn chỉ định tên tham số sau dấu `:`.

```js twoslash
function foo({ a: x, b: y }) {
  console.log(x, y);
}
foo({ a: 1, b: 2 });
// @log: 1 2
```

Destructuring assignment parameter cho array được viết bằng cách đặt tên biến sẽ được gán phần tử array trong ngoặc vuông. Bạn có thể tự do chọn tên tham số tương ứng với phần tử array.

```js twoslash
function bar([a, b]) {
  console.log(a, b);
}
bar([1, 2, 3]);
// @log: 1 2
```

Destructuring assignment parameter cũng có thể được sử dụng với arrow function.

```js twoslash
const foo = ({ a, b }) => {};
const bar = ([a, b]) => {};
```

## Type annotation cho destructuring assignment parameter

Trong TypeScript, khi destructure object, type annotation cho object được viết bên phải destructuring assignment parameter.

```ts twoslash
function foo({ a, b }: { a: number; b: number }) {}
//                   ^^^^^^^^^^^^^^^^^^^^^^^^^^Type annotation
```

Khi destructure array, type annotation cho array type cũng được viết bên phải destructuring assignment parameter.

```ts twoslash
// @noUncheckedIndexedAccess: false
function bar([num1]: number[]) {}
//            ^?
```

Khi type annotation là array type và compiler option `noUncheckedIndexedAccess` được bật, destructuring assignment parameter sẽ trở thành union type với `undefined`.

```ts twoslash
// @noUncheckedIndexedAccess: true
function bar([num1]: number[]) {}
//            ^?
```

[noUncheckedIndexedAccess](../tsconfig/nouncheckedindexedaccess.md)

Nếu type annotation của destructuring assignment parameter cho array là tuple type, ngay cả khi `noUncheckedIndexedAccess` được bật, nó sẽ không trở thành union type với `undefined`.

```ts twoslash
// @noUncheckedIndexedAccess: true
function bar([num1, num2]: [number, number]) {}
//            ^?
```

## Giá trị mặc định và lỗi compile

Trong JavaScript, nếu không có object property hoặc array element tương ứng với destructuring assignment parameter, `undefined` sẽ được gán.

```js twoslash
function foo({ a }) {
  console.log(a);
}
function bar([a]) {
  console.log(a);
}
foo({});
// @log: undefined
bar([]);
// @log: undefined
```

Mặt khác, trong TypeScript, nếu không có object property hoặc array element tương ứng với destructuring assignment parameter, sẽ xảy ra lỗi compile.

```ts twoslash
// @errors: 2345
function foo({ a }: { a: number }) {}
function bar([a]: [number]) {}
foo({});
bar([]);
```

## Default parameter cho destructuring assignment parameter

Trong JavaScript, để chỉ định default parameter cho destructuring assignment parameter, bạn viết `=` và giá trị mặc định sau tên tham số.

```js twoslash
function foo({ a = 0 }) {
  //             ^^^Chỉ định giá trị mặc định
  console.log(a);
}
function bar([a = 0]) {
  //            ^^^Chỉ định giá trị mặc định
  console.log(a);
}
foo({});
// @log: 0
bar([]);
// @log: 0
```

Trong TypeScript, khi thêm type annotation cho default parameter, bạn đánh dấu property là optional bằng `?` cho object.

```ts twoslash
function foo({ a = 0 }: { a?: number | string }) {}
//             ^?
```

Nếu kiểu của property có thể được suy luận từ giá trị mặc định, type annotation có thể được bỏ qua.

```ts twoslash
function foo({ a = 0 }) {}
//             ^?
```

## Giá trị mặc định cho toàn bộ destructuring assignment parameter

Để chỉ định giá trị mặc định cho toàn bộ destructuring assignment parameter, bạn viết `=` và giá trị mặc định sau cú pháp destructuring assignment. Giá trị mặc định này được sử dụng khi toàn bộ tham số không có hoặc là `undefined`.

```js twoslash
function foo({ a, b } = { a: 0, b: 0 }) {
  console.log(a, b);
}
foo();
// @log: 0 0
foo({ a: 1 });
// @log: 1 undefined

function bar([a, b] = [0, 0]) {
  console.log(a, b);
}
bar();
// @log: 0 0
bar([1]);
// @log: 1 undefined
```

Trong TypeScript, giá trị mặc định cho toàn bộ tham số được viết sau type annotation.

```ts twoslash
//                ................Vị trí type annotation
function foo({ a }: { a?: number } = { a: 0 }) {}
//                                 ^^^^^^^^^^Vị trí giá trị mặc định
```

Bạn cũng có thể chỉ định cả giá trị mặc định cho từng property và giá trị mặc định cho toàn bộ tham số. Trong trường hợp này, khi bỏ qua toàn bộ tham số, giá trị mặc định của từng property sẽ được sử dụng.

```ts twoslash
type Obj = { a?: number; b?: number };
function foo({ a = 0, b = 0 }: Obj = {}) {
  console.log(a + b);
}
foo();
// @log: 0
foo({});
// @log: 0
foo({ a: 1 });
// @log: 1
foo({ a: 1, b: 2 });
// @log: 3
```

## Bỏ qua tên property khi gọi

Trong JavaScript, nếu biến có cùng tên với destructuring assignment parameter đã được định nghĩa, bạn có thể bỏ qua tên property trong object literal và chỉ truyền biến.

```ts twoslash
function bmi({ height, weight }: { height: number; weight: number }) {}

// Biến có cùng tên với property
const height = 170;
const weight = 65;

// Gọi không bỏ qua tên property
bmi({ height: height, weight: weight });

// Gọi bỏ qua tên property
bmi({ weight, height });
```

[Shorthand property names](../values-types-variables/object/shorthand-property-names.md)

<PostILearned>

・Destructuring assignment parameter tiện lợi khi sử dụng một phần của object hoặc array trong function
・Đối với object, viết tham số trong ngoặc nhọn
→ function foo({ a, b })
・Đối với array, viết tham số trong ngoặc vuông
→ function foo([a, b])
・Type annotation được viết sau destructuring assignment
・Cũng có thể chỉ định giá trị mặc định
→ function foo({ a = 0})

</PostILearned>

## Thông tin liên quan

[Destructuring assignment từ object](../values-types-variables/object/destructuring-assignment-from-objects.md)

[Destructuring assignment từ array](../values-types-variables/array/destructuring-assignment-from-array.md)
