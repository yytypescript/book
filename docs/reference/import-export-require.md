# import, export, require

Trong thực tế khi xây dựng ứng dụng, thường kết hợp nhiều file JavaScript để tạo thành một ứng dụng. Đây là phát triển theo hướng module. Ở đây sẽ giải thích về module trong JavaScript và TypeScript, cũng như `import`, `export`, `require` để kết hợp các module với nhau.

## Script và Module

File JavaScript được chia thành hai loại chính: script và module. Script là file JavaScript thông thường.

```js twoslash title="Script"
const foo = "foo";
```

Module là file JavaScript chứa ít nhất một `import` hoặc `export`. `import` là từ khóa để import biến, function, class từ module khác. `export` là từ khóa để công khai biến, function, class cho các module khác.

```js twoslash title="Module"
export const foo = "foo";
```

Do đó, ngay cả file script không có `import` hay `export`, nếu sau này thêm `import` hoặc `export`, nó sẽ trở thành file module.

## Công khai và riêng tư giá trị

Trong module JavaScript, chỉ những giá trị được gắn `export` rõ ràng mới được công khai và có thể tham chiếu từ module khác. Ví dụ, trong ví dụ sau, `publicValue` có thể được sử dụng từ module khác. Ngược lại, `privateValue` không thể sử dụng từ bên ngoài.

```js twoslash
export const publicValue = 1;
const privateValue = 2;
```

Trong module JavaScript, biến và function mặc định là riêng tư. Một số ngôn ngữ khác như Java có thành viên của module (package) mặc định là công khai, và cần thêm modifier `private` cho những gì muốn riêng tư. So với những ngôn ngữ đó, JavaScript có nguyên tắc cơ bản ngược lại nên cần chú ý.

## Module luôn ở strict mode

JavaScript trong module luôn ở strict mode. Trong strict mode, nhiều cách viết code nguy hiểm bị cấm. Ví dụ, gán cho biến chưa định nghĩa sẽ gây lỗi.

```js twoslash
foo = 1; // Gán cho biến foo chưa định nghĩa
// @error: ReferenceError: foo is not defined
export const bar = foo;
```

## Module chỉ được đánh giá một lần khi `import`

Code của module chỉ được đánh giá một lần khi `import` lần đầu. Các lần `import` sau sẽ sử dụng nội dung đã đánh giá lần đầu. Nói cách khác, module được cache khi `import` lần đầu, hoặc có thể nói module giống như singleton.

Ví dụ, ngay cả khi đọc module `module.js` 3 lần, `module.js` này chỉ được đánh giá 1 lần đầu tiên.

```js twoslash title="module.js"
console.log("Đang đánh giá module");
// Log này chỉ được output 1 lần
export const value = 1;
```

```js title="main.js" twoslash
import "./module.js";
// @log: "Đang đánh giá module"
import "./module.js";
import "./module.js";
```

## Lịch sử của module

### JavaScript ngày xưa

Trong thời đại JavaScript chỉ chạy trên browser, khái niệm chia module đã tồn tại nhưng chỉ quản lý trên browser, cụ thể là trong `html`. Nếu có package phổ biến như `jQuery`, cần viết trong `html` như sau.

```markup
<script src="https://ajax.googleapis.com/ajax/libs/jquery/x.y.z/jquery.min.js"></script>
```

Nếu có package phụ thuộc vào `jQuery`, cần viết dưới khai báo `jQuery`.

```markup
<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/x.y.z/jquery-ui.min.js"></script>
```

Khi số package ít thì còn quản lý được, nhưng khi tăng lên thì dependency trở nên phức tạp. Nếu sai thứ tự đọc, `html` đó sẽ không hoạt động.

### Sau khi Node.js xuất hiện

Sau khi `npm` xuất hiện, việc lấy package cần dùng và sử dụng ngay đã trở thành xu hướng chính.

## `CommonJS`

### `require()`

Đây là tính năng đọc file `.js` khác (trong TypeScript là cả `.ts`) vẫn còn là chủ đạo trong Node.js hiện tại. Cú pháp cơ bản như sau.

```ts twoslash
const package1 = require("package1");
```

Điều này có nghĩa là đưa nội dung của package `package1` vào hằng số `package1`. Lúc này `package1` (nếu không phải built-in library) cần tồn tại trong thư mục `node_modules` của project hiện tại.

Bạn cũng có thể đọc file `.js, .ts` khác do mình tạo. Viết vị trí của file muốn đọc theo **đường dẫn tương đối** từ file gọi. Ngay cả khi ở cùng cấp cũng cần viết đường dẫn tương đối. Lúc này có thể bỏ qua `.js, .json` và với TypeScript có thể bỏ qua cả `.ts`. Trong phát triển TypeScript, xét đến việc cuối cùng sẽ compile sang JavaScript, nên không viết là an toàn hơn.

```ts twoslash
const myPackage = require("./MyPackage");
```

Nếu output `.js` cùng vị trí với `.ts`, TypeScript sẽ có hai file cùng tên có thể đọc. Lúc này TypeScript ưu tiên đọc `.js` nên hãy chú ý. Nếu thay đổi code TypeScript mà không thấy áp dụng thì có thể là vấn đề này.

Ngoài ra, nếu đường dẫn chỉ định là thư mục và trong đó có `index.js(index.ts)`, chỉ cần viết đến tên thư mục là sẽ đọc được `index.js(index.ts)`.

### `module.exports`

Để đọc file khác, file đó cần xuất gì đó. Để làm điều đó, sử dụng cú pháp này.

```ts title="increment.js" twoslash
// @noErrors
module.exports = (i) => i + 1;
```

Nếu có file `.js` như vậy, khi muốn đọc ở cùng cấp sẽ như sau.

```ts title="index.js" twoslash
// @errors: 2580
const increment = require("./increment");

console.log(increment(3));
// @log: 4
```

Lúc này, hằng số `increment` nhận nội dung đọc không nhất thiết phải là tên này, có thể thay đổi.

`module.exports` này có thể viết bao nhiêu lần cũng được trong một file, nhưng chỉ cái cuối cùng được áp dụng.

```ts title="dayOfWeek.js" twoslash
module.exports = "Monday";
module.exports = "Tuesday";
module.exports = "Wednesday";
module.exports = "Thursday";
module.exports = "Friday";
module.exports = "Saturday";
module.exports = "Sunday";
```

```ts title="index.js" twoslash
const day = require("./dayOfWeek");

console.log(day);
// @log: 'Sunday'
```

### `exports`

Với `module.exports`, có thể thay đổi tên của thứ đang xuất, dù tốt hay xấu. Khi muốn tránh điều đó, sử dụng `exports` này.

```ts title="util.js" twoslash
// @noErrors
exports.increment = (i) => i + 1;
```

Phía đọc sẽ như sau.

```ts title="index.js" twoslash
const util = require("./util");

console.log(util.increment(3));
// @log: 4
```

Cũng có thể sử dụng destructuring assignment.

```ts title="index.js" twoslash
const { increment } = require("./util");

console.log(increment(3));
// @log: 4
```

Ở đây cần sử dụng với tên `increment`. Khi có thứ cùng tên trong file khác và cần thay đổi tên, có thể thay đổi tên giống như khi dùng destructuring assignment.

```ts title="index.js" twoslash
const { increment } = require("./other");
const { increment: inc } = require("./util");

console.log(inc(3));
// @log: 4
```

## `ES Module`

Đây là cách đọc file chủ yếu được áp dụng trong frontend (browser). Vì là tính năng được thêm vào trong `ES6`, không hoạt động trên browser quá cũ.

### `import`

Giống như `require()`, đây là tính năng đọc file `.js, .ts` khác, nhưng trong khi `require()` có thể viết ở bất kỳ đâu trong file thì `import` **bắt buộc phải viết ở top-level (ngoài block hoặc function)**.
Ngoài ra, có 2 cách viết.

```ts twoslash
// @filename: package1
// @filename: package2
// ---cut---
import * as package1 from "package1";
import package2 from "package2";
```

Có sự khác biệt nhỏ trong cách sử dụng, sẽ giải thích bên dưới.

### `export default`

Đây là thứ tương ứng với `module.exports`. Khác với `module.exports`, một file chỉ được phép một `export default`, viết nhiều sẽ không hoạt động.

```ts title="increment.js" twoslash
// @noErrors
export default (i) => i + 1;
```

File `.js` này được đọc như sau.

```ts title="index.js" twoslash
// @filename: increment.ts
export default (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import increment from "./increment";

console.log(increment(3));
// @log: 4
```

```ts title="index.js" twoslash
// @filename: increment.ts
export default (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import * as increment from "./increment";

console.log(increment.default(3));
// @log: 4
```

### `export`

Đây là thứ tương đương với `exports`. Có 2 cách viết.

```ts title="util.js" twoslash
// @noErrors
export const increment = (i) => i + 1;
```

```ts title="util.js" twoslash
// @noErrors
const increment = (i) => i + 1;

export { increment };
```

Ngoài ra, cách viết thứ nhất sử dụng `const` để khai báo hằng số, nhưng ngay cả khi dùng `let`, phía đọc cũng không thể ghi đè `increment` đã được định nghĩa.

Đọc như sau.

```ts title="index.js" twoslash
// @filename: util.ts
export const increment = (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import { increment } from "./util";

console.log(increment(3));
// @log: 4
```

```ts title="index.js" twoslash
// @filename: util.ts
export const increment = (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import * as util from "./util";

console.log(util.increment(3));
// @log: 4
```

Khi muốn thay đổi tên trong `import` của cách thứ nhất, khác với `require` (destructuring assignment), sử dụng cú pháp `as` để thay đổi.

```ts title="index.js" twoslash
// @filename: util.ts
export const increment = (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import { increment as inc } from "./util";

console.log(inc(3));
// @log: 4
```

### `import()`

Trong `ES Module`, cần viết `import` ở đầu file. Điều này có nghĩa là không thể chuyển đổi file đọc một cách động. `import()` này là giải pháp thay thế cho điều đó.

Điểm khác với `require()` là `import()` đọc module bất đồng bộ. Tức là nó trả về `Promise`.

```ts title="index.js" twoslash
// @filename: util.ts
export const increment = (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import("./util").then(({ increment }) => {
  console.log(increment(3));
  // @log: 4
});
```

## Sử dụng `ES Module` trong Node.js

Như đã nói, Node.js đã sử dụng `CommonJS` trong thời gian dài, nhưng từ `13.2.0` đã chính thức hỗ trợ `ES Module`.

Tuy nhiên, vì Node.js hoạt động dựa trên `CommonJS`, khi muốn sử dụng `ES Module` cần một chút chuẩn bị.

### `.mjs`

Thay đổi tất cả file JavaScript muốn chạy như `ES Module` sang đuôi `.mjs`.

```ts title="increment.mjs" twoslash
// @noErrors
export const increment = (i) => i + 1;
```

Phía đọc như sau.

```ts title="index.mjs" twoslash
// @filename: increment.mjs
export const increment = (i: number) => i + 1;
// @filename: index.js
// ---cut---
import { increment } from "./increment.mjs";

console.log(increment(3));
// @log: 4
```

Chú ý rằng **không thể bỏ qua đuôi file** khi sử dụng `import`.

### `"type": "module"`

Thêm khai báo này vào `package.json` sẽ hỗ trợ `ES Module` cho toàn bộ package.

```json
{
  "name": "YYTS",
  "version": "1.0.0",
  "main": "index.js",
  "type": "module",
  "license": "Apache-2.0"
}
```

Làm như vậy có thể sử dụng `ES Module` với `.js` mà không cần đổi đuôi sang `.mjs`. Ngoài ra, khi không có `"type": "module"` thì coi như `"type": "commonjs"`. Đây là Node.js như trước đây.

```ts title="increment.js" twoslash
// @noErrors
export const increment = (i) => i + 1;
```

```ts title="index.js" twoslash
// @filename: increment.js
export const increment = (i) => i + 1;
// @filename: index.js
// ---cut---
import { increment } from "./increment.js";

console.log(increment(3));
// @log: 4
```

Mặc dù là `.js` nhưng **khi đọc không thể bỏ qua đuôi file** nên hãy chú ý.

#### `.cjs`

Khi muốn đọc JavaScript viết bằng `CommonJS`, cần thay đổi tất cả file viết bằng `CommonJS` sang `.cjs`.

```ts title="increment.cjs" twoslash
// @noErrors
exports.increment = (i) => i + 1;
```

Phía đọc như sau.

```ts title="index.js" twoslash
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { increment } = require("./increment.cjs");

console.log(increment(3));
// @log: 4
```

`ES Module` không có `require()`, cần thêm bước để tạo ra nó.

### Vấn đề của `"type": "module"`

Cài đặt này đọc mọi thứ như `ES Module`, trong tình trạng nhiều package chưa hỗ trợ `"type": "module"`, rất khó sử dụng.

Ví dụ, nếu viết file cài đặt của các package hỗ trợ phát triển như `linter` hoặc test bằng `.js`, sẽ không hoạt động. Ngay cả khi đổi sang `.cjs`, nếu package không bao gồm `.cjs` trong quy tắc đọc file cài đặt thì sẽ coi như không có file cài đặt. Do đó, `"type": "module"` hiện tại khá khó sử dụng.

## Trong TypeScript

Trong TypeScript, thường viết theo cách của `ES Module`. Điều này không có nghĩa là không sử dụng `CommonJS`, vì có thể output theo cả định dạng `CommonJS, ES Module` tùy theo cài đặt khi compile, nên không có nhiều vấn đề. Những bối cảnh đến giờ có thể không cần ý thức nhiều trong TypeScript.

Ngoài ra, tại thời điểm viết (2021/01), compile TypeScript chỉ có thể output `.js`, không có cài đặt để output `.cjs, .mjs`. Nếu muốn output JavaScript có thể dùng được cả trên browser và server, cần thêm bước xử lý.

Về cách output, có giải thích trong trang tsconfig.json, vui lòng tham khảo.

[Cài đặt tsconfig.json](./tsconfig/tsconfig.json-settings.md)

## `require? import?`

Hãy phân biệt sử dụng theo mục đích browser hoặc server. Nếu cho browser thì `ES Module`, nếu cho server thì `CommonJS` là lựa chọn an toàn. Nếu là package universal dùng được cả hai thì có thể hướng đến Dual Package.

[tsconfig cho developer phát triển dual package (Dual Package)](advanced-topics/tsconfig-for-dual-package-developers.md)

## `default export? named export?`

`module.exports` và `export default` được gọi là default export, còn `exports` và `export` được gọi là named export. Cả hai đều có ưu nhược điểm, và thường là chủ đề tranh luận. Một số công ty có coding guide quy định sử dụng một trong hai, nhưng không có cái nào áp đảo hơn hẳn nên tùy theo sở thích.

### default export

#### Ưu điểm của default export

- Có thể thay đổi tên khi `import`
- Cho biết file đó muốn cung cấp gì nhất so với các `export` khác

#### Nhược điểm của default export

- Tùy editor, IDE có thể khó có auto-complete
- Cần đặt tên khi re-export

### named export

#### Ưu điểm của named export

- Editor, IDE hỗ trợ auto-complete
- Có thể `export` nhiều thứ từ một file

#### Nhược điểm của named export

- (Mặc dù có thể thay đổi tên) Cơ bản cần `import` và sử dụng với tên cố định
- Nếu file `export` thay đổi tên sẽ không hoạt động

Về **có thể thay đổi tên** được nêu ở đây có nhiều ý kiến khác nhau.

### Thứ mà file muốn cung cấp

Ví dụ, giả sử bạn đang làm phần mềm kế toán cho một quốc gia có thuế tiêu thụ 8%. Lúc đó `export` của một file như sau.

```ts title="taxIncluded.ts" twoslash
// @noErrors
export default (price) => price * 1.08;
```

Tất nhiên phía gọi có thể sử dụng như vậy.

```ts title="index.ts" twoslash
// @filename: taxIncluded.ts
export default (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import taxIncluded from "./taxIncluded";

console.log(taxIncluded(100));
// @log: 108
```

Ở đây, giả sử quốc gia đó thay đổi thuế tiêu thụ thành 10%. Lúc này hệ thống chỉ cần thay đổi `taxIncluded.ts` là đủ.

```ts title="taxIncluded.ts" twoslash
// @noErrors
export default (price) => price * 1.1;
```

Thay đổi này không cần file khác biết, và cũng không thể biết được.

### Vấn đề lần này

Nếu hệ thống sử dụng nhiều tính toán số tiền dựa trên **tỷ lệ thuế tại thời điểm năm tháng ngày đó**, việc thay đổi tỷ lệ thuế ngầm này sẽ là vấn đề. Vì tất cả số tiền trong quá khứ cũng sẽ được tính theo tỷ lệ thuế tiêu thụ hiện tại là 10%.

### Nếu là named export

Với named export, bằng cách thay đổi tên `export`, có thể buộc phía gọi phải thay đổi.

```ts title="taxIncluded.ts" twoslash
// @noErrors
export const taxIncludedAsOf2014 = (price) => price * 1.08;
```

```ts title="index.ts" twoslash
// @filename: taxIncluded.ts
export const taxIncludedAsOf2014 = (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import { taxIncludedAsOf2014 } from "./taxIncluded";

console.log(taxIncludedAsOf2014(100));
// @log: 108
```

Khi tỷ lệ thuế đổi thành 10%, làm như sau.

```ts title="taxIncluded.ts" twoslash
// @noErrors
export const taxIncludedAsOf2019 = (price) => price * 1.1;
```

```ts title="index.ts" twoslash
// @filename: taxIncluded.ts
export const taxIncludedAsOf2019 = (i: number) => i + 1;
// @filename: index.ts
// ---cut---
import { taxIncludedAsOf2019 } from "./taxIncluded";

// this is no longer available.
// console.log(taxIncludedAsOf2014(100));
console.log(taxIncludedAsOf2019(100));
// @log: 110
```

Vì đổi tên nên phía gọi cũng buộc phải đổi tên. Điều này cũng áp dụng ngay cả khi đang dùng `as` để thay đổi tên.

Nếu logic thay đổi và muốn buộc sửa đổi, sử dụng named export sẽ dễ hiểu hơn và có lợi thế là dễ tìm thông qua editor, IDE. Ngược lại, nếu là package công khai với API nhất quán và rõ ràng thì default export cũng có giá trị.
