---
sidebar_label: Toán tử satisfies
---

# Toán tử satisfies (satisfies operator)

`satisfies T` (T là type) là toán tử sử dụng khi khai báo biến, dùng để kiểm tra xem giá trị đó có thỏa mãn type T không. Đặc điểm của toán tử này là có thể thực hiện type check trong khi vẫn giữ được việc thu hẹp type.

Khác với `as const`, `satisfies` yêu cầu một type đi sau nó. Không thể sử dụng đơn lẻ.

## Những điều giống với type annotation

Việc viết `: T` sau tên biến khi khai báo biến được gọi là type annotation. Type annotation kiểm tra xem biến đó có thỏa mãn type T khi khai báo biến.

Nghe có vẻ chức năng của `satisfies T` hoàn toàn giống với type annotation. Thực tế, ví dụ sau hoạt động hoàn toàn giống nhau.

```ts twoslash
type Pokemon = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};
const pikachu: Pokemon = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
};
const raichu = {
  name: "raichu",
  no: 26,
  genre: "mouse pokémon",
  height: 0.8,
  weight: 30.0,
} satisfies Pokemon;
```

Cả hai đều phát sinh lỗi nếu gán type không theo đúng type đã khai báo.
Ngoài ra, cũng không thể thêm property không tồn tại.

```ts twoslash
type Pokemon = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

// ---cut---
// @errors: 2322 2353
const pikachu: Pokemon = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: "0.4m",
  weight: "6.0kg",
};
const raichu = {
  name: "raichu",
  no: 26,
  genre: "mouse pokémon",
  height: "0.8m",
  weight: "30.0kg",
} satisfies Pokemon;
```

```ts twoslash
type Pokemon = {
  name: string;
  no: number;
  genre: string;
  height: number;
  weight: number;
};

// ---cut---
// @errors: 2353
const pikachu: Pokemon = {
  name: "pikachu",
  no: 25,
  genre: "mouse pokémon",
  height: 0.4,
  weight: 6.0,
  type: "electric",
};
const raichu = {
  name: "raichu",
  no: 26,
  genre: "mouse pokémon",
  height: 0.8,
  weight: 30.0,
  type: "electric",
} satisfies Pokemon;
```

## Những điều khác với type annotation

Đặc điểm lớn nhất của `satisfies` là khi type T chứa union type, nó vẫn có thể thu hẹp type dựa trên giá trị thực tế. Có thể giữ lại thông tin type mà với type annotation sẽ bị mất đi.
Chủ yếu sử dụng với object literal hoặc array, nhưng cũng có thể sử dụng với primitive type.

```ts twoslash
const array1: (string | number)[] = [1, 2, 3];
//    ^?
const array2 = [1, 2, 3] satisfies (string | number)[];
//    ^?
```

Với array của union type, đôi khi kết quả không như mong đợi.

```ts twoslash
const array1: (string | number)[] = [1, "2", 3];
//    ^?
const array2 = [1, "2", 3] satisfies (string | number)[];
//    ^?
```

Với tuple type, việc thu hẹp type được thực hiện cho từng phần tử.

```ts twoslash
const tuple1: [string | number, string | number, string | number] = [1, "2", 3];
//    ^?
const tuple2 = [1, "2", 3] satisfies [
  //    ^?
  string | number,
  string | number,
  string | number
];
```

Cũng có hiệu quả với union type trong property của object.

```ts twoslash
type SuccessResponse = {
  success: true;
  data: object;
};
type ErrorResponse = {
  success: false;
  error: string;
};
type ApiResponse = SuccessResponse | ErrorResponse;

const res1: ApiResponse = {
  //    ^?
  success: false,
  error: "too many requests",
};
const res2 = {
  //    ^?
  success: false,
  error: "too many requests",
} satisfies ApiResponse;
```

## Kết hợp với as const

Có thể kết hợp với `as const` và viết `as const satisfies T`.

Điều này kết hợp chức năng của `as const` và `satisfies`: kiểm tra xem có thỏa mãn type T không, thực hiện thu hẹp type, và thêm vào đó làm thành literal type và readonly.

```ts twoslash
type SuccessResponse = {
  success: true;
  data: object;
};
type ErrorResponse = {
  success: false;
  error: string;
};
type ApiResponse = SuccessResponse | ErrorResponse;
// ---cut---
const array = [1, "2", 3] as const satisfies (string | number)[];
//    ^?
const tuple = [1, "2", 3] as const satisfies [
  //    ^?
  string | number,
  string | number,
  string | number
];

const res = {
  //    ^?
  success: false,
  error: "too many requests",
} as const satisfies ApiResponse;
```
