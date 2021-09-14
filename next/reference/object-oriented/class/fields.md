# フィールド \(field\)

JavaScriptでインスタンスにフィールドを持たせるには、コンストラクターを実装します。コンストラクター内では、thisを用いてインスタンスのプロパティに代入する必要があります。

```javascript
class Person {
  constructor(personName) {
    this.name = personName;
  }
}
```

TypeScriptでは、これに加えてフィールドの型注釈を書く必要があります。

```javascript
class Person {
  name: string

  constructor(personName: string) {
    this.name = personName;
  }
}
```

