---
sidebar_label: 例外処理
---

# Xử lý exception (exception)

JavaScript có cú pháp xử lý exception tương tự Java. Exception sử dụng object `Error`, và dùng cú pháp throw để ném exception. Có thể bắt exception bằng cú pháp try-catch.

```js twoslash
try {
  throw new Error("something wrong");
} catch (e) {
  // something wrong
  console.log(e.message);
}
```

## Cú pháp throw

Cú pháp throw trong JavaScript dùng để ném exception. Thông thường sử dụng object Error làm object được ném.

```js twoslash
throw new Error("network error!");
```

Khác với Java và các ngôn ngữ khác, throw trong JavaScript có thể ném bất cứ thứ gì. Ngay cả kiểu primitive cũng có thể ném.

```js twoslash
throw "just a string";
```

Đây là anti-pattern. Dù throw có thể ném bất cứ thứ gì, bạn nên sử dụng object Error. Sử dụng object Error giúp người đọc code không bất ngờ. Hơn nữa, chỉ có object Error mới có thể theo dõi stack trace.

## Cú pháp try-catch

Để bắt exception trong JavaScript, sử dụng cú pháp try-catch. Bọc phần có khả năng ném exception trong block try, và xử lý exception được bắt trong block catch.

```js twoslash
try {
  throw new Error("something wrong");
} catch (e) {
  console.error(e);
}
```

### Kiểu của catch

Trong TypeScript, kiểu của biến trong catch mặc định là kiểu `any`.

```ts twoslash
// @useUnknownInCatchVariables: false
try {
  // ...
} catch (e) {
  //     ^?
}
```

Lý do kiểu không phải là kiểu object `Error` mà là kiểu `any` là do theo đặc tả của JavaScript, không thể biết giá trị nào sẽ được throw.

Khi bật compiler option `useUnknownInCatchVariables` của TypeScript, kiểu của biến trong catch sẽ trở thành kiểu `unknown`. Vì điều này thể hiện chính xác hơn việc "không biết giá trị nào sẽ được throw" dưới dạng kiểu, nên nếu muốn type-safe hơn, bạn nên bật option này.

[useUnknownInCatchVariables](../tsconfig/useunknownincatchvariables.md)

[undefined型](../values-types-variables/undefined.md)

### Phân nhánh trong catch

Trong Java hoặc PHP, có thể viết nhiều catch tương ứng với kiểu error cần bắt, nhưng trong JavaScript và TypeScript chỉ có thể viết một catch. Nếu muốn phân nhánh xử lý error theo kiểu error trong JavaScript, cần viết phân nhánh trong block catch.

```ts twoslash
try {
  // ...
} catch (e) {
  if (e instanceof TypeError) {
    // Xử lý cho TypeError
  } else if (e instanceof RangeError) {
    // Xử lý cho RangeError
  } else if (e instanceof EvalError) {
    // Xử lý cho EvalError
  } else {
    // Các error khác
  }
}
```

### try-catch là block scope

Biến trong câu lệnh try-catch của JavaScript có block scope. Do đó, biến được khai báo trong try-catch không thể tham chiếu bên ngoài try-catch.

```ts twoslash
// @errors: 2304
async function fetchData() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const data = await res.json();
    console.log(data); // data có thể tham chiếu
  } catch (e: unknown) {
    return;
  }
  console.log(data); // data không thể tham chiếu
}

fetchData();
```

[変数のスコープ (scope)](variable-scope.md)

Nếu muốn tham chiếu biến bên ngoài câu lệnh try-catch, cần khai báo biến bằng let trước try.

```ts twoslash
async function fetchData() {
  let data: any;
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    data = await res.json();
  } catch (e: unknown) {
    return;
  }
  console.log(data); // data có thể tham chiếu
}

fetchData();
```

### Block finally

JavaScript cũng có thể viết finally giống như Java và PHP. finally là phần xử lý luôn được thực thi dù có xảy ra exception hay không. finally được viết sau try-catch. Xử lý trong finally được thực thi sau khi xử lý của try và catch được thực thi.

```js twoslash
try {
  // ...
} catch (e) {
  // ...
} finally {
  // ...
}
```
