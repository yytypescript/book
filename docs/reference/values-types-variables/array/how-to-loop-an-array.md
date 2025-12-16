---
sidebar_label: Cách loop array
image: /img/how-to-loop-an-array.png
---

# Cách loop array

Trong JavaScript/TypeScript, để loop array có 3 cách chính: câu lệnh for, câu lệnh for-of, và các method của array.

## Câu lệnh for

Câu lệnh for là cách loop array có từ lâu đời.

```ts twoslash
const arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
  // 0 a
  // 1 b
  // 2 c theo thứ tự
}
```

Có thể dùng `break` để dừng loop.

```ts twoslash
const arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]);
  if (arr[i] === "b") {
    break;
  }
}
// a b được xuất ra theo thứ tự rồi kết thúc
```

Có thể dùng `continue` để skip sang loop tiếp theo.

```ts twoslash
const arr = ["a", "b", "c"];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === "a") {
    continue;
  }
  console.log(arr[i]);
  // b c được xuất ra theo thứ tự
}
```

## Câu lệnh for-of

Câu lệnh for-of có đặc điểm là khi xử lý từng phần tử của array, có thể viết đơn giản hơn câu lệnh for.

```ts twoslash
const arr = ["a", "b", "c"];
for (const value of arr) {
  console.log(value);
  // a b c theo thứ tự
}
```

Câu lệnh for-of cũng có thể dùng `break` và `continue` giống như câu lệnh for.

[Câu lệnh for-of](../../statements/for-of.md)

## Các method của Array

`Array` có một số method để xử lý từng phần tử.

Callback function được truyền vào method `forEach` sẽ được thực thi cho mỗi phần tử. `forEach` không có return value. Khác với câu lệnh for, không thể dùng `break` hay `continue`.

```ts twoslash
const arr = ["a", "b", "c"];
arr.forEach((value, i) => {
  console.log(value, i);
  // a 0
  // b 1
  // c 2 theo thứ tự
});
```

Method `map` cũng thực thi callback function cho mỗi phần tử. Return value của callback function sẽ trở thành return value của `map`. Tiện lợi khi muốn xử lý các giá trị phần tử của array để tạo array khác. `map` cũng không thể dùng `break` hay `continue`.

```ts twoslash
const arr = ["a", "b", "c"];
const arr2 = arr.map((value) => value + value);
console.log(arr2);
// @log: [ 'aa', 'bb', 'cc' ]
```

## Không nên dùng câu lệnh for-in

Cũng có thể loop array bằng câu lệnh for-in. Tuy nhiên, không nên dùng câu lệnh for-in để loop array. Vì với array, thứ tự thường rất quan trọng, nhưng câu lệnh for-in không đảm bảo thứ tự.

Ngoài ra, nếu array object có thêm property, câu lệnh for-in cũng sẽ bao gồm nó trong quá trình lặp. Điều này có nguy cơ dẫn đến bug không mong muốn.

```js twoslash
const arr = ["a", "b", "c"];
arr.foo = "bar"; // Property bổ sung
for (const x in arr) {
  console.log(x, arr[x]);
  // 0 a
  // 1 b
  // 2 c
  // foo bar theo thứ tự
}
```

<PostILearned>

・Trong TypeScript/JavaScript, có 3 cách chính để loop array.
① Câu lệnh for
② Câu lệnh for-of
③ Các method của array
・Câu lệnh for là cú pháp có từ lâu đời
・Câu lệnh for-of có thể viết loop đơn giản hơn câu lệnh for
・Array có các method như forEach và map

</PostILearned>

## Thông tin liên quan

[Cách loop object](../object/how-to-loop-an-object.md)
