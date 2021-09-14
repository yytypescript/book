# コンストラクター \(constructor\)

コンストラクターはクラスをnewしたときに実行される関数です。コンストラクターは、インスタンスプロパティの初期化する処理を実装する場所です。JavaScriptのコンストラクターは、constructor構文で書きます。

```javascript
class Person {
  constructor(name) {
    // ...
  }
}
```

## コンストラクターの型注釈

TypeScriptでコンストラクター引数の型注釈は、関数の型注釈のやり方と同じです。

```typescript
class Person {
  constructor(name: string) {
    // ...
  }
}
```

コンストラクターの戻り値は型注釈できません。コンストラクターの戻り値は、当然クラスのインスタンスなので、型注釈でコンパイラーに教える必要性がないのです。

