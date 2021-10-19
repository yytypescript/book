---
sidebar_label: "\U0001F6A7ボックス化"
---

# 🚧ボックス化 (boxing)

文字数カウントをしたいときは`str.length`とすれば文字数が得られます。数値を文字列にしたいときは(テンプレートリテラルを使わなければ)`num.toString()`とすれば文字列が得られます。

プリミティブ型はオブジェクトではないのでプロパティやメソッドを持っていないはずです。ですがこのようなことができるのは、内部的にはJavaScriptがプリミティブ型の値をオブジェクトに変換しているからです。この暗黙の型変換をAutoboxingと呼びます。

ちなみにこのときに使われるオブジェクトを通称ラッパークラスと呼び、それらのインターフェースもTypeScriptに`Boolean, Number, String, Symbol, BigInt`として定義されています。なお`undefined`と`null`のラッパークラスはありません。

```typescript
const bool: Boolean = false;
const num: Number = 0;
const str: String = "";
const sym: Symbol = Symbol();
const big: BigInt = 10n;
```

当然ながらラッパークラスは`Object`をスーパークラスに持っているため、変数の型として`Object, {}`が定義されてしまうとAutoboxingをしたものと解釈され、代入ができます
