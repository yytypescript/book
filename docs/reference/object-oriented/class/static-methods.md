---
sidebar_label: Static method
---

# Static method (static method)

Trong Java và PHP có khái niệm static method. Trong Ruby tương đương với class method. Method thông thường thuộc về instance, nhưng static method thuộc về class. Trong Java và PHP có thể khai báo static field bằng từ khóa static.

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

JavaScript và TypeScript cũng có thể khai báo static method bằng từ khóa static.

```js title="JavaScript" twoslash
class SomeClass {
  static doSomething() {
    // ...
  }
}
SomeClass.doSomething();
```

## Static method và access modifier

Static method của TypeScript có thể kết hợp với access modifier.

```ts twoslash
class SomeClass {
  private static doSomething() {
    // ...
  }
}
```

[Access modifier (access modifier)](access-modifiers.md)
