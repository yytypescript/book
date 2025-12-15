---
description: Tạo object type chỉ chứa các property tùy ý
title: "Pick<T, Keys>"
---

`Pick<T, Keys>` là utility type trả về object type chỉ chứa các key được chỉ định trong `Keys` từ kiểu `T`.

## Type argument của Pick&lt;T, Keys>

### T

Type argument `T` nhận object type.

### Keys

`Keys` chỉ định property key của object type `T`. Nếu chỉ định property key không tồn tại trong object type `T`, sẽ gây compile error.

## Ví dụ sử dụng Pick

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
type Person = Pick<User, "surname" | "middleName" | "givenName">;
```

`Person` ở trên sẽ giống với kiểu sau:

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
```

## Ví dụ về việc theo dõi thay đổi kiểu với Pick

Giả sử bạn tạo dịch vụ xử lý sách và object `Book` biểu diễn sách được định nghĩa như sau:

```ts twoslash
type Book = {
  id: number;
  title: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
};
```

Tham khảo điều này, giả sử bạn tạo `BookInputData` làm input data để tạo `Book`. Nó được tạo từ request bên ngoài, và `id, createdAt, updatedAt` được gán sau đó bởi dịch vụ này, thì `BookInputData` sẽ như sau:

```ts twoslash
type BookInputData = {
  title: string;
  author: string;
};
```

Giả sử property `author` cần phải là `Person` thay vì `string`. Nếu định nghĩa `Book, BookInputData` độc lập, bạn phải thay đổi property `author` của mỗi cái khi có thay đổi này.

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
// ---cut---
type Book = {
  id: number;
  title: string;
  author: Person; // 変更箇所
  createdAt: Date;
  updatedAt: Date;
};

type BookInputData = {
  title: string;
  author: Person; // 変更箇所
};
```

Nếu các định nghĩa này gần nhau thì còn tốt, nhưng nếu ở các file khác nhau sẽ rất khó tìm.

Do đó, định nghĩa lại `BookInputData` sử dụng `Pick<T, K>`:

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type Book = {
  id: number;
  title: string;
  author: Person;
  createdAt: Date;
  updatedAt: Date;
};
// ---cut---
type BookInputData = Pick<Book, "title" | "author">;
```

Với cách này, `BookInputData` ít nhất có liên kết với `Book` trong code, và sẽ tự động theo dõi thay đổi kiểu của property `author`.

## Thông tin liên quan

[Omit&lt;T, Keys>](omit.md)
