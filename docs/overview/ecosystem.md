---
image: /overview/ecosystem/typescript-ecosystem-map.png
---

# TypeScript và hệ sinh thái

[![](/overview/ecosystem/typescript-ecosystem-map.svg)](/overview/ecosystem/typescript-ecosystem-map.svg)

Khi học TypeScript, việc hiểu bản thân TypeScript là không thể thiếu. Tuy nhiên, chỉ như vậy thường không đủ cho công việc thực tế. Trong thực tế, phát triển được thực hiện bằng cách kết hợp TypeScript với nhiều technology stack khác nhau. Do đó, việc biết hệ sinh thái xung quanh TypeScript cũng quan trọng như việc biết TypeScript.

Nếu phần trước [Bối cảnh ra đời của TypeScript](./before-typescript.md) là lịch sử học, thì phần này là địa lý học. Chúng ta sẽ học tổng quan về mối quan hệ với TypeScript và vai trò của từng công nghệ, tập trung vào technology stack frontend.

## Ngôn ngữ

ECMAScript là specification định nghĩa JavaScript. ECMAScript xử lý specification phần core của JavaScript. WHATWG định nghĩa specification JavaScript liên quan đến browser. Ngoài ra còn có ngôn ngữ JSX cho phép viết cú pháp XML trong JavaScript. TypeScript là ngôn ngữ mở rộng JavaScript. Nó cũng tích hợp JSX. Do đó, specification của TypeScript bao gồm những thứ có nguồn gốc từ ECMAScript, có nguồn gốc từ WHATWG, JSX, và specification riêng của TypeScript.

[ECMAScript](./ecmascript.md)

## Library

### UI Library

Với HTML, CSS và JavaScript, bạn có thể tạo web application có UI. Tuy nhiên, việc tạo UI phức tạp chỉ với JavaScript thuần thường tốn nhiều công sức. JavaScript có nhiều library giúp dễ dàng tạo UI. Trong số đó, phổ biến nhất là React, Vue, Angular và Svelte. Sử dụng UI library có lợi ích như có thể implement với ít code hơn so với viết JavaScript thuần, hoặc viết code có khả năng bảo trì cao hơn.

[React](../tutorials/react-like-button-tutorial.md)

### Frontend Framework

Mặc dù phát triển web application có nhiều yêu cầu đa dạng, nhưng có những pattern có thể đóng khung ở mức độ nhất định như yêu cầu chung cho mọi ứng dụng, cấu trúc file. Frontend framework là nền tảng của web application, cho phép bạn bắt đầu phát triển mà không cần phát minh lại bánh xe cho các tính năng thường gặp.

Trong số các frontend framework được sử dụng phổ biến có Next.js, Nuxt, Gatsby. Sử dụng chúng, bạn không cần tự implement cơ sở hạ tầng chức năng cần thiết cho frontend như single-page application (SPA), static site generation, server-side rendering.

[Next.js](../tutorials/nextjs.md)

### Type Definition File

TypeScript có thể kiểm tra lỗi chương trình bằng cách kiểm tra kiểu. Tuy nhiên, library được tạo chỉ bằng JavaScript không có thông tin kiểu mà TypeScript compiler cần để kiểm tra.

TypeScript có tính năng gọi là type definition file để cung cấp thông tin kiểu cho library JavaScript thuần. Type definition file là file ghi lại thông tin kiểu của library.

Khi muốn sử dụng library JavaScript thuần, nếu bạn lấy type definition file riêng biệt với library, bạn có thể kiểm tra kiểu TypeScript ngay cả với library JavaScript. Nhiều type definition file được công bố bởi dự án DefinitelyTyped.

## Môi trường chạy

Môi trường chạy JavaScript chia thành 2 loại lớn: browser và server. Browser có rendering engine là component vẽ màn hình. Rendering engine có Blink, Webkit, Gecko.

Hơn nữa, bên trong rendering engine có JavaScript engine. Code JavaScript được đánh giá và chạy bởi engine này. JavaScript engine có V8, SpiderMonkey, JavaScriptCore.

Môi trường chạy server có Node và Deno. Node là môi trường chạy JavaScript nổi tiếng nhất. Deno là môi trường chạy được chú ý gần đây vì có thể chạy TypeScript trực tiếp. Môi trường chạy server không có rendering engine như browser, nhưng có JavaScript engine chung với browser.

[ECMAScript](./ecmascript.md)

## Công cụ phát triển

### Package Manager

Package manager là công cụ quản lý library JavaScript. Sử dụng package manager, bạn có thể install hoặc update library JavaScript. Nó cũng quản lý dependency giữa các library. Trong số các package manager, npm và Yarn được sử dụng rộng rãi. npm là viết tắt của Node package manager, nhưng nó xử lý không chỉ library cho server-side JavaScript mà còn nhiều library cho frontend.

Library được install bởi npm hoặc Yarn được host trên npmjs.com. npmjs.com là registry tập trung.

### Module Bundler

Module bundler là công cụ kết hợp nhiều file JavaScript thành một file. Khi có dependency giữa nhiều file JavaScript, nếu load chúng trực tiếp vào browser, ứng dụng sẽ bị hỏng trừ khi chỉ định thứ tự load cẩn thận. Vấn đề như vậy có thể tránh được bằng module bundler.

Ngoài ra, ở frontend, cần download ứng dụng JavaScript xuống browser. Ứng dụng bao gồm nhiều file có thể download hiệu quả hơn dưới dạng 1 file bằng module bundler.

Sử dụng module bundler cũng có lợi ích như có thể sử dụng library được tạo cho server-side sử dụng CommonJS trên browser.

### Task Runner

Task runner là công cụ tự động hóa quy trình phát triển như build. Nó có thể gom nhiều build task lại hoặc điều chỉnh thứ tự thực thi. Sử dụng task runner, bạn có thể chạy workflow build phức tạp chỉ với một lệnh.

### Transpiler

Transpiler là công cụ chuyển đổi code viết bằng một ngôn ngữ lập trình sang ngôn ngữ khác. Transpiler là một loại compiler. Trong JavaScript, có transpiler chuyển đổi từ phiên bản JavaScript mới sang phiên bản cũ. Babel và swc là như vậy. tsc (TypeScript compiler) của TypeScript cũng là transpiler. tsc thực hiện chuyển đổi từ TypeScript sang JavaScript.

### Code Formatter

Code formatter là công cụ tự động chỉnh sửa indentation và kiểu thụt lề của source code. Sử dụng code formatter, ai viết cũng có thể format thành code có cùng giao diện. Công cụ được sử dụng phổ biến là Prettier.

[Prettier](./../tutorials/prettier.md)

### Linter

Linter là công cụ kiểm tra xem code có tuân thủ coding convention hay không. Việc viết code theo coding convention giúp tăng khả năng bảo trì. Tuy nhiên, việc kiểm tra thủ công xem code có tuân thủ coding convention hay không là công việc khó khăn. Sử dụng linter có thể kiểm tra tự động, nên có thể mong đợi tăng năng suất developer. Công cụ linter được sử dụng phổ biến là ESLint.

[ESLint](./../tutorials/eslint.md)

### Git Hook

Git hook là tính năng chạy chương trình nào đó vào thời điểm commit hoặc push Git. Trong phát triển JavaScript, thường hay kiểm tra kiểu bằng TypeScript compile, chạy kiểm tra linter, hoặc format code bằng code formatter khi Git commit. Công cụ giúp dễ dàng sử dụng Git hook có husky và lint-staged.

[husky](../tutorials/husky.md)
