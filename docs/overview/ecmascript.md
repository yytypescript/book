# ECMAScript

ECMAScript là specification của JavaScript. TypeScript cũng tuân thủ ECMAScript. Chúng tôi sẽ giải thích ECMAScript là gì, quy trình cải tiến specification, và mối quan hệ giữa ECMAScript và browser như thế nào.

## Mối quan hệ giữa JavaScript và ECMAScript

ECMAScript định nghĩa specification của JavaScript. Specification là các quy tắc, quyết định browser và các thứ khác phải hiểu cú pháp nào khi đọc JavaScript, xử lý sẽ hoạt động như thế nào. Mặc dù có tên khác là ECMAScript, nhưng không có ngôn ngữ khác riêng biệt với JavaScript.

Về lịch sử, ECMAScript được định nghĩa để chuẩn hóa JavaScript. JavaScript là ngôn ngữ do Netscape phát triển. Ngay sau khi Netscape công bố, Microsoft cũng implement với tên JScript. Netscape đã yêu cầu tổ chức tiêu chuẩn quốc tế Ecma International chuẩn hóa JavaScript. JavaScript được chuẩn hóa bởi Ecma được gọi là "ECMAScript".

ECMAScript hiện tại có vai trò là specification của JavaScript. Đây là specification mà các implementation JavaScript như browser phải tuân theo. Từ mối quan hệ này, đôi khi người ta gọi JavaScript để chỉ implementation của ECMAScript. ECMAScript là specification nên không có chương trình gọi là ECMAScript. Tức là không phải thứ để download hay install.

Có nhiều giả thuyết về lý do specification JavaScript được đặt tên là "ECMAScript". Có giả thuyết rằng đây là giải pháp thỏa hiệp có thể đồng ý giữa Netscape và Microsoft, hai công ty cạnh tranh lúc đó. Netscape phát triển với tên JavaScript, Microsoft phát triển với tên JScript. Việc JavaScript là thương hiệu cũng được cho là một nguyên nhân. JavaScript lúc đó là thương hiệu thuộc sở hữu của Sun. Sau đó, quyền được chuyển cho Oracle.

ECMAScript được định nghĩa bởi Ecma International. Tổ chức này định nghĩa nhiều tiêu chuẩn quốc tế về công nghệ thông tin. Mỗi tiêu chuẩn được gán một số. Số tiêu chuẩn của ECMAScript là ECMA-262. Ngoài ra còn có JSON (ECMA-404) và C# (ECMA-334). Ecma International có nhiều ủy ban chuyên môn khác nhau, và ủy ban định nghĩa ECMAScript có tên là TC39.

## Cải tiến specification ECMAScript

ECMAScript được cải tiến specification mỗi năm một lần. Mỗi lần cải tiến, version sẽ tăng lên. Version của ECMAScript là năm dương lịch khi release. Ví dụ, ECMAScript được cải tiến năm 2021 sẽ là ES2021. TypeScript cũng được update theo cải tiến specification của ECMAScript.

Cải tiến ECMAScript bắt đầu từ các đề xuất được tuyển mộ. Các đề xuất cải tiến có thể xem tại [GitHub của TC39](https://github.com/tc39/proposals).

Tùy theo tiến độ, mỗi đề xuất được gán rank từ stage 0 đến stage 4. Khi đáp ứng điều kiện, đề xuất có thể tiến lên stage đó.

| Stage         | Điều kiện                                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 0 Strawperson | Không có                                                                                                                                                                 |
| 1 Proposal    | Có champion (đối tác thúc đẩy cải tiến của ủy ban). Repository giải thích vấn đề và giải pháp được công bố. Có demo thì tốt                                              |
| 2 Draft       | Specification của phần chính được viết bằng ngôn ngữ mô tả specification của ECMAScript                                                                                  |
| 3 Candidate   | Có specification hoàn chỉnh. Có chữ ký của reviewer và editor ECMAScript                                                                                                 |
| 4 Finished    | Có implementation trong 2 JS engine trở lên. Pull request đã được gửi đến ECMAScript và được editor ECMAScript phê duyệt                                                |

Đề xuất stage 2 trở xuống có khả năng cao specification sẽ thay đổi lớn. Khả năng đề xuất bị rút cũng cao.

Khi đạt stage 3, cải tiến gần như chắc chắn. TypeScript đối ứng các đề xuất đạt stage 3. Thời điểm này, browser cũng implement đề xuất stage 3. Có trường hợp implementation bị trễ.

Khi đạt stage 4, gần như chắc chắn sẽ trở thành specification của ECMAScript. Đề xuất stage 4 được thêm vào cải tiến ECMAScript vào tháng 6 hàng năm. Lịch trình năm đại khái cho đến cải tiến như sau.

- Tháng 2: Candidate draft được tạo
- Tháng 3: Đề xuất stage 4 được tích hợp, specification cuối cùng được phê duyệt
- Tháng 4~6: Thời gian review của ECMA CC và ECMA GA
- Tháng 6: Sau khi được phê duyệt bởi đại hội ECMA, specification cải tiến được xác nhận

## ECMAScript và specification browser

Specification JavaScript client-side mà ECMAScript quyết định là một phần. Phạm vi ECMAScript định nghĩa là phần core của ngôn ngữ như cú pháp ngôn ngữ, cách giải thích cú pháp, API core. Ví dụ, nó định nghĩa những điều sau.

- Cú pháp khai báo hàm như thế này
- Khi biến được khai báo, JavaScript engine hoạt động như thế này
- `String` và `Array` object có những method này

Phần liên quan đến specification browser trong JavaScript được quyết định bởi HTML Living Standard. Khi sử dụng JavaScript trong browser, bạn sẽ tiếp xúc với `window` object, `HTMLDivElement`, API như local storage. Chúng được định nghĩa bởi tiêu chuẩn gọi là [HTML Living Standard](https://html.spec.whatwg.org/). Tiêu chuẩn này được định nghĩa bởi WHATWG, tổ chức chuẩn hóa khác với Ecma International.

Trong các tính năng JavaScript, cũng có những tính năng phân chia vai trò giữa ECMAScript và HTML Living Standard. Ví dụ là module. ECMAScript định nghĩa specification của module. Cú pháp `import` và `export`, specification bên trong module được ECMAScript định nghĩa. Mặt khác, cách load module cụ thể được HTML Living Standard định nghĩa. Ví dụ, có thể viết chuỗi gì trong phần specifier của `import "specifier";`, module được load theo thứ tự nào được HTML Living Standard định nghĩa.

[Module](../reference/modules.md)

"JavaScript" tuy chỉ là một từ nhưng được cấu thành từ nhiều tiêu chuẩn.

## Mối quan hệ giữa ECMAScript và browser

Phân tách bên trong của các browser chính, có đơn vị component gọi là rendering engine và JavaScript engine.

JavaScript engine là module implement ECMAScript. Trong số các JavaScript engine chính có V8, SpiderMonkey, JavaScriptCore.

Rendering engine là module đảm nhận chức năng hiển thị browser tích hợp JavaScript engine. Rendering engine nổi tiếng có Blink, Gecko, WebKit. Ví dụ, Blink sử dụng V8 làm JavaScript engine. Rendering engine không chỉ JavaScript mà còn hiểu HTML và CSS, thực hiện vẽ màn hình tổng hợp.

Browser tích hợp rendering engine, thêm các tính năng phụ thuộc khác như bookmark và cung cấp cho người dùng dưới dạng ứng dụng. Ví dụ, Google Chrome tích hợp Blink, Safari tích hợp WebKit. Browser cũng có thể thay đổi rendering engine. Microsoft Edge trước đây sử dụng EdgeHTML, nhưng sau đó chuyển sang Blink giống Google Chrome. Rendering engine của Opera cũng từng là Presto nhưng đã đổi sang Blink.

Ngay cả cùng brand browser, rendering engine của browser phiên bản iOS là WebKit. Ví dụ, Google Chrome sử dụng Blink, nhưng rendering engine của Google Chrome phiên bản iOS là WebKit. Điều này là vì chỉ WebKit được phép sử dụng độc quyền làm rendering engine trên iOS.

<figure>
<figcaption>Sơ đồ mối quan hệ giữa Browser, Rendering Engine, JavaScript Engine, ECMAScript</figcaption>
<a href="/img/overview/ecmascript/browser-rendering-engine-javascript-engine-ecmascript-relations.svg" target="_blank"><img src="/img/overview/ecmascript/browser-rendering-engine-javascript-engine-ecmascript-relations.svg" width="800"/></a>
</figure>

Việc TypeScript programmer hiểu mối quan hệ giữa browser và engine là quan trọng. Biết engine đồng nghĩa với việc nắm được môi trường chạy chương trình đã phát triển. Engine tuân thủ specification tối đa có thể, nhưng implementation có thể khác nhau tùy engine. Tùy engine có thể có specification chưa được implement. Ngoài ra, tùy browser có thể đang sử dụng engine cũ.

Khi test chương trình, nếu hiểu tổ hợp browser và engine, có thể bỏ qua test cho browser sử dụng cùng engine. Như ví dụ độc quyền WebKit trên iOS, ngay cả browser cùng brand name cũng có thể có engine khác nhau. Trong trường hợp này, có thể đưa ra quyết định tăng browser cần cover trong test.

<PostILearned>

・ECMAScript (ES) là specification của JavaScript
・ES được định nghĩa bởi ủy ban TC39 của Ecma International
・ES được cải tiến vào tháng 6 hàng năm
・Đề xuất cải tiến ES được tuyển mộ và được chấp nhận ở stage 4
・Browser có rendering engine và JS engine
・JS engine implement ES

</PostILearned>
