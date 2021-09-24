# 🚧インターフェース \(interface\)

JavaやPHPなどの言語ではクラスとは別に、インターフェースが定義できますが、JavaScriptにはそれに相当する構文がありません。一方、TypeScriptにはインターフェースがあります。

## インターフェースを定義する

TypeScriptでは`interface` キーワードでインターフェースを定義できます。

```typescript
interface Person {
    name: string;
    age: number;
}
```

## インターフェースと構造的部分型

Javaなどのオブジェクト指向言語ではクラスの抽象的な型定義として利用されます。そのため、インターフェース単体では利用されず、特定のクラスがインターフェースを継承し実装を追加することで初めて効果を発揮します。

TypeScriptでもインターフェースをクラスに実装させることはできますが、それに加えて、TypeScriptは構造的部分型なので、インターフェースと実装関係がないオブジェクトの型注釈としても利用できます。

```typescript
interface Person {
    name: string;
    age: number;
}

const taro: Person = {
    name: '太郎',
    age: 12,
}
```

{% page-ref page="../../values-types-variables/structural-subtyping.md" %}



