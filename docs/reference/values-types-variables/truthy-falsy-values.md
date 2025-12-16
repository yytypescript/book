---
sidebar_label: Giá trị truthy và falsy
---

# Giá trị truthy và falsy

## Muốn thay đổi xử lý theo điều kiện cụ thể

Trong bất kỳ ngôn ngữ nào, đều có lúc muốn xử lý khác đi khi có điều kiện nhất định. Thật ra, không có ngôn ngữ nào không có tính năng này. Đương nhiên, JavaScript cũng có tính năng đó, sử dụng `if`.

```ts twoslash
class Employee {
  isPartTime(): boolean {
    return false;
  }
}

const employee = new Employee();

// ---cut---
if (employee.isPartTime()) {
  // ...
}
```

Lúc này, ai cũng nghĩ method `isPartTime()` trả về giá trị boolean.

## Trong JavaScript, không cần boolean cũng có thể dùng trong if

Tuy nhiên, JavaScript không bị giới hạn như vậy. Trong JavaScript, giá trị (hoặc kết quả phép toán) không nhất thiết phải là kiểu boolean. Vậy, với giá trị nào thì khối `if` được thực thi, ngược lại với giá trị nào thì không?

## Giá trị "giống như" true, false

Trong trường hợp như vậy, giá trị thỏa mãn điều kiện được gọi là truthy, giá trị không thỏa mãn được gọi là falsy. Đây là từ truth (đúng) và false (sai) trong tiếng Anh, thêm hậu tố y biểu thị nuance "giống như".

## Giá trị falsy

Trước hết giải thích về giá trị falsy. Vì giá trị falsy có giới hạn, tất cả giá trị còn lại đều là truthy, nên chỉ cần nhớ những giá trị này.

| Giá trị   | Kiểu      | Ý nghĩa      |
| --------- | --------- | ------------ |
| false     | boolean   | Giá trị sai  |
| 0         | number    | Số 0         |
| 0.0       | number    | Số 0         |
| -0        | number    | Số -0        |
| NaN       | number    | Not a Number |
| 0n        | bigint    | Số nguyên 0  |
| ""        | string    | Chuỗi rỗng   |
| null      | null      | null         |
| undefined | undefined | undefined    |

Khi những giá trị này được đặt trong biểu thức điều kiện của `if`, khối `if` sẽ không được thực thi.

## Vấn đề khi phân nhánh điều kiện bằng giá trị truthy, falsy

Việc dùng những giá trị này trong biểu thức điều kiện của `if` là có thể, nhưng đồng thời có thể bao gồm hành vi không mong muốn nên cần cẩn thận khi sử dụng. Ví dụ, code sau được viết với ý định loại bỏ `null` trong mảng, nhưng kết quả không như mong muốn.

```ts twoslash
const array = [null, 3, 0, null, 1, 2];

console.log(array.filter((n) => n));
// @log: [3, 1, 2]
```

Kết quả `array.filter()` loại bỏ giá trị falsy, không chỉ `null` mà cả `0` - giá trị falsy của kiểu number - cũng bị loại bỏ.

### Để tránh tình huống như vậy

Để tránh phân nhánh không mong muốn, không nên dùng giá trị truthy, falsy trực tiếp như kiểu boolean, mà nên trả về giá trị true, false rõ ràng.

```ts twoslash
const array = [null, 3, 0, null, 1, 2];

console.log(array.filter((n) => n !== null));
// @log: [3, 0, 1, 2]
```

## TypeScript ESLint cũng có option cho vấn đề này

ESLint của TypeScript cũng có option cảnh báo khi khối `if` nhận kiểu không phải boolean.

[strict-boolean-expression](https://typescript-eslint.io/rules/strict-boolean-expressions/)

Tuy nhiên, option này cũng không cảnh báo với ví dụ `array.filter()` nên cần cẩn thận.
