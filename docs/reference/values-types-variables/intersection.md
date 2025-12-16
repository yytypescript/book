---
sidebar_label: Intersection type
---

# Intersection type (kiểu giao)

Khái niệm này đối lập với union type. Nếu union type có nghĩa **một trong các** thì intersection type có nghĩa **tất cả**. Nói cách khác, nó chỉ việc kết hợp các định nghĩa object.

Để tạo intersection type, liệt kê các object muốn kết hợp bằng `&`.

```ts twoslash
type TwoDimensionalPoint = {
  x: number;
  y: number;
};

type Z = {
  z: number;
};

type ThreeDimensionalPoint = TwoDimensionalPoint & Z;

const p: ThreeDimensionalPoint = {
  x: 0,
  y: 1,
  z: 2,
};
```

Chúng ta đã mở rộng `TwoDimensionalPoint` biểu diễn điểm trên mặt phẳng xy thành `ThreeDimensionalPoint` biểu diễn điểm trên không gian xyz.

## Intersection type của primitive type

Có thể tạo intersection type của primitive type, nhưng khi tạo sẽ tạo ra kiểu `never`.

```ts twoslash
// @errors: 2322
type Never = string & number;

const n: Never = "2";
```

Kiểu `never` này không thể gán bất kỳ giá trị nào. Thoạt nhìn có vẻ vô dụng nhưng thực tế lại hữu ích ở những nơi không ngờ tới. Lần này chúng ta sẽ bỏ qua phần giải thích.

## Sử dụng thành thạo intersection type

Giả sử khi hệ thống lớn dần, parameter muốn nhận cũng lớn theo.

```ts twoslash
type Parameter = {
  id: string;
  index?: number;
  active: boolean;
  balance: number;
  photo?: string;
  age?: number;
  surname: string;
  givenName: string;
  company?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  // ...
};
```

Nhìn sơ qua rất khó hiểu property nào là bắt buộc, property nào là tùy chọn. Có thể biểu diễn dễ hiểu hơn bằng intersection type và utility type `Required<T>` và `Partial<T>`. Về utility type có trang giải thích riêng.

[Required&lt;T>](../type-reuse/utility-types/required.md)

[Partial&lt;T>](../type-reuse/utility-types/partial.md)

### Tách thành type alias cho parameter bắt buộc và không bắt buộc

```ts twoslash
type Mandatory = {
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
};

type Optional = {
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
};
```

### Thêm `Required<T>, Partial<T>`

Thêm `Required<T>` cho `Mandatory`, thêm `Partial<T>` cho `Optional`.

```ts twoslash
type Mandatory = Required<{
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
}>;

type Optional = Partial<{
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
}>;
```

### Kết hợp bằng intersection type

Như vậy chúng ta đã tạo được type alias giống với `Parameter` đã định nghĩa ban đầu.

```ts twoslash
type Mandatory = Required<{
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
}>;

type Optional = Partial<{
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
}>;
// ---cut---
type Parameter = Mandatory & Optional;
```
