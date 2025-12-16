---
sidebar_label: Destructuring assignment của array
---

# Destructuring assignment của array

## Cơ bản

Trong JavaScript, một cách để lấy phần tử từ array là truy cập bằng index như `array[1]`. Ngoài cách này, còn có thể sử dụng destructuring assignment để truy cập phần tử array.

Ví dụ, để lấy 3 phần tử đầu tiên từ array `[1, 2, 3, 4, 5]` và gán vào biến, viết như sau.

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [one, two, three] = oneToFive;
console.log(one);
// @log: 1
console.log(two);
// @log: 2
console.log(three);
// @log: 3
```

Khi destructuring assignment cho phần tử không tồn tại, biến sẽ được gán `undefined`. JavaScript không báo lỗi trong trường hợp này.

```js twoslash
const oneToFive = [1, 2];
const [one, two, three] = oneToFive;
console.log(three);
// @log: undefined
```

Trong TypeScript, kiểu của giá trị được destructuring assignment từ array `T[]` sẽ là kiểu `T`. Ví dụ, nếu destructuring assignment từ `[1, 2, 3, 4, 5]` kiểu `number[]`, kiểu sẽ là `number`.

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [one, two, three] = oneToFive;
const num: number = one; // one là kiểu number nên có thể gán
```

Tuy nhiên, trường hợp sẽ khác khi bật compiler option `noUncheckedIndexedAccess` của TypeScript.

[noUncheckedIndexedAccess](../../tsconfig/nouncheckedindexedaccess.md)

Khi option này được bật, destructuring assignment từ array `T[]` sẽ có kiểu `T | undefined`, nghĩa là kiểu `T` hoặc undefined. Ví dụ, nếu destructuring assignment từ `[1, 2, 3, 4, 5]` kiểu `number[]`, kiểu sẽ là `number | undefined`.

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [one, two, three] = oneToFive;
const num: number = one;
// Dòng trên sẽ báo compile error.
// one là number | undefined nên không thể gán cho number.
```

## Destructuring assignment với array lồng nhau

Destructuring assignment của JavaScript không chỉ dùng cho array phẳng mà còn có thể trích xuất phần tử từ array có cấu trúc lồng nhau. Cách viết destructuring assignment cho phần tử lồng nhau là lồng bracket (`[ ]`) theo cấu trúc.

```ts twoslash
const twoByTwo = [
  [1, 2],
  [3, 4],
];
const [[one, two], [three]] = twoByTwo;
console.log(one);
// @log: 1
console.log(two);
// @log: 2
console.log(three);
// @log: 3
```

## Destructuring assignment phần tử ở giữa

Destructuring assignment của array không chỉ lấy từ đầu mà còn có thể lấy phần tử ở giữa. Trong trường hợp đó, viết số dấu phẩy tương ứng với số phần tử không cần lấy.

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [, , , four, five] = oneToFive;
console.log(four);
// @log: 4
console.log(five);
// @log: 5
```

## Gán phần còn lại

Khi destructuring assignment array trong JavaScript, có thể sử dụng rest pattern (`...`) để lấy phần còn lại của array và gán vào biến.

```ts twoslash
const oneToFive = [1, 2, 3, 4, 5];
const [one, ...rest] = oneToFive;
console.log(one);
// @log: 1
console.log(rest);
// @log: [ 2, 3, 4, 5 ]
```

Trong TypeScript, kiểu của phần còn lại sẽ là array `number[]`.

## Thông tin liên quan

[Truy cập phần tử array](how-to-access-elements-in-an-array.md)

[Destructuring assignment của object](../object/destructuring-assignment-from-objects.md)
