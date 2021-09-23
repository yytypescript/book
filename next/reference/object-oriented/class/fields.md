# フィールド \(field\)

JavaScriptでインスタンスにフィールドを持たせるには、インスタンス化したオブジェクトのプロパティに値を代入します。

{% code title="JavaScript" %}
```javascript
class Person {}
const alice = new Person();
alice.name = "Alice";
```
{% endcode %}

TypeScriptでは、これに加えてフィールドの型注釈を書く必要があります。

{% code title="TypeScript" %}
```typescript
class Person {
  name: string;
}
const alice = new Person();
alice.name = "Alice";
```
{% endcode %}

TypeScriptは、クラスの宣言に書かれていないフィールドへアクセスした場合、コンパイルエラーになります。

{% code title="TypeScript" %}
```typescript
class Person {}
const person = new Person();
console.log(person.age);
//                 ^^^ Property 'age' does not exist on type 'Person'.(2339) 
```
{% endcode %}

## 初期化なしのフィールドとチェック

TypeScriptのコンパイラーオプションで`strictNullChecks`と`strictPropertyInitialization`の両方が有効になっている場合、次の例の`name: string`の部分はコンパイルエラーとして指摘されます。なぜなら、`new Person`した直後は、`name`が`undefined`になるためです。

```typescript
class Person {
  name: string;
  //^^ Property 'name' has no initializer and is not definitely assigned in the constructor.(2564)
}
const alice = new Person();
console.log(alice.name); //=> undefined
```

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

{% code title="TypeScript" %}
```typescript
class Person {
  name: string;

  constructor() {
    this.name = "Alice";
  }
}
```
{% endcode %}

コンストラクターに引数を持たせれば、フィールドの値を動的に指定できるようにもできます。

{% code title="TypeScript" %}
```typescript
class Person {
  name: string;

  constructor(personName: string) {
    this.name = personName;
  }
}
const alice = new Person("Alice");
```
{% endcode %}

