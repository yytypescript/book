---
sidebar_label: 静的メソッド
---

# 静的メソッド (static method)

JavaやPHPには静的メソッド(static method)という概念があります。Rubyではクラスメソッドに相当します。通常のメソッドはインスタンスに属しますが、静的メソッドはクラスに属します。JavaやPHPではstaticキーワードで静的フィールドを宣言できます。

```java title="Java"
class SomeClass {
    static public void doSomething() {
        // ...
    }
}

class Main {
    public static void main(String[] args) {
        SomeClass.doSomething();
    }
}
```

```php title="PHP"
class SomeClass
{
    public static function doSomething()
    {
        // ...
    }
}

SomeClass::doSomething();
```

JavaScriptにはJavaのような静的メソッドの機能がありません。代わりに、クラスのプロパティに後から関数を代入することで似たようなことができます。

```js title="JavaScript"
class SomeClass {}
SomeClass.doSomething = function () {
  // ...
};
SomeClass.doSomething();
```

TypeScriptでは、Java風の静的メソッドの書き方ができるようになっています。TypeScriptで静的メソッドを宣言するにはstaticキーワードを用います。

```ts title="TypeScript"
class SomeClass {
  static doSomething() {
    // ...
  }
}

SomeClass.doSomething();
```

## 静的メソッドとアクセス修飾子

TypeScriptの静的メソッドはアクセス修飾子を組み合わせられます。

```ts
class SomeClass {
  private static doSomething() {
    // ...
  }
}
```

[アクセス修飾子 (access modifier)](access-modifiers.md)
