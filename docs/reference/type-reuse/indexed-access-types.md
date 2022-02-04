---
sidebar_label: インデックスアクセス型
---

# インデックスアクセス型 (indexed access types)

TypeScriptのインデックスアクセス型(indexed access type)は、プロパティの型や配列要素の型を参照する方法を提供します。

```ts twoslash
type A = { foo: number };
type Foo = A["foo"];
//   ^?
```

## インデックスアクセス型の構文

インデックスアクセス型は、型に対してブラケット表記法を使います。

```ts
オブジェクト型["プロパティ名"];
配列型[number];
```

## オブジェクト型とインデックスアクセス型

インデックスアクセス型には[ユニオン型](../values-types-variables/union.md)も使えます。

```ts twoslash
type Person = { name: string; age: number };
type T = Person["name" | "age"];
//   ^?
```

[`keyof`型演算子](keyof-type-operator.md)と組み合わせると、オブジェクトの全プロパティの型がユニオン型で得られます。

```ts twoslash
type Foo = { a: number; b: string; c: boolean };
type T = Foo[keyof Foo];
//   ^?
```

もしもオブジェクト型に存在しないプロパティ名を指定すると、コンパイラが警告を出します。

```ts twoslash
// @errors: 2339
type Account = { name: string };
type T = Account["password"];
```

## 配列型とインデックスアクセス型

[配列型](../values-types-variables/array/type-annotation-of-array.md)の要素の型を参照するのにもインデックスアクセス型が使えます。要素の型を参照するには、配列型に`[number]`をつけます。

```ts twoslash
type StringArray = string[];
type T = StringArray[number];
//   ^?
```

要素がユニオン型の配列型に対しても使えます。

```ts twoslash
type MixedArray = Array<string | undefined>;
type T = MixedArray[number];
//   ^?
```

[`typeof`型演算子](typeof-type-operator.md)と組み合わせると、配列の値から要素の型を導くこともできます。

```ts twoslash
const stateList = ["open", "closed"] as const;
type State = typeof stateList[number];
//   ^?
```

## タプル型とインデックスアクセス型

インデックスアクセス型は[タプル型](../values-types-variables/tuple.md)の要素の型を参照するのにも使えます。タプル型の要素の型を参照するには、ブランケット記法に[数値リテラル型](../values-types-variables/literal-types.md)を書きます。

```ts twoslash
type Tuple = [string, number];
type T = Tuple[0];
//   ^?
```

<TweetILearned>

TypeScriptのインデックスアクセス型は、プロパティや配列要素の型を参照できる

✏️構文1: オブジェクト型["プロパティ名"]
✏️構文2: 配列型[number]
🔑keyofと組み合わせると全プロパティの型が取れる
🧲typeofと組み合わせると配列値から要素型が取れる

</TweetILearned>
