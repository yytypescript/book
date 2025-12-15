---
title: Set<T>
---

`Set` là một trong những built-in API của JavaScript, là object để xử lý collection các giá trị. `Set` không thể lưu trữ giá trị trùng lặp. Các giá trị được lưu trong `Set` là duy nhất (unique).

## Cách tạo đối tượng Set

Để tạo object `Set` mới, dùng `new` với class `Set`. Khi truyền mảng vào constructor, các giá trị sẽ được lưu vào `Set`.

```ts twoslash
const fruits = new Set(["apple", "orange", "banana"]);
console.log(fruits);
// @log: Set { 'apple', 'orange', 'banana' }
```

Nếu trong mảng truyền vào constructor có giá trị trùng lặp, các giá trị trùng sẽ bị loại bỏ.

```ts twoslash
const fruits = new Set(["apple", "apple", "apple"]);
console.log(fruits);
// @log: Set { 'apple' }
```

Nếu bỏ qua tham số constructor, sẽ tạo object `Set` rỗng.

```ts twoslash
const fruits = new Set();
console.log(fruits);
// @log: Set {}
```

Object `Set` rỗng trong TypeScript có kiểu `Set<unknown>`. Với kiểu này không thể thêm giá trị vào `Set` sau này, nên khi tạo `Set` rỗng cần chỉ định type variable của `Set`.

```ts
const fruits = new Set<string>();
//                    ^^^^^^^^ Chỉ định type variable
```

## Type annotation cho Set

Khi type annotation cho `Set` trong TypeScript, chỉ định kiểu của phần tử Set vào type variable như `Set<string>`.

```ts twoslash
function doSomething(strings: Set<string>) {
  // ...
}
```

## Thao tác với Set

### Thêm giá trị - `Set.prototype.add()`

Để thêm giá trị vào `Set`, sử dụng method `add`. Giá trị giống nhau dù thêm nhiều lần cũng không tăng.

```ts twoslash
const fruits = new Set<string>();
fruits.add("apple");
fruits.add("apple");
console.log(fruits);
// @log: Set (1) {"apple"}
```

Giá trị được thêm vào cuối cùng. Giá trị đã tồn tại sẽ không được thêm và thứ tự không thay đổi.

```ts twoslash
const numbers = new Set<number>();
numbers.add(1).add(2).add(3);
numbers.add(1);
console.log(numbers);
// @log: Set (3) {1, 2, 3}
```

### Xóa giá trị - `Set.prototype.delete()`

Để xóa giá trị khỏi `Set`, sử dụng method `delete`.

```ts twoslash
const numbers = new Set([1, 2, 3]);
numbers.delete(3);
console.log(numbers);
// @log: Set (2) {1, 2}
```

### Kiểm tra sự tồn tại của giá trị - `Set.prototype.has()`

Để kiểm tra xem giá trị có tồn tại trong `Set` hay không, sử dụng method `has`.

```ts twoslash
const numbers = new Set([1, 2, 3]);
console.log(numbers.has(1));
// @log: true
console.log(numbers.has(999));
// @log: false
```

### Lấy số lượng giá trị - `Set.prototype.size()`

Để kiểm tra có bao nhiêu giá trị đã đăng ký trong `Set`, xem giá trị của field `size`.

```ts twoslash
const fruits = new Set(["apple", "orange", "banana"]);
console.log(fruits.size);
// @log: 3
```

### Làm rỗng Set - `Set.prototype.clear()`

Để xóa tất cả giá trị đã đăng ký trong `Set`, sử dụng method `clear`.

```ts twoslash
const fruits = new Set(["apple", "orange", "banana"]);
fruits.clear();
console.log(fruits);
// @log: Set (0) {}
```

### Lặp qua Set

Object `Set` có thể lặp bằng cú pháp for-of.

```ts twoslash
const fruits = new Set(["apple", "orange", "banana"]);

for (const fruit of fruits) {
  console.log(fruit); // Output theo thứ tự "apple", "orange", "banana"
}
```

[for-of statement - Enhanced for statement](../statements/for-of.md)

### Chuyển Set thành mảng

Để chuyển object `Set` thành mảng, sử dụng spread syntax.

```ts twoslash
const fruits = new Set(["apple", "orange", "banana"]);
const array = [...fruits];
console.log(array);
// @log: ["apple", "orange", "banana"]
```

[Spread syntax cho mảng "..." (spread syntax)](../values-types-variables/array/spread-syntax-for-array.md)

## Set không thể chuyển trực tiếp thành JSON

Khi đưa object `Set` qua `JSON.stringify`, các giá trị đã đăng ký trong `Set` sẽ không trở thành JSON.

```ts twoslash
const fruits = new Set(["apple", "orange", "banana"]);
console.log(JSON.stringify(fruits));
// @log: "{}"
```

Khi muốn chuyển dữ liệu của object Set thành JSON, cần một bước như chuyển thành mảng trước.

```ts twoslash
const fruits = new Set(["apple", "orange", "banana"]);
const array = [...fruits];
console.log(JSON.stringify(array));
// @log: ["apple","orange","banana"]
```

## Recipe

### Loại bỏ phần tử trùng lặp khỏi mảng

Sử dụng đặc tính "giá trị truyền vào `Set` không bị trùng lặp", có thể áp dụng cho việc loại bỏ các phần tử có giá trị trùng lặp khỏi mảng.

```js twoslash
const array1 = [0, 0, 1, 1, 2, 2];
const array2 = [...new Set(array1)];
console.log(array2);
// @log: [ 0, 1, 2 ]
```
