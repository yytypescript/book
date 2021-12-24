---
description: switch文のfallthroughを禁止する
---

# noFallthroughCasesInSwitch

`noFallthroughCasesInSwitch`はswitch文のfallthroughを禁止するコンパイラオプションです。

- デフォルト: `false`
- 追加されたバージョン: 1.8

## 解説

`fallthrough`とは`switch`でにおける`case`文で`break`または`return`を行わないことを意味します。`case`文が空でない場合に限り`break`や`return`が行われているかを厳密に評価します。

```ts
function daysOfMonth(month: number): number {
  let days: number = 31;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      break;
    case 2:
      days = 28;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
    default:
      throw new Error("INVALID INPUT");
  }

  return days;
}
```

ある月の日数を求める関数`daysOfMonth()`を定義しましたがこの関数には`fallthrough`が存在します。このオプションを有効にすると次のようなエラーが発生します。

```text
error TS7029: Fallthrough case in switch.

    case 2:
　  ~~~~~~~
error TS7029: Fallthrough case in switch.

    case 11:
    ~~~~~~~~
```

`case 1, case 3, case 5, ....`が`fallthrough`とみなされないのは`case`文の実行部分が`break`だけで何もしないからです。

これを回避するためには`case`では漏れなく`break`あるいは`return`をするように設計します。

```ts
function daysOfMonth(month: number): number {
  let days: number = 31;

  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      break;
    case 2:
      days = 28;
      break;
    case 4:
    case 6:
    case 9:
    case 11:
      days = 30;
      break;
    default:
      throw new Error("INVALID INPUT");
  }

  return days;
}
```
