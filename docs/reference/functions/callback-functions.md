---
sidebar_label: "Callback function"
---

# Callback function

Callback function là function được truyền làm tham số của một function khác. Bằng cách gọi (callback) function được chỉ định qua tham số bên trong function, bạn có thể kiểm soát hành vi của function hoặc nhận kết quả không đồng bộ.
Callback function không phải là cú pháp cấp ngôn ngữ, mà được gọi là callback function như một design pattern.

## Cách sử dụng callback function

### Kiểm soát hành vi của function

Callback function có thể được sử dụng khi bạn muốn kiểm soát một phần hành vi của function từ bên ngoài.

`greetNewUser` là function chào mừng "ご新規さん" (khách hàng mới).
Bằng cách truyền function `hello` và `goodMorning` làm callback function, bạn có thể kiểm soát cách chào mừng.

```ts twoslash
function greetNewUser(func: (name: string) => string) {
  console.log(func("ご新規"));
}

function hello(name: string) {
  return `こんにちは!${name}さん!!`;
}

function goodMorning(name: string) {
  return `おはようございます!${name}さん!!`;
}

// こんにちは!ご新規さん!!
greetNewUser(hello);

// おはようございます!ご新規さん!!
greetNewUser(goodMorning);
```

### Nhận kết quả không đồng bộ

Callback function cũng có thể được sử dụng khi bạn muốn nhận và xử lý kết quả của function không đồng bộ.

Ví dụ sau là sample code đọc file của fs module trong Node.js.
Việc đọc file được thực thi không đồng bộ, và sau khi đọc hoàn tất, callback function được gọi để truyền kết quả đọc không đồng bộ về phía gọi.

```ts twoslash
import fs from "fs";

fs.readFile("./user.txt", "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }
  console.log(data);
});
```

### Callback hell

Sample code sau thực hiện đọc file theo trình tự:

1. Đọc file A
2. Đọc file B được ghi trong file A
3. Đọc file C được ghi trong file B

Khi gọi callback function bên trong callback function như thế này, việc lồng nhau (nesting) trở nên sâu và code khó đọc hơn, vấn đề này được gọi là callback hell.

```ts twoslash
import fs from "fs";

fs.readFile("./a.txt", "utf-8", (err, data) => {
  fs.readFile(data, "utf-8", (err, data) => {
    fs.readFile(data, (err, data) => {
      console.log(data);
    });
  });
});
```

Trong trường hợp như thế này, bạn có thể giải quyết bằng cách sử dụng Promise thay vì callback function.

Sau khi Promise ra đời để giải quyết vấn đề callback hell, việc sử dụng Promise thay vì callback function để lấy kết quả xử lý không đồng bộ đã trở nên phổ biến.

```ts twoslash
import { promises as fs } from "fs";

fs.readFile("a.txt", "utf-8")
  .then((data) => fs.readFile(data, "utf-8"))
  .then((data) => fs.readFile(data, "utf-8"))
  .then((data) => console.log(data));
```

## Định nghĩa kiểu cho callback function

Kiểu của callback function được viết dưới dạng `(arg: [kiểu của tham số]) => [kiểu giá trị trả về]`.
Callback function chỉ là một function, nên đây chỉ là khai báo kiểu function làm kiểu của tham số.

[Khai báo kiểu function](./function-type-declaration.md)

```ts twoslash
function greetNewUser(func: (name: string) => string) {
  console.log(func("ご新規さん"));
}
```

## Callback đồng bộ và không đồng bộ

Như đã thấy trong các ví dụ cách sử dụng, callback function có loại đồng bộ và không đồng bộ.

### Callback function đồng bộ

Callback function đồng bộ là callback được gọi ngay lập tức một cách đồng bộ.
Ví dụ điển hình là tham số của `Array.map` trong standard API nhận callback function đồng bộ.

```ts twoslash
const numbers = [1, 2, 3];
const doubles = numbers.map((n: number) => {
  return n * 2;
});

// 2, 4, 6
console.log(doubles);
```

### Callback function không đồng bộ

Callback function không đồng bộ là callback được gọi không đồng bộ như API request.
Ví dụ điển hình là tham số của `setTimeout` nhận callback function không đồng bộ.

Trong ví dụ sau, callback function được truyền cho `setTimeout` được gọi không đồng bộ sau 1 giây,
và kết quả hiển thị trên console theo thứ tự `hello`, `This is callback function!`.

```ts twoslash
setTimeout(() => {
  console.log("This is callback function!");
}, 1000);

console.log("hello");

// hello
// This is callback function!
```

### Callback function đồng bộ và xử lý không đồng bộ

Điều gì xảy ra khi truyền async function trả về Promise cho callback function đồng bộ như `Array.map`?

`doublePromise` là async function thực thi xử lý nhân đôi giá trị được truyền một cách không đồng bộ và trả về giá trị.
Lúc này, vì `doublePromise` là async function nên không trả về giá trị đã nhân đôi mà trả về Promise, do đó `doubles` trở thành mảng các Promise.

```ts twoslash
function doublePromise(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n * 2);
    }, 100);
  });
}

const numbers = [1, 2, 3];
const doubles = numbers.map(doublePromise);

// [Promise: {}, Promise: {}, Promise: {}]
console.log(doubles);
```

Khi truyền async function cho callback function đồng bộ, bạn cần resolve kết quả Promise.

```ts twoslash
function doublePromise(n: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(n * 2);
    }, 100);
  });
}

(async function () {
  const numbers = [1, 2, 3];
  const doubles = await Promise.all(numbers.map(doublePromise));

  // [2, 4, 6]
  console.log(doubles);
})();
```

`Array.map` được định nghĩa kiểu để chấp nhận cả async function làm callback function, nên không xảy ra lỗi kiểu.
Nếu định nghĩa kiểu callback function chỉ chấp nhận synchronous function, sẽ xảy ra lỗi kiểu khi truyền async function.

```ts twoslash
// @errors: 2345

type User = {
  name: string;
};

function greetUser(getUser: () => User) {
  const user = getUser();
  console.log(`Hello, ${user.name}`);
}

function fetchUserFromDB(): Promise<User> {
  return new Promise<User>((resolve) => {
    setTimeout(() => {
      resolve({ name: "Tuan" });
    }, 1000);
  });
}

greetUser(fetchUserFromDB);
```
