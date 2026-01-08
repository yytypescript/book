---
description: Promiseの解決値の型を取得する
title: "Awaited<T>"
---

`Awaited<T>`は、`Promise`の解決値の型`T`を取得するユーティリティ型です。
`Promise`が解決するまでの非同期処理の結果が必要な場合や、`async`/`await`パターンで複数の入れ子になった`Promise`の中から解決済みの値の型を取り出したい場合に非常に便利です。

## Awaited&lt;T>の型引数

### T

型引数`T`には、任意の型を渡します。それが`Promise<V>`である場合は解決された型である`V`を返します。これは`Promise`が何重にネストしていても、最終的な解決値の型を取得できます。

## Awaitedの使用例

```ts twoslash
// @errors: 2344
type Awaited1 = Awaited<string>;
//   ^?
type Awaited2 = Awaited<Promise<string>>;
//   ^?
type Awaited3 = Awaited<Promise<Promise<string>>>;
//   ^?
```

## `Promise`がネストしていても解決された値を取得できるのはなぜか

まずは`Awaited<T>`の実装を見てみましょう。

```ts twoslash
// @noErrors
type Awaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer F, ...args: infer _): any }
    ? F extends (value: infer V, ...args: infer _) => any
      ? Awaited<V>
      : never
    : T;
```

少々複雑ですが、ひとつずつみていきましょう。

まず`T`が`null`または`undefined`である場合はそのまま`T`を返します。次に、`T`が`object`であり、`then`メソッドを持つ場合は、その`then`メソッドの第1引数の型を取得します。この型が`Promise`の解決値である場合は再帰的に`Awaited`を適用します。これにより、`Promise`が何重にネストしていても、最終的な解決値の型を取得できるようになります。
