# 静的メソッド \(static method\)

JavaやPHPには静的メソッド\(static method\)という概念があります。通常のメソッドはインスタンスに属しますが、静的メソッドはクラスに属します。JavaやPHPではstaticキーワードで静的フィールドを宣言できます。

{% tabs %}
{% tab title="Java" %}
```java
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
{% endtab %}

{% tab title="PHP" %}
```php
class SomeClass
{
    public static function doSomething()
    {
        // ...
    }
}

SomeClass::doSomething();
```
{% endtab %}
{% endtabs %}

JavaScriptにはJavaのような静的メソッドの機能がありません。代わりに、クラスのプロパティに後から関数を代入することで似たようなことができます。

{% code title="JavaScript" %}
```javascript
class SomeClass {}
SomeClass.doSomething = function () {
  // ...
};
SomeClass.doSomething();
```
{% endcode %}

TypeScriptでは、Java風の静的メソッドの書き方ができるようになっています。TypeScriptで静的メソッドを宣言するにはstaticキーワードを用います。

{% code title="TypeScript" %}
```typescript
class SomeClass {
  static doSomething() {
    // ...
  }
}

SomeClass.doSomething();
```
{% endcode %}

## 静的メソッドとアクセス修飾子

TypeScriptの静的メソッドはアクセス修飾子を組み合わせられます。

```typescript
class SomeClass {
  private static doSomething() {
    // ...
  }
}
```

{% page-ref page="access-modifiers.md" %}

