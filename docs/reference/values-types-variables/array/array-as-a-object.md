# Array là object

Array trong JavaScript là object. Do đó, cần chú ý hành vi khi so sánh và copy.

## So sánh array

Dù nội dung array giống nhau, nếu instance của object khác nhau thì không thể so sánh như mong đợi bằng `==`.

```ts twoslash
const list1 = [1, 2, 3];
const list2 = [1, 2, 3];
console.log(list1 == list2);
// @log: false
```

Trong PHP có thể so sánh bằng nhau với array (indexed array) dựa trên nội dung phần tử, nhưng JavaScript không làm được như vậy.

```php
<?php
$list1 = [1, 2, 3];
$list2 = [1, 2, 3];
var_dump($list1 === $list2); //=> bool(true)
```

JavaScript không có operator hay method để so sánh nội dung array, nên khi muốn so sánh nội dung, khuyến nghị sử dụng package như [isEqual](https://lodash.com/docs/4.17.15#isEqual) của lodash.

## Copy array

Giống như các object khác, việc gán array không tạo ra bản copy của giá trị. Biến gán và biến được gán đều trỏ đến cùng một giá trị. Và khi thay đổi một biến, biến còn lại cũng bị ảnh hưởng.

```ts twoslash
const arr = [1, 2, 3];
const backup = arr;
arr.push(4); // Thay đổi
console.log(arr);
// @log: (4) [1, 2, 3, 4]
console.log(backup); // Cũng bị ảnh hưởng
// @log: (4) [1, 2, 3, 4]
```

Để copy array đơn giản như trên, hãy sử dụng spread syntax.

```ts twoslash
const arr = [1, 2, 3];
const backup = [...arr]; // Spread syntax
arr.push(4); // Thay đổi
console.log(backup); // Không bị ảnh hưởng
// @log: (4) [1, 2, 3]
```

[Copy array](./spread-syntax-for-array.md)
