---
sidebar_label: "Interface"
slug: /reference/object-oriented/interface
---

# Interface (interface)

Interface là kiểu định nghĩa field và method mà class cần implement. Class implement interface để có thể kiểm tra xem có tuân theo tên method và kiểu tham số mà interface yêu cầu hay không.

Trong các ngôn ngữ như Java hay PHP có thể định nghĩa interface, nhưng JavaScript không có cú pháp tương ứng. Ngược lại, TypeScript có interface.

Interface được định nghĩa trong TypeScript, sau khi được sử dụng để kiểm tra compile, sẽ bị xóa trong quá trình sinh ra code JavaScript, nên interface không ảnh hưởng khi chạy JavaScript.

## Định nghĩa interface

Trong TypeScript có thể định nghĩa interface bằng từ khóa `interface`.

```ts twoslash
interface SomeInterface {
  method1(): void;
  method2(arg: string): void;
}
```

Trong TypeScript không chỉ method mà còn có thể định nghĩa public field.

```ts twoslash
interface SomeInterface {
  field: string;
}
```

## Interface và structural subtyping

Trong các ngôn ngữ OOP như Java, interface được sử dụng như định nghĩa kiểu trừu tượng của class. Do đó, interface không được sử dụng đơn lẻ mà phát huy hiệu quả khi class cụ thể kế thừa interface và thêm implementation.

Trong TypeScript cũng có thể cho class implement interface, ngoài ra vì TypeScript là structural subtyping nên cũng có thể sử dụng làm type annotation cho object không có quan hệ implement với interface.

```ts twoslash
interface Person {
  name: string;
  age: number;
}

const tuan: Person = {
  name: "Tuan",
  age: 12,
};
```

[Structural subtyping (structural subtyping)](../../values-types-variables/structural-subtyping.md)
