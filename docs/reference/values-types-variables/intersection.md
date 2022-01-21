---
sidebar_label: インターセクション型
---

# インターセクション型 (intersection type)

考え方はユニオン型と相対するものです。ユニオン型が**どれか**を意味するならインターセクション型は**どれも**です。言い換えるとオブジェクトの定義を合成させることを指します。

インターセクション型を作るためには合成したいオブジェクト同士を`&`で列挙します。

```ts
type TwoDimensionalPoint = {
  x: number;
  y: number;
};

type Z = {
  z: number;
};

type ThreeDimensionalPoint = TwoDimensionalPoint & Z;

const p: ThreeDimensionalPoint = {
  x: 0,
  y: 1,
  z: 2,
};
```

xy平面上の点を表す`TwoDimensionalPoint`を拡張してxyz平面上の点の`ThreeDimensionalPoint`に変換しました。

## プリミティブ型のインターセクション型

プリミティブ型のインターセクション型をつくることもできますが、作ると`never`という型ができます。

```ts
type Never = string & number;

const n: Never = "2";
// Type '"2"' is not assignable to type 'never'.
```

この`never`型にはいかなる値も代入できません。使い道がまるでないように見えますが意外なところで役に立ちます。今回は説明を省きます。

## インターセクション型を使いこなす

システムの巨大化に伴い、受け付けたいパラメーターが巨大化したとします。

```ts
type Parameter = {
  id: string;
  index?: number;
  active: boolean;
  balance: number;
  photo?: string;
  age?: number;
  surname: string;
  givenName: string;
  company?: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  // ...
};
```

一見してどのプロパティが必須で、どのプロパティが選択可かが非常にわかりづらいです。これをインターセクション型とユーティリティ型の`Required<T>`と`Partial<T>`を使いわかりやすく表記できます。ユーティリティ型については解説しているページがありますのでご覧ください。

[Required&lt;T>](../type-reuse/utility-types/required.md)

[Partial&lt;T>](../type-reuse/utility-types/partial.md)

### 必須とそうでないパラメータのタイプエイリアスに分離する

```ts
type Mandatory = {
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
};

type Optional = {
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
};
```

### `Required<T>, Partial<T>`をつける

`Mandatory`は`Required<T>`を、`Optional`は`Partial<T>`をつけます。

```ts
type Mandatory = Required<{
  id: string;
  active: boolean;
  balance: number;
  surname: string;
  givenName: string;
  email: string;
}>;

type Optional = Partial<{
  index: number;
  photo: string;
  age: number;
  company: string;
  phoneNumber: string;
  address: string;
}>;
```

### インターセクション型で合成する

これで最初に定義した`Parameter`と同じタイプエイリアスができました。

```ts
type Parameter = Readonly<Mandatory & Optional>;
```
