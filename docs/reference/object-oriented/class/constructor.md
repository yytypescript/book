---
sidebar_label: コンストラクタ
---

# コンストラクタ (constructor)

コンストラクタはクラスをnewしたときに実行される関数です。コンストラクタは、インスタンスプロパティの初期化する処理を実装する場所です。JavaScriptのコンストラクタは、constructor構文で書きます。

```ts
class Person {
  constructor(name) {
    // ...
  }
}
```

## コンストラクタの型注釈

TypeScriptでコンストラクタ引数の型注釈は、関数の型注釈のやり方と同じです。

```ts twoslash
class Person {
  constructor(name: string) {
    // ...
  }
}
```

コンストラクタの戻り値は型注釈できません。コンストラクタの戻り値は、当然クラスのインスタンスですので、型注釈でコンパイラーに教える必要性がないのです。

## コンストラクタに引数を渡す

JavaScriptでコンストラクタに引数を渡す方法は、関数呼び出しの書き方とほぼ同じです。違いはnew演算子をつけることです。

```ts twoslash
class Person {
  constructor(name: string) {
    // ...
  }
}
// ---cut---
new Person("Alice");
```

## 関連情報

[constructor shorthand](constructor-shorthand.md)
