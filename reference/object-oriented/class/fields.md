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

フィールドは宣言時に型を省略した場合でもコンストラクタで値が代入される場合は、代入する値で型が推論されます。下の例ではコンストラクタで`string`の型の値を代入しているため`name`は`string`型となります。

```typescript
class Person {
    private name;

    constractor(name: string) {
        this.name = name;
    }
}
```

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

{% page-ref page="../../tsconfig/strictnullchecks.md" %}

{% page-ref page="../../tsconfig/strictpropertyinitialization.md" %}

この2つのコンパイラーオプションが有効な場合でもチェックを通るように書くには、nameフィールドの型注釈を`string | undefined`のようなユニオン型にする必要があります。

```typescript
class Person {
  name: string | undefined;
}
const alice = new Person();
console.log(alice.name); //=> undefined
```

## コンストラクタを用いたフィールドの初期化

フィールドへの値代入は、コンストラクタを用いて行えます。コンストラクタの中では、`this`を用いて値を代入したいフィールドにアクセスします。

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

コンストラクタに引数を持たせれば、フィールドの値を動的に指定できるようにもできます。

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

