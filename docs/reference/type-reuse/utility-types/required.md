---
description: 全プロパティを必須にする
title: Required<T>
---

`Required<T>`は、`T`のすべてのプロパティからオプショナルであることを意味する`?`を取り除くユーティリティ型です。

## Required&lt;T>の型引数

### T

型引数`T`にはオブジェクトの型を表す型を代入します。

## Requiredの使用例

```ts twoslash
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type RequiredPerson = Required<Person>;
//    ^?
```

上の`RequiredPerson`は次と同じ型になります。

```ts twoslash
type RequiredPerson = {
  surname: string;
  middleName: string;
  givenName: string;
};
```

## Requiredの実装

`Required<T>`は次のように実装されています。

```ts twoslash
// @noErrors: 2300
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```

`Partial<T>`と参照してみると違いがわかります。

```ts twoslash
// @noErrors: 2300
type Partial<T> = {
  [P in keyof T]?: T[P];
};
```

異なる部分は`-?`と`?`の部分です。`?`はオプション修飾子で、プロパティがオプショナルになります。`-?`はオプション修飾子を取り除くことを意味します。したがって、`Required<T>`は、`T`のすべてのプロパティからオプショナルであることを意味する`?`を取り除いた型を生成します。
このときの`-`をmapping modifierと呼びます。

## 関連情報

[Partial&lt;T>](partial.md)

[Mapped Types](../mapped-types.md)
