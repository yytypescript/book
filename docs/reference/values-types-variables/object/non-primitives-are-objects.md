# Tất cả những gì không phải primitive đều là object

Trong JavaScript, tất cả những gì không phải primitive type đều là object. Object không chỉ bao gồm instance tạo từ class, mà còn có bản thân class, array, regular expression.

Với primitive type, nếu giá trị giống nhau thì được coi là giống nhau. Nhưng với object, dù giá trị property giống nhau, nếu instance khác nhau thì không được coi là giống nhau.

```js twoslash
const value1 = 123;
const value2 = 123;
console.log(value1 == value2);
// @log: true

const object1 = { value: 123 };
const object2 = { value: 123 };
console.log(object1 == object2);
// @log: false
```
