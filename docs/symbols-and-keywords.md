# Chỉ mục: Ký hiệu và từ khóa

Trong code JavaScript và TypeScript có sử dụng các ký hiệu như `?.` và từ khóa như `as`. Các ký hiệu và từ khóa như vậy rất khó tìm kiếm trên Google, việc tra cứu ý nghĩa của chúng không hề dễ dàng.

Chỉ mục này giúp bạn tra cứu tên và ý nghĩa của các ký hiệu và từ khóa trong JavaScript và TypeScript. Khi đọc code mà gặp phải ký hiệu hoặc từ khóa không biết, hãy sử dụng đây làm manh mối để tra cứu ý nghĩa và cách sử dụng.

Các ký hiệu và từ khóa được đề cập ở đây bao gồm cả những thứ có nguồn gốc từ JavaScript (có thể sử dụng chung cho cả JavaScript và TypeScript) và những thứ chỉ có thể sử dụng trong TypeScript. Những thứ có nguồn gốc từ JavaScript được đánh dấu ![js], những thứ riêng của TypeScript được đánh dấu ![ts].

<!--
:::Ghi chú cho người biên tập:::
Ký hiệu được sắp xếp theo thứ tự ASCII code.
Từ khóa được sắp xếp theo thứ tự alphabet.
-->

[js]: /img/js.svg
[ts]: /img/ts.svg

## Ký hiệu

### `!` Toán tử phủ định logic (logical not operator) ![js]

Đảo ngược giá trị truthy và falsy.

### `!` Non-null assertion (non-null assertion operator) ![ts]

Khai báo rằng giá trị không phải null hoặc undefined, yêu cầu compiler hiểu giá trị là non-null.

```ts twoslash
function firstChar(text: string | undefined) {
  // Không gây lỗi compile
  return text!.charAt(0);
}
```

### `!` Toán tử definite assignment assertion (definite assignment assertion operator) ![ts]

Ký hiệu để báo cho compiler biết rằng property của class đã được gán giá trị đúng kiểu như được chỉ định trong type annotation.

```ts twoslash
class Example {
  public foo!: number;
}
```

Hoặc là ký hiệu để báo cho compiler biết rằng biến đã được gán giá trị đúng kiểu như được chỉ định trong type annotation.

```ts twoslash
let numbers!: number[];
```

[definite assignment assertion](./reference/values-types-variables/definite-assignment-assertion.md)

### `!!` Double Bang ![js]

Double bang không phải là toán tử được định nghĩa trong JavaScript, mà là idiom sử dụng hai toán tử phủ định logic liên tiếp. Được sử dụng để kiểm tra xem giá trị có truthy hay không.

### `!=` Toán tử bất đẳng (inequality operator) ![js]

Kiểm tra xem giá trị bên trái và bên phải có khác nhau không. Nếu kiểu khác nhau sẽ được chuyển đổi kiểu rồi so sánh.

```js twoslash
"1" != 1;
// @log: false
```

### `!==` Toán tử bất đẳng nghiêm ngặt (strict inequality operator) ![js]

Kiểm tra xem giá trị bên trái và bên phải có khác nhau không, bao gồm cả kiểu.

```js twoslash
1 !== "1";
// @log: true
```

### `"` String literal (string literal) ![js]

Ký hiệu được sử dụng để bắt đầu và kết thúc string literal như `"foo"`.

### `#` Private property (private property) ![js]

Trong các property của class, những property bắt đầu bằng `#` sẽ là private.

```js twoslash
class ExampleClass {
  #privateField;
  #privateMethod() {}
  static #PRIVATE_STATIC_FIELD;
  static #privateStaticMethod() {}
}
```

### `$` Biến dollar (dollar variable) ![js]

Theo quy ước, đôi khi được sử dụng làm biến trong các thư viện như jQuery. Khi `$` được sử dụng làm tên biến, trong JavaScript nó không có ý nghĩa đặc biệt nào ngoài việc là một biến.

### `$` Placeholder trong string (placeholder) ![js]

Ký hiệu được sử dụng để mở rộng biến trong template literal.

```js twoslash
const name = "John";
console.log(`Hi, ${name}.`);
// @log: "Hi, John."
```

### `%` Toán tử chia lấy dư (reminder operator) ![js]

Tính phần dư khi chia giá trị bên trái cho giá trị bên phải.

```js twoslash
12 % 5;
// @log: 2
```

### `%=` Gán chia lấy dư (reminder assignment) ![js]

Gán phần dư khi chia giá trị của biến bên trái cho giá trị bên phải vào biến bên trái.

### `&` Bitwise AND (bitwise and) ![js]

Đặt bit thành 1 ở những vị trí mà cả giá trị bên trái và bên phải đều có bit là 1.

```js twoslash
const a = 1;
// @log: 00000001
const b = 5;
// @log: 00000101
console.log(a & b);
// @log: 00000001
// Output: 1
```

### `&` Intersection type (intersection type) ![ts]

Định nghĩa intersection type kết hợp nhiều kiểu.

```ts twoslash
interface Swordsman {
  sword: string;
}
interface Wizard {
  magic: string;
}
type MagicalSwordsman = Swordsman & Wizard;
```

[Intersection type](reference/values-types-variables/intersection.md)

### `&=` Gán bitwise AND (bitwise and assignment) ![js]

Gán kết quả bitwise AND của giá trị biến bên trái và giá trị bên phải vào biến bên trái.

```js twoslash
let a = 1;
// @log: 00000001
const b = 5;
// @log: 00000101
a &= b;
console.log(a);
// @log: 00000001
// Output: 1
```

### `&&` Toán tử AND logic (logical and) ![js]

Nếu giá trị bên trái là truthy thì trả về giá trị bên phải. Nếu không thì trả về giá trị bên trái.

Đặc biệt khi cả hai là giá trị boolean, trả về `true` nếu cả hai đều `true`, ngược lại trả về `false`.

```js twoslash
console.log(true && true);
// @log: true
console.log(true && false);
// @log: false

console.log(1 && "");
// @log: ""
```

### `&&=` Gán AND logic (logical and assignment) ![js]

Gán kết quả AND logic `&&` của biến bên trái và giá trị bên phải vào biến bên trái.

```js twoslash
let a = true;
let b = 1;
a &&= b;

console.log(a);
// @log: 1
```

### `'` String literal (string literal) ![js]

Ký hiệu được sử dụng để bắt đầu và kết thúc string literal như `'foo'`.

### `()` Một phần của hàm thực thi ngay lập tức (IIFE: immediately invoked function expression) ![js]

Cách viết được sử dụng như một phần của IIFE (Immediately Invoked Function Expression) - hàm được thực thi ngay khi định nghĩa. Bản thân IIFE là một design pattern, và `()` trong đó là dấu ngoặc gọi hàm, không phải là toán tử hay cú pháp đặc biệt của JavaScript. IIFE đôi khi được gọi là "hàm thực thi ngay lập tức".

```js
(function () {})();
//              ^^
(function () {})();
//              ^^
(() => {})();
//        ^^
```

### `*` Toán tử nhân (multiplication operator) ![js]

Nhân giá trị bên trái với giá trị bên phải.

### `*` Khai báo generator function (generator) ![js]

Ký hiệu được sử dụng khi khai báo generator function trả về object `Generator`.

```js twoslash
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 2;
}
```

### `*` Biểu thức yield\* (yield) ![js]

Ký hiệu được sử dụng khi viết biểu thức ủy thác cho generator khác.

```js twoslash
function* func1() {
  yield 123;
}

function* func2() {
  yield* func1();
  //   ^Ở đây
}
```

### `*=` Gán nhân (multiplication assignment) ![js]

Gán kết quả nhân giá trị của biến bên trái với giá trị bên phải vào biến bên trái.

### `**` Toán tử lũy thừa (exponentiation) ![js]

Lũy thừa giá trị bên trái với giá trị bên phải.

```js twoslash
2 ** 3;
// @log: 8
```

### `**=` Gán lũy thừa (exponentiation assignment) ![js]

Gán kết quả lũy thừa giá trị của biến bên trái với giá trị bên phải vào biến bên trái.

### `+` Toán tử dương đơn nguyên ![js]

Chuyển đổi thành kiểu number.

```js twoslash
+"1";
// @log: 1
```

### `+` Toán tử cộng (addition operator) ![js]

Cộng hai giá trị.

### `+` Toán tử nối string (concatenation operator) ![js]

Nối hai string.

### `+` Thêm modifier ![ts]

Thêm các modifier như `readonly` hoặc `?`.

Nếu không chỉ định gì thì `+` sẽ được thêm ngầm định, nên có lẽ không có cơ hội thực sự sử dụng `+`.

```ts twoslash
type MyPartial<T> = {
  [k in keyof T]+?: T[k];
};

type MyReadonly<T> = {
  +readonly [k in keyof T]: T[k];
};
```

### `+=` Gán cộng (addition assignment) ![js]

Gán kết quả cộng giá trị của biến bên trái với giá trị bên phải vào biến bên trái.

### `++` Increment (increment) ![js]

Toán tử cộng `1` vào biến.

```js twoslash
let x = 3;
x++;
console.log(x);
// @log: 4
```

### `,` Phân cách argument của hàm ![js]

Ký hiệu được sử dụng để truyền nhiều argument cho hàm hoặc khai báo hàm nhận nhiều argument.

```js twoslash
function plus(x, y, z) {
  return x + y + z;
}
plus(1, 2, 3);
```

### `,` Phân cách phần tử array ![js]

Ký hiệu được sử dụng khi khai báo array có nhiều phần tử.

```js twoslash
const numbers = [1, 2, 3];
```

### `,` Phân cách property của object ![js]

Ký hiệu được sử dụng khi khai báo object có nhiều property.

```js twoslash
const data = {
  property1: 1,
  property2: true,
  property3: "hello",
};
```

### `,` Phân cách phần tử của tuple type ![ts]

Ký hiệu được sử dụng khi khai báo tuple type có nhiều phần tử.

```ts twoslash
type Tuple = [number, string, boolean];
```

### `,` Toán tử phẩy (comma operator) ![js]

Đánh giá các biểu thức từ trái sang phải và trả về giá trị của biểu thức bên phải cùng.

```js twoslash
let x = -1;
const a = (x++, x++, x > 0);
console.log(a);
// @log: true
```

### `-` Toán tử âm đơn nguyên ![js]

Đảo dấu và chuyển đổi thành kiểu number.

```js twoslash
-"1";
// @log: -1
```

### `-` Toán tử trừ (subtraction operator) ![js]

Trừ hai giá trị.

### `-` Xóa modifier ![ts]

Xóa các modifier như `readonly` hoặc `?`.

```ts twoslash
type MyRequired<T> = {
  [k in keyof T]-?: T[k];
};

type Writable<T> = {
  -readonly [k in keyof T]: T[k];
};
```

### `-=` Gán trừ (subtraction assignment) ![js]

Gán kết quả trừ giá trị của biến bên trái cho giá trị bên phải vào biến bên trái.

### `--` Decrement (decrement) ![js]

Toán tử trừ `1` từ biến.

```js twoslash
let x = 3;
x--;
console.log(x);
// @log: 2
```

### `.` Truy cập property (dot operator) ![js]

Ký hiệu được sử dụng khi truy cập property của object.

```js twoslash
const object = { property: 123 };
object.property;
// @log: 123
```

### `...` Spread syntax (spread syntax) ![js]

Cú pháp để chuyển iterable object như array thành argument của hàm.

```js twoslash
function sum(x, y, z) {
  return x + y + z;
}
const numbers = [1, 2, 3];
console.log(sum(...numbers));
// @log: 6
```

Hoặc cú pháp để mở rộng iterable object như array thành các phần tử của array.

```js twoslash
const numbers = [1, 2, 3];
const newNumbers = [0, ...numbers, 4];
console.log(newNumbers);
// @log: [ 0, 1, 2, 3, 4 ]
```

Hoặc cú pháp để mở rộng các property của object.

```js twoslash
const object = { x: 1, y: 2 };
const newObject = { ...object, z: 3 };
console.log(newObject);
// @log: { x: 1, y: 2, z: 3 }
```

### `...` Rest syntax (rest syntax) ![js]

Cú pháp để nhận các argument còn lại của hàm như một array.

```js twoslash
function func(a, b, ...rest) {
  return rest;
}
console.log(func(1, 2, 3, 4, 5));
// @log: [ 3, 4, 5 ]
```

Hoặc cú pháp để lấy các phần tử còn lại của iterable object như array.

```js twoslash
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(rest);
// @log: [ 3, 4, 5 ]
```

Hoặc cú pháp để lấy các property còn lại của object.

```js twoslash
const object = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = object;
console.log(rest);
// @log: { c: 3, d: 4 }
```

### `/` Toán tử chia (division operator) ![js]

Chia giá trị bên trái cho giá trị bên phải.

### `/` Regular expression literal (regular expression literal) ![js]

Ký hiệu được viết trước và sau regular expression literal như `/[0-9]+/`.

### `/=` Gán chia (division assignment) ![js]

Gán kết quả chia giá trị của biến bên trái cho giá trị bên phải vào biến bên trái.

### `//` Comment một dòng (one line comment) ![js]

Ký hiệu biểu thị bắt đầu comment dòng.

### `/*` Comment nhiều dòng (multiline comment) ![js]

Ký hiệu biểu thị bắt đầu comment nhiều dòng.

```js
/*
 Comment
 */
```

### `/**` JSDoc

Theo quy ước, ký hiệu biểu thị bắt đầu documentation comment như JSDoc. Đây không phải là cú pháp của JavaScript hay TypeScript, mà là quy ước sử dụng comment nhiều dòng cho documentation.

### `:` Một phần của object ![js]

Ký hiệu được sử dụng để biểu thị quan hệ key-value của property trong object.

```js twoslash
const object = { a: 1, b: 2, c: 3, d: 4 };
```

### `:` Một phần của toán tử ba ngôi (conditional operator) ![js]

Ký hiệu biểu thị phần else trong toán tử ba ngôi như `a ? b : c`.

### `:` Type annotation (type annotation) ![ts]

Ký hiệu được sử dụng cho type annotation của biến.

```ts twoslash
const variable: number = 20;
```

Hoặc ký hiệu được sử dụng cho type annotation của parameter và return type của hàm.

```ts twoslash
function numberToString(x: number): string {
  return x.toString();
}
```

### `<` Toán tử nhỏ hơn (less than operator) ![js]

Kiểm tra xem giá trị bên trái có nhỏ hơn giá trị bên phải không.

### `<` Generics (generic) ![ts]

Ký hiệu được sử dụng để bắt đầu type argument của generics.

```ts twoslash
function func<T>(x: T) {}
const result = func<string>("hello");
```

[Generics](/reference/generics)

### `<` JSX ![ts]

Ký hiệu xuất hiện ở đầu XML literal được gọi là [JSX](./reference/jsx/README.md).

```tsx twoslash title="Hello.tsx"
function Hello() {
  return <div>HELLO</div>;
}
```

### `<` Type assertion (type assertion) ![ts]

Ký hiệu được sử dụng cho type assertion. Đây là cách viết khác của `as`.

```ts twoslash
let someValue: unknown = "this is a string";
let strLength: number = (<string>someValue).length;
```

### `<=` Toán tử nhỏ hơn hoặc bằng (less than or equal) ![js]

Kiểm tra xem giá trị bên trái có nhỏ hơn hoặc bằng giá trị bên phải không.

### `<<` Toán tử dịch bit trái (left shift operator) ![js]

Dịch bit của giá trị bên trái sang trái một số lượng bằng giá trị bên phải.

```js twoslash
const a = 1;
// @log: 00000001
const b = 3;
console.log(a << b);
// @log: 00001000
// Output: 8
```

### `<<=` Gán dịch trái (left shift assignment) ![js]

Gán kết quả dịch bit của giá trị biến bên trái sang trái một số lượng bằng giá trị bên phải vào biến bên trái.

```js twoslash
let a = 1;
// @log: 00000001
const b = 3;
a <<= b;
console.log(a);
// @log: 00001000
// Output: 8
```

### `=` Toán tử gán (assignment) ![js]

Gán giá trị bên phải vào biến bên trái.

### `==` Toán tử bằng (equality) ![js]

Kiểm tra xem giá trị bên trái và bên phải có bằng nhau không. Nếu kiểu khác nhau sẽ được chuyển đổi kiểu rồi so sánh.

```js twoslash
"1" == 1;
// @log: true
```

### `===` Toán tử bằng nghiêm ngặt (strict equality) ![js]

Kiểm tra xem giá trị bên trái và bên phải có bằng nhau không, bao gồm cả kiểu.

```js twoslash
"1" === 1;
// @log: false
```

### `=>` Một phần của arrow function (arrow function) ![js]

Ký hiệu được viết giữa argument và body của arrow function.

```js twoslash
const increment = (num) => num + 1;
//                 ^^^ argument
//                         ^^^^^^^ function body
```

### `>` Toán tử lớn hơn (greater than) ![js]

Kiểm tra xem giá trị bên trái có lớn hơn giá trị bên phải không.

### `>=` Toán tử lớn hơn hoặc bằng (greater than or equal) ![js]

Kiểm tra xem giá trị bên trái có lớn hơn hoặc bằng giá trị bên phải không.

### `>>` Toán tử dịch bit phải (right shift) ![js]

Dịch bit của giá trị bên trái sang phải một số lượng bằng giá trị bên phải.

```js twoslash
const a = 8;
// @log: 00001000
const b = 3;
console.log(a >> b);
// @log: 00000001
// Output: 1
```

### `>>=` Gán dịch phải (right shift assignment) ![js]

Gán kết quả dịch bit của giá trị biến bên trái sang phải một số lượng bằng giá trị bên phải vào biến bên trái.

### `>>>` Toán tử dịch phải không dấu (unsigned right shift) ![js]

Dịch bit của giá trị bên trái sang phải một số lượng bằng giá trị bên phải. Bit dấu ở bên trái luôn là 0.

```js twoslash
const a = -2;
// @log: 11111111111111111111111111111110
const b = 3;
console.log(a >>> b);
// @log: 00011111111111111111111111111111
// Output: 536870911
```

### `>>>=` Gán dịch phải không dấu (unsigned right shift assignment) ![js]

Gán kết quả dịch bit của giá trị biến bên trái sang phải một số lượng bằng giá trị bên phải vào biến bên trái. Bit dấu ở bên trái luôn là 0.

### `?` Một phần của toán tử ba ngôi (conditional operator) ![js]

Một phần của toán tử ba ngôi `a ? b : c`, ký hiệu được đặt ở cuối biểu thức điều kiện.

### `?` Optional modifier (optional property) ![ts]

Định nghĩa property của object là optional property.

```ts twoslash
interface User {
  name: string;
  // name là bắt buộc
  age?: number;
  // age là tùy chọn
}
const user: User = { name: "taro" };
```

Hoặc làm cho argument của hàm không bắt buộc.

```ts twoslash
function func(x?: number) {}
func();
// Không có x cũng OK
```

### `?.` Optional chaining (optional chaining) ![js]

Khi nguồn truy cập property là `null` hoặc `undefined`, trả về `undefined` mà không gây lỗi.

```js twoslash
const user = null;
console.log(user.name);
// @error: Cannot read property 'name' of null
console.log(user?.name);
// @log: undefined
```

### `??` Nullish coalescing (nullish coalescing operator) ![js]

Khi giá trị bên trái là `null` hoặc `undefined`, trả về giá trị bên phải. Nếu không thì trả về giá trị bên trái.

```js twoslash
console.log(undefined ?? 1);
// @log: 1
console.log(2 ?? 1);
// @log: 2
```

### `??=` Gán nullish coalescing (logical nullish assignment) ![js]

Chỉ khi giá trị của biến bên trái là `null` hoặc `undefined` mới gán giá trị bên phải vào biến bên trái.

```js twoslash
const user1 = { name: undefined };
user1.name ??= "taro";
console.log(user1.name);
// @log: taro

const user2 = { name: "kaori" };
user2.name ??= "taro";
console.log(user2.name);
// @log: kaori
```

### `@` Decorator (decorator) ![ts]

Decorator là thứ thêm annotation vào class hoặc class member, ký hiệu được sử dụng khi dùng decorator.

### `[` Array literal (array literal notation) ![js]

Ký hiệu được sử dụng để bắt đầu array literal như `[1, 2, 3]`.

### `[` Accessor (bracket notation) ![js]

Ký hiệu được sử dụng khi truy cập phần tử của array hoặc property của object.

```js twoslash
const numbers = [1, 2, 3];
numbers[0];
// @log: 1
const object = { a: 1, b: 2 };
object["a"];
// @log: 1
```

### `[` Destructuring assignment của array (destructuring assignment) ![js]

Ký hiệu được sử dụng để bắt đầu destructuring assignment của iterable object như array.

```js twoslash
const numbers = [1, 2, 3];
const [first, ...rest] = numbers;
// Destructuring assignment
console.log(first, rest);
// @log: 1 [ 2, 3 ]

// Destructuring assignment
function func([first, ...rest]) {
  console.log(first, rest);
}
func([1, 2, 3]);
// @log: 1 [ 2, 3 ]
```

### `[` Index signature (index signature) ![ts]

Ký hiệu được sử dụng để bắt đầu index signature.

```ts twoslash
type StringKeysAndStringValues = {
  [key: string]: string;
};
```

[Index signature](reference/values-types-variables/object/index-signature.md)

### `[]` Array type (array type) ![ts]

Ký hiệu được sử dụng để biểu diễn array type.

```ts twoslash
class Foo {}
// ---cut---
let names: string[];
type FooList = Foo[];
```

### `\` Escape sequence trong string (escaping character) ![js]

Ký hiệu được sử dụng để bắt đầu escape sequence trong string.

```js twoslash
const lineBreak = "\n";
```

### `^` Bitwise XOR (bitwise xor) ![js]

Đặt bit thành 1 ở những vị trí mà bit của giá trị bên trái và bên phải khác nhau.

```js twoslash
const a = 1;
// @log: 00000001
const b = 5;
// @log: 00000101
console.log(a ^ b);
// @log: 00000100
// Output: 4
```

### `^=` Gán bitwise XOR (bitwise xor assignment) ![js]

Gán kết quả bitwise XOR của giá trị biến bên trái và giá trị bên phải vào biến bên trái.

### `_` Ký tự phân cách số ![js]

Ký hiệu được sử dụng làm dấu phân cách hàng để tăng khả năng đọc số.

```js twoslash
const hyakuman = 1_000_000;
```

### `_` Biến underscore ![js]

Theo quy ước, đôi khi được sử dụng làm biến trong các thư viện như lodash. Khi `_` được sử dụng làm tên biến, trong JavaScript nó không có ý nghĩa đặc biệt nào ngoài việc là một biến.

Ngoài ra, theo quy ước đôi khi được sử dụng làm nơi nhận biến không dùng. Ví dụ, trong callback function nhận 2 argument mà chỉ dùng argument thứ hai, có code sử dụng underscore cho argument thứ nhất.

```js twoslash
[1, 2, 3].map((_, index) => {
  //  _ là giá trị phần tử như 1, 2, 3. Đặt _ để biểu thị không sử dụng nó
});
```

### `` ` `` Template literal (template literal) ![js]

Ký hiệu được đặt trước và sau template literal (template string).

```js
`string text`;
```

### `{` Block statement (block) ![js]

Ký hiệu được sử dụng kèm với các cú pháp như if statement hoặc for statement.

```js twoslash
let isOK = false;
// ---cut---
if (isOK) {
  // ...
} else {
  // ...
}
```

Block statement không đi kèm với cú pháp như if hoặc for đôi khi chỉ nhằm mục đích tách biệt scope của biến.

```js twoslash
{
  const value = 1;
}
{
  const value = 2;
  // Khởi tạo với cùng tên biến như trên, nhưng không lỗi vì scope khác nhau.
}
```

### `{` Destructuring assignment của object (destructuring assignment) ![js]

Ký hiệu được sử dụng cho destructuring assignment của object.

```js twoslash
const object = { a: 1, b: 2, c: 3, d: 4 };
const { a, b, ...rest } = object; // Destructuring assignment
console.log(a, b, rest);
// @log: 1 2 { c: 3, d: 4 }

// Destructuring assignment
function func({ a, b, ...rest }) {
  console.log(a, b, rest);
}
func(object);
// @log: 1 2 { c: 3, d: 4 }
```

### `|` Bitwise OR (bitwise or) ![js]

Đặt bit thành 1 ở những vị trí mà một trong hai giá trị bên trái hoặc bên phải có bit là 1.

```js twoslash
const a = 0b010;
const b = 0b101;
console.log((a | b) === 0b111);
// @log: true
```

### `|` Union type (union type) ![ts]

Định nghĩa union type kết hợp nhiều kiểu.

```ts twoslash
type ID = string | number;
const id1 = "e29b41"; // OK
const id2 = 100; // OK
const id3 = true; // ERROR
```

### `|=` Gán bitwise OR (bitwise or assignment) ![js]

Gán kết quả bitwise OR của giá trị biến bên trái và giá trị bên phải vào biến bên trái.

### `||` Toán tử OR logic (logical or) ![js]

Nếu giá trị bên trái là truthy thì trả về nó. Nếu không thì trả về giá trị bên phải.

Đặc biệt với giá trị boolean, trả về `true` nếu ít nhất một cái là `true`, ngược lại trả về `false`.

```js twoslash
console.log(true || false);
// @log: true
console.log(false || false);
// @log: false

console.log(false || "abc");
// @log: "abc"
```

### `||=` Gán OR logic (logical or assignment) ![js]

Gán kết quả OR logic `||` của biến bên trái và giá trị bên phải vào biến bên trái.

```js twoslash
let a = false;
let b = 1;
a ||= b;
console.log(a);
// @log: 1
```

### `~` Toán tử NOT bitwise (bitwise not) ![js]

Đảo ngược các bit.

```js twoslash
const a = 1;
// @log: 00000001
console.log(~a);
// @log: 11111110
// Output: -2
```

### `~~` Double Tilde ![js]

Là idiom sử dụng hai toán tử NOT bitwise để loại bỏ phần thập phân. Đây không phải là toán tử trong JavaScript mà là quy ước. Kết quả của double tilde giống với `Math.floor` cho số dương và giống với `Math.ceil` cho số âm.

```js twoslash
~~1.5;
// @log: 1
Math.floor(1.5);
// @log: 1
Math.ceil(1.5);
// @log: 2

~~-1.5;
// @log: -1
Math.floor(-1.5);
// @log: -2
Math.ceil(-1.5);
// @log: -1
```

## Từ khóa

### `as` Type assertion (type assertion) ![ts]

Từ khóa được sử dụng cho "type assertion" để ghi đè kiểu mà TypeScript compiler đã suy luận.

### `as const` Const assertion (const assertion) ![ts]

Khai báo giá trị hardcode trong biến là literal type của nó và làm cho nó chỉ đọc.

```ts twoslash
let hello = "hello";
//      ^?
let bye = "bye" as const;
//  ^?
const wolf = { caniformia: "Wolf" };
//    ^?
const fox = { caniformia: "Fox" } as const;
//    ^?
```

### `const` const ![js]

Khai báo hằng số có block scope. Không thể gán lại hoặc khai báo lại trong scope.

### `get` Getter (get) ![js]

Khi property của object được tham chiếu, hàm tương ứng được gọi.

```js twoslash
const exam = {
  scores: [50, 70, 90, 80, 100, 60],
  get best() {
    return Math.max(...this.scores);
  },
};

console.log(exam.best);
// @log: 100
```

### `in` Toán tử in (in operator) ![js]

Toán tử trả về `true` nếu property có trong object.

```js twoslash
const book = { name: "Survival TypeScript" };
console.log("name" in book);
// @log: true
console.log("price" in book);
// @log: false
```

### `in` Cú pháp for-in ![js]

Cú pháp for-in để lặp qua các enumerable property của object.

```js twoslash
const drink = { name: "Coffee", price: 500 };
for (const property in drink) {
  console.log(property);
}
```

### `in` Mapped Types ![ts]

`in` xuất hiện trong Mapped Types.

```ts twoslash
type MappedType = {
  [key in "foo" | "bar"]: string;
};
```

[Mapped Types](reference/type-reuse/mapped-types.md)

### `is` Một phần của type assertion function (user-defined type guard) ![ts]

Từ khóa được sử dụng trong phần type annotation của return type của type assertion function dùng cho type guard.

```ts twoslash
class Animal {
  public legs: number;

  public constructor(legs: number) {
    this.legs = legs;
  }
}
class Bird extends Animal {}
class Duck extends Bird {}
// ---cut---
function isDuck(animal: Animal): animal is Duck {
  return animal.legs === 2;
}
```

### `keyof` Toán tử kiểu keyof (keyof) ![ts]

Toán tử kiểu trả về tên property từ kiểu object dưới dạng kiểu.

### `n` Bigint literal (bigint literal) ![js]

Ký hiệu biểu thị số là bigint literal.

```js
100n; // bigint 100
```

### `typeof` Toán tử typeof (typeof) ![js]

Trả về string biểu thị kiểu của giá trị được cho.

```js twoslash
console.log(typeof 123);
// @log: "number"
```

### `typeof` Toán tử kiểu typeof (typeof) ![ts]

Toán tử trích xuất kiểu từ biến.

### `set` Setter (set) ![js]

Khi property của object bị thay đổi, hàm tương ứng được gọi.

```js twoslash
const prize = {
  latest: "",
  history: [],
  set winner(winner) {
    this.latest = winner;
    this.history.push(winner);
  },
};

prize.winner = "Stanislas Wawrinka";
prize.winner = "Rafael Nadal Parera";
prize.winner = "Novak Đoković";

console.log(prize.latest);
// @log: "Novak Đoković"
console.log(prize.history);
// @log: [ 'Stanislas Wawrinka', 'Rafael Nadal Parera', 'Novak Đoković' ]
```

### `void` Toán tử void (void) ![js]

Làm cho return value thành `undefined`.

```js twoslash
console.log(void 123);
// @log: undefined
```

### `void` Kiểu void (void) ![ts]

Được sử dụng khi return value là `undefined` hoặc không có.

```ts twoslash
function returnUndefined(num: number): void {
  if (num === 0) {
    return undefined;
  }

  return;
}
```

[Kiểu void](reference/functions/void-type.md)
