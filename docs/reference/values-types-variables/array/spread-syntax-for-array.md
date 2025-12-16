---
sidebar_label: 'Spread syntax của array "..."'
---

# Spread syntax của array "..." (spread syntax)

Trong JavaScript, với array có thể sử dụng spread syntax "..." để triển khai các phần tử.

## Tạo array

Khi muốn thêm phần tử vào một array để tạo array mới, nếu không dùng spread syntax thì cần viết code như sau.

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [];
for (const item of arr) {
  arr2.push(item);
}
arr2.push(4);
```

Bằng cách sử dụng spread syntax, implementation trên có thể viết lại đơn giản như sau.

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [...arr, 4];
```

Spread syntax có thể viết ở vị trí tùy ý trong array literal, nên cũng có thể chèn array khác vào giữa các phần tử.

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [0, ...arr, 4];
```

## Copy array

Khi tạo bản copy của array, spread syntax rất tiện lợi. Bản copy được tạo bằng spread syntax có thực thể khác với array gốc.

```ts twoslash
const arr = [1, 2, 3];
const backup = [...arr];
arr.push(4); // Thực hiện thay đổi
console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(backup); // Copy không bị ảnh hưởng
// @log: (3) [1, 2, 3]
```

Lưu ý rằng phương pháp này là shallow copy (copy nông), không phải deep copy (copy sâu). Shallow copy chỉ sao chép được các phần tử ở tầng 1. Nếu trong array có array lồng nhau, các array từ tầng 2 trở đi sẽ chia sẻ giá trị với array gốc.

```js twoslash
const arr = [1, [2, 3]];
const backup = [...arr];
arr[1].push(4);
console.log(arr[1]);
// @log: (3) [2, 3, 4]
console.log(backup[1]); // Bị ảnh hưởng bởi thay đổi
// @log: (3) [2, 3, 4]
```

Giải thích chi tiết về hành vi của shallow copy như trên có tại đây.

[Shallow copy object](../../../tips/shallow-copy-object.md)

Cũng có thể dùng [method `concat()` của array](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) như một phương pháp tương đương với spread operator.

```ts twoslash
const arr = [1, 2, 3];
const backup = arr.concat();
arr.push(4); // Thực hiện thay đổi
console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(backup); // Copy không bị ảnh hưởng
// @log: (3) [1, 2, 3]
```

## Nối array

Việc nối array cũng có thể viết đơn giản bằng spread syntax.

```ts twoslash
const arr = [1, 2, 3];
const arr2 = [4, 5, 6];
const concated = [...arr, ...arr2];
```

## Destructuring assignment và rest pattern

Có syntax tương tự là rest pattern được sử dụng trong destructuring assignment, nhưng đây là syntax khác nhau nên cần lưu ý.

[Destructuring assignment của array](./destructuring-assignment-from-array.md)
