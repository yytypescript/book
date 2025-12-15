---
sidebar_label: Kế thừa class
---

# Kế thừa class (inheritance)

Class trong JavaScript cũng có thể kế thừa bằng từ khóa `extends` giống như các ngôn ngữ khác có class.

```js twoslash
class Parent {}
class Child extends Parent {}
```

Khi viết constructor trong subclass, bắt buộc phải gọi constructor của superclass. Constructor của superclass được gọi bằng `super()`.

```js twoslash
class Parent {}
class Child extends Parent {
  constructor() {
    super();
  }
}
```
