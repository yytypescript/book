---
title: Promise<T>
slug: /reference/asynchronous/promise
---

`Promise` là tính năng được thêm vào từ ES2015, giúp viết xử lý bất đồng bộ một cách dễ đọc hơn. Với `async`/`await` được giới thiệu trong ES2017, bạn có thể viết code sử dụng `Promise` dễ đọc hơn nữa.

## Thời kỳ chưa có `Promise`

Hãy xem xét 3 API sau và xử lý để hiển thị kết quả thu được từ chúng.

1. API1: Gửi request và nhận kết quả
1. API2: Sử dụng kết quả từ API1 để gửi request và nhận kết quả
1. API3: Sử dụng kết quả từ API2 để gửi request và nhận kết quả

Các function `request1()`, `request2()`, `request3()` thực hiện giao tiếp với API1, API2, API3 sẽ như sau. Hãy hiểu `setTimeout()` trong mỗi function là độ trễ trong quá trình giao tiếp với API.

```js twoslash
// API1. Xử lý gửi request bất đồng bộ đến API để lấy giá trị
function request1(callback) {
  setTimeout(() => {
    // 1 là ví dụ tùy ý, có thể là bất kỳ giá trị nào
    callback(1);
  }, 1000);
}

// API2. Xử lý nhận giá trị và gửi request đến API khác để lấy giá trị
function request2(result1, callback) {
  setTimeout(() => {
    callback(result1 + 1);
  }, 1000);
}

// API3. Xử lý nhận giá trị và gửi request đến API khác để lấy giá trị
function request3(result2, callback) {
  setTimeout(() => {
    callback(result2 + 2);
  }, 1000);
}
```

Khi kết hợp các function này để thực hiện 3 API request tuần tự, code sẽ như sau.

```js twoslash
request1((result1) => {
  request2(result1, (result2) => {
    request3(result2, (result3) => {
      console.log(result3);
      // @log: 4
    });
  });
});
```

Để gửi request đến API tiếp theo, cần phải chờ kết quả từ API request bất đồng bộ trước đó, dẫn đến việc các lời gọi function bị lồng nhau.
Đây được gọi là **callback hell**, một vấn đề làm cho code trở nên rất phức tạp với độ lồng sâu. Callback hell trong tiếng Anh cũng là Callback hell. Địa ngục ở đâu cũng là địa ngục.

## `Promise` giải quyết vấn đề này

Hãy viết lại ví dụ trên bằng cách sử dụng `Promise`.

```js twoslash
// Xử lý gọi API bất đồng bộ để lấy giá trị
function request1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}

// Xử lý nhận giá trị và gọi API khác để lấy giá trị
function request2(result1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result1 + 1);
    }, 1000);
  });
}

// Xử lý nhận giá trị và gọi API khác để lấy giá trị
function request3(result2) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(result2 + 2);
    }, 1000);
  });
}
```

Giá trị trả về trở thành `Promise`, và argument chỉ định callback function đã được loại bỏ. Khi sử dụng function trả về `Promise`, bạn có thể implement 3 API request như sau.

```js twoslash
request1()
  .then((result1) => {
    return request2(result1);
  })
  .then((result2) => {
    return request3(result2);
  })
  .then((result3) => {
    console.log(result3);
    // @log: 4
  });
```

So với ví dụ callback trước đó, code trở nên gọn gàng hơn rất nhiều.

## `Promise` và Generics

Khi chỉ định kiểu của `Promise` trong TypeScript, bạn sử dụng generics và viết là `Promise<T>`. `T` chỉ định kiểu của giá trị trả về khi `Promise` được fulfilled. Trong ví dụ này, vì truyền số `resolve(1)` làm giá trị fulfill, nên chỉ định `Promise<number>`.
Ví dụ, khi fulfill một giá trị có kiểu do bạn tự định nghĩa, viết như sau.

```ts twoslash
type User = {
  name: string;
  age: number;
};

function getUser(): Promise<User> {
  return new Promise((resolve) => {
    const user: User = {
      name: "Tuan",
      age: 10,
    };
    resolve(user);
  });
}

getUser().then((user: User) => {
  console.log(user);
  // @log: { "name": "Tuan", "age": 10 }
});
```

Kiểu generic `T` của `Promise` là bắt buộc, nên nếu bỏ qua sẽ gây ra compile error.

```ts twoslash
// @errors: 2314
function request(): Promise {
  return new Promise((resolve) => {
    resolve(1);
  });
}
```

Nếu kiểu generic `T` và kiểu của giá trị trả về không khớp cũng sẽ gây ra compile error.

```ts twoslash
// @errors: 2345
function request(): Promise<string> {
  return new Promise((resolve) => {
    // Expect kiểu string, nhưng return kiểu number nên compile error
    resolve(1);
  });
}
```

## Các method của `Promise`

`Promise<T>` có 3 method quan trọng cần nhớ.

### Thực thi callback với kết quả của xử lý bất đồng bộ đã chờ - `Promise.prototype.then()`

Được gọi khi `Promise<T>` được fulfilled. Argument thứ nhất của callback là giá trị kiểu `T`.
Nếu trả về giá trị kiểu `S` hoặc `Promise<S>` làm giá trị trả về của callback, nó sẽ trả về `Promise<S>`.

```ts twoslash
const promise1: Promise<number> = Promise.resolve(1);
const promise2: Promise<string> = promise1.then((value) => `${value}`);
```

Ví dụ trên định nghĩa constant mới cho mỗi lần gọi `Promise.prototype.then()`, nhưng như đã đề cập ở trên, bạn có thể chain method với `Promise.prototype.then()`.

```ts twoslash
const promise: Promise<boolean> = Promise.resolve("1")
  .then((value) => Number(value)) // Trở thành kiểu Promise<number>
  .then((value) => value > 0); // Trở thành kiểu Promise<boolean>
```

Nếu throw exception trong callback, Promise đó sẽ bị reject.

```ts twoslash
Promise.resolve(1)
  .then(() => {
    throw new Error();
  })
  .then(() => {
    console.log("fulilled");
  })
  .catch(() => {
    console.log("rejected");
  });
// @log: 'rejected'
```

Tương tự, nếu trả về `Promise` bị reject trong callback, Promise đó sẽ bị reject.

```ts twoslash
Promise.resolve(1)
  .then(() => {
    return Promise.reject(new Error());
  })
  .then(() => {
    console.log("fulilled");
  })
  .catch(() => {
    console.log("rejected");
  });
// @log: 'rejected'
```

### Thực thi callback với kết quả reject của xử lý bất đồng bộ đã chờ - `Promise.prototype.catch()`

Được gọi khi `Promise<T>` bị rejected. Argument thứ nhất của callback là giá trị kiểu `any`.
Method này cũng trả về `Promise<S>` nếu trả về giá trị kiểu `S` hoặc `Promise<S>` làm giá trị trả về của callback.

```ts twoslash
const promise1: Promise<number> = Promise.reject(new Error());
const promise2: Promise<string> = promise1.catch((e) => e.message);
```

`Promise.prototype.catch()` không được thực thi khi `Promise` ở trạng thái fulfilled. Do đó, khi kết nối `Promise.prototype.then()` sau `Promise.prototype.catch()`, cần xem xét cả kiểu khi được thực thi và kiểu khi không được thực thi.

```ts twoslash
Promise.resolve(1)
  .catch(() => {
    return "1";
  })
  // Kiểu trở thành string | number
  .then((value: string | number) => {
    console.log(value);
  });
```

Tuy nhiên, thường thì viết `Promise.prototype.catch()` sau `Promise.prototype.then()` nhiều hơn là ngược lại.

```ts twoslash
Promise.resolve(1)
  .then((num: number) => {
    return `${num}`;
  })
  .then((str: string) => {
    return str.length > 1;
  })
  .catch((e: any) => {
    console.log(e.message);
  });
```

### Thực thi callback ngay khi xử lý bất đồng bộ đã chờ kết thúc - `Promise.prototype.finally()`

Được gọi khi `Promise<T>` được settled. Callback không có argument.
Method này không thể set giá trị trả về.
`Promise.prototype.finally()` được thêm vào trong ES2018.

## Các static method của `Promise`

Có các static method quan trọng cần nhớ.

### Chờ kết quả của tất cả các xử lý bất đồng bộ - `Promise.all()`

Nhận một mảng các `Promise` làm argument thứ nhất và chờ kết quả thực thi của chúng bất đồng bộ. Giá trị trả về được trả về theo thứ tự các Promise được cung cấp trong mảng, bất kể thời gian Promise được resolve.

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
}

Promise.all([request1(), request2(), request3()]).then(([num1, num2, num3]) => {
  // request1 hoàn thành chậm nhất nhưng thứ tự kết quả được giữ nguyên, num1 là kết quả của request1
  console.log(num1, num2, num3);
  // @log: 1, 2, 3
});
```

Nếu một trong các `Promise` được cung cấp bị reject, `Promise.all()` sẽ bị reject.

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("failed1"));
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("failed2"));
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("failed3"));
    }, 1000);
  });
}

Promise.all([request1(), request2(), request3()])
  .then(([num1, num2, num3]) => {
    console.log(num1, num2, num3);
  })
  .catch((e) => {
    // Exception hoàn thành sớm nhất được trả về
    console.log(e.message);
    // @log: 'failed3'
  });
```

### Trả về `Promise` đã fulfilled - `Promise.resolve()`

Trả về `Promise` đã fulfilled.

```ts twoslash
const promise: Promise<number> = Promise.resolve(4);
```

### Trả về `Promise` đã rejected - `Promise.reject()`

Trả về `Promise` đã rejected.

```ts twoslash
const promise: Promise<string> = Promise.reject(new Error("failed"));
```

### Chờ tất cả `Promise` bất kể fulfill hay reject - `Promise.allSettled()`

Thực thi cho đến khi tất cả các `Promise` được cung cấp làm argument thứ nhất được settled. Settled có nghĩa là fulfilled hoặc rejected. Khác với `Promise.all()` kết thúc khi có một Promise bị reject, `Promise.allSettled()` chờ cho đến khi tất cả đều fulfilled hoặc rejected.
Giá trị trả về được trả về dưới dạng discriminated union type.

[Discriminated union type](../../reference/values-types-variables/discriminated-union.md)

`Promise.allSettled()` được thêm vào trong ES2020.

```ts twoslash
function request1(): Promise<number> {
  return Promise.resolve(1);
}

function request2(): Promise<number> {
  return Promise.reject(new Error("failed"));
}

Promise.allSettled([request1(), request2()]).then((values) => {
  console.log(values);
  // @log: { status: "fulfilled", value: 1}, { status: "rejected", reason: {}}
  // reason là object của error
});
```

### Trả về `Promise` được settled đầu tiên - `Promise.race()`

Giống như `Promise.all()`, nhận một mảng các `Promise` làm argument thứ nhất và thực thi tất cả bất đồng bộ, nhưng trả về kết quả của `Promise` được settled sớm nhất, bất kể fulfilled hay rejected.

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(3);
    }, 1000);
  });
}

Promise.race([request1(), request2(), request3()]).then((num) => {
  console.log(num);
  // @log: 3
});
```

Ví dụ tiếp theo là trường hợp `Promise` được settled đầu tiên bị rejected.

```ts twoslash
function request1(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(1);
    }, 4000);
  });
}

function request2(): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(2);
    }, 2000);
  });
}

function request3(): Promise<number> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("failed"));
    }, 1000);
  });
}

Promise.race([request1(), request2(), request3()])
  .then((num) => {
    console.log(num);
  })
  .catch((e) => {
    console.log(e.message);
    // @log: 'failed
  });
```

## Tìm hiểu sâu về `Promise`

### Các trạng thái của `Promise`

Như đã xuất hiện nhiều lần trong bài viết, `Promise` có 3 trạng thái.

- pending
- fulfilled
- rejected

Pending có nghĩa là đang chờ, chỉ trạng thái khi xử lý bất đồng bộ đang chờ chưa hoàn thành. Fulfilled có nghĩa là đã thực hiện, chỉ trạng thái khi xử lý bất đồng bộ đang chờ đã hoàn thành và đạt trạng thái mong muốn (không có exception xảy ra). Rejected có nghĩa là bị từ chối, chỉ trạng thái khi xử lý bất đồng bộ đang chờ đã hoàn thành cùng với exception.
Fulfilled và rejected gộp lại được gọi là settled. Settled có nghĩa là đã quyết định.
