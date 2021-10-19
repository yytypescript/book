---
description: 全プロパティを必須にする
title: Required<T>
---

# Required&lt;T>

`Required<T>`は、`T`のすべてのプロパティからオプショナルであることを意味する`?`を取り除くユーティリティ型です。

## Required&lt;T>の型引数

### T

型引数`T`にはオブジェクト型を表す型を代入します。

## Requiredの使用例

```typescript
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
type RequiredPerson = Required<Person>;
```

上の`RequiredPerson`は次と同じ型になります。

```typescript
type RequiredPerson = {
  surname: string;
  middleName: string;
  givenName: string;
};
```

## 関連情報

[Partial&lt;T>](partial.md)
