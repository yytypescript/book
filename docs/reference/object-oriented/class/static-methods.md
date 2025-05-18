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

JavaScriptにもstaticキーワードを使った静的メソッドの宣言ができます。

```js title="JavaScript" twoslash
class SomeClass {
  static doSomething() {
    // ...
  }
}
SomeClass.doSomething();
```

TypeScriptでも同様に、staticキーワードを用いて静的メソッドを宣言できます。

```ts title="TypeScript" twoslash
class SomeClass {
  static doSomething() {
    // ...
  }
}

SomeClass.doSomething();
```

## 静的メソッドとアクセス修飾子

TypeScriptの静的メソッドはアクセス修飾子を組み合わせられます。

```ts twoslash
class SomeClass {
  private static doSomething() {
    // ...
  }
}
```

[アクセス修飾子 (access modifier)](access-modifiers.md)
