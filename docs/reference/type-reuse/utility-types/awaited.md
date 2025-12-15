---
description: Lấy kiểu giá trị resolved của Promise
title: "Awaited<T>"
---

`Awaited<T>` là utility type lấy kiểu `T` là giá trị resolved của `Promise`.
Rất hữu ích khi cần kết quả của xử lý bất đồng bộ cho đến khi `Promise` được resolve, hoặc khi muốn trích xuất kiểu giá trị đã resolved từ nhiều `Promise` lồng nhau trong pattern `async`/`await`.

## Type argument của Awaited&lt;T>

### T

Type argument `T` nhận bất kỳ kiểu nào. Nếu nó là `Promise<V>`, sẽ trả về kiểu đã resolved là `V`. Điều này có thể lấy kiểu giá trị resolved cuối cùng cho dù `Promise` lồng bao nhiêu cấp.

## Ví dụ sử dụng Awaited

```ts twoslash
// @errors: 2344
type Awaited1 = Awaited<string>;
//   ^?
type Awaited2 = Awaited<Promise<string>>;
//   ^?
type Awaited3 = Awaited<Promise<Promise<string>>>;
//   ^?
```

## Tại sao có thể lấy giá trị resolved ngay cả khi `Promise` lồng nhau?

Trước tiên, hãy xem implementation của `Awaited<T>`:

```ts twoslash
// @noErrors
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any }
  ? F extends (value: infer V, ...args: infer _) => any
    ? Awaited<V>
    : never
  : T;
```

Có vẻ phức tạp một chút, nhưng hãy xem từng phần.

Đầu tiên, nếu `T` là `null` hoặc `undefined`, trả về `T` nguyên dạng. Tiếp theo, nếu `T` là `object` và có method `then`, lấy kiểu của argument thứ nhất của method `then` đó. Nếu kiểu này là giá trị resolved của `Promise`, áp dụng `Awaited` một cách đệ quy. Nhờ đó, dù `Promise` lồng bao nhiêu cấp, vẫn có thể lấy được kiểu giá trị resolved cuối cùng.
