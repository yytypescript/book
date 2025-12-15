---
description: Kiểm tra xem tất cả các nhánh của function đều có `return` đúng cách hay không
---

# noImplicitReturns

`noImplicitReturns` nếu dịch trực tiếp có nghĩa là "cấm return ngầm định", là option kiểm tra xem tất cả các nhánh của function đều trả về giá trị đúng cách hay không.

- Mặc định: `false`
- Phiên bản thêm vào: 1.8

## Giải thích

Trong JavaScript, ngay cả khi function không có `return` rõ ràng, nó vẫn ngầm định trả về `undefined`.

```js twoslash
function doSomething() {
  // không có return statement
}

const value = doSomething();
console.log(value);
// @log: undefined
```

Nghĩa là function trên tương đương với function có viết `return undefined` như sau:

```js twoslash
function doSomething() {
  return undefined;
}
```

Spec này có một vấn đề: không rõ ràng là "có thực sự muốn trả về `undefined` nên bỏ qua `return` statement" hay "quên viết `return` statement dẫn đến vô tình trả về `undefined`". Nếu chỉ là quên viết sẽ dẫn đến bug.

```js twoslash
function getValue(map, key) {
  if (key in map) {
    return map[key];
  }
  // Ở nhánh này, có thực sự muốn trả về undefined không?
  // Hay thực ra muốn trả về null?
  // Hoặc nên throw exception?
}
```

Vì vậy, best practice trong JavaScript là nếu thực sự muốn trả về `undefined`, nên viết rõ ràng `return` statement.

```js
function getValue(map, key) {
  if (key in map) {
    return map[key];
  }
  return undefined;
}
```

Càng phức tạp function, càng dễ xảy ra sự cố quên viết `return` ở một nhánh nào đó. Ví dụ sau tuy không quá phức tạp nhưng chứa lỗi điển hình là "quên xử lý giá trị biên":

```ts twoslash
// @noImplicitReturns: false
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // Quên viết return ở nhánh num === 0
  // → Function này ngầm định trả về undefined
}

console.log(negaposi(0));
// @log: undefined
```

Khi bật `noImplicitReturns`, có thể phát hiện function quên viết `return`. Ví dụ, code sau sẽ báo lỗi:

```ts twoslash
// @noImplicitReturns: true
// @errors: 7030
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // Quên return
}
```

Sửa để tất cả các nhánh đều trả về giá trị sẽ compile được:

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  return "zero"; // Sửa chỗ thiếu return
}
```

## Trường hợp được phép không có `return`

Ngay cả khi bật `noImplicitReturns`, vẫn có các trường hợp không có `return` được phép vì tiện lợi.

Đầu tiên, nhánh kết thúc bằng `throw` được phép:

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number) {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  throw new Error("this is 0"); // Không có return nhưng không báo lỗi
}
```

Tiếp theo, khi type annotation của return value là `void` cũng được phép không có `return`:

```ts twoslash
// @noImplicitReturns: true
function log(message?: string): void {
  //                            ^^^^type annotation
  if (!message) {
    return;
  }
  console.log(message);
  // Không có return nhưng không báo lỗi
}
```

Khi type annotation của return value là union type như `string | void` cũng cho phép nhánh không có `return`:

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number): string | void {
  //                            ^^^^^^^^^^^^^type annotation
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // Không có return nhưng không báo lỗi
}
```

Nếu `void` không có trong union type, ngay cả khi có `undefined` thì nhánh không trả về gì vẫn báo lỗi:

```ts twoslash
// @noImplicitReturns: true
// @errors: 7030
function negaposi(num: number): string | undefined {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  // Cần return ở đây
}
```

Thay vì dùng type gồm `void` với type khác để bỏ qua cảnh báo của `noImplicitReturns`, nên viết rõ ràng `return undefined` và type annotation của return value là `string | undefined` để code ít bất ngờ hơn, trừ khi có lý do đặc biệt.

```ts twoslash
// @noImplicitReturns: true
function negaposi(num: number): string | undefined {
  if (num > 0) {
    return "positive";
  }
  if (num < 0) {
    return "negative";
  }
  return undefined;
}
```

Cuối cùng, khi type annotation của return value là `any` cũng cho phép không có `return`:

```ts twoslash
// @noImplicitReturns: true
function log(message?: string): any {
  //                            ^^^type annotation
  if (!message) {
    return;
  }
  console.log(message);
  // Không có return nhưng không báo lỗi
}
```

Lưu ý là `any` không chỉ bỏ qua cảnh báo của `noImplicitReturns` mà còn bỏ qua cả type check khác nên có thể làm giảm độ an toàn của code. Trừ khi có lý do đặc biệt, không nên dùng `any` chỉ để bỏ qua cảnh báo của `noImplicitReturns`.
