# Toán tử instanceof

Toán tử `instanceof` là toán tử của JavaScript để kiểm tra xem một object có phải là instance của class hay không.

## Cú pháp

```js twoslash
// prettier-ignore
object instanceof Class
```

### Tham số

- object: Object cần kiểm tra.
- Class: Tên class cần kiểm tra.

## Ví dụ

```ts twoslash
class ClassA {}
class ClassB {}
const a = new ClassA();
console.log(a instanceof ClassA);
// @log: true
console.log(a instanceof ClassB);
// @log: false
```

## Kế thừa và `instanceof`

`instanceof` cũng có thể kiểm tra quan hệ kế thừa. Ví dụ, có thể kiểm tra xem instance của class `Child` có phải là instance của class `Parent` hay không như sau:

```ts twoslash
class Parent {}
class Child extends Parent {}
const child = new Child();
console.log(child instanceof Parent);
// @log: true
```

## Đảo ngược `instanceof`

Để đảo ngược kết quả của toán tử `instanceof`, cần bao toàn bộ câu `value instanceof ClassName` bằng ngoặc đơn và thêm toán tử phủ định `!` ở đầu.

```ts twoslash
class MyClass {}
const myInstance = new MyClass();
// ---cut---
if (!(myInstance instanceof MyClass)) {
  // Xử lý khi myInstance không phải MyClass
}
```

## Abstract class và `instanceof`

TypeScript có [abstract class](./abstract-class.md). Toán tử `instanceof` cũng có thể sử dụng với abstract class.

```ts twoslash
abstract class AbstractClass {}
class ConcreteClass extends AbstractClass {}
const obj = new ConcreteClass();
console.log(obj instanceof AbstractClass);
// @log: true
```
