---
sidebar_label: infer
---

# infer

infer là type operator được sử dụng trong Conditional Types. `infer` có nghĩa là "suy luận" và chỉ có thể được viết ở phía bên phải của `extends`.

## Tìm hiểu `infer` qua ví dụ utility type `ReturnType<T>`

Có một utility type `ReturnType<T>` lấy kiểu return value của một function. `ReturnType<T>` được định nghĩa như sau:

```ts twoslash
// @noErrors
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

Hãy thử sử dụng nó:

```ts twoslash
const request = (url: string): Promise<string> => {
  return fetch(url).then((res) => res.text());
};

type X = ReturnType<typeof request>;
//   ^?
```

`typeof` là operator lấy kiểu từ biến. Lưu ý rằng nó khác với `typeof` của JavaScript.

[typeof type operator](../typeof-type-operator.md)

Như vậy, chúng ta có thể lấy kiểu return value từ kiểu của function `request`.

### Giải thích `ReturnType<T>`

Để hiểu cấu trúc của `ReturnType<T>`, trước tiên cần biết `T extends (...args: any) => any` là gì. Đây là kiểu biểu diễn một function tổng quát. Nó biểu thị function nhận số lượng tùy ý các argument với kiểu tùy ý và trả về giá trị với kiểu tùy ý. `T` biểu thị một function bất kỳ.
Và phần return value là `=> infer R ? R : any`, có nghĩa là nếu `T` là function thì trả về kiểu return value `R`, ngược lại trả về `any`.
Tổng thể, `ReturnType<T>` trả về `R` nếu `T` có thể gán cho function, ngược lại trả về `any`.

Hãy sử dụng `infer` để tạo `Flatten<T>` trả về kiểu phần tử nếu kiểu `T` là array, ngược lại trả về `never`.

```ts twoslash
type Flatten<T> = T extends (infer U)[] ? U : never;
```

Hãy thử sử dụng `Flatten<T>`:

```ts twoslash
type Flatten<T> = T extends (infer U)[] ? U : never;
// ---cut---
type A = Flatten<string>;
//   ^?
type B = Flatten<string[]>;
//   ^?
type C = Flatten<string[][]>;
//   ^?
type D = Flatten<[string, number]>;
//   ^?
```

Chúng ta có thể thấy rằng khi áp dụng `Flatten<T>` cho mảng 2 chiều sẽ trả về mảng 1 chiều, và khi áp dụng `Flatten<T>` cho tuple type sẽ trả về union type.
