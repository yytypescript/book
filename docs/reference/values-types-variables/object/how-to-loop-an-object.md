# Cách loop object

Giải thích cách loop qua property của object trong JavaScript/TypeScript.

## Câu lệnh for-in

Cách cổ điển để loop object trong JavaScript là sử dụng câu lệnh for-in.

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
for (const prop in foo) {
  console.log(prop, foo[prop]);
  // a 1
  // b 2
  // c 3 được output theo thứ tự
}
```

## Nên sử dụng `hasOwnProperty` với for-in

Object trong JavaScript có prototype làm nguồn gốc. Ví dụ, với object literal, `Object.prototype` là prototype.

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
console.log(Object.getPrototypeOf(foo) === Object.prototype);
// @log: true
```

Khi thay đổi `Object.prototype`, ảnh hưởng sẽ lan đến tất cả object có prototype này.

```js twoslash
const foo = { a: 1 };
const date = new Date();
const arr = [1, 2, 3];

// Xác nhận không có property hi ở object nào
console.log(foo.hi, date.hi, arr.hi);
// @log: undefined undefined undefined

// Thêm property vào prototype
Object.prototype.hi = "Hi!";

// Tất cả object đều có property hi
console.log(foo.hi, date.hi, arr.hi);
// @log: Hi! Hi! Hi!
```

Câu lệnh for-in có đặc điểm loop bao gồm cả property của prototype. Do đó, khi prototype bị thay đổi, số lần loop của for-in có thể thay đổi ngoài ý muốn.

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
Object.prototype.hi = "Hi!";
for (const prop in foo) {
  console.log(prop, foo[prop]);
  // a 1
  // b 2
  // c 3
  // hi Hi! được output theo thứ tự
}
```

Do đó, khi viết xử lý lặp bằng for-in, an toàn hơn là kiểm tra property không phải của prototype bằng `hasOwnProperty`.

```js twoslash
const foo = { a: 1, b: 2, c: 3 };
Object.prototype.hi = "Hi!";
for (const prop in foo) {
  if (Object.prototype.hasOwnProperty.call(foo, prop)) {
    console.log(prop, foo[prop]);
    // a 1
    // b 2
    // c 3 được output theo thứ tự
  }
}
```

## `Object.entries`

Cũng có cách loop giá trị trả về của `Object.entries` bằng câu lệnh for-of.

```ts twoslash
// @target: es2017
const foo = { a: 1, b: 2, c: 3 };
for (const [key, value] of Object.entries(foo)) {
  console.log(key, value);
  // a 1
  // b 2
  // c 3 được output theo thứ tự
}
```

Khác với câu lệnh for-in, không cần kiểm tra `hasOwnProperty`.

## `Object.keys`

Khi chỉ muốn lặp qua key của property, có cách loop giá trị trả về của `Object.keys` bằng câu lệnh for-of.

```ts twoslash
// @target: es2017
const foo = { a: 1, b: 2, c: 3 };
for (const key of Object.keys(foo)) {
  console.log(key);
  // a
  // b
  // c được output theo thứ tự
}
```

Khác với câu lệnh for-in, không cần kiểm tra `hasOwnProperty`.

## `Object.values`

Khi chỉ muốn lặp qua value của property, có cách loop giá trị trả về của `Object.values` bằng câu lệnh for-of.

```ts twoslash
// @target: es2017
const foo = { a: 1, b: 2, c: 3 };
for (const value of Object.values(foo)) {
  console.log(value);
  // 1
  // 2
  // 3 được output theo thứ tự
}
```

Khác với câu lệnh for-in, không cần kiểm tra `hasOwnProperty`.

<PostILearned>

Để loop qua property của object trong JavaScript và TypeScript có các cách sau:

1️⃣ Câu lệnh for-in
2️⃣ Câu lệnh for-of + Object.entries()
3️⃣ Câu lệnh for-of + Object.keys()
4️⃣ Câu lệnh for-of + Object.values()

⚠️ Câu lệnh for-in cần kiểm tra hasOwnProperty.

</PostILearned>

## Thông tin liên quan

[Cách loop array](../array/how-to-loop-an-array.md)
