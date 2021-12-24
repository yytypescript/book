---
description: 任意のプロパティを除いたオブジェクト型を作る
title: "Omit<T, Keys>"
---

`Omit<T, Keys>`は、オブジェクト型`T`から`Keys`で指定したプロパティを除いたオブジェクト型を返すユーティリティ型です。

## Omit&lt;T, Keys>の型引数

### T

型引数`T`にはオブジェクト型を渡します。

### Keys

`Keys`には引数`T`のプロパティキーを指定します。ここで指定したプロパティキーと一致するプロパティを`T`から除去します。

## Omitの使用例

```ts
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
type Optional = "age" | "address" | "nationality" | "createdAt" | "updatedAt";
type Person = Omit<User, Optional>;
```

上の`Person`型は次の型と同じになります。

```ts
type Person = {
  surname: string;
  middleName?: string;
  givenName: string;
};
```

## Omitの注意点

`Omit<T, Keys>`の`Keys`に`T`には無いプロパティキーを指定しても、TypeScriptコンパイラーは指摘しません。たとえば、`Keys`にタイポがあっても検出できないので注意が必要です。

```ts
type User = {
  surname: string;
  middleName?: string;
  givenName: string;
  age: number;
  address?: string;
  nationality: string;
  createdAt: string;
  updatedAt: string;
};
type Optional = "createdat" | "updatedat" | "age" | "address" | "nationality";
//                      ^^ typo       ^^ typo
type Person = Omit<User, Optional>;
// このPersonは下の型になる
// {
//    surname: string,
//    middleName?: string,
//    givenName: string,
//    createdAt: string,
//    updatedAt: string
// }
```

`User`の`createdAt`,、`updatedAt`の`At`は大文字から始まりますが、これに気づかずに小文字で書いてしまっても、`Omit`の結果は`createdAt`と`updatedAt`を含んでしまいます。

## 関連情報

[Pick&lt;T, Keys>](pick.md)
