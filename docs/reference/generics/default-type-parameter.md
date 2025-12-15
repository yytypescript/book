# Default type parameter

Giống như chỉ định giá trị mặc định cho tham số của hàm, trong generics cũng có thể chỉ định default type parameter.

Ví dụ, hãy định nghĩa một kiểu `MyErrorEvent` biểu diễn error event. Kiểu này lưu trữ một error object bất kỳ và loại của nó dưới dạng string.

```ts twoslash
type MyErrorEvent<T> = {
  error: T;
  type: string;
};
```

Kiểu này có thể được sử dụng như sau.

```ts twoslash
type MyErrorEvent<T> = {
  error: T;
  type: string;
};
// ---cut---
class NetworkError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}

const errorEvent: MyErrorEvent<Error> = {
  error: new Error("エラーです"),
  type: "syntax",
};

const networkErrorEvent: MyErrorEvent<NetworkError> = {
  error: new NetworkError("ネットワークエラーです"),
  type: "network",
};
```

Khi viết xử lý exception, thường không chuẩn bị đầy đủ các error class tương ứng như `NetworkError`, mà xử lý bằng `Error` chuẩn trong nhiều trường hợp. Tuy nhiên, ở trạng thái hiện tại, phải luôn chỉ định kiểu `T` của generics trong `MyErrorEvent`, điều này rất phiền phức.

```ts twoslash
type MyErrorEvent<T> = {
  error: T;
  type: string;
};
// ---cut---
// @errors: 2314
// Kiểu T là bắt buộc nên phải chỉ định MyErrorEvent<Error>.
const errorEvent: MyErrorEvent = {
  error: new Error("エラーです"),
  type: "syntax",
};
```

Do đó, bằng cách viết `<T = Error>`, ta chỉ định `Error` làm default type parameter.

```ts twoslash
type MyErrorEvent<T = Error> = {
  error: T;
  type: string;
};
```

Bằng cách chỉ định `Error` làm default type parameter, kiểu `T` của generics chỉ cần chỉ định khi cần thiết, và nếu không chỉ định gì thì tự động trở thành `Error`.

```ts twoslash
type MyErrorEvent<T = Error> = {
  error: T;
  type: string;
};
class NetworkError extends Error {
  constructor(e?: string) {
    super(e);
    this.name = new.target.name;
  }
}
// ---cut---

// Nhờ chỉ định default type parameter, có thể bỏ qua chỉ định kiểu Error
const errorEvent: MyErrorEvent = {
  error: new Error("エラーです"),
  type: "syntax",
};

const networkErrorEvent: MyErrorEvent<NetworkError> = {
  error: new NetworkError("ネットワークエラーです"),
  type: "network",
};
```

## Kết hợp với type parameter constraint

Bạn cũng có thể kết hợp việc chỉ định kiểu là subtype của một kiểu nào đó với việc chỉ định default type khi bỏ qua. Về type parameter constraint, có trang chuyên biệt, vui lòng tham khảo.

[Type parameter constraint](type-parameter-constraint.md)

Nếu muốn giới hạn kiểu `T` được truyền vào `MyErrorEvent` là subclass của `Error`, đồng thời khi bỏ qua thì mặc định là `SyntaxError`, cú pháp như sau:

```ts twoslash
type MyErrorEvent<T extends Error = SyntaxError> = {
  error: T;
  type: string;
};
```

Khi kết hợp type parameter constraint và default type parameter, default type parameter phải thỏa mãn constraint.

```ts twoslash
// @errors: 2344
interface Serializable<T extends string | number = bigint> {
  value: T;

  toString(): string;
}
```

Ví dụ này constraint kiểu `string | number` nhưng lại chỉ định `bigint` làm default type parameter. Do đó không thỏa mãn constraint và TypeScript sẽ báo lỗi.

## Chỉ định default type parameter bằng generics

Khi có nhiều generics, có thể chỉ định default type parameter bằng default type parameter khác.

```ts twoslash
class Aubergine<A, B = A, C = B> {
  private readonly a: A;
  private readonly b: B;
  private readonly c: C;

  public constructor(a: A, b: B, c: C) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

  // ...
}
```

Default type parameter được tham chiếu từ trái sang phải, nên generics bên trái không thể chỉ định generics bên phải.

```ts twoslash
// @errors: 2744 2706
class Aubergine<A = B, B, C = B> {
  private readonly a: A;
  private readonly b: B;
  private readonly c: C;

  public constructor(a: A, b: B, c: C) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
```
