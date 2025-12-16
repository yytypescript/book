---
sidebar_label: Abstract class
---

# Abstract class (abstract class)

Trong các ngôn ngữ như Java hay PHP, có thể định nghĩa abstract class bằng modifier `abstract`. Abstract class là class không thể tạo instance trực tiếp. JavaScript không có cú pháp để định nghĩa abstract class. Ngược lại, TypeScript có modifier `abstract` để biểu diễn abstract class.

`abstract` được khai báo khi tạo abstract class. Abstract class là class không thể được khởi tạo trực tiếp (`new`), và đảm bảo chỉ được sử dụng như superclass. Method trong abstract class cũng có thể khai báo `abstract`. Tương tự như `interface`, subclass phải implement abstract method.

Khi thay đổi class `Food` thành abstract class và thêm method "cần bảo quản lạnh" `keepRefrigerated()` như một abstract method, class `Meat` sẽ báo lỗi. Lý do là class `Meat` chưa implement method `keepRefrigerated`.

```ts twoslash
// @errors: 2515
abstract class Food {
  constructor(protected name: string, protected calorie: number) {}
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}

class Meat extends Food {}
```

Implement method `keepRefrigerated()` để xóa lỗi.

```ts twoslash
abstract class Food {
  constructor(protected name: string, protected calorie: number) {}
  showDebug() {
    console.log(`name = ${this.name} `);
    console.log(`calorie = ${this.calorie}kcal `);
  }
  abstract keepRefrigerated(): boolean;
}
// ---cut---
class Meat extends Food {
  keepRefrigerated(): boolean {
    return true;
  }
}
```

## Điều gì xảy ra khi compile sang JavaScript

Abstract class của TypeScript vẫn tồn tại sau khi compile sang JavaScript, không bị xóa. Khi định nghĩa một abstract class rỗng và compile thì kết quả sẽ như thế nào?

```ts twoslash
abstract class AbstractClass {}
```

Compile TypeScript trên sẽ sinh ra JavaScript sau:

```ts twoslash title="Kết quả compile"
// @showEmit
// @alwaysStrict: false
abstract class AbstractClass {}
```

Như vậy, abstract class được compile thành class thông thường với modifier `abstract` bị loại bỏ.

Abstract method bị xóa khi compile. Ví dụ, `concreteMethod` có implementation sẽ được giữ lại, nhưng abstract method `abstractMethod` sẽ bị xóa.

```ts twoslash
abstract class AbstractClass {
  concreteMethod(): void {
    /* Nội dung implementation */
  }
  abstract abstractMethod(): void;
}
```

Kết quả compile TypeScript trên như sau:

```ts twoslash title="Kết quả compile"
// @showEmit
// @alwaysStrict: false
abstract class AbstractClass {
  concreteMethod(): void {
    /* Nội dung implementation */
  }
  abstract abstractMethod(): void;
}
```
