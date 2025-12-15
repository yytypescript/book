---
sidebar_label: Field
---

# Field (field)

Để instance có field trong JavaScript, gán giá trị cho property của object đã instance hóa.

```js title="JavaScript" twoslash
class Person {}
const alice = new Person();
alice.name = "Alice";
```

Trong TypeScript, ngoài ra còn cần viết type annotation cho field.

```ts title="TypeScript" twoslash
class Person {
  name: string;
}
const alice = new Person();
alice.name = "Alice";
// @noErrors
```

TypeScript sẽ báo lỗi compile khi truy cập field không được viết trong khai báo class.

```ts title="TypeScript" twoslash
// @errors: 2339
class Person {}
const person = new Person();
console.log(person.age);
```

Ngay cả khi bỏ qua kiểu khi khai báo field, nếu giá trị được gán trong constructor thì kiểu sẽ được suy luận từ giá trị gán. Trong ví dụ dưới, `name` có kiểu `string` vì gán giá trị kiểu `string` trong constructor.

```ts twoslash
class Person {
  private name;

  constructor(name: string) {
    this.name = name;
  }
}
```

## Field không khởi tạo và kiểm tra

Khi cả hai compiler option `strictNullChecks` và `strictPropertyInitialization` của TypeScript được bật, phần `name: string` trong ví dụ sau sẽ bị báo lỗi compile. Vì ngay sau khi `new Person`, `name` sẽ là `undefined`.

```ts twoslash
class Person {
  name: string;
}
const alice = new Person();
console.log(alice.name);
// @log: undefined
// @errors: 2564
```

[strictNullChecks](../../tsconfig/strictnullchecks.md)

[strictPropertyInitialization](../../tsconfig/strictpropertyinitialization.md)

Để vượt qua kiểm tra ngay cả khi hai compiler option này được bật, cần đặt type annotation cho field name là union type như `string | undefined`.

```ts twoslash
class Person {
  name: string | undefined;
}
const alice = new Person();
console.log(alice.name);
// @log: undefined
```

## Khởi tạo field bằng constructor

Có thể gán giá trị cho field bằng constructor. Trong constructor, sử dụng `this` để truy cập field muốn gán giá trị.

```ts title="TypeScript" twoslash
class Person {
  name: string;

  constructor() {
    this.name = "Alice";
  }
}
```

Cho constructor nhận tham số để có thể chỉ định giá trị field động.

```ts title="TypeScript" twoslash
class Person {
  name: string;

  constructor(personName: string) {
    this.name = personName;
  }
}
const alice = new Person("Alice");
```
