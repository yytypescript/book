---
sidebar_label: 静的フィールド
---

# 静的フィールド (static field)

JavaやPHPには静的フィールド(static field)という概念があります。通常のフィールドはインスタンスのプロパティですが、静的フィールドはクラスのプロパティです。JavaやPHPではstaticキーワードで静的フィールドを宣言できます。

```java title="Java"
class SomeClass {
    public static Integer field = 123;
}

class Main {
    public static void main(String[] args) {
        System.out.println(SomeClass.field); //=> 123
    }
}
```

```php title="PHP"
class SomeClass
{
    public static $field = 123;
}

var_dump(SomeClass::$field); //=> int(123)
```

JavaScriptやTypeScriptでもstaticキーワードを使った静的フィールドの宣言ができます。

```ts title="TypeScript" twoslash
class SomeClass {
  static field: number = 123;
}
console.log(SomeClass.field);
// @log: 123
```

## 静的フィールドの型推論

TypeScriptの静的フィールドは初期値がセットされている場合、その初期値からフィールドの型が型推論されます。そのため、フィールドの型注釈が省略できます。

```ts twoslash
class SomeClass {
  static field = 123;
}
```

## 静的フィールドとアクセス修飾子

TypeScriptの静的フィールドはアクセス修飾子を組み合わせられます。

```ts twoslash
class SomeClass {
  private static field: number;
}
```

[アクセス修飾子 (access modifier)](access-modifiers.md)

## 読み取り専用の静的フィールド

TypeScriptの静的フィールドはreadonly修飾子をつけると読み取り専用になります。

```ts twoslash
class SomeClass {
  static readonly field: number;
}
```

[クラスのreadonly修飾子](readonly-modifier-in-classes.md)
