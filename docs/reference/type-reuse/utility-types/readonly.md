---
description: Biến tất cả property thành read-only
title: Readonly<T>
---

`Readonly<T>` là utility type biến tất cả các property của object type `T` thành read-only.

## Type argument của Readonly&lt;T>

### T

Type argument `T` nhận object type.

## Ví dụ sử dụng Readonly

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type ReadonlyPerson = Readonly<Person>;
//    ^?
```

`ReadonlyPerson` ở trên sẽ giống với kiểu sau:

```ts twoslash
type ReadonlyPerson = {
  readonly surname: string;
  readonly middleName?: string;
  readonly givenName: string;
};
```

## Tác dụng của Readonly không đệ quy

`Readonly<T>` chỉ biến các property trực tiếp của object type `T` thành read-only. Lưu ý rằng nếu property là một object, các property mà nó chứa sẽ không trở thành read-only.

## Implementation của Readonly

`Readonly<T>` được implement như sau:

```ts twoslash
// @noErrors: 2300
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
```

## Thông tin liên quan

[readonly property trong object type](../../values-types-variables/object/readonly-property.md)

[readonly modifier trong class](../../object-oriented/class/readonly-modifier-in-classes.md)

[readonly modifier trong interface](../../object-oriented/interface/readonly-modifier-in-interfaces.md)

[Sự khác biệt giữa readonly và const](../../values-types-variables/object/readonly-vs-const.md)
