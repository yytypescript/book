---
sidebar_label: Mapped Types
---

# Mapped Types

Với index type, bạn có thể tự do thiết lập bất kỳ key nào khi gán giá trị, nhưng khi truy cập phải kiểm tra `undefined` mỗi lần. Nếu format input đã được xác định rõ ràng, bạn có thể cân nhắc sử dụng Mapped Types.

Mapped Types chủ yếu được sử dụng kết hợp với union type. Dưới đây là định nghĩa các ngôn ngữ được hỗ trợ:

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
```

Bạn có thể sử dụng nó như ràng buộc cho key tương tự như index type:

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
// ---cut---
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
```

Khi định nghĩa `Butterfly` như thế này, ngôn ngữ không được hệ thống hỗ trợ (ở đây là `de`) sẽ không thể được thiết lập và sử dụng:

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
// ---cut---
// @errors: 2353
const butterflies: Butterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
  de: "Schmetterling",
};
```

## Giới thiệu utility types sử dụng Mapped Types và cách thực hiện

Có một utility type tên là `Readonly<T>` áp dụng `readonly` cho tất cả các property của object, biến chúng thành read-only.

[Readonly&lt;T>](utility-types/readonly.md)

`Readonly<T>` cũng được thực hiện bằng tính năng này. `Readonly<T>` được implement như sau:

```ts twoslash
// @noErrors
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

Biểu thức `keyof T` có vẻ xa lạ, nhưng bạn có thể hiểu nó là chuyển đổi các key của object thành union type. Chi tiết về `keyof` xem tại type operator.

[keyof type operator](keyof-type-operator.md)

### mapping modifier

Bằng cách thêm `-` vào đầu và viết `-readonly`, bạn có thể tạo ra `Mutable<T>` để biến các property read-only thành có thể thay đổi (đây không phải là utility type có sẵn). Dấu `-` này được gọi là mapping modifier.

```ts twoslash
type SystemSupportLanguage = "en" | "fr" | "it" | "es";
type Butterfly = {
  [key in SystemSupportLanguage]: string;
};
// ---cut---
// @errors: 2540
type ImmutableButterfly = Readonly<Butterfly>;
type MutableButterfly = {
  -readonly [key in SystemSupportLanguage]: string;
};

const immutableButterfly: ImmutableButterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

immutableButterfly.en = "Schmetterling";

const mutableButterfly: MutableButterfly = {
  en: "Butterfly",
  fr: "Papillon",
  it: "Farfalla",
  es: "Mariposa",
};

mutableButterfly.en = "Schmetterling"; // OK
```

Mapping modifier (`-`) cũng có thể được thêm vào trước optional modifier và viết thành `-?` để loại bỏ optional modifier. Sử dụng điều này, bạn có thể implement `Required<T>` có tác dụng ngược lại với `Partial<T>`.

[Partial&lt;T>](utility-types/partial.md)

[Required&lt;T>](utility-types/required.md)

## Lưu ý về index access

Khi chỉ định kiểu không phải literal type như `string` cho key trong `{ [K in string]: ... }`, cần chú ý về index access. Bởi vì ngay cả khi truy cập key không tồn tại, nó vẫn được xử lý như thể key đó luôn tồn tại.

Trong ví dụ sau, object `dict` có kiểu `{ [K in string]: number }` có key `a` nhưng không có key `b`. Tuy nhiên, `dict.b` vẫn được suy luận là `number`.

```ts twoslash
// @noUncheckedIndexedAccess: false
const dict: { [K in string]: number } = { a: 1 };
dict.b;
//   ^?
```

Giá trị thực tế của `dict.b` là `undefined`, nên nếu gọi method của `dict.b` sẽ gây lỗi runtime.

```ts twoslash
const dict: { [K in string]: number } = { a: 1 };
console.log(dict.b);
// @log: undefined
dict.b.toFixed(); // Xảy ra lỗi runtime
// @noUncheckedIndexedAccess: false
```

Hành vi này không thuận lợi cho các developer muốn giảm runtime error thông qua type checking.

Để giải quyết vấn đề này, TypeScript cung cấp compiler option `noUncheckedIndexedAccess`. Khi bật option này, kết quả của index access sẽ có kiểu `T | undefined`. Tức là kiểu này sẽ xem xét khả năng là `undefined`. Do đó, code gọi method của `dict.b` sẽ gây compile error và bạn có thể hưởng lợi từ type checking.

```ts twoslash
// @errors: 18048
// @noUncheckedIndexedAccess: true
const dict: { [K in string]: number } = { a: 1 };
dict.b;
//   ^?
dict.b.toFixed();
```

[noUncheckedIndexedAccess](../tsconfig/nouncheckedindexedaccess.md)

## Mapped Types không thể thêm property bổ sung

Mapped Types không thể định nghĩa property bổ sung. Đây là điểm khác biệt so với [index type].

<!--prettier-ignore-->
```ts twoslash
// @errors: 7061
type KeyValuesAndName = {
  [K in string]: string;
  name: string; // Property bổ sung
};
```

Nếu có property bổ sung, bạn cần định nghĩa phần đó như một object type riêng và tạo [intersection type] với Mapped Types.

```ts twoslash
type KeyValues = {
  [K in string]: string;
};
type Name = {
  name: string; // Property bổ sung
};
type KeyValuesAndName = KeyValues & Name;
```

Ví dụ trên cũng có thể gộp thành một kiểu duy nhất:

```ts twoslash
type KeyValuesAndName = {
  [K in string]: string;
} & {
  name: string; // Property bổ sung
};
```

[index type]: ../values-types-variables/object/index-signature.md
[intersection type]: ../values-types-variables/intersection.md
