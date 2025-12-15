---
sidebar_label: Static field
---

# Static field (static field)

Trong Java và PHP có khái niệm static field. Field thông thường là property của instance, nhưng static field là property của class. Trong Java và PHP có thể khai báo static field bằng từ khóa static.

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

JavaScript và TypeScript cũng có thể khai báo static field bằng từ khóa static.

```ts title="TypeScript" twoslash
class SomeClass {
  static field: number = 123;
}
console.log(SomeClass.field);
// @log: 123
```

## Type inference cho static field

Static field của TypeScript được suy luận kiểu từ giá trị khởi tạo nếu có giá trị khởi tạo. Do đó có thể bỏ qua type annotation cho field.

```ts twoslash
class SomeClass {
  static field = 123;
}
```

## Static field và access modifier

Static field của TypeScript có thể kết hợp với access modifier.

```ts twoslash
class SomeClass {
  private static field: number;
}
```

[Access modifier (access modifier)](access-modifiers.md)

## Static field chỉ đọc

Static field của TypeScript trở thành chỉ đọc khi thêm readonly modifier.

```ts twoslash
class SomeClass {
  static readonly field: number;
}
```

[Readonly modifier của class](readonly-modifier-in-classes.md)
