---
title: async
slug: /reference/asynchronous/async
---

`async`/`await` là cú pháp giúp viết xử lý bất đồng bộ sử dụng `Promise` một cách đơn giản hơn.
Với cú pháp này, bạn có thể viết xử lý bất đồng bộ giống như xử lý đồng bộ hơn.
`async`/`await` thường được sử dụng cùng nhau, nhưng trong trang này chúng ta sẽ tập trung vào `async`.

### Function `async`, method `async`

Khi thêm keyword `async` trước function hoặc method, ngay cả khi trong function đó không trả về `Promise`, kiểu trả về sẽ được bao bọc bởi `Promise`. Trong function và method `async`, bạn có thể sử dụng keyword `await`. Về `await`, vui lòng tham khảo trang `await`.

[await](./await.md)

```ts twoslash
type User = {
  id: string;
  name: string;
  age: number;
};

declare function findById(id: string): Promise<any>;
// ---cut---
async function requestAsync(): Promise<number> {
  return 1;
}

const fetchAsync = async (): Promise<number> => {
  return 1;
};

class UserRepository {
  async find(id: string): Promise<User> {
    const { name, age } = await findById(id);

    return {
      id,
      name,
      age,
    };
  }
}
```

Trong ví dụ này, mặc dù trả về một hằng số không phải `Promise`, nhưng function `async` sẽ bao bọc giá trị trả về bằng `Promise`.

```ts twoslash
async function requestAsync(): Promise<number> {
  return 1;
}

// requestAsync tương đương với
function request(): Promise<number> {
  return new Promise((resolve) => {
    resolve(1);
  });
}

requestAsync().then((result) => {
  console.log(result);
  // @log: 1
});
```

### Khai báo function `async`

JavaScript có 3 cách khai báo function, và tất cả đều có thể khai báo dưới dạng function `async`.

```ts twoslash
async function requestAsync1(): Promise<number> {
  return 1;
}

const requestAsync2 = async function (): Promise<number> {
  return 1;
};

const requestAsync3 = async (): Promise<number> => {
  return 1;
};
```

### Method `async` và access modifier

Nếu muốn thêm access modifier cho method, đặt nó trước `async`.

```ts twoslash
type User = {
  id: string;
  name: string;
  age: number;
};

declare function findById(id: string): Promise<any>;
// ---cut---
class UserRepository {
  public async find(id: string): Promise<User> {
    const { name, age } = await findById(id);

    return {
      id,
      name,
      age,
    };
  }
}
```

### Giá trị trả về của function và method `async`

Function `async` cũng có thể trả về `Promise`. Khi đó, `Promise` sẽ không bị bao bọc thành `Promise<Promise<T>>` mà sẽ là `Promise<T>`.

```ts twoslash
async function requestAsync(): Promise<number> {
  return new Promise((resolve) => {
    resolve(1);
  });
}

requestAsync().then((result) => {
  console.log(result);
  // @log: 1
});
```

### Reject function và method `async`

Để reject một function hoặc method `async`, chỉ cần sử dụng `throw` bên trong function hoặc method `async`.

```ts twoslash
async function requestAsync(): Promise<number> {
  throw new Error("error");
}
```

Như vậy, `Promise` mà `requestAsync` trả về sẽ bị reject.
