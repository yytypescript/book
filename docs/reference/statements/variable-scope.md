---
sidebar_label: 変数のスコープ
---

# Variable scope (scope)

Scope là phạm vi hiệu lực của biến, xác định biến có thể được tham chiếu từ đâu. Trong JavaScript có 2 loại scope chính là global scope và local scope.

## Global scope

Global scope là biến có thể được tham chiếu từ bất kỳ đâu trong chương trình. Trong JavaScript, có duy nhất một object được gọi là global object. Trong trình duyệt, object `window` là global object.

Biến global trở thành property của global object. Trong trình duyệt, nghĩa là trở thành property của object `window`. Các built-in API như class `Date` cho ngày tháng hay object `console` dùng cho debug đều là property của object `window`. Truy cập vào biến global có thể bỏ qua window.

```js twoslash
Date === window.Date; //=> true
console === window.console; //=> true
```

Khai báo biến bằng `var` ngoài local scope sẽ trở thành biến global. Tuy nhiên, cuốn sách này không khuyến khích sử dụng `var`.

[varはもう使わない](../values-types-variables/vars-problems.md)

## Local scope

Local scope là variable scope chỉ có hiệu lực trong một phạm vi nhất định.

### Function scope

Function scope là phạm vi chỉ có thể tham chiếu trong hàm. Biến được khai báo trong hàm không thể tham chiếu từ bên ngoài hàm.

```js twoslash
function func() {
  const variable = 123;
  return variable; // Có thể tham chiếu
}
console.log(variable); // Không thể tham chiếu
```

### Lexical scope

Lexical scope là các biến bên ngoài hàm mà có thể tham chiếu từ điểm định nghĩa hàm.

```js twoslash
const x = 100;

function a() {
  console.log(x); // Có thể thấy biến bên ngoài hàm
}

a();
// @log: 100
```

### Block scope

Block scope là scope chỉ có hiệu lực trong phạm vi được bao bọc bởi dấu ngoặc nhọn `{ }`. Biến trong block scope không thể tham chiếu từ bên ngoài block.

<!--prettier-ignore-->
```js twoslash
{
  const x = 100;
  console.log(x);
// @log: 100
}
console.log(x); // Không thể tham chiếu x
// @error: ReferenceError: x is not defined
```

Block scope cũng áp dụng cho dấu ngoặc nhọn trong câu lệnh if. Cần chú ý rằng biến được khai báo trong điều kiện phân nhánh không thể tham chiếu từ bên ngoài điều kiện phân nhánh.

```js twoslash
if (navigator.userAgent.includes("Firefox")) {
  const browser = "Firefox";
} else {
  const browser = "Không phải Firefox";
}
console.log(browser); // Không thể tham chiếu và gây lỗi
```

Ví dụ trên cần viết lại để khai báo biến bên ngoài block scope.

```js twoslash
let browser;
if (navigator.userAgent.includes("Firefox")) {
  browser = "Firefox";
} else {
  browser = "Không phải Firefox";
}
console.log(browser); // OK
```

## Gán vào biến global không mong muốn

Trong JavaScript có thể xảy ra sự cố là định gán vào biến local scope nhưng lại gán vào biến global. Khi khai báo biến local, sử dụng `let` hoặc `const`, nhưng nếu quên viết chúng, việc gán biến sẽ trở thành biến global.

```js twoslash
function func() {
  foo = "Định là biến local";
}
func();
console.log(window.foo);
// @log: "Định là biến local"
```

Khi xử lý biến trong JavaScript, cần chú ý để không vô tình tạo biến global. Ngược lại, trong TypeScript, khi cố gán vào biến chưa được khai báo, compiler sẽ chỉ ra.

```ts twoslash
// @errors: 2304
function func() {
  foo = "Định là biến local";
}
```

Gán vào biến global không mong muốn có thể nói là đặc tả đáng tiếc của JavaScript, nhưng khi sử dụng TypeScript, những vấn đề như vậy cũng dễ phát hiện hơn.
