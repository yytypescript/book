---
title: Map<K, V>
---

`Map` là một trong những built-in API của JavaScript, là object để xử lý cặp key-value. Trong `Map`, một key chỉ có thể lưu trữ một giá trị duy nhất.

## Cách tạo đối tượng Map

Để tạo đối tượng `Map`, dùng `new` với class `Map`. Ví dụ, để tạo `Map<string, number>` với key là `string` và value là `number`:

```ts twoslash
const map = new Map<string, number>();
map.set("a", 1);
console.log(map.get("a"));
// @log: 1
```

Khi truyền mảng [tuple type] `[K, V][]` là `[K, V][]` vào constructor, sẽ tạo object `Map<K, V>`.

[tuple type](../values-types-variables/tuple.md)

```ts twoslash
const map = new Map<string, number>([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map);
// @log: Map (3) {"a" => 1, "b" => 2, "c" => 3}
```

Nếu bỏ qua type variable của `Map`, TypeScript sẽ suy luận kiểu `Map<K, V>` từ tham số constructor.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
map;
//^?
```

Nếu bỏ qua tham số constructor, sẽ tạo `Map` rỗng.

```ts twoslash
const map = new Map<string, number>();
console.log(map);
// @log: Map(0) {}
```

Nếu bỏ qua cả type argument và constructor argument, sẽ có kiểu `Map<any, any>`.

```ts twoslash
const map = new Map();
//    ^?
```

## Type annotation cho Map

Khi type annotation cho Map trong TypeScript, chỉ định kiểu của phần tử Map vào type variable như `Map<string, number>`.

```ts twoslash
function doSomething(map: Map<string, number>) {}
```

## Key của Map được so sánh bằng strict equality

Việc key của `Map` có giống nhau hay không được xác định bằng strict equality (`===`). Không phải equality (`==`).

Ví dụ, `null` và `undefined` bằng nhau với equality, nhưng không bằng nhau với strict equality.

```ts twoslash
console.log(null == undefined);
// @log: true
console.log(null === undefined);
// @log: false
```

Do đó, `Map` coi `null` và `undefined` là các key khác nhau.

```ts twoslash
const map = new Map<any, any>([[null, 1]]);
console.log(map.has(null));
// @log: true
console.log(map.has(undefined));
// @log: false
```

`NaN` với nhau không bằng nhau với strict equality, nhưng ngoại lệ được coi là cùng key.

```js twoslash
// JavaScript

console.log(NaN === NaN);
// @log: false
```

```ts twoslash
const map = new Map<number, number>();
map.set(NaN, 1);
map.set(NaN, 2);
console.log(map);
// @log: Map (1) {NaN => 2}
```

Object không bằng nhau với cả equality và strict equality nên được coi là key khác nhau.

```js twoslash
// JavaScript

console.log({} == {});
// @log: false
console.log({} === {});
// @log: false
// @noErrors
```

```ts twoslash
const map = new Map<object, number>();
map.set({}, 1);
map.set({}, 2);
console.log(map);
// @log: Map (2) {{} => 1, {} => 2}
```

## Thao tác với Map

### Set phần tử - `Map.prototype.set()`

Để thêm cặp key-value vào `Map`, sử dụng method `set`.

```ts twoslash
const map = new Map<string, number>();
map.set("a", 1);
console.log(map);
// @log: Map (1) {"a" => 1}
```

Nếu key đã tồn tại, sẽ ghi đè giá trị.

```ts twoslash
const map = new Map([["a", 1]]);
map.set("a", 5);
console.log(map);
// @log: Map (1) {"a" => 5}
```

### Lấy giá trị - `Map.prototype.get()`

Để lấy phần tử từ `Map` dựa trên key, sử dụng method `get`.

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.get("a"));
// @log: 1
```

Method `get` trả về `undefined` nếu key không tồn tại.

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.get("b"));
// @log: undefined
```

Kết hợp với toán tử Null coalescing có thể gán giá trị mặc định khi không lấy được giá trị bằng method `get`.

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.get("b") ?? 2);
// @log: 2
```

### Xóa phần tử cụ thể - `Map.prototype.delete()`

Để xóa phần tử khỏi `Map` bằng cách chỉ định key, sử dụng method `delete`.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
map.delete("a");
console.log(map);
// @log: Map (1) {"b" => 2}
```

Giá trị trả về của `delete` là `true` nếu key tồn tại, ngược lại là `false`.

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.delete("a"));
// @log: true
console.log(map.delete("b"));
// @log: false
```

### Kiểm tra sự tồn tại của key - `Map.prototype.has()`

Để kiểm tra xem key có tồn tại trong `Map` hay không, sử dụng method `has`.

```ts twoslash
const map = new Map([["a", 1]]);
console.log(map.has("a"));
// @log: true
console.log(map.has("b"));
// @log: false
```

:::tip Lấy phần tử sau khi kiểm tra tồn tại

Code kiểm tra tồn tại bằng `has` rồi mới lấy phần tử bằng `get` không thể viết tốt trong TypeScript.

```ts twoslash
// @errors: 18048
const map = new Map([["a", 1]]);
if (map.has("a")) {
  // TypeScript không nhận biết có "a"
  const n = map.get("a");
  n * 2;
}
```

Trong trường hợp này, lấy giá trị bằng `get` rồi kiểm tra giá trị đó khác `undefined` sẽ hoạt động tốt.

```ts twoslash
const map = new Map([["a", 1]]);
const n = map.get("a");
if (typeof n === "number") {
  n * 2;
}
```

:::

### Lấy số lượng phần tử - `Map.prototype.size()`

Để kiểm tra số lượng phần tử đã đăng ký trong `Map`, xem giá trị của field `size`.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map.size);
// @log: 3
```

### Xóa tất cả phần tử - `Map.prototype.clear()`

Để xóa tất cả phần tử đã đăng ký trong `Map`, sử dụng method `clear`.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(map.size);
// @log: 3
map.clear();
console.log(map.size);
// @log: 0
```

### Liệt kê key - `Map.prototype.keys()`

Method `keys` trả về iterable object của các key.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keys = [...map.keys()];
console.log(keys);
// @log: ["a", "b", "c"]
```

### Liệt kê value - `Map.prototype.values()`

Method `values` trả về iterable object của các giá trị.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const values = [...map.values()];
console.log(values);
// @log: [1, 2, 3]
```

### Liệt kê cặp key-value - `Map.prototype.entries()`

Method `entries` trả về iterable object của key và value.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keyValues = [...map.entries()];
console.log(keyValues);
// @log: [["a", 1], ["b", 2], ["c", 3]]
```

### Lặp qua các cặp key-value

`Map` có thể lặp bằng `for...of`. Thứ tự lặp là theo thứ tự đã đăng ký.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);

for (const [key, value] of map) {
  console.log(key, value);
  // Output theo thứ tự "a", 1
  // "b", 2
  // "c", 3
}
```

### Sao chép

Để sao chép (shallow copy) object `Map`, truyền object Map vào constructor Map.

```ts twoslash
const map1 = new Map([["a", 1]]);
const map2 = new Map(map1);
console.log(map2);
// @log: Map (1) {"a" => 1}
```

## Map không thể chuyển trực tiếp thành JSON

Khi đưa object `Map` qua JSON.stringify, các phần tử đã đăng ký sẽ không trở thành JSON.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
console.log(JSON.stringify(map));
// @log: "{}"
```

Khi muốn chuyển `Map` thành JSON, cần chuyển thành object trước.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const obj = Object.fromEntries(map);
console.log(JSON.stringify(obj));
// @log: "{"a":1,"b":2,"c":3}"
```

## Tương tác với các kiểu khác

### Chuyển Map thành mảng

Sử dụng spread syntax với `Map<K, V>` sẽ được mảng tuple type `[K, V][]`.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const keyValues = [...map];
console.log(keyValues);
// @log: [["a", 1], ["b", 2], ["c", 3]]
```

### Chuyển object thành Map

Để chuyển object thành `Map`, truyền giá trị trả về của `Object.entries` vào constructor Map.

```ts twoslash
const obj = { a: 1, b: 2, c: 3 };
const map = new Map(Object.entries(obj));
console.log(map);
// @log: Map (3) {"a" => 1, "b" => 2, "c" => 3}
```

### Chuyển Map thành object

Để chuyển Map thành object, truyền object Map vào `Object.fromEntries`.

```ts twoslash
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
const obj = Object.fromEntries(map);
console.log(obj);
// @log: { "a": 1, "b": 2, "c": 3 }
```

## Sự khác biệt giữa Map và object

Về điểm có thể biểu diễn cặp key-value, `Map` và object tương tự nhau, nhưng có các điểm khác biệt sau:

| Điểm khác biệt                    | `Map`               | Object             |
| --------------------------------- | ------------------- | ------------------ |
| Ghi đè prototype key              | Không xảy ra        | Có thể xảy ra      |
| Kiểu có thể dùng làm key          | Bất kỳ kiểu nào     | `string` hoặc `symbol` |
| Thứ tự lặp                        | Theo thứ tự chèn    | Logic phức tạp     |
| Chuyển thành JSON                 | Không thể trực tiếp | Trực tiếp được     |

### Ghi đè prototype key

Object có thể ghi đè key của prototype.

```js twoslash
const obj = {};
console.log(obj.toString);
// @log: function toString() { [native code] }
obj.toString = 1;
console.log(obj.toString);
// @log: 1
```

`Map` không lo ngại ghi đè key của prototype khi set phần tử. Bởi vì phần tử và prototype ở các vùng riêng biệt.

```ts twoslash
const map = new Map<string, any>();
console.log(map.toString);
// @log: function toString() { [native code] }
map.set("toString", 1);
console.log(map.toString);
// @log: function toString() { [native code] }
```

### Kiểu có thể dùng làm key

Kiểu có thể dùng làm key của object là kiểu `string` hoặc kiểu `symbol`. `Map` có thể dùng bất kỳ kiểu nào làm key.

### Thứ tự lặp

Thứ tự lặp qua property của object không phải theo thứ tự viết hoặc thêm vào, mà theo logic phức tạp.

[Cách lặp qua object](../values-types-variables/object/how-to-loop-an-object.md)

Thứ tự lặp qua phần tử của `Map` được đảm bảo theo thứ tự thêm phần tử.

### Chuyển thành JSON

Object có thể chuyển trực tiếp thành JSON bằng `JSON.stringify`. `Map` khi `JSON.stringify` thì phần tử không trở thành JSON. Cần chuyển `Map` thành object trước.

### So sánh cách viết Map và object

`Map` và object có thể thực hiện các thao tác tương tự. Dưới đây là bảng tương ứng:

|                          | `Map`                 | Object                |
| ------------------------ | --------------------- | --------------------- |
| Cách viết type annotation | `Map<K, V>`           | `Record<K, V>`        |
| Khởi tạo                 | `new Map([["a", 1]])` | `{ a: 1 }`            |
| Set phần tử              | `map.set(key, value)` | `obj[key] = value`    |
| Lấy giá trị              | `map.get(key)`        | `obj[key]`            |
| Xóa phần tử              | `map.delete(key)`     | `delete obj.key`      |
| Kiểm tra key             | `map.has(key)`        | `key in obj`          |
| Lấy số lượng phần tử     | `map.size`            | `Object.keys(obj).length` |
| Xóa tất cả phần tử       | `map.clear()`         | -                     |
| Liệt kê key              | `map.keys()`          | `Object.keys(obj)`    |
| Liệt kê value            | `map.values()`        | `Object.values(obj)`  |
| Liệt kê phần tử          | `map.entries()`       | `Object.entries(obj)` |
| Sao chép                 | `new Map(map)`        | `{ ...obj }`          |

[Record<Keys, Type>](../type-reuse/utility-types/record.md)

<PostILearned>

Map là built-in API của JS để xử lý cặp key-value
Type annotation trong TypeScript: Map<string, number>
Key được so sánh bằng strict equality
Map không thể chuyển trực tiếp thành JSON

Sự khác biệt giữa Map và object
→ Map có thể dùng bất kỳ kiểu nào làm key
→ Map đảm bảo thứ tự key theo thứ tự chèn

</PostILearned>
