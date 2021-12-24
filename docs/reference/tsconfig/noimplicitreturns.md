---
description: 関数戻り値の型注釈を必須にする
---

# noImplicitReturns

`noImplicitReturns`は関数戻り値の型注釈を必須にするコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 1.8

## 解説

戻り値が`void`型以外の関数ですべての条件分岐において値を返しているかを厳密に評価します。

```ts
function negaposi(num: number): string {
  if (num > 0) {
    return "positive";
  } else if (num < 0) {
    return "negative";
  }
}
```

このオプションを有効にすると次のようなエラーが発生します。

```text
error TS7030: Not all code paths return a value.

function negaposi(num: number): string {
                                ~~~~~~
```

これを回避するためには条件分岐の場合分けのときに値を返し忘れないように設計します。

```ts
function negaposi(num: number): string {
  if (num > 0) {
    return "positive";
  } else if (num < 0) {
    return "negative";
  }

  return "this is 0";
}
```
