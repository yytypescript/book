---
sidebar_label: フィールドの初期化子
---

# フィールドの初期化子 (initializer)

TypeScriptでは、初期化子(initializer)を使うとインスタンスのフィールドの初期値を指定できます。初期化子はフィールド名の右に`= 値`と書きます。初期化子は、クラスがインスタンス化されるときに自動的に実行されます。

```ts twoslash
class Point {
  x: number = 0;
  y: number = 0;
}
const point = new Point();
console.log(point.x, point.y);
// @log: 0 0
```

初期化子を用いた上の例は、次のコンストラクタでフィールドを初期化するのと同じ意味です。

```ts
class Point {
  x: number;
  y: number;

  constructor() {
    this.x = 0;
    this.y = 0;
  }
}
```

## 初期化子と型推論

初期化子で値の型が自明な場合、TypeScriptコンパイラーはフィールドの型を推論してくれます。そのため、初期化子を伴うフィールドは型注釈を省略できます。

```ts
class Point {
  x = 0; // number型と型推論される
}
```
