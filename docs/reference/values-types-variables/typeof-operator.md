---
sidebar_label: Toán tử typeof
---

# Toán tử typeof (typeof operator)

Toán tử `typeof` của JavaScript cho phép kiểm tra kiểu của giá trị.

```js twoslash
typeof true; //=> "boolean"
typeof 0; //=> "number"
typeof "Hello World"; //=> "string"
typeof undefined; //=> "undefined"
typeof null; //=> "object"
typeof Symbol(); //=> "symbol"
typeof 1n; //=> "bigint"
typeof [1, 2, 3]; //=> "object"
typeof { a: 1, b: 2 }; //=> "object"
typeof (() => {}); //=> "function"
```

## Sử dụng `typeof` trong TypeScript để dùng kiểu đó trong if hoặc switch

Trong TypeScript, khi sử dụng toán tử `typeof` kết hợp với if hoặc switch, biến đó có thể được xử lý như kiểu tương ứng khi điều kiện khớp. Ví dụ sau cho thấy biến `n` có kiểu `unknown` được xác định là kiểu `string` bằng toán tử `typeof`.

```ts twoslash
// @noErrors
const n: unknown = "";

if (typeof n === "string") {
  n.toU;
  //   ^|
}
```

## Phân biệt `null`

Điều đáng chú ý với toán tử `typeof` là trường hợp giá trị là `null`. Kết quả của `typeof null` không phải `"null"` mà là `"object"`. Đây là phần dễ gây hiểu nhầm nên cần chú ý. Đặc biệt khi muốn xác định giá trị có phải object không, nếu không ý thức rằng `typeof null` là `"object"` thì có thể gây ra bug không mong muốn.

```js twoslash
// Implementation có vấn đề
function isObject(value) {
  return typeof value === "object"; // Không xem xét trường hợp value là null
}

isObject(null); // Giá trị trả về là true
```

Implementation có xem xét `typeof null` như sau.

```js twoslash
function isObject(value) {
  return value !== null && typeof value === "object";
}
```

Phần giải thích ở đây là toán tử typeof của JavaScript. Về toán tử typeof type của TypeScript, hãy xem phần giải thích toán tử typeof type.

[Toán tử typeof type](../type-reuse/typeof-type-operator.md)

## Phân biệt mảng

Như ví dụ trên, khi áp dụng `typeof` cho mảng sẽ trả về `"object"`. Đây không phải bug, vì mảng là object nên được phân biệt như vậy.

Tuy nhiên, vì có nhiều cơ hội phân biệt xem đó có phải mảng không, nên có method chuyên dụng `Array.isArray()` trong object `Array`.

Khi sử dụng `Array.isArray()` và nhận giá trị trả về true, biến đó được xác định là kiểu `any[]`.

```ts twoslash
const n: unknown = [];

// ---cut---
if (Array.isArray(n)) {
  // n is any[]
}
```

Khi muốn xác định `any[]` là mảng của kiểu tùy ý, sử dụng các function kiểm tra kiểu như `typeof` hoặc `Array.isArray()` cho từng phần tử.

[unknown](../statements/unknown.md)

[Type guard](../functions/type-guard-functions.md)
