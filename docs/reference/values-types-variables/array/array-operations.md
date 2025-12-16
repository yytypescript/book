# Thao tác phá hủy của array

Các method của array trong JavaScript có 2 loại: method phá hủy (destructive) và method không phá hủy (non-destructive). Đặc biệt, cần sử dụng cẩn thận các method phá hủy.

## Method không phá hủy

Method **không** phá hủy là method không thay đổi array. Ví dụ, `concat` là method không phá hủy. Đây là method nối nhiều array. Nó không thay đổi array gốc mà trả về array mới.

```ts twoslash
const nums1 = [1, 2];
const nums2 = [3, 4];
const all = nums1.concat(nums2);
console.log(nums1);
// @log: [ 1, 2 ]
console.log(nums2);
// @log: [ 3, 4 ]
console.log(all);
// @log: [ 1, 2, 3, 4 ]
```

## Danh sách method không phá hủy

Các method không phá hủy bao gồm:

| Method                                                                                                            | Thao tác                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)           | Trả về array kết hợp từ 2 array trở lên                                                        |
| [find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)               | Trả về phần tử đầu tiên trong array thỏa mãn hàm test                                          |
| [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)     | Trả về vị trí của phần tử đầu tiên trong array thỏa mãn hàm test                               |
| [lastIndexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf) | Trả về index cuối cùng tìm thấy phần tử cho trước trong array                                  |
| [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)             | Cắt và trả về một phần của array                                                               |
| [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)       | Trả về `true` hoặc `false` tùy thuộc array có chứa phần tử cho trước hay không                 |
| [indexOf](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)         | Trả về index của phần tử đầu tiên có nội dung giống argument                                   |
| [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)               | Trả về string nối tất cả phần tử                                                               |
| [keys](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys)               | Trả về các index của array dưới dạng Array Iterator object                                     |
| [entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)         | Trả về cặp index và value của array dưới dạng Array Iterator object                            |
| [values](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/values)           | Trả về các value của array dưới dạng Array Iterator object                                     |
| [forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)         | Thực thi hàm cho trước một lần cho mỗi phần tử của array                                       |
| [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)           | Trả về array mới gồm tất cả phần tử pass test được implement bởi hàm cho trước                 |
| [flat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)               | Trả về array mới với tất cả phần tử sub-array được nối đệ quy theo độ sâu chỉ định             |
| [flatMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)         | Map từng phần tử bằng mapping function rồi flatten kết quả vào array mới                       |
| [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)                 | Gọi hàm cho trước với tất cả phần tử của array và trả về array mới từ kết quả                  |
| [every](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)             | Test xem tất cả phần tử trong array có pass test được implement bởi hàm chỉ định hay không     |
| [some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)               | Test xem ít nhất một phần tử của array có pass test được implement bởi hàm chỉ định hay không  |
| [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)           | Gọi callback function "reduce" do user cung cấp cho từng phần tử của array                     |
| [reduceRight](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight) | Áp dụng hàm cho accumulator và từng value của array (từ phải sang trái) để tạo thành một value |

## Method phá hủy

Method phá hủy là method thay đổi nội dung hoặc thứ tự phần tử của array. Ví dụ, `push` là một trong các method phá hủy. Nó thêm phần tử vào cuối array.

```ts twoslash
const nums = [1, 2];
nums.push(3);
console.log(nums);
// @log: [ 1, 2, 3 ]
```

## Danh sách method phá hủy

Các method phá hủy bao gồm:

| Method                                                                                                          | Thao tác                                                                                 |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)             | Thêm phần tử vào cuối array                                                              |
| [unshift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)       | Thêm phần tử vào đầu array                                                               |
| [pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)               | Xóa phần tử cuối cùng của array và trả về phần tử đó                                     |
| [shift](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)           | Xóa phần tử đầu tiên của array và trả về phần tử đó                                      |
| [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)         | Xóa, thay thế hoặc thêm phần tử mới                                                      |
| [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)             | Sắp xếp các phần tử của array                                                            |
| [reverse](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)       | Đảo ngược thứ tự các phần tử của array                                                   |
| [fill](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)             | Thay đổi tất cả phần tử từ index bắt đầu đến index kết thúc thành một giá trị cố định    |
| [copyWithin](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin) | Shallow copy một phần của array sang vị trí khác trong cùng array mà không thay đổi size |

## Method phá hủy cần đặc biệt chú ý

Method `reverse` trả về array đã đảo ngược. Vì có giá trị trả về nên nhìn qua có vẻ là method **không** phá hủy. Tuy nhiên, cần chú ý vì method này cũng đảo ngược thứ tự của array gốc.

```ts twoslash
const nums = [1, 2, 3];
const newNums = nums.reverse();
console.log(nums);
// @log: [ 3, 2, 1 ]
console.log(newNums);
// @log: [ 3, 2, 1 ]
```

Hàm `array_reverse` của PHP có tên giống với method `reverse` của JavaScript, nhưng phía PHP là thao tác **không** phá hủy. Nó tạo và trả về array mới được sắp xếp ngược mà không thay đổi array gốc.

```php title="array_reverse của PHP"
$nums = [1, 2, 3];
$reversedNums = array_reverse($nums);
var_dump($nums);
//=> [1, 2, 3]
var_dump($reversedNums);
//=> [3, 2, 1]
```

Như vậy, có những thao tác array không phá hủy ở ngôn ngữ khác nhưng lại là thao tác phá hủy trong JavaScript. Không nên chỉ dựa vào tên method để phán đoán là phá hủy hay không phá hủy, cần xác nhận cách sử dụng của từng method.

## Cách sử dụng an toàn method phá hủy

Để sử dụng method phá hủy một cách **không** phá hủy, hãy copy array sang array khác trước khi thực hiện thao tác phá hủy. Sử dụng spread syntax `...` để copy array.

[Spread syntax](./spread-syntax-for-array.md)

Nếu thực hiện thao tác phá hủy trên array đã copy, không cần lo lắng array gốc bị thay đổi.

```ts twoslash
const original = [1, 2, 3];
const copy = [...original]; // Tạo bản copy
copy.reverse();
console.log(original); // Không bị ảnh hưởng bởi thao tác phá hủy
// @log: [ 1, 2, 3 ]
console.log(copy);
// @log: [ 3, 2, 1 ]
```

Ví dụ `reverse` này có thể viết gọn việc copy và gọi method phá hủy trên 1 dòng.

```ts twoslash {2}
const original = [1, 2, 3];
const reversed = [...original].reverse();
console.log(original);
// @log: [ 1, 2, 3 ]
console.log(reversed);
// @log: [ 3, 2, 1 ]
```

<PostILearned>

・Các method của array trong JavaScript có loại phá hủy và không phá hủy
・Loại phá hủy thay đổi array
・Loại không phá hủy không thay đổi array
・Cần chú ý vì có method tưởng không phá hủy nhưng thực tế là phá hủy
・Copy array trước rồi thực hiện thao tác phá hủy sẽ an toàn

</PostILearned>
