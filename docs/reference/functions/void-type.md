---
sidebar_label: Hàm không có return value và kiểu void
---

# Hàm không có return value và kiểu void (void type)

Trong TypeScript, để type annotation cho return value của hàm không có return value, sử dụng kiểu void. Kiểu void là kiểu đặc biệt dùng để type annotation cho return value của hàm.

```ts twoslash
function print(message: string): void {
  console.log(message);
}
```

Trong JavaScript, khi gọi hàm không có return value, giá trị trả về từ hàm đó là `undefined`.

```ts twoslash
function fn() {
  // Hàm không có return value
}
const result = fn();
console.log(result);
// @log: undefined
```

Tuy nhiên, trong TypeScript, đối với hàm không có return value như vậy, thường dùng `void` cho type annotation của return value.

```ts twoslash
function fn(): void {
  // Hàm không có return value
}
```

## Sự khác biệt giữa kiểu undefined và kiểu void

Thay vì kiểu void, cũng có thể dùng kiểu undefined cho type annotation của return value của hàm. Tuy nhiên, đây không phải là cách viết phổ biến.

### Khi nào nên dùng kiểu undefined và khi nào không

Cũng có thể annotation kiểu `undefined` cho return type. Về mặt xử lý kiểu thì không có khác biệt với `void`. Do đó, code sau không gây compile error.

```ts twoslash
function fn(): undefined {
  // Hàm không có return value
}
```

Tuy nhiên, nếu ý định là hàm không có return value, dùng `void` sẽ tự nhiên hơn.

Mặt khác, với hàm có return value có thể chứa `undefined`, thường dùng union type có chứa kiểu undefined.

```ts twoslash
function getIfExists(numbers: number[], search: number): number | undefined {
  if (numbers.includes(search)) {
    return search;
  }
  return undefined;
}
```

### void là supertype của undefined

Kiểu void thường chỉ dùng cho type annotation của return value của hàm. Hầu như không dùng cho type annotation của biến. Tuy nhiên, nếu dùng kiểu void cho type annotation của biến, void và undefined là các kiểu khác nhau. Kiểu undefined có thể gán cho kiểu void, nhưng kiểu void không thể gán cho kiểu undefined. Nói ngắn gọn, void là supertype của undefined.

```ts twoslash
// @errors: 2322
const v: void = undefined; // Kiểu undefined có thể gán cho kiểu void
const u: undefined = v; // Kiểu void không thể gán cho kiểu undefined
```

Đặc điểm này giúp phát hiện việc sử dụng sai hàm. Ví dụ, xem xét hai hàm sau. Cả hai đều là hàm có ý định không có return value. Nội dung xử lý cũng giống nhau. Điểm khác biệt là `f1` có type annotation là `void`, còn `f2` là `undefined`.

```ts twoslash
function f1(): void {}
function f2(): undefined {
  return;
}
```

Khi gọi các hàm này, có thể viết code nhận return value, nhưng đây không phải cách sử dụng đúng của các hàm này. Code sau đang cố gán return value vào biến. Đây là code sai.

```ts twoslash
// @noErrors
function f1(): void {}
function f2(): undefined {
  return;
}
// ---cut---
let mayBeNumber: number | undefined;
mayBeNumber = f1(); // Cách sử dụng hàm sai
mayBeNumber = f2(); // Cách sử dụng hàm sai
```

Lúc này, phần gọi `f1` có type annotation là `void` sẽ gây compile error. Nhờ đó dễ nhận ra lỗi hơn.

```ts twoslash
// @errors: 2322
function f1(): void {}
function f2(): undefined {
  return;
}
// ---cut---
let mayBeNumber: number | undefined;
mayBeNumber = f1(); // Có thể nhận ra lỗi qua compile
mayBeNumber = f2(); // Không thể nhận ra lỗi qua compile
```

Từ quan điểm này, khi khai báo hàm không có return value nên dùng `void`.
