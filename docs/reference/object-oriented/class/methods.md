---
sidebar_label: メソッド
---

# メソッド (method)

JavaScriptのクラスにメソッドを実装するには、メソッド構文を用います。

```js
class Greeter {
  greet(name) {
    return `Hello, ${name}!`;
  }
}
```

## メソッドの型注釈

TypeScriptでは、メソッドの引数と戻り値に型注釈できます。

```ts
class Greeter {
  greet(name: string): string {
    return `Hello, ${name}!`;
  }
}
```

メソッドの型注釈は関数宣言構文の型注釈と同じです。引数や戻り値の型注釈を省略することもできます。その場合の振る舞いについては関数宣言を参照してください。

[関数宣言 (function declaration)](../../functions/function-declaration.md)
