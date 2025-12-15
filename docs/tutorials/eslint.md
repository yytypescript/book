---
sidebar_label: Tự động hóa coding convention với ESLint
---

# Tự động hóa kiểm tra coding convention TypeScript với ESLint

Trong chương này, bạn sẽ học các kiến thức sử dụng <ruby>ESLint<rt>E-S-Lint</rt></ruby> để kiểm tra TypeScript theo dạng tutorial.

## Những gì có thể học trong chương này

Trong chương này, bạn sẽ học những điều sau.

- Tại sao cần coding convention và vấn đề của coding convention
- Cách check JavaScript và TypeScript bằng ESLint
- Cách config rule của ESLint
- Cách sử dụng coding convention của Airbnb trong ESLint
- Cách giải quyết lỗi
- Cách vô hiệu hóa check một phần
- Cách tích hợp ESLint với VS Code và JetBrains IDE

Khi hoàn thành tutorial, bạn sẽ có được kỹ năng cơ bản hữu ích trong thực tế như có thể giới thiệu ESLint vào project của mình.

## Luồng và cách đọc chương này

Chương này gồm 3 phần.

- [Kiến thức nền tảng]
- [Lint JavaScript bằng ESLint]
- [Lint TypeScript bằng ESLint]

Nửa đầu chương này là lý thuyết. Giải thích kiến thức nền tảng cho những ai chưa biết "coding convention" hay "linter" là gì ([Kiến thức nền tảng]). Nếu bạn đã hiểu coding convention và linter, hoặc muốn thực hành ngay, có thể bỏ qua phần này.

Nửa sau chương này là tutorial. Mục tiêu của chương này là có thể check TypeScript bằng ESLint. Tuy nhiên, việc xử lý TypeScript bằng ESLint là cách sử dụng nâng cao. Do đó, trong tutorial, trước tiên sẽ học cách xử lý JavaScript bằng ESLint như phần cơ bản ([Lint JavaScript bằng ESLint]). Sau đó, bạn sẽ học cách xử lý TypeScript bằng ESLint ([Lint TypeScript bằng ESLint]).

Cuối chương có thêm các tutorial bonus sau. Nếu quan tâm và có thời gian, hãy xem thêm.

- [Tích hợp VS Code và ESLint]
- [Tích hợp JetBrains IDE và ESLint]

## Những thứ cần thiết cho tutorial này

Những thứ cần thiết cho tutorial này như sau.

- Node.js v22 trở lên
- NPM v7 trở lên
- Yarn v1 (Tutorial này được xác nhận hoạt động với v1.22.18)

Về cách giới thiệu Node.js, vui lòng xem [Chuẩn bị môi trường phát triển](./setup.md).

Chúng ta sử dụng Yarn làm package management tool. Hãy install trước. Nếu đã install rồi thì có thể bỏ qua bước này.

```shell
npm install -g yarn
```

## Kiến thức nền tảng

[Kiến thức nền tảng]: #kiến-thức-nền-tảng

### TypeScript có nhiều cách viết

Không chỉ TypeScript, ngôn ngữ lập trình đều có cú pháp. Code được viết tuân thủ cú pháp có thể thực thi hoặc compile mà không có lỗi.

Nếu tuân thủ cú pháp, liệu ai viết code cũng giống nhau từng chữ một? Không phải vậy. Ví dụ, trong TypeScript có thể bỏ qua semicolon cuối dòng. 2 dòng code sau chỉ khác nhau ở việc có hay không có semicolon. Cả hai đều đúng cú pháp, dùng cái nào là vấn đề sở thích.

```ts twoslash
// prettier-ignore
console.log("OK")
console.log("OK");
```

Chuỗi có thể viết bằng single quote, double quote, hoặc backtick với 3 cách. Single quote và double quote không có sự khác biệt về chức năng. Backtick là [template literal](/reference/values-types-variables/string#テンプレートリテラル) có spec khác với string literal. Tuy nhiên, với chuỗi đơn giản như ví dụ sau, 3 cách này có cùng ý nghĩa.

```ts twoslash
// prettier-ignore
console.log('OK');
console.log("OK");
console.log(`OK`);
```

Ví dụ này có thể gây ra ý kiến khác nhau về việc dùng cái nào. Theo khảo sát độc quyền của sách này, với câu hỏi "Về nguyên tắc, bạn dùng cái nào nhiều nhất?", single quote chiếm 55% nhiều nhất, tiếp theo là double quote 29%, backtick 16%. (Số câu trả lời: 232)

<figure><img src="/img/tutorial/eslint/string-quotes-chart.svg" width="320" /></figure>

Những ví dụ nêu trên chỉ là một phần. Có rất nhiều ví dụ khác về cùng ý nghĩa nhưng cách viết khác nhau.

### Sự khác biệt trong cách viết có thể trở thành vấn đề

Sự khác biệt trong cách viết có thể trở thành vấn đề. Ví dụ, trong trường hợp phát triển chung chương trình. Nếu mỗi người có cách viết khác nhau, sự khác biệt đó có thể gây chú ý hoặc ngạc nhiên, khiến nội dung chính của code không vào đầu. Nếu độ rộng indent không thống nhất, code có thể khó đọc. Kết quả là, **sự khác biệt trong cách viết có thể làm giảm khả năng bảo trì chương trình**.

### Thống nhất cách viết bằng coding convention

Lý tưởng là ai viết code cũng giống nhau. Để làm điều đó, phải làm gì? Một giải pháp là quy định rule về cách viết. **Quy định về cách viết code được gọi là "coding convention (coding standards)"**.

Trong coding convention, ví dụ quy định những điều sau.

- Tên biến phải là camelCase.
- Dấu ngoặc nhọn của `function` phải cùng dòng với tên hàm. (Không được đặt ở dòng tiếp theo)
- Phải xóa `console.log`.
- Không được gán biến trong biểu thức điều kiện của if. Ví dụ `if (data = getData())` không được.

Tổng hợp các rule như vậy để tạo convention, nhưng để hoàn thiện convention thực tế cần tốn nhiều công sức. Trong thực tế, mượn convention đã công khai sẽ thực tế hơn.

Convention đã công khai chủ yếu có những cái sau. Những cái này thực sự được sử dụng rộng rãi trong nhiều project.

- [Google JavaScript Style Guide]
- [JavaScript Standard Style]
- [Airbnb JavaScript Style Guide]

[google javascript style guide]: https://google.github.io/styleguide/jsguide.html
[javascript standard style]: https://standardjs.com/rules.html
[airbnb javascript style guide]: https://github.com/airbnb/javascript

Nếu mọi người trong team cùng tuân thủ coding convention, việc thống nhất cách viết sẽ dễ dàng hơn.

### Vấn đề của coding convention

Coding convention cũng có vấn đề.

#### Công sức vận hành không ít

Nếu mỗi developer tuân thủ convention, coding convention sẽ hoạt động. Tuy nhiên, human error là điều xảy ra. Có trường hợp biết rule nhưng vẫn vi phạm, nhưng nhiều hơn là không biết mà vi phạm, hoặc nhầm lẫn. Nếu convention không được tuân thủ, convention sẽ chỉ còn hình thức. Khi đó, mục tiêu thống nhất cách viết sẽ không đạt được.

Để ngăn human error, **phải kiểm tra hàng ngày xem code có tuân thủ convention không**. Tuy nhiên, điều này tốn nhiều công sức. Trong khi có công việc quan trọng hơn, việc kiểm tra có thể không khả thi. Vận hành convention đúng cách tốn nhiều công sức.

#### Tăng gánh nặng tâm lý trong giao tiếp

Coding convention định nghĩa cái gì đúng, cái gì sai. Khi đó, sẽ có code rõ ràng là sai. Cũng có tình huống phải chỉ ra lỗi trong code của người khác. **Chỉ ra lỗi trong công việc của người khác là điều khó khăn**. Gánh nặng tâm lý hơn tưởng tượng. Người chỉ ra phải cân nhắc cách nói để không làm ảnh hưởng xấu đến ấn tượng của đối phương. Người bị chỉ ra cũng có thể không tiếp nhận một cách tích cực. Tùy thuộc vào mối quan hệ, việc chỉ ra có thể bị kiêng dè.

### Tự động hóa coding convention

Để thống nhất cách viết, coding convention là không thể thiếu. Tuy nhiên, cũng có vấn đề về công sức vận hành và tâm lý. Tool hỗ trợ giải quyết điều này là ESLint. **ESLint là tool kiểm tra xem code JavaScript hoặc TypeScript có tuân thủ coding convention không**.

ESLint có thể check chỉ bằng một lệnh. Check hoàn thành trong vài giây và ngay lập tức biết kết quả. Do đó, công sức kiểm tra gần như không còn.

Thêm vào đó, còn có tính năng tự động sửa. Tùy code, ESLint có thể sửa code tuân thủ convention. Khi sử dụng tính năng này, công sức sửa chỗ vi phạm convention cũng không còn.

Điều kỳ lạ là, cùng một chỉ trích nhưng được máy móc chỉ ra thì thoải mái hơn người chỉ ra. ESLint chỉ ra vấn đề một cách máy móc, nên gánh nặng tâm lý trong giao tiếp cũng giảm.

Khi giới thiệu ESLint, developer được **giải phóng khỏi vận hành convention và stress tâm lý, có thể tập trung vào công việc quan trọng hơn như phát triển**.

<PostILearned>

📝TypeScript có thể viết cùng một xử lý với nhiều cách khác nhau
💥Trong phát triển team, sự khác biệt cách viết có thể trở thành vấn đề…
🤝Hãy giới thiệu coding convention để thống nhất cách viết
😵Nhưng convention cũng có vấn đề về công sức vận hành và tâm lý
✅Vấn đề này có thể giải quyết bằng ESLint!

</PostILearned>

### Linter là gì

ESLint nói chung là tool thuộc thể loại "linter". Linter là tool **phân tích tĩnh chương trình, phát hiện bug và vấn đề**. Sử dụng linter để phân tích vấn đề được gọi là "lint".

Lint có nguồn gốc từ dệt may. Bụi như sợi chỉ không cần thiết khi kéo sợi từ len hoặc bông được gọi là lint. Trong dệt may có công đoạn loại bỏ lint, và từ đó tên lint cũng được sử dụng trong lập trình.

### Sự khác biệt giữa compiler và linter

Bản chất của compiler là chuyển đổi từ ngôn ngữ này sang ngôn ngữ khác. Trong trường hợp TypeScript compiler là chuyển đổi từ TypeScript sang JavaScript.

Bản chất của linter là chỉ ra vấn đề của chương trình. Không thực hiện chuyển đổi từ ngôn ngữ sang ngôn ngữ.

Thực tế, TypeScript compiler cũng báo cáo vấn đề của chương trình. Ví dụ, nếu bật compiler option [`noUnusedLocals`](/reference/tsconfig/nounusedlocals), có thể check biến không sử dụng. ESLint cũng có check tương đương. Đây là phần trùng lặp với tính năng linter.

Dù có tính năng check tương tự, cả hai có lĩnh vực giỏi khác nhau. TypeScript compiler có check type phong phú. Giỏi phát hiện vấn đề từ góc độ type. Mặt khác, ESLint có check phong phú về coding style như indent hay naming convention, quyết định nên viết code như thế nào hay tránh gì, lĩnh vực liên quan đến security hay performance. Cả hai có quan hệ bổ sung lẫn nhau. Do đó, nếu giới thiệu cả compiler và linter, có thể check rộng hơn.

<figure>
<figcaption>So sánh lĩnh vực giỏi của TypeScript compiler và ESLint</figcaption>

|                          | TypeScript compiler | ESLint |
| ------------------------ | :-----------------: | :----: |
| Chuyển đổi ngôn ngữ      |          ○          |        |
| Check type               |          ○          |        |
| Check cú pháp            |          ○          |   ○    |
| Coding style             |                     |   ○    |
| Quyết định code          |                     |   ○    |
| Security                 |                     |   ○    |
| Performance              |                     |   ○    |

</figure>

<PostILearned>

🧵Linter: Tool phân tích tĩnh code và chỉ ra vấn đề. ESLint là linter.
🔀Compiler: Cũng phân tích tĩnh nhưng mục đích chính là chuyển đổi sang ngôn ngữ khác. tsc là compiler.

⚖️Sự khác biệt giữa tsc và ESLint
・tsc: Giỏi check type
・ESLint: Giỏi check coding convention

</PostILearned>

## Lint JavaScript bằng ESLint

[lint javascript bằng eslint]: #lint-javascript-bằng-eslint

Từ đây chúng ta sẽ giải thích cách giới thiệu và sử dụng ESLint theo dạng tutorial. Hãy thực hành trên môi trường của bạn.

### Tạo project

Đầu tiên, tạo project sử dụng cho tutorial này.

```shell
mkdir eslint-tutorial
cd eslint-tutorial
```

Tạo package.json ở project root với nội dung sau.

```json title="package.json"
{
  "name": "eslint-tutorial",
  "license": "UNLICENSED"
}
```

### Giới thiệu ESLint

Hãy install ESLint bằng Yarn. ESLint là package chỉ dùng khi phát triển nên install lệnh `yarn add` với option `-D`.

```shell
yarn add -D 'eslint@^8'
```

:::info
Next.js đã giới thiệu ESLint sẵn. Trong thực tế khi dùng ESLint với project Next.js, có thể bỏ qua bước giới thiệu.
:::

Hiển thị version để xác nhận ESLint đã được install đúng.

```shell
npx eslint -v
v8.15.0
```

Tham khảo, lệnh `npx` này là tool để khởi động file thực thi của Node module (library). Khi thực thi `npx eslint`, `./node_modules/.bin/eslint` sẽ được thực thi.

### Tạo file config của ESLint

Tạo file config ESLint `.eslintrc.js` ở project root.

```shell
touch .eslintrc.js
```

```text title="Cấu trúc thư mục sau khi tạo file config"
.
├── .eslintrc.js
├── node_modules
├── package.json
└── yarn.lock
```

Nội dung file config như sau.

```js twoslash title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
};
```

Nội dung config này được giải thích dưới đây.

#### `root`

ESLint có spec tìm kiếm file config bằng cách đi ngược thư mục từ thư mục thực thi lệnh `eslint`. Ví dụ, nếu thực thi lệnh trong thư mục `/a/b/`, ESLint tìm file config theo thứ tự sau.

1. `/a/b/.eslintrc.js`
1. `/a/.eslintrc.js`
1. `/.eslintrc.js`

Tìm kiếm này đi ngược đến thư mục root. Nếu tìm thấy nhiều file config trong quá trình tìm kiếm, nội dung config sẽ được merge. Spec này tiện lợi nhưng cũng có nguy cơ tìm đến file config ngoài project. Để thu hẹp phạm vi tìm kiếm file config, khuyến nghị set `root` là `true`. Khi tìm thấy file config có setting này, sẽ không đi ngược thư mục nữa.

#### `env`

`env` là option để báo cho ESLint biết code JavaScript/TypeScript cần check được sử dụng trong môi trường thực thi nào. Set điều này giúp ESLint nhận diện biến global. Ví dụ, set `browser: true` sẽ nhận diện các biến global như `window` hay `alert`. Set `es2021` sẽ nhận diện các biến global được giới thiệu đến ES2021. Còn có thể chỉ định `node`, v.v. Danh sách môi trường thực thi có thể chỉ định xem [tài liệu chính thức](https://eslint.org/docs/user-guide/configuring/language-options#specifying-environments).

Setting này liên quan đến [no-undef rule](https://eslint.org/docs/rules/no-undef) của ESLint. Rule này check biến chưa định nghĩa. Biến global là biến có thể sử dụng mà không cần định nghĩa. ESLint không biết biến global nào đã được định nghĩa thì không thể áp dụng rule này đúng cách. Do đó, option `env` cần được set đúng.

#### `parserOptions`

##### `ecmaVersion`

`parserOptions` là option để báo cho ESLint biết JavaScript cần check sử dụng cú pháp nào. `ecmaVersion` chỉ định sử dụng cú pháp version ECMAScript nào. Set `"latest"` nghĩa là sử dụng cú pháp ECMAScript mới nhất. Mặc định là ECMAScript 5. Đây là version khá cũ. Trong thực tế hiếm khi phát triển bằng ES5, nên nhất định phải chỉ định ở đây. Ngoài ra, nếu option `env` chỉ định version ECMAScript như `es2022`, `ecmaVersion` cũng tự động được set `es2022`. Nếu cả hai chỉ định cùng version, có thể bỏ qua chỉ định `ecmaVersion`.

##### `sourceType`

JavaScript có script mode và module mode. `sourceType` là option chỉ định code JavaScript được viết ở mode nào. Module mode hỗ trợ thêm cú pháp như câu lệnh `import` hay `export`. Giá trị mặc định của `sourceType` là `"script"` (script mode). Trong thực tế khi phát triển, thường viết JavaScript/TypeScript ở module mode, nên `sourceType` nên chỉ định `"module"` (module mode).

### Config rule của ESLint

ESLint có khái niệm "rule". Rule là đơn vị check nhỏ nhất. Ví dụ, có các rule sau.

- `no-console`: Không được viết `console.log`
- `camelcase`: Tên biến phải là camelCase
- `semi`: Không được bỏ semicolon cuối dòng

ESLint có hơn 200 rule. [Danh sách tất cả rule ở tài liệu chính thức](https://eslint.org/docs/rules/).

Trong ESLint, kết hợp nhiều rule để xây dựng coding convention.

Rule có thể set severity (mức độ nghiêm trọng). Severity có 3 loại: `off`, `warn` và `error`. `off` vô hiệu hóa rule, không check. `warn` báo cáo vấn đề tìm thấy như warning. Có báo cáo nhưng không ảnh hưởng đến exit code của lệnh `eslint`. `error` báo cáo vấn đề tìm thấy như error và có hiệu lực làm exit code thành 1. Mỗi severity cũng có thể set bằng số từ `0` đến `2`.

<figure><figcaption>Severity của ESLint</figcaption>

| Severity | Số | Hiệu lực                               |
| -------- | -- | -------------------------------------- |
| off      | 0  | Tắt rule                               |
| warn     | 1  | Warning nhưng không ảnh hưởng exit code |
| error    | 2  | Warning và làm exit code thành 1        |

</figure>

Rule được viết trong field `rules` của `.eslintrc.js` với format key-value `tên-rule: severity`. Đầu tiên, hãy thêm `no-console` vào rule.

```js twoslash {11-13} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
  },
};
```

Tùy rule, có thể config chi tiết. Ví dụ, `camelcase`. Đây là rule check xem tên biến có phải camelCase không. Tùy loại biến, có thể muốn dùng khác camelCase. Ví dụ, tên property có thể muốn dùng underscore. Vì có Web API mà JSON object sử dụng snake_case (`foo_bar` kiểu phân cách underscore). Trong trường hợp này, set với format array `tên-rule: [severity, giá trị config]` có thể config rule chi tiết. Ví dụ config sau là setting không bắt buộc camelCase chỉ với tên property. Hãy thử thêm setting này vào `.eslintrc.js`.

```js twoslash {13} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
  },
};
```

:::note Tóm tắt đến đây

- Đã tạo package.json.
- Đã install eslint.
- Đã tạo file config `.eslintrc.js`.
- Đã thêm các rule sau vào file config.
  - `no-console`: Không được để `console.log` trong code.
  - `camelcase`: Tên biến phải là camelCase (trừ tên property).

:::

### Check JavaScript

File config đã sẵn sàng, hãy tạo file JavaScript và check bằng ESLint.

Đầu tiên, tạo thư mục `src`.

```shell
mkdir src
```

Tạo file JavaScript `helloWorld.js` trong thư mục `src`.

```shell
touch src/helloWorld.js
```

Xác nhận cấu trúc thư mục có file `helloWorld.js` như sau.

```txt
.
├── .eslintrc.js
├── node_modules
├── package.json
├── src
│   └── helloWorld.js
└── yarn.lock
```

Nội dung `helloWorld.js` như sau.

```js twoslash title="src/helloWorld.js"
export const hello_world = "Hello World";
console.log(hello_world);
```

`helloWorld.js` này cố ý viết code vi phạm coding convention. Dòng 1 biến `hello_world` không phải camelCase. Dòng 2 sử dụng `console.log` không được phép.

Vậy, hãy chạy check bằng ESLint. Check chỉ cần khởi động lệnh `eslint`. Lệnh `eslint` chỉ định tên file hoặc tên thư mục cần check làm argument đầu tiên. Ở đây, để check toàn bộ thư mục `src`, argument là `src`.

```shell title="Check thư mục src bằng ESLint"
npx eslint src
```

Khi thực thi, output sau hiển thị.

![](/img/tutorial/eslint/terminal-npx-eslint-src.svg)

#### Cách đọc kết quả

Khi check và tìm thấy vấn đề, chi tiết hiển thị dạng bảng. Mỗi dòng gồm 4 cột. Từ trái sang phải là: số dòng số cột của code, severity, mô tả vấn đề, tên rule.

![](/img/tutorial/eslint/error-meaning.svg)

Chỉ với nội dung hiển thị trong kết quả, có thể không hiểu tại sao là vấn đề, sửa như thế nào. Trong trường hợp đó, tra cứu chi tiết rule từ tên rule trong tài liệu ESLint. Ví dụ, kết quả trên có tên rule `no-console`, tìm kiếm chi tiết rule từ chuỗi này. Trang chi tiết của `no-console` ở <https://eslint.org/docs/rules/no-console>.

### Sửa code để giải quyết error

```js twoslash title="src/helloWorld.js"
export const hello_world = "Hello World";
console.log(hello_world);
```

Kết quả check code trên bằng ESLint, 2 vấn đề được chỉ ra.

- Dòng 1: Tên biến `hello_world` không phải camelCase
- Dòng 2: `console.log` không được sử dụng

Muốn giải quyết error này, hãy edit `helloWorld.js`. Đổi tên biến `hello_world` thành `helloWorld`. Xóa `console.log` ở dòng 2. Code sau khi sửa như sau.

```js twoslash title="src/helloWorld.js"
export const helloWorld = "Hello World";
```

Check lại bằng ESLint để xác nhận không còn vấn đề.

```shell
npx eslint src
```

Nếu output không hiển thị gì, vấn đề đã được giải quyết.

### Tự động sửa code

Trong các rule của ESLint, có rule có thể tự động sửa code. Ví dụ, [`semi`](https://eslint.org/docs/rules/semi) là rule quy định có hay không có semicolon cuối dòng, đây là rule hỗ trợ tự động sửa. Ở đây, hãy thử tự động sửa của ESLint bằng `semi`.

Đầu tiên, thêm `semi` vào `rules` của file config `.eslintrc.js`.

```js twoslash {14} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-console": "error",
    camelcase: ["error", { properties: "never" }],
    semi: ["error", "always"],
  },
};
```

Rule setting này chỉ định `"always"`. Đây là setting bắt buộc semicolon cuối dòng.

Tiếp theo, xóa semicolon của code `src/helloWorld.js` và save.

```js twoslash title="src/helloWorld.js"
// prettier-ignore
export const helloWorld = "Hello World"
```

Trước khi tự động sửa, chỉ chạy check để xác nhận có báo cáo vấn đề về `semi` không.

```shell
npx eslint src
```

Nếu hiển thị kết quả như sau, rule `semi` đã thêm đang hoạt động.

![](/img/tutorial/eslint/terminal-npx-eslint-src-semi.svg)

Để tự động sửa code bằng ESLint, thêm option `--fix` vào lệnh `eslint`. Thực thi lệnh sau để tự động sửa.

```shell
npx eslint src --fix
```

Nếu tự động sửa thành công, xử lý kết thúc không hiển thị output. Để xác nhận tự động sửa có hoạt động, mở `src/helloWorld.js`. Semicolon đã được thêm ở cuối dòng chưa? Nếu đã được thêm thì tự động sửa thành công.

:::note Tóm tắt đến đây

- Đã tạo `src/helloWorld.js`.
- Đã thực thi `npx eslint src` để check thư mục `src`.
- Đã trải nghiệm luồng sửa code thủ công để pass check ESLint. (`camelcase`, `no-console`)
- Đã thực thi `npx eslint src --fix` để thử tính năng tự động sửa của ESLint. (`semi`)

:::

### ESLint có những rule nào?

Tutorial đến đây đã xử lý 3 rule (`camelcase`, `no-console`, `semi`). ESLint còn nhiều rule hơn. Số rule vượt quá 200.

Danh sách rule ở [Rules của tài liệu chính thức](https://eslint.org/docs/rules/). Danh sách này cũng có thể xác nhận rule nào hỗ trợ tự động sửa.

### Giới thiệu Shareable config

Rule của ESLint có quá nhiều, nên việc tìm hiểu và giới thiệu từng rule một rất khó khăn. Vì vậy, khuyến nghị sử dụng shareable config.

shareable config là preset rule đã được ai đó config. Giới thiệu điều này giúp tiết kiệm công sức config rule của mình.

Một shareable config nổi tiếng là `eslint:recommended` do ESLint chính thức công bố. Giới thiệu điều này sẽ kích hoạt hàng loạt các rule có check mark trong [danh sách Rules](https://eslint.org/docs/rules/). Vì đây là của chính thức nên nổi tiếng, nhưng số rule được kích hoạt ít, nên trong thực tế có thể không đủ.

Cũng có shareable config do bên thứ ba công bố, và những cái sau được sử dụng rộng rãi trong thực tế.

| Tên                         | Tác giả     | Coding convention tuân thủ                                      |
| --------------------------- | ----------- | --------------------------------------------------------------- |
| [eslint-config-airbnb]      | Airbnb      | [Airbnb JavaScript Style Guide], [Airbnb React/JSX Style Guide] |
| [eslint-config-airbnb-base] | Airbnb      | [Airbnb JavaScript Style Guide]                                 |
| [eslint-config-standard]    | Standard JS | [JavaScript Standard Style]                                     |
| [eslint-config-google]      | Google      | [Google JavaScript Style Guide]                                 |

[airbnb react/jsx style guide]: https://github.com/airbnb/javascript/tree/master/react
[eslint-config-airbnb]: https://www.npmjs.com/package/eslint-config-airbnb
[eslint-config-airbnb-base]: https://www.npmjs.com/package/eslint-config-airbnb-base
[eslint-config-standard]: https://www.npmjs.com/package/eslint-config-standard
[eslint-config-google]: https://www.npmjs.com/package/eslint-config-google

Shareable config ở trên được tạo dựa trên coding convention, nên có lợi thế có thể giới thiệu cả coding convention văn bản và ESLint setting thành set vào project.

Tutorial này sẽ sử dụng cái của Airbnb phổ biến. Config của Airbnb có 2 cái: [eslint-config-airbnb] và [eslint-config-airbnb-base]. Cái trước có thêm setting cho React. Lần này không xử lý React nên giới thiệu cái sau đơn giản hơn.

<figure><figcaption>Biến động số lượt install của mỗi shareable config</figcaption><iframe src="https://npmcharts.com/compare/eslint-config-airbnb-base,eslint-config-airbnb,eslint-config-standard,eslint-config-google?interval=30&log=false&minimal=true" height="500" width="100%"></iframe></figure>

Đầu tiên, install `eslint-config-airbnb-base` bằng Yarn. Đồng thời, cũng giới thiệu `eslint-plugin-import`.

```shell
yarn add -D \
  'eslint-config-airbnb-base@^15' \
  'eslint-plugin-import@^2'
```

Tiếp theo, xóa `rules` của file config `.eslintrc.js`. Và thêm `extends: ["airbnb-base"]`.

```js twoslash {11} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["airbnb-base"],
};
```

Vậy là việc giới thiệu shareable config hoàn tất.

Để thử check, thay đổi `src/helloWorld.js` thành nội dung sau.

```js twoslash title="src/helloWorld.js"
export const hello_world = "Hello World";
console.log(hello_world);
```

Code này cố ý vi phạm convention của Airbnb.

Cuối cùng thực thi `eslint` để chạy check.

```shell
npx eslint src
```

Sẽ có kết quả như sau.

![](/img/tutorial/eslint/terminal-npx-eslint-src-airbnb.svg)

Vấn đề được báo cáo ở đây là nội dung sau.

- `import/prefer-default-export`: Phải sử dụng default export.
- `camelcase`: Biến `hello_world` phải là camelCase.
- `quotes`: String literal phải được bao bằng single quote.
- `no-console`: Không được để `console.log`.

Tiếp theo, hãy học cách ghi đè rule của shareable config.

Trong kết quả trên, vi phạm `import/prefer-default-export` được báo cáo. Đây là error nói rằng phải dùng default export (`export default "..."`) thay vì named export (`export const helloWorld = "..."`). Tuy nhiên, ở đây muốn dùng named export, nên hãy tắt rule này để không bị cảnh báo. Để ghi đè rule, thêm `"import/prefer-default-export": "off"` vào `rules` của `.eslintrc.js`.

```js twoslash {12-14} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["airbnb-base"],
  rules: {
    "import/prefer-default-export": "off",
  },
};
```

Thêm nữa, muốn dùng double quote cho string literal, nên thêm `quotes: ["error", "double"]` vào `rules`.

```js twoslash {14} title=".eslintrc.js"
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  extends: ["airbnb-base"],
  rules: {
    "import/prefer-default-export": "off",
    quotes: ["error", "double"],
  },
};
```

Thực thi lại `eslint` để xác nhận ghi đè rule có hoạt động.

```shell
npx eslint src
```

Như sau, nếu cảnh báo về default export và string quote biến mất trong output kết quả, rule đang hoạt động.

![](/img/tutorial/eslint/terminal-npx-eslint-src-airbnb-with-rules.svg)

### Vô hiệu hóa rule một phần

Convention set trong `.eslintrc.js` có hiệu lực toàn bộ project. Khi viết code, có trường hợp bắt buộc phải vi phạm convention. Trong trường hợp đó, cũng có thể vô hiệu hóa rule cho một phần code.

Để vô hiệu hóa rule một phần, thêm comment `eslint-disable-next-line` trước dòng đó. Ví dụ, viết như ví dụ sau, dù tên biến `hello_world` không phải camelCase, ESLint cũng không đưa ra cảnh báo.

```js twoslash
// eslint-disable-next-line camelcase
export const hello_world = "Hello World";
```

Phương pháp này nên biết để dùng khi cần. Nếu comment vô hiệu hóa rule tràn lan thì mất ý nghĩa. Sử dụng có chừng mực là điều mong muốn.

:::note Tóm tắt đến đây

- Đã giới thiệu shareable config `eslint-config-airbnb-base`.
- Đã thử ghi đè một phần rule của nó.
  - Vô hiệu hóa `import/prefer-default-export`
  - Đổi chỉ định `quotes` từ single quote sang double quote
- Đã thử comment vô hiệu hóa rule `// eslint-disable-next-line`.

:::

## Lint TypeScript bằng ESLint

[lint typescript bằng eslint]: #lint-typescript-bằng-eslint

Tutorial đến đây đã học cách dùng ESLint với JavaScript. Từ đây, sẽ học cách dùng ESLint với TypeScript.

Ban đầu ESLint không thể check TypeScript. [TypeScript ESLint] bổ sung điều này. Giới thiệu điều này giúp ESLint có thể check TypeScript.

[typescript eslint]: https://typescript-eslint.io/

### Tạo project {#create-typescript-project}

Từ đây tạo project khác và tiến hành tutorial trong project mới. Tạo thư mục rỗng và đặt package.json tối thiểu vào trong.

```shell
mkdir eslint-typescript-tutorial
cd eslint-typescript-tutorial/
echo '{"name": "eslint-typescript-tutorial","license": "UNLICENSED"}' > package.json
```

### Giới thiệu TypeScript

Để dùng TypeScript ESLint, cần xây dựng môi trường TypeScript trước. Đầu tiên, hãy giới thiệu `typescript`. Đồng thời cũng install định nghĩa type của Node.js `@types/node`. Type information này được sử dụng khi ESLint check các file chạy trong môi trường Node.js như `.eslintrc.js`.

```shell
yarn add -D 'typescript@^5.5' '@types/node@^22'
```

Cũng tạo file config của TypeScript compiler.

```shell
touch tsconfig.json
```

Nội dung tsconfig.json như sau.

```json title="tsconfig.json"
{
  "compilerOptions": {
    "outDir": "dist"
  },
  "include": ["src"]
}
```

Tiếp theo, thêm file TypeScript `helloWorld.ts` vào thư mục `src`. Nội dung có thể để trống.

```shell
mkdir src
touch src/helloWorld.ts
```

Cũng thử compile xem.

```shell
npx tsc
```

Nếu compile thành công, `dist/helloWorld.js` sẽ được tạo.

Ở giai đoạn này, cấu trúc thư mục như sau.

```text title="Cấu trúc thư mục"
.
├── dist
│   └── helloWorld.js
├── node_modules
├── package.json
├── src
│   └── helloWorld.ts
├── tsconfig.json
└── yarn.lock
```

### Giới thiệu TypeScript ESLint

Install cả ESLint core và [TypeScript ESLint].

```shell
yarn add -D \
  'eslint@^8' \
  '@typescript-eslint/parser@^7' \
  '@typescript-eslint/eslint-plugin@^7'
```

TypeScript ESLint gồm 2 package. `@typescript-eslint/parser` là package để ESLint hiểu cú pháp TypeScript. `@typescript-eslint/eslint-plugin` là package thêm rule cho TypeScript.

Hiển thị version để xác nhận ESLint đã được install và có thể thực thi.

```shell
npx eslint -v
v8.15.0
```

### TypeScript ESLint có những rule nào?

Ngoài [hơn 200 rule](https://eslint.org/docs/rules/) của ESLint, giới thiệu TypeScript ESLint sẽ thêm hơn 100 rule. Danh sách rule được thêm có thể xác nhận trong [tài liệu TypeScript ESLint](https://typescript-eslint.io/rules/).

:::note Tóm tắt đến đây

- Đã tạo project mới `eslint-typescript-tutorial`.
- Đã install TypeScript và config `tsconfig.json`.
- Đã tạo `src/helloWorld.ts` với nội dung trống và thử compile.
- Đã install ESLint và TypeScript ESLint.

:::

### Giới thiệu shareable config cho TypeScript

Install shareable config tuân thủ coding convention [Airbnb JavaScript Style Guide].

```shell
yarn add -D \
  'eslint-config-airbnb-base@^15' \
  'eslint-plugin-import@^2' \
  'eslint-config-airbnb-typescript@^18'
```

`eslint-config-airbnb-base` là shareable config cho JavaScript. `eslint-config-airbnb-typescript` ghi đè cái này, thêm rule của TypeScript ESLint, và thêm setting loại trừ rule không cần check ESLint vì TypeScript compiler đã check. `eslint-plugin-import` là package cần giới thiệu theo dependency.

### Tạo file config của TypeScript ESLint

Để chạy TypeScript ESLint, cần tạo 2 file config sau.

- tsconfig.eslint.json
- .eslintrc.js

Tạo các file này ở project root.

```shell
touch tsconfig.eslint.json .eslintrc.js
```

```text title="Cấu trúc thư mục sau khi tạo"
.
├── .eslintrc.js
├── dist
│   └── helloWorld.js
├── node_modules
├── package.json
├── src
│   └── helloWorld.ts
├── tsconfig.eslint.json
├── tsconfig.json
└── yarn.lock
```

#### tsconfig.eslint.json

TypeScript ESLint sử dụng TypeScript compiler để sử dụng type information khi check. Config compiler khi đó viết trong `tsconfig.eslint.json`. Config compiler kế thừa nội dung `tsconfig.json` bằng `extends`, và chỉ viết phần cần ghi đè.

```json title="tsconfig.eslint.json"
{
  "extends": "./tsconfig.json"
}
```

Lần này, ngoài file TypeScript, cũng muốn bao gồm file config ESLint `.eslintrc.js` vào đối tượng check ESLint, nên thêm `allowJs` và ghi đè `include`.

```json {2-5} title="tsconfig.eslint.json"
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "allowJs": true
  },
  "include": ["src", ".*.js"]
}
```

`".*.js"` là pattern match các file JS bắt đầu bằng dấu chấm như `.eslintrc.js`. Dùng pattern match để có thể bao gồm các file config khác được giới thiệu trong tương lai vào đối tượng check.

Ngoài ra, với file config của test framework "Jest", có thể có file JS không bắt đầu bằng dấu chấm như `jest.config.js`. Dự đoán các file như vậy sẽ được thêm, nên cũng thêm sẵn `"*.js"`.

```json {5} title="tsconfig.eslint.json"
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "allowJs": true
  },
  "include": ["src", ".*.js", "*.js"]
}
```

Như vậy, đối tượng check TypeScript ESLint cần thêm vào `include`.

Thực thi lệnh sau để xác nhận `tsconfig.eslint.json` đã được config đúng.

```shell
npx tsc --showConfig --project tsconfig.eslint.json
```

Nếu config đúng, output như sau.

```text
{
    "compilerOptions": {
        "outDir": "./dist",
        "allowJs": true
    },
    "files": [
        "./src/helloWorld.ts",
        "./.eslintrc.js"
    ],
    "include": [
        "src",
        ".*.js",
        "*.js"
    ]
}
```

#### .eslintrc.js

Tiếp theo tạo file config ESLint `.eslintrc.js`. Nội dung như sau.

```js twoslash {3-4,12-13,15,18-19,23} title=".eslintrc.js"
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: ["dist"],
  extends: [
    "airbnb-base",
    "airbnb-typescript/base",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "double"],
  },
};
```

`root`, `env`, `ecmaVersion` và `sourceType` của `parserOptions` xem giải thích ở [tutorial trước](#eslintの設定ファイルを作る). Các option thêm chưa giải thích được giải thích dưới đây.

#### `parser`

```js twoslash {3}
module.exports = {
  // ...
  parser: "@typescript-eslint/parser",
  // ...
};
```

ESLint phân tích cú pháp JavaScript và TypeScript bằng parser set trong `parser`. Ví dụ trên chỉ định TypeScript parser. Không có chỉ định này, ESLint không thể hiểu TypeScript và sẽ xảy ra error.

TypeScript là ngôn ngữ mở rộng cú pháp JavaScript. Nên chỉ cần đưa parser này vào, không chỉ TypeScript mà JavaScript cũng có thể xử lý bằng một parser này. Nghĩa là, với parser này, có thể lint cả file TypeScript và JavaScript.

#### `plugins`

```js twoslash {3}
module.exports = {
  // ...
  plugins: ["@typescript-eslint"],
  // ...
};
```

ESLint ngoài rule do chính thức cung cấp, còn có thể sử dụng rule do bên thứ ba tạo. Rule do bên thứ ba tạo được công khai dưới dạng plugin. Thêm plugin vào field `plugins` này có thể thêm rule. Ví dụ trên, để thêm rule độc quyền của TypeScript ESLint, set `@typescript-eslint`.

#### `parserOptions` {#parser-options-2}

```js twoslash {3-7}
module.exports = {
  // ...
  parserOptions: {
    // ...
    project: "./tsconfig.eslint.json",
    tsconfigRootDir: __dirname,
  },
  // ...
};
```

`project` và `tsconfigRootDir` là option độc quyền của TypeScript ESLint. `tsconfigRootDir` chỉ định đường dẫn tuyệt đối của project root. `project` chỉ định file config compiler sử dụng khi thực thi ESLint bằng đường dẫn tương đối từ `tsconfigRootDir`. Các setting này cần thiết để TypeScript ESLint tham chiếu type information.

#### `ignorePatterns`

```js twoslash {3}
module.exports = {
  // ...
  ignorePatterns: ["dist"],
  // ...
};
```

`ignorePatterns` là option chỉ định file hoặc thư mục không phải đối tượng check ESLint. Trong TypeScript project, JavaScript được tạo bởi compile thường không lint. Nên loại trừ thư mục `dist` khỏi đối tượng check.

#### `extends`

```js twoslash {3-7}
module.exports = {
  // ...
  extends: [
    "airbnb-base", // ①
    "airbnb-typescript/base", // ②
    "plugin:@typescript-eslint/recommended-requiring-type-checking", // ③
  ],
  // ...
};
```

`extends` là setting để sử dụng shareable config. ① là rule cho JavaScript. ② mở rộng cái này và mở rộng phạm vi sang rule của TypeScript ESLint. ① và ② phải theo thứ tự trên nếu không sẽ không được config đúng.

③ là recommended rule set do TypeScript ESLint cung cấp, bao gồm rule cần type information. Rule nào được kích hoạt trong rule set này xem [tài liệu chính thức](https://typescript-eslint.io/rules/).

#### `rules`

```js twoslash {3-6}
module.exports = {
  // ...
  rules: {
    "import/prefer-default-export": "off",
    "@typescript-eslint/quotes": ["error", "double"],
  },
  // ...
};
```

`rules` ở đây được dùng để ghi đè rule được kích hoạt bởi shareable config. Rule được thêm bởi TypeScript ESLint có prefix `@typescript-eslint/`.

:::note Tóm tắt đến đây

- Đã install shareable config tuân thủ coding convention Airbnb JavaScript Style Guide.
- Đã tạo file config của TypeScript ESLint.
  - tsconfig.eslint.json
  - .eslintrc.js

:::

### Check TypeScript

Đã sẵn sàng để dùng TypeScript ESLint, giờ hãy thực sự check TypeScript.

Đầu tiên, viết code sau vào `src/helloWorld.ts` đang trống và save.

```ts twoslash title="src/helloWorld.ts"
export const hello_world = "Hello World";
console.log(hello_world);
```

Sau đó, thực thi ESLint.

```shell
npx eslint .
```

Sẽ có output kết quả sau.

![](/img/tutorial/eslint/terminal-npx-eslint-src-typescript.svg)

2 vấn đề được báo cáo. Cái đầu tiên là error về naming convention không được tuân thủ. Cái thứ hai là warning về việc `console.log` được sử dụng.

Hãy sửa những vấn đề này. Thay đổi `src/helloWorld.ts` thành nội dung sau và save.

```ts twoslash title="src/helloWorld.ts"
export const helloWorld = "Hello World";
```

Thực thi lại ESLint để xác nhận vấn đề đã được giải quyết.

```shell
npx eslint .
```

Nếu output kết quả không hiển thị gì, vấn đề đã được giải quyết.

Vậy là tutorial lint TypeScript bằng ESLint đã kết thúc.

## Tích hợp VS Code và ESLint

[tích hợp vs code và eslint]: #tích-hợp-vs-code-và-eslint

:::info
Bước này là nội dung cho người dùng VS Code. Người dùng JetBrains IDE như WebStorm, xem [Tích hợp JetBrains IDE và ESLint]. Người mới giới thiệu VS Code, download từ [trang web chính thức VS Code](https://code.visualstudio.com/download).
:::

Ở đây giải thích cách tích hợp ESLint vào Visual Studio Code (VS Code).

ESLint có thể check coding convention chỉ bằng một lệnh, đã rất tiện lợi. Tuy nhiên, tích hợp VS Code và ESLint còn tiện hơn. Vì có thể nhận feedback vấn đề realtime khi viết code.

<figure><figcaption>Cách error ESLint hiển thị trong VS Code</figcaption>

![](/img/tutorial/eslint/vscode-eslint-example.png)

</figure>

Để tích hợp VS Code và ESLint, chỉ cần install [extension ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) từ Visual Studio Code marketplace.

![](/img/tutorial/eslint/vscode-marketplace.png)

## Tích hợp JetBrains IDE và ESLint

[tích hợp jetbrains ide và eslint]: #tích-hợp-jetbrains-ide-và-eslint

:::info
Bước này là nội dung cho người dùng JetBrains IDE (WebStorm, IntelliJ IDEA, PyCharm, v.v.). Người dùng VS Code, xem [Tích hợp VS Code và ESLint].
:::

Ở đây giải thích cách tích hợp ESLint vào JetBrains IDE như WebStorm.

ESLint có thể check coding convention chỉ bằng một lệnh, đã rất tiện lợi. Tuy nhiên, tích hợp JetBrains IDE và ESLint còn tiện hơn. Vì có thể nhận feedback vấn đề realtime khi viết code.

<figure><figcaption>Cách error ESLint hiển thị trong WebStorm</figcaption>

![](/img/tutorial/eslint/webstorm-eslint-example.png)

</figure>

WebStorm có sẵn tính năng tích hợp ESLint, nên không cần install plugin, v.v. Để enable ESLint, mở "Preferences", nhập "eslint" vào ô tìm kiếm (①). Mở "ESLint" từ menu được lọc (②). Check vào "Automatic ESLint configuration" (③). Cuối cùng nhấn "OK" để hoàn tất setting (④).

![](/img/tutorial/eslint/webstorm-eslint-config.png)
