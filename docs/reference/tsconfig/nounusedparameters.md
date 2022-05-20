---
description: 使われていない引数を禁止する
---

# noUnusedParameters

`noUnusedParameters`は使われていない引数を禁止するコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 2.0

## 解説

関数で使用していない引数を禁止します。

```ts twoslash
// @noUnusedParameters: false
function add(n1: number, n2: number, n3: number): number {
  return n1 + n2;
}
```

このオプションを有効にすると次のようなエラーが発生します。

```ts twoslash
// @noUnusedParameters: true
// @errors: 6133

function add(n1: number, n2: number, n3: number): number {
  return n1 + n2;
}
```

これを回避するためには、使用していない引数を`_`で始まる名前に変更します。

```ts twoslash
function add(n1: number, n2: number, _n3: number): number {
  return n1 + n2;
}
```
