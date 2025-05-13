---
sidebar_label: Distributive Conditional Types
---

# Distributive Conditional Types

Distributive Conditional Types は日本語では分配された条件型、条件付き型の分配、ユニオン分配、ユニオン型の分配法則などと呼ばれ、 [Conditional Types](./README.md) が [ジェネリクス型](../../generics/README.md) に適用され、かつ型引数に [ユニオン型](../../values-types-variables/union.md) が与えられた場合に、そのユニオン型を構成する各メンバーに対して個別に条件判定が適用される（＝分配される）性質を指します。

たとえば、次のような型があります。

```ts twoslash
type ToArray<T> = T extends any ? T[] : never;
```

このとき `ToArray<number>` は `number[]`, `ToArray<string>` は `string[]` となりますが、`T`にユニオン型である `number | string` を与えた場合、次のようになります。

```ts twoslash
type ToArray<T> = T extends any ? T[] : never;
// ---cut---
type NumOrStrArray = ToArray<number | string>;
//    ^?
```

これは次のような流れで型が解決されています。

1. ジェネリクス型に Conditional Types が適用され、ユニオン型( `number | string` ) が与えられているため、分配の条件を満たす。

   ```ts twoslash
   type ToArray<T> = T extends any ? T[] : never;

   type NumOrStrArray = ToArray<number | string>;
   ```

2. ユニオンの個々の要素に対して `ToArray` が分配される。

   ```ts twoslash
   type ToArray<T> = T extends any ? T[] : never;
   // ---cut---

   type NumOrStrArray = ToArray<number> | ToArray<string>;
   ```

3. それぞれ `number[]`, `string[]` となり、最終的な型として `number[] | string[]` を得る。

   ```ts twoslash
   type NumOrStrArray = number[] | string[];
   ```

この性質は Conditional Types でジェネリクスが利用された時のみ起こります。たとえば次のような型エイリアスでは分配は行われません。

```ts twoslash
type ToArray2<T> = T[];

type NumOrStrArray2 = ToArray2<number | string>;
//     ^?
```

分配が起こるかどうかにより次のような違いが生まれるため、用途に応じて使い分けましょう。

```ts twoslash
type ToArray<T> = T extends any ? T[] : never;
type NumOrStrArray = ToArray<number | string>;
type ToArray2<T> = T[];
type NumOrStrArray2 = ToArray2<number | string>;
// ---cut---
// 分配有り
let numOrStrArray: ToArray<number | string> = [1, 2, 3]; // OK
numOrStrArray = ["a", "b", "c"]; // OK
// @errors: 2322
numOrStrArray = [1, 2, "a"]; // NG
// 分配無し
let numOrStrArray2: ToArray2<number | string> = [1, 2, 3]; // OK
numOrStrArray2 = ["a", "b", "c"]; // OK
numOrStrArray2 = [1, 2, "a"]; // OK
```

## 分配を起こさせない方法

Conditional Types を利用したいが分配させたくないと言う場合、型変数を`[]`で囲むことで分配を避けることができます。

```ts twoslash
type NotDistribute<T> = [T] extends [string] ? true : false;
```

この`NotDistribute`型は`string`型に対しては`true`を返しますが、`string | number`型に対しては`false`を返します。`string | number`型は`string`型の部分型ではないため（つまり `string | number extends string` は false のため）、 `false` が返されます。

```ts twoslash
type NotDistribute<T> = [T] extends [string] ? true : false;
// ---cut---
type A = NotDistribute<string>;
//   ^?
type B = NotDistribute<number>;
//   ^?
type C = NotDistribute<string | number>;
//   ^?
```
