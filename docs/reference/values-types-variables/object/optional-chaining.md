---
sidebar_label: Optional chaining
---

# Optional chaining

Optional chaining `?.` trong JavaScript là cách an toàn để tham chiếu property mà không gây error ngay cả khi object reference là `null` hoặc `undefined`.

## Vấn đề khi tham chiếu property gây error

Trong JavaScript, việc tham chiếu property của `null` hoặc `undefined` sẽ gây error.

```js twoslash
const book = undefined;
const title = book.title;
// @error: TypeError: Cannot read property 'title' of undefined

const author = null;
const email = author.email;
// @error: TypeError: Cannot read property 'email' of null
```

Để tránh error, cần kiểm tra xem giá trị có phải `null` hoặc `undefined` không.

```js twoslash
const book = undefined;
const title = book === null || book === undefined ? undefined : book.title;
console.log(title);
// @log: undefined
```

```js twoslash
const book = { title: "Survival TypeScript" };
const title = book === null || book === undefined ? undefined : book.title;
console.log(title);
// @log: "Survival TypeScript"
```

Với object lồng nhau, xử lý kiểm tra càng trở nên phức tạp.

```js twoslash
const book = { author: { email: "alice@example.com" } };
const authorEmail =
  book === null || book === undefined
    ? undefined
    : book.author === null || book.author === undefined
    ? undefined
    : book.author.email;
```

Kiểm tra thì code chạy không error, nhưng lượng code viết ra lại nhiều.

## Cú pháp Optional chaining

Optional chaining trong JavaScript là cách viết giúp tránh tham chiếu nhầm property của `null` hoặc `undefined`, đồng thời giảm lượng code. Optional chaining sử dụng operator `?.`.

```js twoslash
const book = undefined;
const title = book?.title;
//                ^^Optional chaining
console.log(title);
// @log: undefined
```

```js twoslash
const book = { title: "Survival TypeScript" };
const title = book?.title;
console.log(title);
// @log: "Survival TypeScript"
```

Optional chaining có thể sử dụng lồng nhau.

```js twoslash
const book = undefined;
const authorEmail = book?.author?.email;
console.log(authorEmail);
// @log: undefined
```

```js twoslash
const book = { author: { email: "alice@example.com" } };
const authorEmail = book?.author?.email;
console.log(authorEmail);
// @log: "alice@example.com"
```

Nếu biến hoặc property đứng trước `?.` có giá trị `null` hoặc `undefined`, các property phía sau sẽ không được evaluate và trả về `undefined`.

```js twoslash
const book = null;
console.log(book?.title);
// @log: undefined
```

```js twoslash
const book = { author: null };
console.log(book.author?.name);
// @log: undefined
```

## Gọi function

Optional chaining cũng có thể sử dụng khi gọi function. Khi dùng với function, viết `?.` trước dấu ngoặc argument.

```js twoslash
const increment = undefined;
const result = increment?.(1);
console.log(result);
// @log: undefined
```

```js twoslash
const increment = (n) => n + 1;
const result = increment?.(1);
console.log(result);
// @log: 2
```

Gọi method cũng viết tương tự.

```js twoslash
const book = { getPrice: undefined };
console.log(book.getPrice?.());
// @log: undefined
```

```js twoslash
const book = {
  getPrice() {
    return 0;
  },
};
console.log(book.getPrice?.());
// @log: 0
```

## Tham chiếu phần tử array

Optional chaining cũng có thể sử dụng khi tham chiếu phần tử array. Khi tham chiếu phần tử, viết `?.` trước dấu ngoặc vuông.

```js twoslash
const books = undefined;
const title = books?.[0];
console.log(title);
// @log: undefined
```

```js twoslash
const books = ["Survival TypeScript"];
const title = books?.[0];
console.log(title);
// @log: "Survival TypeScript"
```

## Type trong TypeScript

Khi sử dụng optional chaining trong TypeScript, type của giá trị nhận được là union type của type property cuối cùng và `undefined`.

```ts twoslash
let book: undefined | { title: string };
const title = book?.title;
//    ^?
```

## Kết quả compile của TypeScript

Khi compiler option `target` của TypeScript là `es2020` trở lên, optional chaining được compile nguyên vẹn sang JavaScript.

```ts twoslash
// @target: es2020
// @showEmit
let book: undefined | { title: string };
// ---cut---
const title = book?.title;
```

Khi `target` là `es2019` trở xuống, sẽ được compile thành code sử dụng ternary operator như sau.

```ts twoslash
// @target: es2019
// @showEmit
let book: undefined | { title: string };
// ---cut---
const title = book?.title;
```

## Kết hợp với Nullish coalescing operator

Khi optional chaining trả về `undefined` và muốn gán giá trị default, có thể sử dụng Nullish coalescing operator `??`.

```js twoslash
const book = undefined;
const title = book?.title ?? "Default title";
console.log(title);
// @log: "Default title"
```

<PostILearned>

・Optional chaining ?. trong JavaScript là cách tham chiếu property an toàn
・Khi giá trị là null hoặc undefined, trả về undefined
・Có thể lồng nhau như a?.b?.c
・Với function là ?.()
・Với array là ?.[]
・Trong TypeScript, type là union của type giá trị và undefined
・Kết hợp tốt với Nullish coalescing operator

</PostILearned>

## Thông tin liên quan

[Truy cập phần tử array](../array/how-to-access-elements-in-an-array.md)

[Ternary operator](../../statements/ternary-operator.md)
