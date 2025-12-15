# Type parameter constraint

Trong TypeScript, có thể giới hạn type parameter của generics vào một kiểu cụ thể.

## Vấn đề gặp phải với generic type parameter

Hãy xem xét hàm `changeBackgroundColor()` làm ví dụ. Hàm này thay đổi màu nền của HTML element được chỉ định và trả về HTML element đó.
Bằng cách định nghĩa generic type `T`, hàm có thể nhận bất kỳ HTML element nào như `HTMLButtonElement` hay `HTMLDivElement`.

```ts twoslash
// @errors: 2339
function changeBackgroundColor<T>(element: T) {
  // Property 'style' does not exist on type 'T'.(2339)
  element.style.backgroundColor = "red";
  return element;
}
```

Code này compile thất bại. Vì generic type `T` có thể là bất kỳ kiểu nào, nên tùy theo kiểu được truyền vào, có thể không tồn tại property `style`. Compiler phát hiện khả năng tham chiếu đến property không tồn tại và báo compile error.

Dù có thể tránh compile error bằng cách dùng `any`, nhưng type sẽ không được kiểm tra. Điều này có nguy cơ gây lỗi trong tương lai nên tốt nhất nên tránh.

```ts twoslash
function changeBackgroundColor<T>(element: T) {
  // Có thể tránh compile error bằng type assertion sang any
  // Nhưng type không được kiểm tra nên có khả năng gây lỗi
  (element as any).style.backgroundColor = "red";
  return element;
}
```

## Áp dụng constraint cho type parameter

Trong TypeScript, có thể giới hạn generic type `T` vào một kiểu cụ thể bằng cách sử dụng keyword `extends`.

Trong ví dụ này, bằng cách viết `<T extends HTMLElement>`, kiểu `T` được đảm bảo là `HTMLElement` hoặc subtype của nó như `HTMLButtonElement` hay `HTMLDivElement`, do đó có thể truy cập property `style` một cách an toàn.

```ts twoslash
function changeBackgroundColor<T extends HTMLElement>(element: T) {
  element.style.backgroundColor = "red";
  return element;
}
```

Keyword `extends` này cũng được dùng cho interface. Interface khi implement sử dụng keyword `implements`, nhưng khi dùng cho type parameter thì không dùng `implements` mà vẫn dùng `extends`.

```ts twoslash
interface ValueObject<T> {
  value: T;

  toString(): string;
}

class UserID implements ValueObject<number> {
  public value: number;

  public constructor(value: number) {
    this.value = value;
  }

  public toString(): string {
    return `${this.value}`;
  }
}

class Entity<ID extends ValueObject<unknown>> {
  private id: ID;

  public constructor(id: ID) {
    this.id = id;
  }

  //...
}
```

Class `Entity` có cấu trúc nhận class implement interface `ValueObject` làm ID, nhưng như ở dòng 19, type parameter constraint lúc này phải dùng `extends` chứ không phải `implements`.
