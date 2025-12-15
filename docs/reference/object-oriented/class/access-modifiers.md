---
sidebar_label: Access modifier
---

# Access modifier (access modifier)

Trong các ngôn ngữ như Java hay PHP, có thể chỉ định `private`, `protected`, `public` cho field và method. JavaScript cũng có spec [Private class fields](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields) để thực hiện property kiểu `private`, nhưng hơi khác với access modifier kiểu Java. TypeScript có access modifier theo phong cách Java.

| Access modifier | Mô tả                                         |
| :-------------- | :-------------------------------------------- |
| (không khai báo)| Tương đương với public                        |
| public          | Có thể truy cập từ bất kỳ đâu                 |
| protected       | Có thể truy cập từ class hiện tại và subclass |
| private         | Chỉ có thể truy cập từ class hiện tại         |

Khi bỏ qua access modifier, mặc định là `public`.

Access modifier có thể khai báo cho field, constructor và method.

## `public`

Access modifier `public` có thể truy cập từ bất kỳ đâu. Khi bỏ qua access modifier cũng được xem là tương đương với `public`.

```ts twoslash
class Animal {
  public name: string; // Public access modifier cho field

  // Public access modifier cho constructor
  public constructor(theName: string) {
    this.name = theName;
  }

  // Public access modifier cho method
  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
    // Có thể sử dụng `this.name` vì nó có public access modifier
  }
}
```

Implement `gorilla` và kiểm tra hoạt động.

```ts twoslash
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// ---cut---
const gorilla = new Animal("ゴリラ");
gorilla.move(10);
// @log: "ゴリラ moved 10m."
gorilla.name = "ゴリラゴリラ";
gorilla.move(20);
// @log: "ゴリラゴリラ moved 20m."
```

Property `name` được khai báo `public` nên có thể đọc và ghi từ biến instance (`gorilla`). Có thể thay đổi từ "ゴリラ" sang "ゴリラゴリラ".

## `protected`

Access modifier `protected` có thể truy cập từ class hiện tại và subclass.

Thay đổi access modifier của method `move` trong class `Animal` từ `public` sang `protected` để xem lỗi.

```ts twoslash
// @errors: 2445
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  // Thay đổi từ `public` sang `protected`
  protected move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

const gorilla = new Animal("ゴリラ");
gorilla.move(10);
```

Method `gorilla.move()` được khai báo `protected` nên chỉ có thể truy cập từ class hiện tại và subclass. Tức là truy cập từ instance `gorilla` bị từ chối và xảy ra lỗi compile.

Implement lại method `move()` được bảo vệ bằng `protected` để tạo gorilla di chuyển nhanh gấp 10 lần.

```ts twoslash
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  // Thay đổi từ `public` sang `protected`
  protected move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  move(distanceInMeters: number) {
    super.move(distanceInMeters * 10);
  }
}

const gorilla = new Gorilla("速いゴリラ");
gorilla.move(10);
// @log: "速いゴリラ moved 100m."
```

Định nghĩa class `Gorilla` có superclass `Animal` và implement `move()`. Trong method `move()` của class `Gorilla`, sử dụng từ khóa `super` để gọi method `move()` của superclass.

## `private`

Access modifier `private` chỉ có thể truy cập từ class hiện tại.

Thay đổi `protected move()` thành `private move()`. Do thay đổi thành `private`, class `Gorilla` không được phép truy cập `super.move` và xảy ra lỗi.

```ts twoslash
// @errors: 2415 2341
class Animal {
  public name: string;

  public constructor(theName: string) {
    this.name = theName;
  }

  // Thay đổi từ `public` sang `private`
  private move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Gorilla extends Animal {
  move(distanceInMeters: number) {
    super.move(distanceInMeters * 10);
  }
}
```

Cách sử dụng phổ biến của `private` method là tách code dài trong class thành các phần theo chức năng.

## Thay đổi access modifier

Khi kế thừa class, có thể thay đổi access modifier của method. Tuy nhiên không thể tự do thay đổi bất kỳ, chỉ có thể thay đổi theo hướng nới lỏng hạn chế truy cập. Tức là có thể thay đổi theo hướng `protected` > `public` nhưng không thể làm ngược lại.

```ts twoslash
class ProtectedClass {
  protected doNothing(): void {
    console.log("DO NOTHING");
  }
}

class PublicClass extends ProtectedClass {
  public doNothing(): void {
    console.log("DO NOTHING");
  }
}
```

Không thể implement ngược lại `public` > `protected`.

```ts twoslash
// @errors: 2415
class PublicClass {
  public doNothing(): void {
    console.log("DO NOTHING");
  }
}

class ProtectedClass extends PublicClass {
  protected doNothing(): void {
    console.log("DO NOTHING");
  }
}
```
