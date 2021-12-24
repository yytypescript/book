---
sidebar_label: 数値列挙型
---

# 数値列挙型 (numeric enum)

TypeScriptの数値列挙型(numeric enum)はもっとも典型的な列挙型です。メンバーの値は上から順に`0`からの連番になります。

```ts
enum Position {
  Top, // 0
  Right, // 1
  Bottom, // 2
  Left, // 3
}
```

メンバーは値を代入できます。値を代入した場合、それに続くメンバーは連番になります。

```ts
enum Position {
  Top = 1, // 1
  Right, // 2
  Bottom, // 3
  Left, // 4
}
```
