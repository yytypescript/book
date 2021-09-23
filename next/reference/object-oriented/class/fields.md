# フィールド \(field\)

JavaScriptでインスタンスにフィールドを持たせるには、インスタンス化したオブジェクトのプロパティに値を代入します。

```javascript
class Person {}
const alice = new Person();
alice.name = "Alice";
```

TypeScriptでは、これに加えてフィールドの型注釈を書く必要があります。

```javascript
class Person {
  name: string;
}
const alice = new Person();
alice.name = "Alice";
```

TypeScriptのコンパイラーオプションで`strictNullChecks`と`strictPropertyInitialization`の両方が有効になっている場合、上の`name: string`の部分はコンパイルエラーとして指摘されます。なぜなら、`new Person`した直後は、`name`が`undefined`になるためです。

{% page-ref page="../../tsconfig/strict-type-checks/strictnullchecks.md" %}

{% page-ref page="../../tsconfig/strict-type-checks/strictpropertyinitialization.md" %}

この2つのコンパイラーオプションが有効な場合でもチェックを通るように書くには、nameフィールドの型注釈を`string | undefined`のようなユニオン型にする必要があります。

```typescript
class Person {
  name: string | undefined;
}
const alice = new Person();
console.log(alice.name); //=> undefined
```

## コンストラクターを用いたフィールドの初期化

フィールドへの値代入は、コンストラクターを用いて行えます。コンストラクターの中では、`this`を用いて値を代入したいフィールドにアクセスします。

```typescript
class Person {
  name: string;

  constructor() {
    this.name = "Alice";
  }
}
```

コンストラクターに引数を持たせれば、フィールドの値を動的に指定できるようにもできます。

```typescript
class Person {
  name: string;

  constructor(personName: string) {
    this.name = personName;
  }
}
const alice = new Person("Alice");
```

