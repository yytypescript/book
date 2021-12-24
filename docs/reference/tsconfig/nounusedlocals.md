---
description: 使われていない変数を禁止する
---

# noUnusedLocals

`noUnusedLocals`は使われていない変数を禁止するコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 2.0

## 解説

宣言したにもかかわらず使用されていない変数を禁止します。

```ts
function add(n1: number, n2: number): number {
  const message: string = `the sum is ${n1 + n2}`;

  return n1 + n2;
}
```

このオプションを有効にすると次のようなエラーが発生します。

```text
error TS6133: 'message' is declared but its value is never read.

const message: string = `the sum is ${n1 + n2}`;
      ~~~~~~~
```
