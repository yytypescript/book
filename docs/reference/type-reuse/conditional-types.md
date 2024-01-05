---
sidebar_label: Conditional Types
---

# Conditional Types

Conditional Typesはちょうどプログラミング言語の三項演算子のように`?`と`:`を使って`T extends U ? X : Y`のように書きます。これは`T`が`U`に割り当て可能である場合、`X`になり、そうでない場合は`Y`になります。

たとえば、あるobject型のプロパティを読み取り専用にする`Readonly<T>`というユーティリティ型があります。`Readonly<T>`はそのオブジェクトの直下のプロパティを読み取り専用にしますが、ネストしたオブジェクトのプロパティは読み取り専用にしません。たとえば、次のようなオブジェクトがあるとします。

```ts twoslash
type Person = {
  name: string;
  age: number;
  address: {
    country: string;
    city: string;
  };
};
```

このとき`Readonly<Person>`では`address`のプロパティの`country`と`city`は読み取り専用になっていません。上書きが可能です。

```ts twoslash
type Person = {
  name: string;
  age: number;
  address: {
    country: string;
    city: string;
  };
};
// ---cut---
// @errors: 2540
const kimberley: Readonly<Person> = {
  name: "Kimberley",
  age: 24,
  address: {
    country: "Canada",
    city: "Vancouver",
  },
};

kimberley.name = "Kim";
kimberley.age = 25;
kimberley.address.country = "United States";
kimberley.address.city = "Seattle";
```

このように`address.country`と`address.city`は書き換え可能です。これを解決するには`Readonly<T>`を再帰的に適用する必要があります。このような場合にMapped TypesとConditional Typesを組み合わせて使います。

```ts twoslash
type Freeze<T> = Readonly<{
  [P in keyof T]: T[P] extends object ? Freeze<T[P]> : T[P];
}>;
```

このような`Freeze<T>`を作ってみました。まずはこれを使ってみましょう。

```ts twoslash
type Person = {
  name: string;
  age: number;
  address: {
    country: string;
    city: string;
  };
};

type Freeze<T> = Readonly<{
  [P in keyof T]: T[P] extends object ? Freeze<T[P]> : T[P];
}>;
// ---cut---
// @errors: 2540
const kimberley: Freeze<Person> = {
  name: "Kimberley",
  age: 24,
  address: {
    country: "Canada",
    city: "Vancouver",
  },
};

kimberley.name = "Kim";
kimberley.age = 25;
kimberley.address.country = "United States";
kimberley.address.city = "Seattle";
```

`Readonly<T>`とは異なり、`address.country`と`address.city`が書き換え不可能になりました。これは`Freeze<T>`が再帰的に適用されているからです。

`[P in keyof T]`の部分についてはMapped Typesのページで説明していますのでここでは簡潔に説明します。`keyof T`はオブジェクトのキーをユニオン型に変更するものです。`kimberley`の場合は`"name" | "age" | "address"`になります。`in`はその中のどれかを意味します。
`T[P]`でオブジェクトのあるキーにおけるプロパティの型を取得します。その型が`object`であれば再起的に`Freeze<T[P]>`を適用し、そうでなければ`T[P]`をそのまま使います。

[Mapped Types](../type-reuse/mapped-types.md)

これによってオブジェクトを再帰的に凍結することができました。
