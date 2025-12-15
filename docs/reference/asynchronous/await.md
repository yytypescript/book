---
title: await
slug: /reference/asynchronous/await
---

`async`/`await` là cú pháp giúp viết xử lý bất đồng bộ sử dụng `Promise` một cách đơn giản hơn.
Với cú pháp này, bạn có thể viết xử lý bất đồng bộ giống như xử lý đồng bộ hơn.
`async`/`await` thường được sử dụng cùng nhau, nhưng trong trang này chúng ta sẽ tập trung vào `await`.

### `await`

`await` chờ cho đến khi giá trị của `Promise` được resolve và trả về giá trị đã resolve.

Lưu ý rằng **về cơ bản `await` chỉ có thể sử dụng bên trong function `async`.**

```ts twoslash
// Trả về giá trị sau 1 giây
function request(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("hello");
    }, 1000);
  });
}

// Không thể viết như thế này
// const result = await request();
// console.log(result);

async function main() {
  const result = await request();
  console.log(result);
  // @log: "hello"
}

main();
```

Trong ví dụ này, tại dòng `await request()`, chương trình sẽ chờ 1 giây cho đến khi `request()` resolve `Promise`, sau đó hiển thị `"hello"` ra console.

### Viết lại bằng `async`/`await`

Cuối cùng, hãy viết lại code gọi 3 API bằng cách sử dụng `async`/`await`.

Như vậy, bằng cách sử dụng `async`/`await`, bạn có thể viết xử lý bất đồng bộ một cách gọn gàng giống như xử lý đồng bộ.

```ts twoslash
// Xử lý gọi API bất đồng bộ để lấy giá trị
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

// Xử lý nhận giá trị và gọi API khác để lấy giá trị
function request2(result1: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result1 + 1);
    }, 1000);
  });
}

// Xử lý nhận giá trị và gọi API khác để lấy giá trị
function request3(result2: number): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result2 + 2);
    }, 1000);
  });
}

async function main() {
  const result1 = await request1();
  const result2 = await request2(result1);
  const result3 = await request3(result2);
  console.log(result3);
  // @log: 4
}

main();
```

### `await` trực tiếp một `Promise`

Bạn cũng có thể `await` một `Promise` trực tiếp mà không cần tạo function.

```ts twoslash
async function main() {
  // Trả về giá trị sau 1 giây
  await new Promise((resolve) => {
    setTimeout(() => resolve, 1000);
  });
}
```

### `await` một function `async`

Bạn cũng có thể `await` một function `async`.

```ts twoslash
async function request(): Promise<string> {
  return "hello";
}

async function main() {
  const result = await request();
  console.log(result);
  // @log: "hello"
}
```

### Type annotation khi `await`

Type annotation của giá trị trả về khi `await` một `Promise` hoặc function `async` là `T` trong `Promise<T>`.

```ts twoslash
async function request(): Promise<string> {
  return "hello";
}

async function main() {
  const result: string = await request();
  // Kiểu là string
  console.log(result);
  // @log: "hello"
}
```

### Viết lại `then-catch` bằng `try-catch`

Bạn có thể viết lại `then` và `catch` của `Promise` bằng `try-catch`. Function `main2` dưới đây là phiên bản viết lại của function `main1` bằng `try-catch`.

```ts twoslash
async function request(): Promise<string> {
  return "hello";
}

function main1() {
  request()
    .then((result: string) => {
      console.log(result);
      // @log: "hello"
    })
    .catch((error: unknown) => {
      console.log(error);
    });
}

async function main2() {
  try {
    const result: string = await request();
    console.log(result);
    // @log: "hello"
  } catch (error: unknown) {
    console.log(error);
  }
}
```

### Khi `return` một `Promise` bị reject

#### `await` trước khi `return`

Khi `await` một `Promise` bị reject trước khi `return`, exception sẽ được throw trong function đó.

```ts twoslash
async function request(): Promise<unknown> {
  throw new Error("error");
}

async function main(): Promise<unknown> {
  try {
    // Bằng cách sử dụng return await, exception có thể được bắt trong catch
    return await request();
  } catch {
    console.log("error");
    // @log: error
  } finally {
    console.log("finally");
    // @log: finally
  }
}

main()
  .then(() => {
    console.log("then");
    // @log: then
  })
  .catch(() => {
    console.log("catch");
  });
```

Trong ví dụ như thế này, các giá trị hiển thị sẽ là `error`, `finally`, và `then`.

#### Không `await` trước khi `return` (chỉ `return`)

Nếu `return` một `Promise` bị reject trực tiếp mà không `await`, nó sẽ được trả về cho caller trong trạng thái bị reject.

```ts twoslash
function request(): Promise<unknown> {
  throw new Error("error");
}

// try -> finally -> return -> catch()
async function main(): Promise<unknown> {
  try {
    return request();
  } catch {
    console.log("error");
  } finally {
    console.log("finally");
    // @log: finally
  }
}

main()
  .then(() => {
    console.log("then");
  })
  .catch(() => {
    console.log("catch");
    // @log: catch
  });
```

Trong ví dụ như thế này, các giá trị hiển thị sẽ là `finally` và `catch`.
