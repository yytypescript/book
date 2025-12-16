# Không nên sử dụng var nữa

`var` là cách khai báo biến cũ. `var` có một số vấn đề. Để giải quyết những vấn đề đó, `let` và `const` đã được giới thiệu trong ES2015. Ở đây, chúng ta sẽ giải thích về `var` và các vấn đề của nó. Khi viết code mới, khuyến nghị sử dụng `let` và `const` thay vì `var`.

## Khai báo biến với var

Bạn có thể khai báo biến bằng `var` như sau:

```js twoslash
var name = "tuan";
```

Bạn cũng có thể khai báo biến mà không cần giá trị khởi tạo. Trong trường hợp đó, giá trị của biến là `undefined`.

```js twoslash
var name;
```

## Các vấn đề của var

Khai báo biến bằng `var` có một số hành vi cần chú ý.

### Khai báo biến cùng tên

Với `var`, khi khai báo biến cùng tên, không có lỗi xảy ra và biến được khai báo sau sẽ có hiệu lực. Điều này có thể vô tình ghi đè biến hiện có và tạo ra kết quả không mong muốn.

```js twoslash
function test() {
  var x = 1;
  var x = 2;
  console.log(x);
}
```

Với `let` và `const`, khai báo biến cùng tên sẽ gây ra lỗi.

```ts twoslash
let x = 1;
let x = 2;
// @error: SyntaxError: Identifier 'x' has already been declared

const y = 1;
const y = 2;
// @error: SyntaxError: Identifier 'y' has already been declared
// @noErrors
```

### Ghi đè biến global

Khi `var` được định nghĩa như biến global, nó trở thành property của object `window`, có nguy cơ ghi đè các property hiện có.

Ví dụ, nếu bạn định nghĩa biến `innerWidth` như biến global trên trình duyệt, API tiêu chuẩn `window.innerWidth` sẽ bị ghi đè, khiến cho dù có thay đổi kích thước trình duyệt, giá trị trả về vẫn luôn giống nhau.

```js twoslash
var innerWidth = 10;
console.log(window.innerWidth);
// @log: 10
```

`let` và `const` không được định nghĩa trong scope global, nên không có nguy cơ vô tình ghi đè property của object `window`.

```ts twoslash
const innerWidth = 10;
console.log(window.innerWidth);
// @log: 500
// @noErrors
```

[Scope của biến](../statements/variable-scope.md)

### Hoisting của biến

Trong JavaScript, các biến được khai báo sẽ được tạo ở đầu scope. Điều này được gọi là **hoisting của biến**. Biến được khai báo bằng `var` sẽ được tạo ở đầu scope và được khởi tạo với giá trị `undefined`. Trong ví dụ sau, tham chiếu đến biến `greeting` không gây lỗi mà trả về `undefined`.

```ts twoslash
console.log(greeting);
// @log: undefined
var greeting = "Xin chào";

// ↓ Do hoisting, thực tế code chạy như sau

// @noErrors
var greeting;
console.log(greeting);
// @log: undefined
greeting = "Xin chào";
```

Với hoisting của `var`, không có lỗi tham chiếu, nên có nguy cơ vô tình tham chiếu giá trị `undefined` và gây ra bug không mong muốn.

Với `let` và `const`, tham chiếu đến biến trước khi khai báo sẽ gây ra `Reference Error`.

```ts twoslash
console.log(x);
// @errors: 2448 2454
let x = 1;

console.log(y);
// @errors: 2448 2454
const y = 2;
```

Tuy nhiên, điều cần lưu ý là **hoisting vẫn xảy ra** với `let` và `const`. Vậy tại sao `Reference Error` lại xảy ra?

Với `var`, khi hoisting xảy ra, biến được **khởi tạo với `undefined`**, cho phép tham chiếu giá trị. Ngược lại, với `let` và `const`, dù hoisting xảy ra, **biến không được khởi tạo** cho đến khi được đánh giá. Do đó, Reference Error xảy ra vì tham chiếu đến biến chưa được khởi tạo.

Trong ví dụ sau, nếu hoisting không xảy ra với `let` hay `const`, tại thời điểm đánh giá `console.log(x)`, biến `var x = 1` được khai báo ở đầu function sẽ được tham chiếu và output `1`. Tuy nhiên, thực tế biến `x` được khai báo bằng `let` được tạo trong block scope ở trạng thái chưa khởi tạo, gây ra Reference Error khi tham chiếu đến `x` chưa khởi tạo.

```ts twoslash
// @errors: 2448 2454
function output() {
  var x = 1;
  {
    console.log(x);
    let x = 2;
  }
}

output();
```

### Scope

Trong JavaScript, scope của biến được khai báo bằng `var` là function, nên dù khai báo biến trong `{}`, biến `x` được định nghĩa ban đầu vẫn bị ghi đè.

<!--prettier-ignore-->
```ts twoslash
function print() {
  var x = 1;
  if (true) {
    var x = 2;
    console.log(x);
// @log: 2
  }
  console.log(x);
// @log: 2
}
```

Scope của `let` và `const` là block scope. Trong ví dụ sau, với `var` biến `x` bị ghi đè, nhưng ở đây chúng được định nghĩa như các biến khác nhau trong block scope.

<!--prettier-ignore-->
```ts twoslash
function print() {
  const x = 1;
  if (true) {
    const x = 2;
    console.log(x);
// @log: 2
  }
  console.log(x);
// @log: 1
}
```
