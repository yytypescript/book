---
description: 使われていない変数を禁止する
---

# noUnusedLocals

`noUnusedLocals`は使われていない変数を禁止するコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 2.0

## 解説

宣言したにもかかわらず使用されていない変数を禁止します。

```ts twoslash
function add(n1: number, n2: number): number {
  const message: string = `the sum is ${n1 + n2}`;

  return n1 + n2;
}
```

このオプションを有効にすると次のようなエラーが発生します。

```ts twoslash
// @noUnusedLocals: true
// @errors: 6133
function add(n1: number, n2: number): number {
  const message: string = `the sum is ${n1 + n2}`;

  return n1 + n2;
}
```
