---
sidebar_label: Assertion function
---

# Assertion function

Type predicate chủ yếu được sử dụng như user-defined type guard function, nhưng cũng có một phương pháp khác là assertion function.
Type predicate được sử dụng với giá trị trả về kiểu boolean, còn assertion function xác định dựa trên việc function có throw exception hay không. Nếu viết lại function `isDuck()` được tạo trong trang type guard function bằng assertion function, nó sẽ như sau:

```ts twoslash
// @errors: 2339
class Animal {}
class Duck {
  public quacks(): void {}
}
declare function walksLikeDuck(animal: Animal): boolean;
declare function quacksLikeDuck(animal: Animal): boolean;

const animal = new Animal();
// ---cut---
function isDuck(animal: Animal): asserts animal is Duck {
  if (walksLikeDuck(animal)) {
    if (quacksLikeDuck(animal)) {
      return;
    }
  }

  throw new Error("YOU ARE A FROG!!!");
}

// Ở đây quacks() không tồn tại
animal.quacks();

isDuck(animal);

animal.quacks();
```

Với cách này, sau khi function được gọi, biến `animal` sẽ luôn được hiểu là kiểu `Duck`.
