# Class là object

Đặc điểm của class trong JavaScript là class cũng là một loại object. Object trong JavaScript là tập hợp các property. Vì class cũng là object nên có tính chất là tập hợp các property. Do đó, có thể thêm hoặc thay đổi property của class đã định nghĩa.

```js twoslash
const myObject = {};
myObject.key = "value"; // Thêm property

class MyClass {}
MyClass.key = "value"; // Thêm property
```

Ngược lại, trong TypeScript không cho phép mở rộng động như vậy để đảm bảo type-safe.

```ts twoslash
// @errors: 2339
class MyClass {}
MyClass.key = "value";
```
