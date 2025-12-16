# Sự khác biệt giữa traditional function và arrow function

Function trong JavaScript có thể được tạo bằng 3 cách: [function declaration], [function expression], và [arrow function].

[function declaration]: ./function-declaration.md
[function expression]: ./function-expression.md
[arrow function]: ./arrow-functions.md

## Arrow function ra đời sau

Nhìn lại lịch sử JavaScript, ban đầu chỉ có function declaration và function expression. Hai cách này hầu như không có sự khác biệt về chức năng. Chúng được gọi chung là "traditional function". Arrow function được giới thiệu sau để giải quyết các vấn đề của traditional function.

## Tính ngắn gọn của cú pháp

Traditional function có vấn đề về độ dài cú pháp. Trong JavaScript, chúng ta thường viết callback function. Callback function là function được truyền làm tham số của function khác. Với traditional function, bạn phải viết từ khóa `function` mỗi khi viết function. Ngay cả khi chỉ có 1 dòng xử lý, vẫn có coding style yêu cầu nhiều dòng. Code trở nên rườm rà cả khi viết và khi đọc. Ngược lại, arrow function có cú pháp ngắn gọn và đơn giản.

```js twoslash
// Traditional function (function expression)
[1, 2, 3].map(function (n) {
  return n + 1;
});
// Arrow function
[1, 2, 3].map((n) => n + 1);
```

## Arrow function được thiết kế lại bằng cách loại bỏ

Khi nghe arrow function ra đời sau, bạn có thể nghĩ rằng nó có thêm tính năng so với traditional function. Thực ra là ngược lại. Arrow function được thiết kế lại bằng approach loại bỏ. Nó loại bỏ các tính năng thừa đối với function hoặc đơn giản hóa các đặc tả phức tạp từ traditional function. Do đó, nó trở nên đơn giản hơn và "bản chất function" nổi bật hơn. Hãy xem những tính năng nào đã được loại bỏ.

### Constructor

Bản chất của function là nhận input và trả về kết quả tính toán. Traditional function trong JavaScript không chỉ có bản chất này mà còn đảm nhận vai trò constructor để tạo object. Để sử dụng function như constructor, bạn dùng toán tử `new`.

```js twoslash
function Cat(name) {
  this.name = name;
}
// Tạo object Cat
const cat = new Cat("Mimi");
console.log(cat);
// @log: Cat { name: 'Mimi' }
```

Thoạt nhìn, việc function có tính năng constructor có vẻ tiện lợi. Tuy nhiên, điều này khiến người sử dụng phải quyết định có nên thêm toán tử `new` vào function hay không. Để quyết định điều đó, bạn phải đọc nội dung xử lý của function. Nếu gọi function nên được thực thi như constructor bằng cách gọi bình thường có thể dẫn đến bug.

Arrow function không thể trở thành constructor. Nếu dùng toán tử `new` trong JavaScript, sẽ xảy ra lỗi runtime. Không có lo ngại về việc sử dụng sai.

```js twoslash
const Cat = (name) => {};
const cat = new Cat("Mimi");
// @error: TypeError: Cat is not a constructor
```

Trong TypeScript, ngay cả traditional function cũng không thể được sử dụng như constructor. Nếu bạn nhầm lẫn `new` function, bạn sẽ được cảnh báo bằng compile error nên yên tâm.

```ts twoslash
// @errors: 7009
function Cat(name: string) {
  /* ... */
}
const cat = new Cat("Mimi");
```

Tóm lại, trong JavaScript bạn cần chú ý đến việc có thể trở thành constructor hay không, nhưng trong TypeScript bạn có thể nhận ra qua compile error nên không cần chú ý nhiều như JavaScript.

### `this` trỏ đến gì

Với traditional function, có đặc tả là biến `this` trỏ đến thứ gì đó được xác định bởi context runtime. Nói cách khác, ngay cả với cùng một function, `this` có thể tham chiếu đến những thứ khác nhau tùy theo cách gọi function hoặc môi trường gọi. Hãy xem ví dụ về traditional function hiển thị `this` ra console.

```js twoslash
function showThis() {
  console.log(this);
}
```

Khi thực thi function `showThis` này bình thường, `this` trỏ đến global object. Global object trong browser là object `Window`. Object `Window` cung cấp API để thao tác kích thước trang, URL, HTML hiển thị (DOM), v.v.

```js twoslash
showThis();
// @log: Window
```

JavaScript có strict mode. Đây là execution mode hạn chế các xử lý nguy hiểm. Để bật strict mode, viết `"use strict"` ở đầu code. Khi thực thi `showThis` trong strict mode, giá trị `this` trở thành `undefined`.

```js twoslash
"use strict";
showThis();
// @log: undefined
```

Nhân tiện, trong TypeScript, khi bật compiler option [`alwaysStrict`](../tsconfig/alwaysstrict.md), JavaScript sau compile sẽ ở strict mode.

Ngoài ra, JavaScript có script mode và module mode. Trong module mode JavaScript, bạn có thể sử dụng cú pháp `export` và `import`. Mode này tự động ở strict mode. Do đó, khi thực thi `showThis` trong module mode, giá trị `this` là `undefined`.

```js twoslash
export {};
showThis();
// @log: undefined
```

Function cũng có thể được gọi như method của object. Khi gọi function `showThis` như method, giá trị `this` trỏ đến là object mà method gắn với.

```js twoslash
const foo = { name: "Foo" };
// Đặt function làm member của object
foo.showThis = showThis;
// Gọi như method
foo.showThis();
// @log: {name: "Foo", showThis: function}
```

Đã giải thích rằng traditional function có thể được gọi như constructor, khi gọi như constructor, `this` trỏ đến object đang được tạo.

```js twoslash
function showThis() {
  this.name = "Foo";
  console.log(this);
}
new showThis();
// @log: {name: "Foo"}
```

Như đã minh họa ở trên, với traditional function, nội dung của `this` được xác định động theo context thực thi. Do đó, cần chú ý cách gọi traditional function. Sử dụng sai có thể dẫn đến bug.

<figure><figcaption>this của traditional function trỏ đến gì</figcaption>

| Context                                         | Giá trị this                      |
| ----------------------------------------------- | --------------------------------- |
| Gọi thông thường<br/>`showThis()`               | Global object (`Window`)          |
| Gọi thông thường + strict mode<br/>`showThis()` | `undefined`                       |
| Gọi method<br/>`obj.showThis()`                 | Object mà method thuộc về (`obj`) |
| Gọi constructor<br/>`new showThis()`            | Object đang được tạo              |

</figure>

`this` của arrow function là lexical scope và static. Nghĩa là, thứ mà `this` trỏ đến được xác định khi định nghĩa, không bị ảnh hưởng bởi cách gọi function (context). Giá trị của `this` rõ ràng.

Ví dụ, object `timer` sau có method `start` hiển thị message sau 1 giây. Method `start` đặt lịch xuất giá trị field `message` của `timer` sau 1 giây.

`this` của function `start` trỏ đến `timer` (❶). Sau 1 giây, cố gắng xuất `this.message`. Traditional function có `this` trỏ đến global object `Window`, nên xuất `undefined` (❷). Còn arrow function có `this` trỏ đến `this` của lexical scope (❸). `this` này là `timer`. Do đó, giá trị field `message` `"Time's up!"` được xuất ra đúng.

```js twoslash
const oneSecond = 1000;
const timer = {
  message: "Time's up!",
  start: function () {
    console.log(this); // ❶

    // Traditional function
    setTimeout(function () {
      console.log(this.message); // ❷
    }, oneSecond);

    // Arrow function
    setTimeout(() => {
      console.log(this.message); // ❸
    }, oneSecond);
  },
};
timer.start();
```

### Hành vi của `call`, `apply`, `bind`

Function trong JavaScript là object, và có 3 method `call`, `apply`, `bind`. Các method này gọi function, nhưng với traditional function, bạn có thể chỉ định `this` trỏ đến gì qua tham số đầu tiên.

```js twoslash
function showThis() {
  console.log(this);
}
const obj = { name: "foo" };
showThis.bind(obj)(); // bind obj vào this và gọi function
// @log: { name: 'foo' }
```

Arrow function cũng có `call`, `apply`, `bind`, nhưng ngay cả khi truyền giá trị vào tham số đầu tiên, `this` không bị ghi đè.

```js twoslash
const showThis = () => {
  console.log(this);
};
const obj = { name: "foo" };
showThis.bind(obj)();
// @log: {}
```

### Có biến arguments hay không

Với traditional function, biến đặc biệt `arguments` được định nghĩa tự động. Giá trị này là mảng các tham số.

```js twoslash
function foo() {
  console.log(arguments);
}
foo(1, 2, 3);
// @log: [1, 2, 3]
```

`arguments` tiện lợi để thực hiện variadic arguments, nhưng cũng có thể xem nó là biến thừa không được sử dụng trong hầu hết các trường hợp implement function. Arrow function không có `arguments`. Để thực hiện variadic arguments với arrow function, dùng [rest parameter](./rest-parameters.md) `...`.

```js twoslash
const foo = (...args) => {
  console.log(args);
};
foo(1, 2, 3);
// @log: [1, 2, 3]
```

### Generator

JavaScript có generator là function đặc biệt có thể tạo nhiều giá trị. Generator được viết bằng cách thêm dấu hoa thị vào từ khóa `function` và mô tả giá trị tạo ra bằng câu lệnh `yield`.

```js twoslash
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}
```

Giá trị của generator có thể được lấy ra bằng xử lý lặp như for-of.

```js twoslash
for (const value of generateNumbers()) {
  console.log(value); // Xuất theo thứ tự 1, 2, 3
}
```

Chỉ traditional function mới có thể định nghĩa generator. Arrow function không hỗ trợ cú pháp generator từ đầu nên không thể định nghĩa generator.

## Arrow function với tính an toàn được tăng cường

Arrow function đã cải thiện các đặc tả nguy hiểm của traditional function.

### Trùng tên tham số

Traditional function trong JavaScript cho phép trùng tên tham số. Khi tham số trùng, giá trị được truyền cho tham số cuối cùng sẽ được chọn.

```js twoslash
function foo(a, a, a) {
  console.log(a);
}
foo(1, 2, 3);
// @log: 3
```

Đặc tả này dễ gây bug, nhưng với traditional function cũng có thể biến trùng tên tham số thành syntax error bằng cách bật strict mode.

```js twoslash
"use strict";
function foo(a, a) {}
//              ^Syntax error
// @error: SyntaxError: Duplicate parameter name not allowed in this context
```

Khi arrow function được giới thiệu, các đặc tả nguy hiểm như thế này đã được loại bỏ từ đầu. Với arrow function, khi tên tham số trùng, luôn là syntax error bất kể strict mode bật hay tắt.

```js twoslash
const foo = (a, a) => {};
//              ^Syntax error
// @error: SyntaxError: Duplicate parameter name not allowed in this context
```

Trong TypeScript, ngay cả traditional function cũng có lỗi compile khi trùng tên tham số.

```ts twoslash
// @errors: 2300
function foo(a: number, a: number) {}
```

Do đó, trong TypeScript, không có sự khác biệt về an toàn giữa traditional function và arrow function.

### Trùng tên function

Trong JavaScript, khi khai báo biến, bạn dùng một trong `const`, `let`, hoặc `var`. `var` tồn tại từ đầu JavaScript, còn `const` và `let` được thêm vào năm 2015. Sự khác biệt lớn là `const` chỉ có thể gán giá trị khi khai báo, còn `let` có thể thay đổi giá trị sau khi khai báo.

`const` và `let` được giới thiệu để giải quyết vấn đề của `var`. Một trong những vấn đề của `var` là có thể khai báo biến nhiều lần với cùng tên biến. Ví dụ, ngay cả khi biến `value` đã được khai báo, nếu khai báo lại bằng `var value`, nó vẫn thực thi mà không có lỗi.

```js twoslash
var value = 1;
var value = 2;
console.log(value);
// @log: 2
```

Đặc tả này khiến khó nhận ra việc ghi đè biến không mong muốn và thường là nguyên nhân gây lỗi. `const` và `let` sẽ báo lỗi khi tên biến trùng. Nghĩa là, có thể coding an toàn hơn so với `var`.

```js twoslash
// @errors: 2451
let value = 1;
let value = 2; // Syntax error
```

Function được tạo bằng function declaration tương đương với `var`. Do đó, có thể tạo function với tên trùng.

```js twoslash
function foo() {
  console.log("Function thứ nhất");
}
function foo() {
  console.log("Function thứ hai");
}
foo();
// @log: "Function thứ hai"
```

Arrow function được tạo bằng cú pháp giống khai báo biến, nên miễn là coding tránh `var` và dùng `let` hoặc `const`, không thể xảy ra trùng tên function.

```js twoslash
// @errors: 2451
const foo = () => {};
const foo = () => {};
```

Tất nhiên, nếu tạo arrow function bằng `var`, vẫn có thể trùng tên function. Tuy nhiên, trong best practice JavaScript hiện đại, không khuyến khích dùng `var`. Do đó, arrow function giảm thiểu lỗi trùng tên function nhiều hơn so với function declaration trong hầu hết các tình huống.

Trong TypeScript, ngay cả function declaration cũng có lỗi compile khi trùng tên function.

```ts twoslash
// @errors: 2393
function foo() {}
function foo() {}
```

Do đó, về vấn đề trùng tên function, TypeScript không có sự khác biệt về an toàn.

## Hoisting và thứ tự định nghĩa và gọi function

Function declaration và arrow function có sự khác biệt về việc [hoisting](./function-declaration-and-hoisting.md) có xảy ra hay không. Hoisting là đặc tả cho phép tham chiếu biến trong code trước khi biến được khai báo.

Hoisting là đặc tả tự động đưa khai báo biến được khai báo ở giữa variable scope lên đầu variable scope. Biến được hoist sẽ được khởi tạo với `undefined`. Trong ví dụ sau, tham chiếu biến `value` trước khai báo biến `value`, nhưng không có lỗi và xuất `undefined`.

```js twoslash
console.log(value);
// @log: undefined
var value = 1;
```

Đây là do hoisting xảy ra với biến `value`, khai báo `value` được đưa lên trước `console.log(value)`. Code trên thực chất có ý nghĩa giống code sau.

```js twoslash
var value;
console.log(value);
value = 1;
```

Hoisting tương tự cũng xảy ra với function declaration. Điểm khác với hoisting của `var` là function không được khởi tạo với `undefined` mà cả implementation của function cũng được hoist. Do đó, có thể gọi function trước function declaration.

```js twoslash
foo();
// @log: Đã thực thi
function foo() {
  console.log("Đã thực thi");
}
```

Thứ tự viết trong code là gọi function, function declaration, nhưng không có vấn đề gì với hoisting của function.

<PostILearned>

Đặc điểm của arrow function trong JavaScript

・Cú pháp ngắn gọn
・this là lexical scope
・Không thể trở thành constructor
・Không thể trở thành generator
・Không xảy ra trùng tham số
・Khó xảy ra trùng khai báo function
・Khó xảy ra hoisting

</PostILearned>

## Cách sử dụng traditional function và arrow function

Ở trên, chúng ta đã xem sự khác biệt về chức năng giữa traditional function (function declaration và function expression) và arrow function. Dựa trên sự khác biệt, nên dùng cái nào trong hai cái này? Nếu dùng cả hai, nên phân biệt theo tiêu chí nào?

Việc nên dùng traditional function hay arrow function là vấn đề ý kiến khác nhau. Vì arrow function là tính năng mới giải quyết vấn đề của traditional function, có người nghĩ nên dùng arrow function càng nhiều càng tốt. Ngược lại, có người nghĩ nên phân biệt hợp lý giữa function declaration và arrow function. Cũng có người nghĩ nên dùng function declaration tích cực hơn arrow function. Tiêu chí dùng arrow function ở đâu và dùng traditional function ở đâu là vấn đề không có hồi kết. Không thể khẳng định tiêu chí nào là đúng.

Dù vậy, cách phân biệt traditional function và arrow function quan trọng là phải nhất quán trong phạm vi cá nhân hoặc team chia sẻ cùng một source code. Từ đây, tôi muốn đưa ra manh mối để bạn có thể tự suy nghĩ cách phân biệt của riêng mình. Điều tôi trình bày ở đây không nhất thiết đúng phổ biến. Hãy đọc và suy nghĩ cách phân biệt của riêng bạn.

Nếu không có lý do đặc biệt, dùng arrow function sẽ an toàn hơn. Lý do là arrow function là function đơn giản với chức năng tối thiểu của function. Như đã thấy ở trên, traditional function có nhiều tính năng như constructor, giải thích động `this`, v.v., và nếu không dùng các tính năng đó thì chúng trở thành tính năng thừa. Càng nhiều tính năng thì càng phải cân nhắc nhiều khi coding. Arrow function hạn chế ở chức năng tối thiểu nên có ưu điểm là viết mà không cần lo lắng chi tiết.

Arrow function đặc biệt phù hợp với callback function. Ví dụ, object array `Array` có một số method xử lý từng phần tử. Các method này cần truyền function vào tham số. Ví dụ sau dùng method `filter` cho array số để trích xuất chỉ số chẵn. Code này truyền function expression làm callback function.

```js twoslash
const nums = [1, 2, 3, 4];
const even = nums.filter(function (n) {
  return n % 2 === 0;
});
console.log(even);
// @log: [2, 4]
```

Nếu thay bằng arrow function, sẽ trở thành cú pháp đơn giản như sau.

```js twoslash
const nums = [1, 2, 3, 4];
const even = nums.filter((n) => n % 2 === 0);
console.log(even);
// @log: [2, 4]
```

Với callback function như thế này, việc dùng arrow function tích cực sẽ mang lại lợi ích như giảm lượng code viết hoặc làm nổi bật xử lý mà code muốn thực hiện.

Traditional function cũng có chỗ dùng. Khi muốn thực hiện xử lý khi button HTML được click, dùng method `addEventListener`. Bằng cách truyền xử lý tùy ý làm callback function cho method này, có thể thực hiện xử lý mong muốn.

```js twoslash
button.addEventListener("click", callbackFunction);
```

Khi muốn tham chiếu button được click trong xử lý, nếu function được truyền là traditional function, có thể tham chiếu button bằng biến `this`. Ví dụ dưới đây là code thay đổi hiển thị button "Save" đã click thành "Saving...". Thay đổi hiển thị button bằng `this.innerText`. Với cách dùng `this` như thế này, không thể viết bằng arrow function.

```html
<button id="save">Save</button>
<script>
  const button = document.getElementById("save");
  button.addEventListener("click", function () {
    this.innerText = "Saving...";
  });
</script>
```

Ngay cả trong trường hợp trên, nếu tham chiếu `button` thì cũng có thể dùng arrow function. Vì vậy không phải là lý do quyết định phải dùng traditional function.

```html {4-5}
<button id="save">Save</button>
<script>
  const button = document.getElementById("save");
  button.addEventListener("click", () => {
    button.innerText = "Saving...";
    // ^^^Tham chiếu button
  });
</script>
```

Khi tạo function làm method của object, có lý do chọn traditional function. Vì có thể tham chiếu object bằng `this`. Ví dụ, như method `fullName1` trong ví dụ sau, khi method sử dụng property của object, tiện lợi khi tham chiếu bằng `this`.

```js twoslash
const taroYamada = {
  firstName: "Taro",
  lastName: "Yamada",
  // Traditional function
  fullName1: function () {
    return this.firstName + " " + this.lastName;
  },
  // Arrow function
  fullName2: () => {
    return this.firstName + " " + this.lastName;
  },
};
console.log(taroYamada.fullName1());
// @log: "Taro Yamada"
console.log(taroYamada.fullName2());
// @log: undefined undefined
```

`fullName2` dùng arrow function không hoạt động như mong đợi vì `this` không trỏ đến object. Nếu dùng arrow function, phải tham chiếu tên biến object như `taroYamada.firstName` thay vì `this`.

```js twoslash
const taroYamada = {
  firstName: "Taro",
  lastName: "Yamada",
  fullName: () => {
    return taroYamada.firstName + " " + taroYamada.lastName;
  },
};
console.log(taroYamada.fullName());
// @log: "Taro Yamada"
```

Có trường hợp code dễ hiểu hơn nhờ hoisting của traditional function. Ví dụ, nhóm xử lý theo từng giai đoạn bằng function và liệt kê gọi function ở đầu chương trình có thể làm tổng quan xử lý của chương trình dễ hiểu ở chỗ bắt đầu đọc.

```js twoslash
// Tổng quan chương trình
step1();
step2();
step3();

// Chi tiết từng xử lý
function step1() {
  /* Chi tiết xử lý */
}
function step2() {
  /* Chi tiết xử lý */
}
function step3() {
  /* Chi tiết xử lý */
}
```

Arrow function cần tạo bằng `const`, `let`, hoặc `var` nên không có hoisting của function. Do đó, không thể viết trực tiếp pattern hiển thị tổng quan xử lý trước như sample code trên.

```js twoslash
step1();
// @error: ReferenceError: Cannot access 'step1' before initialization
step2();
step3();
const step1 = () => {};
const step2 = () => {};
const step3 = () => {};
```

Nếu muốn biểu hiện gần với cách viết trên bằng arrow function, cần định nghĩa function viết tổng quan xử lý và gọi function đó ở cuối chương trình.

```js twoslash
const main = () => {
  step1();
  step2();
  step3();
};
const step1 = () => {};
const step2 = () => {};
const step3 = () => {};
main();
```

Cũng có lựa chọn dùng function declaration khi muốn làm nổi bật rằng function là function. Vì arrow function được viết giống khai báo biến, một số người cảm thấy khó phân biệt ngay đó là giá trị hay function. Hãy so sánh ví dụ sau có arrow function và function declaration xen giữa các khai báo biến. Cái nào dễ nhận ra là function ngay khi nhìn?

```js twoslash
// Arrow function xen giữa khai báo biến
const str = "foo";
const obj = { value: str };
const func = (n) => n + 1;
const nums = [1, 2, 3];
```

```js twoslash
// Function declaration xen giữa khai báo biến
const str = "foo";
const obj = { value: str };
function func(n) {
  return n + 1;
}
const nums = [1, 2, 3];
```
