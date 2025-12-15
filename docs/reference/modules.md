# 🚧Module

:::caution
**Experimental!** Trang này là bản thảo đang được viết. Cấu trúc có thể thay đổi lớn, nên nếu liên kết đến trang này, xin lưu ý rằng liên kết có thể bị hỏng. Nội dung trang này được tái cấu trúc và bổ sung dựa trên [import, export, require](./import-export-require.md).
:::

## Cơ bản về Module

### Mục đích của Module

Chương trình có nhiều kích thước khác nhau. Về số dòng code, có thể từ vài dòng đến hàng chục nghìn dòng.

Với chương trình nhỏ, một file là đủ, nhưng với chương trình lớn thì việc tạo trong một file duy nhất rất khó khăn.

Hãy tưởng tượng: trạng thái mà chương trình hàng nghìn dòng được nhồi nhét vào một file sẽ khó đọc và khó sửa.

1. **Vấn đề về khả năng bảo trì** ─ Khả năng bảo trì thấp. Vì lượng lớn code được nhồi nhét vào một file nên khó thay đổi. Vì tầm nhìn code kém, không thể dự đoán được một thay đổi một dòng sẽ ảnh hưởng như thế nào đến hàng nghìn dòng khác. Điều này cũng là nguyên nhân khiến người ta trở nên rụt rè với việc thay đổi.
2. **Xung đột tên biến** ─ Khi code dài, nguy cơ xung đột tên biến tăng cao. Điều này có thể dẫn đến việc ghi đè biến không liên quan. Để tránh điều này, đôi khi phải dùng tên biến dài, nhưng điều đó lại làm giảm khả năng đọc.
3. **Vấn đề về tái sử dụng** ─ Ví dụ, nếu muốn sử dụng chỉ một phần cụ thể trong hàng nghìn dòng code cho dự án khác, vì chúng được gộp thành một khối lớn nên không thể trích xuất chỉ phần cần thiết. Nếu cố đọc vào, code không cần thiết cũng sẽ được đọc vào, và không thể dự đoán được nó sẽ gây hại như thế nào.

Cơ chế để giải quyết những vấn đề này được gọi là **module**. Module cho phép chia một file thành nhiều file, liên kết chúng và chạy như một chương trình.

Khi tạo chương trình quy mô lớn, bằng cách chia module theo từng chức năng, mỗi module trở nên dễ đọc hơn, khả năng bảo trì cao hơn và dễ tái sử dụng hơn.

### Module trong JavaScript

Module JavaScript là file JavaScript chứa ít nhất một `export` hoặc `import`.

- `export` là từ khóa để công khai biến cho các module khác.
- `import` là từ khóa để import biến từ các module khác.

Sử dụng `export` và `import` cho phép truyền biến giữa các module.

Ví dụ, sau đây là module export biến `world`.

```ts twoslash title="world.js"
export const world = "World";
```

Import và sử dụng nó trong file khác.

```ts twoslash title="hello.js"
// @filename: world.js
export const world = "World";
// @filename: hello.js
// ---cut---
import { world } from "./world";
console.log(`Hello ${world}`);
// @log: Hello World
```

### Công khai và không công khai giá trị

Trong module JavaScript, chỉ các giá trị được gắn `export` một cách rõ ràng mới được công khai và có thể tham chiếu từ các module khác. Ví dụ, `publicValue` trong ví dụ sau có thể được sử dụng từ các module khác. Mặt khác, `privateValue` không thể sử dụng từ bên ngoài.

```js twoslash
export const publicValue = 1;
const privateValue = 2;
```

Trong module JavaScript, biến và hàm mặc định là không công khai. Trong một số ngôn ngữ khác như Java, thành viên của module (package) mặc định là công khai, và cần gắn modifier `private` cho những gì muốn giữ riêng tư. So với những ngôn ngữ đó, phương châm cơ bản của JavaScript ngược lại, cần lưu ý.

### Sự khác biệt giữa Package và Module

Một thuật ngữ tương tự với module là package. Tùy theo ngôn ngữ lập trình, định nghĩa của module và package khác nhau. Trong JavaScript, chúng được hiểu như thế nào?

Module về cơ bản chỉ từng file JavaScript/TypeScript. Chi tiết sẽ được giải thích trong phần "[Script và Module](https://typescriptbook.jp/reference/import-export-require#%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88%E3%81%A8%E3%83%A2%E3%82%B8%E3%83%A5%E3%83%BC%E3%83%AB)", nhưng trong số các file JavaScript/TypeScript, những file chứa ít nhất một `export` hoặc `import` là module.

Package là thư mục có package.json và các file JavaScript. package.json là file ghi các metadata như tên package, version, license.

Module và package có sự khác biệt về mục đích sử dụng. Trong phát triển ứng dụng thông thường, ta phát triển bằng cách chia thành nhiều file JavaScript/TypeScript. Mỗi file được tạo ra lúc này là một module. Module được sử dụng để đảm bảo khả năng bảo trì ứng dụng, đảm bảo khả năng tái sử dụng code và tránh xung đột tên biến.

Mặt khác, mục đích điển hình của package là phân phối. Package được sử dụng khi người tạo library muốn phân phối chương trình cho người khác. Và người phát triển ứng dụng sử dụng package bằng cách tích hợp nó vào ứng dụng của mình.

## Module và Ecosystem

### Bundler

Trong JavaScript, việc nối nhiều file JavaScript thành một file được gọi là bundle. Công cụ phát triển tự động thực hiện bundle được gọi là bundler. Bundler đôi khi còn được gọi là "module bundler".

JavaScript có nhiều bundler khác nhau. Ví dụ, các bundler nổi tiếng bao gồm:

- webpack
- rollup
- parcel
- esbuild
- vite

Những bundler này không chỉ bundle JavaScript mà còn có thể bundle TypeScript, CSS, hình ảnh và nhiều loại file khác.

#### Lý do cần Bundler

Nếu không sử dụng bundler JavaScript, cần đọc nhiều file JavaScript riêng lẻ để chạy web application. Điều này gây ra một số vấn đề.

Thứ nhất, khi web browser đọc code JavaScript, sẽ tốn nhiều thời gian hơn.

Thứ hai, do các phụ thuộc giữa các file JavaScript không được sắp xếp, code có thể bị hỏng và gây ra bug.

Thứ ba, nếu code JavaScript không được viết theo cách tối ưu hóa, hiệu suất thực thi ứng dụng có thể kém.

Vai trò của bundler là giải quyết những vấn đề như vậy.

#### Lợi ích của Bundler ít hơn ở Server-side JS

JavaScript được tạo ra để thực thi trên web browser, nhưng cũng có thể sử dụng ở server-side. Một trong những môi trường thực thi JavaScript server-side là Node.js. Node.js đã implement hệ thống module nội bộ từ lâu, nên có thể sử dụng module từ thời JavaScript chưa có hệ thống module như ES module. Do đó, nhu cầu về bundler không phát sinh trong môi trường JavaScript server-side.

JavaScript ngày nay có hệ thống module nên có thể thực hiện module mà không cần bundler. Điều này cũng đúng với frontend. Tuy nhiên, ở frontend, việc download và thực thi riêng lẻ hàng trăm, hàng nghìn module tốn thời gian, nên vai trò của bundler gộp chúng thành một file JavaScript vẫn còn quan trọng.

Mặt khác, ở server-side, dù có hàng trăm, hàng nghìn module, việc load module chỉ xảy ra khi khởi động server. Do đó, lợi ích của bundler gần như không có.

## Hệ thống Module

### CommonJS và ES Module

### Lý do CommonJS và ES Module cùng tồn tại

Trong số các bạn đang đọc bài này, có lẽ có người đã có kinh nghiệm với ngôn ngữ lập trình khác ngoài JavaScript hoặc TypeScript. Bạn đã từng sử dụng ngôn ngữ có nhiều hệ thống module cùng tồn tại chưa?

JavaScript có ít nhất 2 hệ thống module thuộc các dòng khác nhau. ES module và CommonJS. Tình huống này khá hiếm đối với ngôn ngữ lập trình. Đây cũng là yếu tố làm cho việc hiểu về module JavaScript trở nên khó khăn.

Vậy tại sao JavaScript lại có 2 dòng hệ thống module? Ở đây, chúng ta sẽ tìm hiểu lịch sử dẫn đến tình trạng hiện tại của JavaScript.

#### Hệ thống Module đầu tiên

Hệ thống module của JavaScript có lịch sử phát triển trong bối cảnh server-side JavaScript, đặc biệt là Node.js, trước browser.

Một trong những hệ thống module phổ biến rộng rãi trong JavaScript là CommonJS. Truy ngược lịch sử CommonJS, ta đến năm 2009 khi ServerJS được thành lập. ServerJS là dự án chuẩn hóa nhằm thiết lập API chung cho server-side JavaScript, với mục tiêu cho phép sử dụng JavaScript ở server-side. Sau đó, nó được đổi tên thành CommonJS.

Nói đơn giản là đưa JavaScript lên server-side, nhưng việc mang JavaScript của browser sang y nguyên sẽ không hoạt động. Ví dụ, browser có thẻ `<script>`, nên bằng cách viết nhiều thẻ `<script>` trong một trang, có thể thực thi nhiều JavaScript. Mặt khác, server-side không có khái niệm trang.

Ngoài ra, JavaScript thời đó không có hệ thống module như ES module. Do đó, phải bắt đầu từ việc nghĩ ra cơ chế load nhiều file JavaScript.

Từ đó, specification được nghĩ ra là module của CommonJS. Đó là `require()` và `module.exports` quen thuộc. CommonJS là thứ thực hiện thứ giống như module bằng cách sử dụng function và variable một cách khéo léo, trong khuôn khổ syntax và feature của JavaScript thời đó không có hệ thống module.

Node.js được release cùng thời với CommonJS, và hệ thống module được Node.js adopt chính là CommonJS. Nhờ đó, trong Node.js, server-side JavaScript cũng có thể chia file và load nhiều file. Hệ thống module này bắt đầu được Node.js user chấp nhận, và ecosystem xung quanh module như npm cho phép publish library cũng phát triển.

Nhân tiện, năm trước khi CommonJS và Node.js bắt đầu, năm 2008, có sự kiện gây sốc là ECMAScript 4 draft bị hủy bỏ. ES4 cũng bao gồm specification thêm hệ thống module vào JavaScript. Nếu ES4 được thực hiện, có lẽ CommonJS đã không cần thiết. Thực tế, có ý kiến và đối lập giữa các browser vendor quyết định ES specification, và nỗ lực cải thiện JavaScript đã kết thúc trong bất hòa.

Thời điểm Node.js xuất hiện đúng lúc tồi tệ như vậy, nên không thể kỳ vọng nhiều vào việc JavaScript tự cải thiện hệ thống module. Do đó, có thể nói Node.js đã adopt CommonJS như giải pháp trong phạm vi JavaScript hiện có cho hệ thống module.

CommonJS ra đời và phát triển ở server-side. Nhiều library được xây dựng trên nền tảng CommonJS. Những library như vậy cũng có nhu cầu ở client-side. Do đó, module bundler như webpack đã support CommonJS. Dù nguồn gốc của CommonJS là server-side, nhờ sự hỗ trợ của module bundler, tình huống frontend cũng phụ thuộc vào CommonJS đã được hình thành.

#### Hệ thống Module thứ hai

Từ khi CommonJS ra đời, lịch sử trôi qua, đến năm 2015, specification JavaScript mới ES6 được xác định. Đây là bản cập nhật lớn đầu tiên của JavaScript sau hơn mười năm. Trong đó có specification ES6 Modules để thực hiện hệ thống module. Đó là câu lệnh `import` và `export` mà các bạn đều biết. Đây là hệ thống module native JavaScript đầu tiên của JavaScript. Nếu CommonJS là hệ thống module được chuẩn hóa bởi hoạt động cơ sở, thì ES module có thể nói là hệ thống module chính thức, tiêu chuẩn do nhà phát triển gốc công bố.

Giới JavaScript, bất kể server-side hay client-side, trong quá trình hỗ trợ ES6, cũng hướng đến việc giới thiệu ES6 Modules, và thảo luận về việc giới thiệu ES module bắt đầu từ khoảng năm 2016. Trọng tâm của thảo luận tất nhiên là về sự cùng tồn tại của hệ thống module truyền thống CommonJS và hệ thống mới ES module.

Vào thời điểm specification ES module được xác định, JavaScript đã có môi trường dựa trên tiền đề CommonJS, và cũng có nhiều NPM package tuân thủ CommonJS, nên không có lựa chọn loại bỏ CommonJS. Nếu loại bỏ CommonJS, sẽ mất gần như toàn bộ tài sản quá khứ, nên sự cùng tồn tại của CommonJS và ES module là chủ đề quan trọng đối với Node.js.

Ví dụ, chỉ riêng Node.js server-side JavaScript, sau nhiều thảo luận dài, năm 2017, ES module được release như tính năng thử nghiệm trong Node.js v8.5.0. Sau đó, năm 2019, trong v13.2.0, label "tính năng thử nghiệm" được gỡ bỏ khỏi ES module, và nó được nâng cấp thành tính năng được thiết kế cho production. Và năm 2020, named export của CommonJS có thể được load bằng named import của ES module, và môi trường để chạy ES module trong Node.js dần được hoàn thiện.

Dù môi trường ES module đã được hoàn thiện, CommonJS đã hỗ trợ JavaScript hơn 10 năm, và đã trở thành mối quan hệ không thể tách rời. Do đó, hiện tại, hai hệ thống module đang cùng tồn tại trong JavaScript.

#### Tóm tắt

- JavaScript có 2 hệ thống module: CommonJS và ES module.
- CommonJS có mối liên hệ sâu và dài hơn 10 năm với JS.
- Giới JS đã chọn con đường cùng tồn tại CommonJS và ES module.

### Sự khác biệt giữa CommonJS và ES Module

#### Sự khác biệt giữa `import` và `require`

Trong JavaScript, khi import giá trị như biến từ module, ta sử dụng `import` và `require`. Hai cái này rất giống nhau, nhưng là cách viết của các hệ thống module khác nhau.

JavaScript có một số hệ thống module, nhưng hai cái đại diện là:

- ES module
- CommonJS

Chi tiết về sự khác biệt giữa hai hệ thống module này được giải thích trong **(TODO tham chiếu bài viết)**, xin hãy xem ở đó.

##### import

`import` là syntax được sử dụng trong ES module, một trong những hệ thống module của JavaScript. `import` được sử dụng để import biến và function được export trong các module khác. Ví dụ, có thể sử dụng như sau.

```js
import { myVariable, myFunction } from "./myModule";
```

##### require

Mặt khác, `require` là function được sử dụng trong hệ thống module CommonJS. Function `require` được sử dụng để import biến và function từ các module khác. Ví dụ, cách sử dụng như sau.

```js
const { myVariable, myFunction } = require("./myModule");
```

#### Sự khác biệt giữa `export` và `module.exports`

`import` và `require` dùng để import giá trị từ các module khác. Tương ứng với chúng là `export` và `module.exports`. Chúng dùng để export giá trị cho các module khác. `export` và `module.exports` cũng được sử dụng trong các hệ thống module khác nhau.

##### export

`export` của JavaScript là syntax được sử dụng trong hệ thống module ES module. Sử dụng `export`, có thể export biến và function được định nghĩa trong module. Ví dụ, có thể sử dụng như sau.

```js
export const myVariable = "foo";
export const myFunction = () => {
  /* Xử lý function */
};
```

##### module.exports

Mặt khác, `module.exports` là biến được sử dụng trong hệ thống module CommonJS. Trong CommonJS, bằng cách gán biến và function được định nghĩa trong module vào `module.exports`, có thể export chúng. Ví dụ, cách viết như sau.

```js
module.exports.myVariable = "foo";
module.exports.myFunction = () => {
  /* Xử lý function */
};
```

## Syntax của ES Module

## Module Resolution

## Specification của ES Module

## API của CommonJS

## TypeScript và Module

## Best Practices của ES Module
