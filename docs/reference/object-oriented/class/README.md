---
sidebar_label: クラス
slug: /reference/object-oriented/class
---

# クラス (class)

クラスはオブジェクトの雛形を定義したもので、JavaScriptとTypeScriptでは`class`構文を用いてクラスが定義できます。

```ts twoslash
class Person {}
```

クラスに対して`new`キーワードを使うと、オブジェクトを生成できます。

```ts twoslash
class Person {}
// ---cut---
const person = new Person();
```

このように`class`でクラスを定義し、`new`でインスタンスを生成するスタイルは、JavaやPHP、Rubyなどと使用感がよく似ています。

## クラスの型注釈

TypeScriptでは、クラスを定義するとクラス名と同じ名前の型が同時に定義されます。インスタンスを代入する変数に型注釈するには、クラス名を使います。

```ts twoslash
class Person {}
// ---cut---
const person: Person = new Person();
```
