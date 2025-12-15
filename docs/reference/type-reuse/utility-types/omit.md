---
description: Tạo object type loại bỏ các property tùy ý
title: "Omit<T, Keys>"
---

`Omit<T, Keys>` là utility type trả về object type sau khi loại bỏ các property được chỉ định trong `Keys` từ object type `T`.

## Type argument của Omit&lt;T, Keys>

### T

Type argument `T` nhận object type.

### Keys

`Keys` chỉ định property key của argument `T`. Loại bỏ các property khớp với property key được chỉ định ở đây khỏi `T`.

## Ví dụ sử dụng Omit

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
type Optional = "age" | "address" | "nationality" | "createdAt" | "updatedAt";
type Person = Omit<User, Optional>;
```

Kiểu `Person` ở trên sẽ giống với kiểu sau:

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
```

## Lưu ý khi sử dụng Omit

TypeScript compiler không chỉ ra lỗi ngay cả khi chỉ định property key không tồn tại trong `T` cho `Keys` của `Omit<T, Keys>`. Ví dụ, cần chú ý vì không thể phát hiện typo trong `Keys`.

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
type Optional = "createdat" | "updatedat" | "age" | "address" | "nationality";
//                      ^^ typo       ^^ typo
type Person = Omit<User, Optional>;
//   ^?
// このPersonは下の型になる
```

`At` của `createdAt` và `updatedAt` trong `User` bắt đầu bằng chữ hoa, nhưng do không nhận ra điều này và viết bằng chữ thường, kết quả của `Omit` vẫn bao gồm `createdAt` và `updatedAt`.

## Thông tin liên quan

[Pick&lt;T, Keys>](pick.md)
