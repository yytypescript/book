---
sidebar_label: Getter và Setter
---

# Getter và Setter (set, get)

Getter và Setter là interceptor cho property (có ý nghĩa như truy cập, gán giá trị, theo dõi).

Cách khai báo như sau:

```ts twoslash
class Human {
  private _name: string;

  public constructor(name: string) {
    this._name = name;
  }

  // Khai báo Getter
  get name(): string {
    return this._name;
  }

  // Khai báo Setter
  set name(name: string) {
    this._name = name;
  }
}

const human = new Human("");
// Sử dụng Setter
human.name = `Nguyen Van An`;
// Sử dụng Getter
console.log(human.name);
// @log: Nguyen Van An
```

Khác với method, khi gọi getter/setter không cần dùng `()`.

```ts twoslash
class Human {
  private _name: string;

  public constructor(name: string) {
    this._name = name;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }
}

const human = new Human("Nguyen Van An");
// ---cut---
// @errors: 2349 6234
// Getter
console.log(human.name); // Cách sử dụng Getter đúng
// @log: "Nguyen Van An"
console.log(human.name()); // Lỗi: human.name is not a function

// Setter
human.name = "Nguyen Van An"; // Cách sử dụng Setter đúng
human.name("Nguyen Van An");
```

## Getter

Cú pháp của Getter:

```ts
get tên(): kiểu_dữ_liệu {
  // Xử lý nếu cần
  return giá_trị;
}
```

Getter không thể có tham số. Phải chỉ định giá trị trả về.

## Setter

Cú pháp của Setter:

```ts
set tên(biến: kiểu_dữ_liệu) {
  // Xử lý nếu cần
  // Xử lý lưu giá trị
}
```

Setter bắt buộc phải có đúng một tham số. Không thể chỉ định giá trị trả về.
