---
description: Tạo object type từ key-value
title: "Record<Keys, Type>"
---

`Record<Keys, Type>` là utility type tạo object type với property key là `Keys` và property value là `Type`.

## Type argument của Record&lt;Keys, Type>

### Keys

Chỉ định property key của object. Kiểu có thể gán cho `Keys` là `string`, `number`, `symbol` và literal type của chúng.

### Type

Chỉ định kiểu của property value của object. Có thể gán bất kỳ kiểu nào.

## Ví dụ sử dụng Record

Định nghĩa index type với key là `string` và value là `number`:

```ts twoslash
type StringNumber = Record<string, number>;
const value: StringNumber = { a: 1, b: 2, c: 3 };
```

Định nghĩa object type với key là `firstName`, `middleName`, `familyName` và value là string:

```ts twoslash
type Person = Record<"firstName" | "middleName" | "lastName", string>;
const person: Person = {
  firstName: "Robert",
  middleName: "Cecil",
  lastName: "Martin",
};
```

## Lưu ý về index access

Khi chỉ định kiểu không phải literal type như `string` cho key như `Record<string, ...>`, cần chú ý về index access. Bởi vì ngay cả khi truy cập key không tồn tại, nó vẫn được xử lý như thể key đó luôn tồn tại.

Trong ví dụ sau, object `dict` có kiểu `Record<string, number>` có key `a` nhưng không có key `b`. Tuy nhiên, `dict.b` vẫn được suy luận là `number`.

```ts twoslash
// @noUncheckedIndexedAccess: false
const dict: Record<string, number> = { a: 1 };
dict.b;
//   ^?
```

Giá trị thực tế của `dict.b` là `undefined`, nên nếu gọi method của `dict.b` sẽ gây lỗi runtime.

```ts twoslash
const dict: Record<string, number> = { a: 1 };
console.log(dict.b);
// @log: undefined
dict.b.toFixed(); // 実行時エラーが発生する
// @noUncheckedIndexedAccess: false
```

Hành vi này không thuận lợi cho các developer muốn giảm runtime error thông qua type checking.

Để giải quyết vấn đề này, TypeScript cung cấp compiler option `noUncheckedIndexedAccess`. Khi bật option này, kết quả của index access sẽ có kiểu `T | undefined`. Tức là kiểu này sẽ xem xét khả năng là `undefined`. Do đó, code gọi method của `dict.b` sẽ gây compile error và bạn có thể hưởng lợi từ type checking.

```ts twoslash
// @errors: 18048
// @noUncheckedIndexedAccess: true
const dict: Record<string, number> = { a: 1 };
dict.b;
//   ^?
dict.b.toFixed();
```

[noUncheckedIndexedAccess](../../tsconfig/nouncheckedindexedaccess.md)

Mặt khác, khi key của `Record` chỉ bao gồm literal type như `"firstName" | "lastName"`, vấn đề này không xảy ra bất kể cài đặt `noUncheckedIndexedAccess`. Vì key bị giới hạn, truy cập key không tồn tại sẽ gây compile error.

```ts twoslash
// @noUncheckedIndexedAccess: false
// @errors: 2339
// noUncheckedIndexedAccessがfalseの場合
type Person = Record<"firstName" | "lastName", string>;
const person: Person = {
  firstName: "Robert",
  lastName: "Martin",
};
const firstName = person.firstName;
//    ^?
person.b; // 存在しないキーへのアクセス
```

Khi key là `string`, nếu bật `noUncheckedIndexedAccess`, compiler sẽ bao gồm `undefined`, nhưng khi key là literal type (hoặc union của literal type), compiler sẽ không bao gồm `undefined`. Bởi vì việc key luôn tồn tại đã tự rõ ràng do việc chỉ định key bằng literal type.

```ts twoslash
// @noUncheckedIndexedAccess: true
// noUncheckedIndexedAccessがtrueの場合
type Person = Record<"firstName" | "lastName", string>;
const person: Person = {
  firstName: "Robert",
  lastName: "Martin",
};
const firstName = person.firstName; // undefinedは含まれない
//    ^?
```

## Thông tin liên quan

[Index signature](../../values-types-variables/object/index-signature.md)

[Mapped Types](../mapped-types.md)

[Map<K, V>](../../builtin-api/map.md)
