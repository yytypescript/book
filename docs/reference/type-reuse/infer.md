---
sidebar_label: infer
---

# infer

inferはConditional Typesの中で使われる型演算子です。`infer`は「推論する」という意味で`extends`の右辺にのみ書くことができます。

## ユーティリティ型`ReturnType<T>`の例から`infer`を知る

ある関数の戻り値の型を取得するユーティリティ型`ReturnType<T>`があります。`ReturnType<T>`は次のように定義されています。

```ts twoslash
// @noErrors
type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : any;
```

試しに使ってみましょう。

```ts twoslash
const request = (url: string): Promise<string> => {
  return fetch(url).then((res) => res.text());
};

type X = ReturnType<typeof request>;
//   ^?
```

`typeof`は変数から型を取得する演算子です。JavaScriptの`typeof`とは異なるので注意してください。

[typeof型演算子](./typeof-type-operator.md)

このように関数`request`の型から戻り値の型を取得することができました。

### `ReturnType<T>`の解説

`ReturnType<T>`の構造を知るためにはまず`T extends (...args: any) => any`が何かを知る必要があります。これは一般的な関数の型を示しています。任意の個数で任意の型の引数を受け取り、任意の型の値を返すことを示しています。`T`は任意の関数を示しています。
そして戻り値の部分が`=> infer R ? R : any`となっており、`T`が関数である場合は戻り値の型である`R`、そうでない場合は`any`を返すという意味になっています。
総合的に`ReturnType<T>`は`T`が関数に割り当て可能である場合は`R`、そうでない場合は`any`を返します。

`infer`を使うことによってある型`T`が配列である場合はその要素の型、そうでない場合は`never`を返す`Flatten<T>`を作ってみましょう。

```ts twoslash
type Flatten<T> = T extends (infer U)[] ? U : never;
```

この`Flatten<T>`を使ってみましょう。

```ts twoslash
type Flatten<T> = T extends (infer U)[] ? U : never;
// ---cut---
type A = Flatten<string>;
//   ^?
type B = Flatten<string[]>;
//   ^?
type C = Flatten<string[][]>;
//   ^?
type D = Flatten<[string, number]>;
//   ^?
```

2次元配列に`Flatten<T>`を適用すると1次元配列が返ってくることが、タプル型に`Flatten<T>`を適用するとユニオン型が返ってくることがわかります。
