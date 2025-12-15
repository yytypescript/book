---
description: Biến tất cả property thành optional
title: Partial<T>
---

`Partial<T>` là utility type biến tất cả các property của object type `T` thành optional property.

## Type argument của Partial&lt;T>

### T

Type argument `T` nhận object type.

## Ví dụ sử dụng Partial

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type PartialPerson = Partial<Person>;
//    ^?
```

`PartialPerson` này sẽ giống với kiểu sau:

```ts twoslash
type PartialPerson = {
  surname?: string;
  middleName?: string;
  givenName?: string;
};
```

## Implementation của Partial

`Partial<T>` được implement như sau:

```ts twoslash
// @noErrors: 2300
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

`?` được gọi là optional modifier, khi thêm modifier này, property sẽ trở thành optional. `Partial<T>` tạo ra kiểu với modifier này được thêm vào tất cả các property của `T`.

## Ví dụ về Options Object pattern sử dụng Partial

Áp dụng `Partial` vào Options Object pattern, bạn có thể implement function dễ đọc với các tham số có thể bỏ qua.

[Keyword arguments và Options Object pattern](../../functions/keyword-arguments-and-options-object-pattern.md)

Tạo function để tìm kiếm user. Giả sử có function `findUsers()` mà mỗi property tương ứng với một argument, và bạn có thể tìm kiếm bằng cách cung cấp giá trị cho các argument tương ứng. Ở đây, để làm ví dụ, tất cả các argument đều là optional.

```ts twoslash
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};

function findUsers(
  surname?: string,
  middleName?: string,
  givenName?: string,
  age?: number,
  address?: string,
  nationality?: string
) {
  // ...
}
```

Với signature của `findUsers()` này, khi chỉ muốn tìm user **chỉ có tuổi là XX**, phải nhập `undefined` cho các argument khác để duy trì thứ tự argument.

```ts twoslash
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};

declare function findUsers(
  surname?: string,
  middleName?: string,
  givenName?: string,
  age?: number,
  address?: string,
  nationality?: string
): Promise<User[]>;
// ---cut---
findUsers(undefined, undefined, undefined, 22);
```

Trong ví dụ này chỉ có 6 argument và các argument sau `age` có thể bỏ qua nên chưa quá khó đọc, nhưng với function có nhiều argument, việc tìm argument tương ứng sẽ rất mệt mỏi. Chúng ta có thể cải thiện bằng `Partial<T>`.

Đầu tiên, định nghĩa kiểu của object mà tất cả argument sẽ được truyền qua object đó. Thêm `Partial<T>` để có thể bỏ qua các property.

```ts twoslash
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
// ---cut---
type FindUsersArgs = Partial<User>;
```

Sử dụng nó làm argument của function `findUsers()`:

```ts twoslash
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
type FindUsersArgs = Partial<User>;
// ---cut---
function findUsers({
  surname,
  middleName,
  givenName,
  age,
  address,
  nationality,
}: FindUsersArgs) {
  // ...
}
```

Với cách này, phía gọi vẫn chưa thể bỏ qua argument. Khi sử dụng `findUsers()`, ngay cả khi không cần thiết lập gì, vẫn phải truyền `{}` cho argument.

```ts twoslash
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
type FindUsersArgs = Partial<User>;

declare function findUsers(findUser: FindUsersArgs): unknown;
// ---cut---
findUsers({});
```

Để có thể bỏ qua argument, sử dụng default argument để gán `{}` khi bỏ qua:

```ts twoslash
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
type FindUsersArgs = Partial<User>;
// ---cut---
function findUsers({
  surname,
  middleName,
  givenName,
  age,
  address,
  nationality,
}: FindUsersArgs = {}) {
  // ...
}

findUsers();
findUsers({ age: 22 });
```

`= {}` bên phải `FindUsersArgs` chính là phần đó. Nhờ đó, `findUsers()` có thể được gọi mà không cần argument. Bạn cũng có thể chỉ định giá trị cho argument cụ thể. `findUsers({ age: 22 })` là ví dụ.

Ngoài ra, bạn cũng có thể gán giá trị mặc định bằng cách thiết lập default type cho `FindUsersArgs`:

```ts twoslash
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
type FindUsersArgs = Partial<User>;
// ---cut---
function findUsers({
  surname = "Doe",
  givenName = "John",
  nationality = "Araska",
  age = 22,
}: FindUsersArgs = {}) {
  // ...
}
```

## Thông tin liên quan

[Required&lt;T>](required.md)
