---
sidebar_label: Constructor
---

# Constructor (constructor)

Constructor là function được thực thi khi new class. Constructor là nơi implement xử lý khởi tạo instance property. Constructor trong JavaScript được viết bằng cú pháp constructor.

```ts
class Person {
  constructor(name) {
    // ...
  }
}
```

## Type annotation cho constructor

Trong TypeScript, type annotation cho tham số constructor giống như cách type annotation cho function.

```ts twoslash
class Person {
  constructor(name: string) {
    // ...
  }
}
```

Không thể type annotation cho giá trị trả về của constructor. Giá trị trả về của constructor đương nhiên là instance của class, nên không cần phải báo cho compiler biết qua type annotation.

## Truyền tham số cho constructor

Cách truyền tham số cho constructor trong JavaScript gần giống với cách gọi function. Điểm khác là có thêm toán tử new.

```ts twoslash
class Person {
  constructor(name: string) {
    // ...
  }
}
// ---cut---
new Person("Alice");
```

## Async hóa constructor

Trong TypeScript, không thể async hóa constructor. Không thể viết như sau:

<!--prettier-ignore-->
```ts
class Person {
  async constructor(name: string) {
    // ...
  }
}
```

Nếu nhất định muốn async hóa, hãy chuẩn bị factory method trả về instance của class và thực thi xử lý async trong method đó.

```ts
class Person {
  static async create(name: string): Promise<Person> {
    // Xử lý async
    return new Person(name);
  }

  constructor(name: string) {
    // ...
  }
}
```

## Thông tin liên quan

[constructor shorthand](constructor-shorthand.md)
