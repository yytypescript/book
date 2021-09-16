# インターフェース \(interface\)

JavaやPHPなどの言語ではクラスとは別に、インターフェースが定義できますが、JavaScriptにはそれに相当する構文がありません。一方、TypeScriptにはインターフェースがあります。

## インターフェースを定義する

TypeScriptでは`interface` キーワードでインターフェースを定義できます。

```typescript
interface Person {
    name: string;
    age: number;
}
```

## TypeScriptのインターフェース

Javaなどのオブジェクト指向言語ではクラスの抽象的な型定義として利用されます。そのため、インターフェース単体では利用されず、特定のクラスがインターフェースを継承し実装を追加することで初めて効果を発揮します。

TypeScriptではインターフェースは型注釈として利用できるため、オブジェクトの型をInterfaceで定義するという使い方ができます。

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



