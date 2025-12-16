---
sidebar_label: Destructuring assignment của object
---

# Destructuring assignment của object

JavaScript có cú pháp tiện lợi là destructuring assignment để lấy property từ object.

Thông thường, để lấy property từ object, sử dụng property accessor. Property accessor là cách viết dùng dấu chấm để tham chiếu property.

```ts twoslash
const item = { price: 100 };
const price = item.price; // Property accessor
```

Destructuring assignment cho phép tạo biến cùng tên với property bằng cách chỉ định property muốn lấy trong dấu ngoặc nhọn `{}`. Code mẫu destructuring assignment sau tương đương với code sử dụng property accessor ở trên.

```ts twoslash
const item = { price: 100 };
const { price } = item;
// Tương đương với const price = item.price;
```

Một lợi ích của destructuring assignment là khi định nghĩa biến cùng tên với property, không cần viết tên property hai lần.

## Lấy nhiều property

Destructuring assignment có thể lấy nhiều property cùng lúc. Trong trường hợp đó, liệt kê các property muốn lấy trong dấu ngoặc nhọn.

```ts twoslash
const obj = { a: 1, b: 2 };
const { a, b } = obj;
```

Đặc điểm này tiện lợi hơn property accessor khi số property cần lấy nhiều. Với property accessor, phải viết câu lệnh gán cho từng property.

```ts twoslash title="Ví dụ lấy bằng property accessor"
const color = { r: 0, g: 122, b: 204, a: 1 };
const r = color.r;
const g = color.g;
const b = color.b;
const a = color.a;
```

Sử dụng destructuring assignment có thể viết ngắn gọn hơn.

```ts twoslash title="Ví dụ lấy nhiều property bằng destructuring assignment"
const color = { r: 0, g: 122, b: 204, a: 1 };
const { r, g, b, a } = color;
```

## Chỉ định tên biến gán

Trong destructuring assignment của object, có thể gán vào biến có tên khác bằng cách chỉ định tên biến sau dấu hai chấm `:`.

```ts twoslash
const color = { r: 0, g: 122, b: 204, a: 1 };
const { r: red, g: green, b: blue, a: alpha } = color;
console.log(green);
// @log: 122
```

## Destructuring assignment với cấu trúc lồng nhau

Destructuring assignment cũng có thể sử dụng với cấu trúc lồng nhau khi object chứa object. Để lấy property ở level sâu, bao quanh bằng dấu ngoặc nhọn tương ứng với số level.

```ts twoslash
const continent = {
  name: "North America",
  us: {
    name: "United States",
    capitalCity: "Washington D.C.",
  },
};

const {
  us: { name, capitalCity },
} = continent;

console.log(name);
// @log: "United States"
console.log(capitalCity);
// @log: "Washington D.C."
// @lib: esnext
```

## Destructuring assignment lồng nhau với chỉ định tên biến

Có thể đồng thời destructuring assignment cấu trúc lồng nhau và chỉ định tên biến gán.

```ts twoslash
const continent = {
  name: "North America",
  us: {
    name: "United States",
    capitalCity: "Washington D.C.",
  },
};

const {
  name: continentName,
  us: { name: countryName },
} = continent;

console.log(continentName);
// @log: "North America"
console.log(countryName);
// @log: "United States"
```

## Giá trị default trong destructuring assignment

Trong destructuring assignment, có thể chỉ định giá trị default sau dấu `=`. Giá trị default được gán khi giá trị là `undefined`.

```ts twoslash
const color = { r: undefined, g: 122, b: 204 };
const { r = 0, g = 0, b = 0 } = color;
console.log(r, g, b);
// @log: 0,  122,  204
```

Khi giá trị là `null`, giá trị default không được sử dụng. `null` được gán nguyên vẹn.

```ts twoslash
const color = { r: null };
const { r = 0 } = color;
console.log(r);
// @log: null
```

## Giá trị default và chỉ định tên biến

Có thể đồng thời chỉ định giá trị default và tên biến gán trong destructuring assignment. Trong trường hợp đó, viết giá trị default sau tên biến gán.

```ts twoslash
const color = { r: undefined, g: 122, b: 204 };
const { r: red = 0 } = color;
console.log(red);
// @log: 0
```

<PostILearned>

・Destructuring assignment trong JavaScript có thể lấy property
・Khi sử dụng cùng tên biến, code trở nên ngắn gọn
・Đặc biệt tiện lợi khi lấy nhiều property
・Có thể lấy property lồng nhau
・Có thể chỉ định giá trị default

</PostILearned>

## Thông tin liên quan

[Destructuring assignment của array](../array/destructuring-assignment-from-array.md)
