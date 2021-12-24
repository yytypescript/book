---
sidebar_label: 文字列列挙型
---

# 文字列列挙型 (string enum)

TypeScriptの列挙型では、メンバーの値に文字列も使えます。文字列で構成された列挙型は文字列列挙型(string enum)と呼ばれます。

```ts
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
```
