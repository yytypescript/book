---
sidebar_label: "\U0001F6A7インターフェース"
slug: /reference/object-oriented/interface
---

# 🚧インターフェース (interface)

インターフェースはクラスが実装すべきフィールドやメソッドを定義した型です。クラスはインターフェースを実装することで、インターフェースが求めるメソッド名や引数の型に則っているかをチェックすることができます。

JavaやPHPなどの言語では、インターフェースが定義できますが、JavaScriptにはそれに相当する構文がありません。一方、TypeScriptにはインターフェースがあります。

TypeScriptで定義されたインターフェースは、コンパイルチェックに活用された後、JavaScriptコードを生成する過程で消されるため、インターフェースがJavaScript実行時に影響することはありません。

## インターフェースを定義する

TypeScriptでは`interface`キーワードでインターフェースを定義できます。

```ts
interface SomeInterface {
  method1(): void;
  method2(arg: string): void;
}
```

TypeScriptではメソッドだけでなく、パブリックフィールドも定義できます。

```ts
interface SomeInterface {
  field: string;
}
```

## インターフェースと構造的部分型

Javaなどのオブジェクト指向言語ではクラスの抽象的な型定義として利用されます。そのため、インターフェース単体では利用されず、特定のクラスがインターフェースを継承し実装を追加することで初めて効果を発揮します。

TypeScriptでもインターフェースをクラスに実装させることはできますが、それに加えて、TypeScriptは構造的部分型なので、インターフェースと実装関係がないオブジェクトの型注釈としても利用できます。

```ts
interface Person {
  name: string;
  age: number;
}

const taro: Person = {
  name: "太郎",
  age: 12,
};
```

[構造的部分型 (structural subtyping)](../../values-types-variables/structural-subtyping.md)
