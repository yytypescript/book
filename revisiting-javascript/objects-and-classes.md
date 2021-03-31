---
description: JavaScriptのオブジェクトとクラスについておさらいしましょう。
---

# JavaScriptのオブジェクトとクラス

ここでは、他の言語\(特にJavaやPHP\)と比べて、JavaScriptのオブジェクトやクラスにどんな特徴があるのかを復習できるようになっています。また、オブジェクトやクラスの記法についても再入門していきます。

### オブジェクトリテラル

JavaScriptの特徴はオブジェクトリテラル`{}`という記法を用いて、簡単にオブジェクトを生成できる点です。

```javascript
// 空っぽのオブジェクトを生成
const object = {};

// プロパティを指定しながらオブジェクトを生成
const person = { name: "Bob", age: 25 };
```

JavaやPHPなどの言語では、オブジェクトを生成するにはまずクラスを定義し、そのクラスを元にインスタンスを作るのが普通ですが、JavaScriptはクラス定義がなくてもこのようにオブジェクトリテラルを書くと、オブジェクトをインラインで作れます。

オブジェクトリテラルがあるおかげで、JavaScriptでは自由度の高いコードが書けるようになっています。

次の例のように、JavaScriptでも`Object`を`new`することでオブジェクトを作ることができます。しかし、オブジェクトリテラルを使ったほうが端的で読みやすいコードになります。

```javascript
const person = new Object();
person.name = "Bob";
person.age = 25;
```

### プロパティ

JavaScriptのオブジェクトは、プロパティの集合体です。プロパティはキーと値の対です。

プロパティの値には、`1`や`"string"`のようなプリミティブ型や関数、そして、オブジェクトも入れることができます。

```javascript
const product = {
  name: "ミネラルウォーター",
  price: 100,
  getTaxIncludedPrice: function () {
    return Math.floor(this.price * 1.1);
  },
  shomikigen: new Date("2022-01-20"),
};
```

上の`getTaxIncludedPrice`には関数が代入されていますが、この関数は「メソッド」と呼ばれます。メソッドとは、オブジェクトに関連づいた関数のことです。メソッドを定義するには、キーと関数の値に分けて書く方法だけでなく、メソッド定義のための短い構文を使うこともできます。

```javascript
const object = {
  // キーと値に分けて書いたメソッド定義
  printHello1: function () {
    console.log("Hello");
  },
  // 短い構文を用いたメソッド定義
  printHello2() {
    console.log("Hello");
  },
};
```

JavaやPHPでは、オブジェクトのフィールドとメソッドははっきり区別されます。一方、JavaScriptではその区別はきっちりしていません。Javaで言うところのメソッドとフィールドは、JavaScriptでは同じように扱われます。たとえば、メソッドに`null`を代入することで、フィールドに変えてしまうこともできます。

```javascript
const calculator = {
  sum(a, b) {
    return a + b;
  }
};

calculator.sum(1, 1); //=> 2
calculator.sum = null;
calculator.sum(1, 1); // ここではもうメソッドではないので、呼び出すとエラーになります
```

### クラス

クラスはオブジェクトの雛形を定義したもので、`class`構文を用いてクラスが定義できます。

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
```

クラスに対して`new`キーワードを使うと、オブジェクトを生成できます。

```javascript
const person = new Person("Bob", 25);
person.name; //=> "Bob"
person.age; //=> 25
```

このように`class`でクラスを定義し、`new`でインスタンスを生成するスタイルは、JavaやPHP、Rubyなどと使用感がよく似ています。

JavaScriptのクラスの特徴は、クラスもオブジェクトの一種というところです。オブジェクトとは、プロパティの集合体だと前述しましたが、クラスもオブジェクトなのでプロパティの集合体としての性質を持ちます。したがって、定義したクラスはプロパティを追加したり、変更したりできます。

```javascript
const myObject = {};
myObject.key = "value"; // プロパティを追加

class MyClass {}
MyClass.key = "value"; // プロパティを追加
```

ちなみに上の例のようにクラスにプロパティを持たせるには`static`修飾子を使うと`class`構文内に書くことができます。

```javascript
class MyClass {
  static key = "value";
}
```

### 継承

JavaScriptのクラスも他のクラスを持つ言語と同じように、`extends`キーワードで継承ができます。

```javascript
class Parent {}
class Child extends Parent {}
```

子クラスにコンストラクタを書く場合、親クラスのコンストラクタは必ず呼び出す必要があります。親クラスのコンストラクタは`super()`で呼び出します。

```javascript
class Parent {}
class Child extends Parent {
  constructor() {
    super();
  }
}
```

継承関係のチェックは`instanceof`演算子で確認できます。この書き方は、JavaやPHPとよく似ています。

```javascript
const parent = new Parent();
const child = new Child();

parent instanceof Parent; //=> true
parent instanceof Child; //=> false

child instanceof Parent; //=> true
child instanceof Child; //=> true
```

### インターフェース

JavaやPHPなどの言語ではクラスとは別に、インターフェースが定義できますが、JavaScriptにはそれに相当する構文がありません。

TypeScriptにはインターフェースがあります。TypeScriptインターフェースについては下記をご覧ください。

{% page-ref page="../features/interfaces.md" %}

### 抽象クラス

JavaやPHPなどの言語では、`abstract`修飾子を使って抽象クラスを定義できます。抽象クラスは、直接インスタンスを作れないクラスのことです。JavaScriptには抽象クラスを定義する構文はありません。

TypeScriptには`abstract`修飾子があり抽象クラスを表現できます。TypeScriptの`abstract`修飾子については「クラス」をご覧ください。

{% page-ref page="../features/classes.md" %}

### プロパティの可視性

JavaやPHPなどの言語では、フィールドやメソッドに`private`, `protected`, `public`を指定できます。JavaScriptでも`private`のようなプロパティを実現するために[プライベートクラスフィールド](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields)という仕様が実験的に導入されはじめてはいますが、現状はJavaのようなアクセス修飾子はありません。

TypeScriptにはJava風のアクセス修飾子があります。TypeScriptのアクセス修飾子については「クラス」をご覧ください。

{% page-ref page="../features/classes.md" %}

