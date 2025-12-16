---
sidebar_label: Boxing
---

# Boxing

Trong nhiều ngôn ngữ, primitive thường không có field hay method. Để xử lý primitive như object, cần chuyển đổi primitive sang object. Việc chuyển đổi từ primitive sang object được gọi là boxing.

```ts twoslash
// Kiểu primitive
const str = "abc";
// Đưa vào wrapper object
const strObject = new String(str);
// Xử lý như object
strObject.length; // Tham chiếu field
strObject.toUpperCase(); // Gọi method
```

Ví dụ trên minh họa khái niệm boxing trong JavaScript. Trong code thực tế, không cần phải bỏ primitive type vào wrapper object như `String`. Vì JavaScript có cơ chế auto-boxing.

## Auto-boxing

Trong JavaScript, ngay cả giá trị primitive type cũng có thể truy cập field và gọi method.

```ts twoslash
const str = "abc";
// Xử lý như object
str.length; // Tham chiếu field
str.toUpperCase(); // Gọi method
```

Giá trị primitive type không phải object, nên việc có thể thao tác như vậy là điều lạ. Có vẻ cần boxing. Tuy nhiên điều này có thể thực hiện được là vì JavaScript nội bộ chuyển đổi giá trị primitive type sang object. Việc chuyển đổi ngầm định này gọi là auto-boxing.

## Wrapper object

Object được chuyển đổi đến trong auto-boxing của JavaScript gọi là wrapper object. Tương ứng giữa primitive type và wrapper object như bảng sau.

| Primitive type | Wrapper object |
| -------------- | -------------- |
| `boolean`      | `Boolean`      |
| `number`       | `Number`       |
| `string`       | `String`       |
| `symbol`       | `Symbol`       |
| `bigint`       | `BigInt`       |

Primitive type `undefined` và `null` không có wrapper object. Do đó việc truy cập method hay field luôn phát sinh lỗi.

```ts twoslash
// @errors: 18050
null.toString();
undefined.toString();
```

## Cách đọc MDN

Document thường được dùng khi học JavaScript là [MDN Web Docs](https://developer.mozilla.org/ja/docs/Web/JavaScript). Khi hiểu về auto-boxing và wrapper object, document MDN sẽ dễ hiểu hơn.

Ví dụ, giải thích về method `toString` của số được viết trong MDN tại trang có tiêu đề [「Number.prototype.toString()」](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toString). Nếu nghĩ `toString` là thứ có trong primitive type `number`, có thể có thắc mắc như "Number.prototype là gì", "Đang tìm hiểu number type mà tại sao lại viết trong trang Number object".

Khi biết về auto-boxing và wrapper object, thắc mắc này được giải quyết. `number` không có method cũng không có field. Có vẻ như có method là do auto-boxing chuyển `number` sang `Number` object. Vì vậy việc giải thích `toString` viết trong trang `Number` object là hợp lý. Ngoài ra cũng hiểu được ý nghĩa `Number.prototype` biểu thị là "có trong instance của `Number` object".

## Wrapper object type và type của TypeScript

<!-- textlint-disable prh -->

Trong TypeScript, type của wrapper object cũng được định nghĩa. Có thể viết type annotation bằng wrapper object type như sau. Cũng có thể gán giá trị primitive type vào biến wrapper object type.

```ts twoslash
const bool: Boolean = false;
const num: Number = 0;
const str: String = "";
const sym: Symbol = Symbol();
const big: BigInt = 10n;
```

Tuy nhiên wrapper object type không thể gán vào primitive type.

```ts twoslash
// @errors: 2322
const n1: Number = 0;
const n2: number = n1;
```

Wrapper object type không dùng được operator.

```ts twoslash
// @errors: 2362
const num: Number = 1;
num * 2;
```

Wrapper object type có thể gán các giá trị khác ngoài primitive type, miễn là object đáp ứng interface đó.

```ts twoslash
const boolLike = {
  valueOf(): boolean {
    return true;
  },
};
const bool: Boolean = boolLike;
```

Không có lợi ích gì khi dùng wrapper object type cho type annotation thay vì primitive type. Hãy dùng primitive type cho type annotation.

```ts twoslash
// ❌ Sai
const num1: Number = 0;
// ✅ Đúng
const num2: number = 0;
```

<!-- textlint-enable prh -->

<PostILearned>

・Boxing là việc chuyển đổi primitive sang object
・Primitive trong JavaScript có thể xử lý như object nhờ auto-boxing
・Trong TypeScript nên type annotation bằng primitive type (ví dụ: string) hơn là wrapper object (ví dụ: String)

</PostILearned>

## Thông tin liên quan

[Kiểu primitive](primitive-types.md)
