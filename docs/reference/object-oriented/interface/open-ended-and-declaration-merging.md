---
sidebar_label: "Open-ended và declaration merging"
---

# Open-ended và declaration merging

Các ngôn ngữ khác như Java hay PHP cũng có cú pháp interface. Khác với các ngôn ngữ khác, interface của TypeScript có những đặc điểm hiếm thấy là open-ended và declaration merging.

## Open-ended và declaration merging là gì

Cú pháp interface của các ngôn ngữ khác thường gây error khi khai báo interface cùng tên. Ví dụ, trong PHP nếu khai báo 2 interface `Foo`, sẽ xảy ra lỗi trùng lặp.

```php title="PHP"
interface Foo {}
interface Foo {}
// Fatal error:  Cannot declare interface Foo, because the name is already in use in...
```

Trong TypeScript, khai báo interface cùng tên không gây error.

```ts twoslash
interface Foo {}
interface Foo {} // Không error
```

Như vậy, đặc tính cho phép khai báo nhiều interface mà không gây error được gọi là open-ended.

Khi khai báo interface cùng tên, các type của interface đó được merge. Ví dụ, hãy xem xét trường hợp khai báo interface có property `a` và interface có property `b` như sau.

```ts twoslash
interface Foo {
  a: number;
}
interface Foo {
  b: number;
}
```

Khai báo này tương đương với việc định nghĩa một interface có property `a` và property `b` như sau.

```ts twoslash
interface Foo {
  a: number;
  b: number;
}
```

Như vậy, cơ chế merge các interface cùng tên được gọi là declaration merging.

## Trường hợp sử dụng declaration merging

Khi JavaScript được cập nhật, method cũng được thêm vào các class hiện có. Ví dụ, class `Array` được thêm method `includes()` trong ES2016 và method `flatMap()` trong ES2019.

Nhà phát triển TypeScript cần cập nhật định nghĩa type của interface `Array` theo các bản cập nhật của JavaScript. Cách đơn giản nhất là định nghĩa interface `Array` độc lập cho mỗi phiên bản JavaScript.

Cách tiếp cận này thoạt nhìn có vẻ tốt. Tuy nhiên, nếu suy nghĩ kỹ, sẽ phát sinh vấn đề là code copy-paste của interface tăng lên khi JavaScript được cập nhật. Sự khác biệt giữa `Array` của ES2015 và ES2016 chỉ là có hay không method `includes()`. Mặc dù vậy, bạn phải copy nhiều method khác như `pop()`, `push()`.

Declaration merging giải quyết vấn đề này. Hãy xem ví dụ cụ thể về cách nhà phát triển TypeScript sử dụng declaration merging. Đầu tiên, chuẩn bị file định nghĩa type khai báo interface `Array` của phiên bản cũ nhất.

```ts twoslash title="Interface Array của phiên bản cũ nhất"
interface Array<T> {
  pop(): T | undefined;
  push(...items: T[]): number;
  concat(...items: ConcatArray<T>[]): T[];
  // ...và nhiều method khác tiếp theo...
}
```

Tiếp theo, tạo interface `Array` tương ứng với các method được thêm trong ES2016 ở file khác.

```ts title="ES2016.array.d.ts" twoslash
interface Array<T> {
  includes(searchElement: T, fromIndex?: number): boolean;
}
```

Tiếp tục, tạo file định nghĩa type tương ứng với các method được thêm trong ES2019 ở file khác.

```ts title="ES2019.array.d.ts" twoslash
interface Array<T> {
  flatMap<U, This = undefined>(
    callback: (
      this: This,
      value: T,
      index: number,
      array: T[]
    ) => U | ReadonlyArray<U>,
    thisArg?: This
  ): U[];
}
```

Bằng cách chỉ định nghĩa sự khác biệt giữa các phiên bản trong interface như vậy, code copy-paste không phát sinh ngay cả khi phiên bản JavaScript tăng lên.

Người dùng TypeScript có thể sử dụng type interface tối ưu bằng cách load các file này tùy theo phiên bản JavaScript cần thiết. Ví dụ, nếu đang phát triển cho môi trường JavaScript ES2016, load đến file định nghĩa type ES2016. Nếu target là môi trường ES2019, load cả hai file định nghĩa type ES2016 và ES2019.

Như ví dụ này, declaration merging được sử dụng khi không thể sửa interface đã khai báo nhưng cần mở rộng interface.
