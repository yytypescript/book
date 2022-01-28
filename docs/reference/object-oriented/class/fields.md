---
sidebar_label: フィールド
---

# フィールド (field)

JavaScriptでインスタンスにフィールドを持たせるには、インスタンス化したオブジェクトのプロパティに値を代入します。

```js title="JavaScript"
class Person {}
const alice = new Person();
alice.name = "Alice";
```

TypeScriptでは、これに加えてフィールドの型注釈を書く必要があります。

```ts title="TypeScript"
class Person {
  name: string;
}
const alice = new Person();
alice.name = "Alice";
```

TypeScriptは、クラスの宣言に書かれていないフィールドへアクセスした場合、コンパイルエラーになります。

```ts title="TypeScript" twoslash
// @errors: 2339
class Person {}
const person = new Person();
console.log(person.age);
```

フィールドは宣言時に型を省略した場合でもコンストラクタで値が代入される場合は、代入する値で型が推論されます。下の例ではコンストラクタで`string`の型の値を代入しているため`name`は`string`型となります。

```ts
class Person {
  private name;

  constructor(name: string) {
    this.name = name;
  }
}
```

## 初期化なしのフィールドとチェック

TypeScriptのコンパイラーオプションで`strictNullChecks`と`strictPropertyInitialization`の両方が有効になっている場合、次の例の`name: string`の部分はコンパイルエラーとして指摘されます。なぜなら、`new Person`した直後は、`name`が`undefined`になるためです。

```ts twoslash
class Person {
  name: string;
}
const alice = new Person();
console.log(alice.name);
// @log: undefined
// @errors: 2564
```

[strictNullChecks](../../tsconfig/strictnullchecks.md)

[strictPropertyInitialization](../../tsconfig/strictpropertyinitialization.md)

この2つのコンパイラーオプションが有効な場合でもチェックを通るように書くには、nameフィールドの型注釈を`string | undefined`のようなユニオン型にする必要があります。

```ts twoslash
class Person {
  name: string | undefined;
}
const alice = new Person();
console.log(alice.name);
// @log: undefined
```

## コンストラクタを用いたフィールドの初期化

フィールドへの値代入は、コンストラクタを用いて行えます。コンストラクタの中では、`this`を用いて値を代入したいフィールドにアクセスします。

```ts title="TypeScript"
class Person {
  name: string;

  constructor() {
    this.name = "Alice";
  }
}
```

コンストラクタに引数を持たせれば、フィールドの値を動的に指定できるようにもできます。

```ts title="TypeScript"
class Person {
  name: string;

  constructor(personName: string) {
    this.name = personName;
  }
}
const alice = new Person("Alice");
```
