---
slug: /reference/type-reuse/conditional-types
sidebar_label: Conditional Types
---

# Conditional Types

Conditional Types được gọi bằng nhiều tên như kiểu điều kiện, phân nhánh kiểu, v.v. Nó được viết dưới dạng `T extends U ? X : Y` giống như toán tử ba ngôi, sử dụng `?` và `:`. Nếu `T` có thể gán cho `U`, kết quả sẽ là `X`, ngược lại sẽ là `Y`.

Trong trường hợp này, kiểu sẽ là `true`:

```ts twoslash
type IsString<T> = T extends string ? true : false;

const a: IsString<"a"> = true;
//    ^?
```

Ví dụ, có một utility type `Readonly<T>` biến các property của object type thành read-only. `Readonly<T>` chỉ biến các property trực tiếp của object thành read-only, nhưng không áp dụng cho các property của object lồng nhau. Giả sử có object như sau:

```ts twoslash
type Person = {
  name: string;
  age: number;
  address: {
    country: string;
    city: string;
  };
};
```

Khi sử dụng `Readonly<Person>`, property `address` tự nó đã là read-only và không thể ghi đè, nhưng các property `country` và `city` của `address` không phải read-only và có thể ghi đè.

```ts twoslash
type Person = {
  name: string;
  age: number;
  address: {
    country: string;
    city: string;
  };
};
// ---cut---
// @errors: 2540
const kimberley: Readonly<Person> = {
  name: "Kimberley",
  age: 24,
  address: {
    country: "Canada",
    city: "Vancouver",
  },
};

kimberley.name = "Kim";
kimberley.age = 25;
kimberley.address = {
  country: "United States",
  city: "Seattle",
};
kimberley.address.country = "United States";
kimberley.address.city = "Seattle";
```

Để giải quyết vấn đề này, cần áp dụng `Readonly<T>` một cách đệ quy. Trong trường hợp này, chúng ta kết hợp Mapped Types và Conditional Types.

```ts twoslash
type Freeze<T> = Readonly<{
  [P in keyof T]: T[P] extends object ? Freeze<T[P]> : T[P];
}>;
```

Hãy tạo `Freeze<T>` như thế này và thử sử dụng nó.

```ts twoslash
type Person = {
  name: string;
  age: number;
  address: {
    country: string;
    city: string;
  };
};

type Freeze<T> = Readonly<{
  [P in keyof T]: T[P] extends object ? Freeze<T[P]> : T[P];
}>;
// ---cut---
// @errors: 2540
const kimberley: Freeze<Person> = {
  name: "Kimberley",
  age: 24,
  address: {
    country: "Canada",
    city: "Vancouver",
  },
};

kimberley.name = "Kim";
kimberley.age = 25;
kimberley.address = {
  country: "United States",
  city: "Seattle",
};
kimberley.address.country = "United States";
kimberley.address.city = "Seattle";
```

Khác với `Readonly<T>`, `address.country` và `address.city` giờ đây không thể ghi đè. Đó là vì `Freeze<T>` được áp dụng một cách đệ quy.

Phần `[P in keyof T]` đã được giải thích trong trang Mapped Types nên ở đây sẽ giải thích ngắn gọn. `keyof T` chuyển đổi các key của object thành union type. Với `kimberley`, nó sẽ là `"name" | "age" | "address"`. `in` có nghĩa là một trong số đó.
`T[P]` lấy kiểu của property tại một key nào đó của object. Nếu kiểu đó là `object`, áp dụng đệ quy `Freeze<T[P]>`, ngược lại sử dụng `T[P]` như vốn có.

[Mapped Types](../mapped-types.md)

Nhờ đó, chúng ta có thể đóng băng object một cách đệ quy.
