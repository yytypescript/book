---
sidebar_label: Class
slug: /reference/object-oriented/class
---

# Class (class)

Class là khuôn mẫu để định nghĩa object. Trong JavaScript và TypeScript, class được định nghĩa bằng cú pháp `class`.

```ts twoslash
class Person {}
```

Sử dụng từ khóa `new` với class để tạo object.

```ts twoslash
class Person {}
// ---cut---
const person = new Person();
```

Cách định nghĩa class bằng `class` và tạo instance bằng `new` này tương tự như Java, PHP, Ruby.

## Type annotation cho class

Trong TypeScript, khi định nghĩa class, đồng thời một type cùng tên với class cũng được định nghĩa. Để type annotation cho biến chứa instance, dùng tên class.

```ts twoslash
class Person {}
// ---cut---
const person: Person = new Person();
```
