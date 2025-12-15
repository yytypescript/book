---
title: Error
---

`Error` là một trong những built-in API của JavaScript, là object để xử lý exception.

## Cách tạo đối tượng Error

Để tạo đối tượng `Error`, dùng `new` với class `Error`. Để ném (throw) exception, sử dụng `throw`.

```ts twoslash
throw new Error();
```

## Trong JavaScript có thể throw bất kỳ giá trị nào, không chỉ Error

Tuy nhiên, trong JavaScript không chỉ có thể `throw` class `Error` và các subclass của nó để biểu thị exception, mà có thể `throw` bất kỳ giá trị nào.

```ts twoslash
throw "id is not string!";
```

## Subclass của Error

Trong built-in API, `Error` có các subclass sau:

- EvalError
- InternalError
- RangeError
- ReferenceError
- SyntaxError
- TypeError
- URIError

Ngoài ra cũng có thể extend `Error` để định nghĩa subclass riêng.

```ts twoslash
class CustomeError extends Error {
  public constructor(message?: string) {
    super(message);
  }
}

const err: CustomeError = new CustomeError("FAILED!");

console.log(err.name);
// @log: "Error"
console.log(err.message);
// @log: "FAILED!"
console.log(err.stack);
// @log: "Error: FAILED! ..."
```

## Bắt exception

Exception được `throw` có thể bắt bằng `catch`. Tuy nhiên như đã đề cập, JavaScript có thể `throw` bất kỳ giá trị nào nên kiểu của giá trị `catch` được không xác định và được hiểu là kiểu `any` hoặc `unknown`. Kiểu nào được sử dụng phụ thuộc vào cấu hình `useUnknownInCatchVariables` trong tsconfig.json.

[useunknownincatchvariables](../tsconfig/useunknownincatchvariables.md)

Nếu muốn kiểm tra xem giá trị đã bắt có phải là instance của một class nào đó hoặc có phải một kiểu nào đó hay không, sử dụng `instanceof`, `keyof` hoặc type guard.

```ts twoslash
try {
  // ...
} catch (e) {
  if (e instanceof Error) {
    // ...
  }
}
```
