# Vòng lặp for-of - Enhanced for loop

Trong JavaScript, cú pháp for-of có thể được sử dụng để lặp qua mảng. Đây là cú pháp có cách sử dụng tương tự như `foreach` trong PHP hoặc `for in` trong Python.

```js
for (変数 of 配列) {
  文;
}
```

Lưu ý rằng bạn không thể viết kiểu cho biến.

Ví dụ sau lặp qua mảng `[1, 2, 3]` và xuất ra `1`, `2`, `3` theo thứ tự.

```js twoslash
const numbers = [1, 2, 3];
for (const n of numbers) {
  console.log(n);
}
```

## Lấy index trong for-of

Trong JavaScript, để lấy cả index và giá trị của mảng trong for-of, kết hợp với method `entries`.

```js twoslash
const words = ["I", "love", "TypeScript"];
for (const [index, word] of words.entries()) {
  console.log(index, word);
}
// @log: 0 I

// @log: 1 love

// @log: 2 TypeScript
```

## Thông tin liên quan

[配列をループする方法](../values-types-variables/array/how-to-loop-an-array.md)

[オブジェクトをループする方法](../values-types-variables/object/how-to-loop-an-object.md)
