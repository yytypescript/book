---
image: /img/range-of-typescript.png
---

# Phạm vi ứng dụng của TypeScript

Học TypeScript, bạn có thể tạo nhiều thứ khác nhau. TypeScript là ngôn ngữ compile sang JavaScript để sử dụng. Do đó, có thể tạo bất cứ thứ gì JavaScript có thể tạo. Ở đây, chúng tôi giải thích "phạm vi ứng dụng của TypeScript" - loại phần mềm nào bạn có thể tạo khi học TypeScript.

## Frontend

Lĩnh vực TypeScript phổ biến nhất là phát triển ứng dụng frontend. Ứng dụng chạy trên browser. Trong browser, JavaScript đã thiết lập vị trí áp đảo. TypeScript dựa trên hệ sinh thái JavaScript nên phát huy sức mạnh lớn trong phát triển ứng dụng frontend.

## Backend

Ứng dụng backend cũng có thể phát triển bằng TypeScript. Về mặt kỹ thuật, có thể dựa trên hệ sinh thái Node.js - JavaScript server-side. Mặc dù ngôn ngữ backend có nhiều đối thủ như Java, Ruby, PHP, TypeScript cũng là một lựa chọn cho lập trình server-side.

## Lợi ích khi áp dụng TypeScript cho cả frontend và backend

Áp dụng TypeScript cho cả frontend và backend có lợi ích. Đó là dự án chỉ cần xử lý một ngôn ngữ. Khi chỉ có một ngôn ngữ, các lợi thế sau xuất hiện.

### Có thể chia sẻ module

Khi cả hai dùng ngôn ngữ khác nhau, ngay cả logic giống nhau cũng phải implement bằng mỗi ngôn ngữ. Test cũng tăng gấp đôi. Mặt khác, nếu cả hai dùng TypeScript, module TypeScript tạo ở một bên có thể tái sử dụng ở bên kia.

### Có thể chia sẻ know-how trong dự án

Rào cản ngôn ngữ làm khó chia sẻ know-how. Khi frontend và backend dùng ngôn ngữ khác nhau, việc chia sẻ know-how khó vượt qua ranh giới frontend và backend. Ví dụ, dù đã tìm thấy library xử lý ngày tháng tiện lợi ở backend, frontend không thể dùng nó nên know-how đó chỉ dừng ở backend.

Nếu cả hai đều dùng TypeScript, know-how frontend có thể được trả lại cho backend và ngược lại.

### Tối đa hóa hiệu quả học tập

Học ngôn ngữ mới tốn nhiều thời gian hơn tưởng tượng. Nếu chỉ học qua tutorial hoặc reference, có thể học trong thời gian ngắn. Tuy nhiên, để đạt đến trình độ thực hành hiểu đầy đủ hệ sinh thái ngôn ngữ, best practice trong thực tế, các đặc thù nhỏ và bẫy dễ mắc của ngôn ngữ, cần nhiều thời gian học.

Nếu đảm nhận cả frontend và backend mà mỗi cái dùng ngôn ngữ khác nhau, dù là cá nhân hay tổ chức, sẽ phải đầu tư khá nhiều thời gian để học ngôn ngữ trước khi có thể tự tin viết code thực tế.

Ngược lại, nếu có thể dùng TypeScript ở mọi nơi, overhead học ngôn ngữ và hệ sinh thái sẽ ở mức tối thiểu.

## Ứng dụng Desktop

Khi tạo ứng dụng desktop cho Windows, macOS, Linux, cũng có thể dùng TypeScript. Sử dụng [Electron](https://www.electronjs.org/) có thể phát triển ứng dụng desktop bằng technology stack JavaScript, HTML, CSS. Ứng dụng nổi tiếng bằng Electron + TypeScript có Slack và VS Code của Microsoft.

## Ứng dụng CLI

Phát triển command-line tool cũng có thể thực hiện bằng TypeScript. Phát triển bằng cách kết hợp Node.js, môi trường chạy JavaScript server-side, và TypeScript. CLI application framework có [oclif](https://github.com/oclif/oclif) của Heroku. Sử dụng [zx](https://github.com/google/zx) của Google có thể dễ dàng dùng TypeScript thay cho shell script.

## Serverless (FaaS)

Serverless là cơ chế có thể chạy chương trình server-side mà không cần xây dựng hoặc bảo trì server. Thông thường, để chạy ứng dụng backend, cần dựng server Linux và bảo trì. Với serverless, cloud vendor như AWS cung cấp môi trường chạy managed như JavaScript, developer không cần bảo trì server. Developer chỉ cần upload file có hàm JavaScript để có thể công bố web service như backend. Cloud service chạy các hàm như vậy được gọi là FaaS (Function as a Service).

Có nhiều FaaS hỗ trợ JavaScript. Nổi tiếng nhất là [Lambda](https://aws.amazon.com/lambda/) của AWS. Ngoài ra còn có [Google Cloud Functions](https://cloud.google.com/functions), [Azure Functions](https://azure.microsoft.com/ja-jp/products/functions/) của Microsoft, [Serverless Functions](https://vercel.com/docs/functions/introduction) của Vercel có độ tương thích cao với Next.js, [Netlify Functions](https://www.netlify.com/products/functions/) của Netlify nổi tiếng với static site hosting, [Cloudflare Workers](https://workers.cloudflare.com/) của Cloudflare CDN có edge tại 194 thành phố ở 90 quốc gia trên thế giới. Sử dụng các service này có thể cung cấp web application serverless bằng TypeScript.

## Quản lý cấu hình infrastructure (IaC)

Khi infrastructure chuyển từ vật lý sang ảo, từ server nội bộ sang cloud, việc quản lý cấu hình infrastructure như đặt bao nhiêu server như thế nào, kết nối mạng ra sao cũng ngày càng được tự động hóa bằng phần mềm. Việc định nghĩa cấu hình infrastructure bằng code và làm cho programmable được gọi là IaC (Infrastructure as Code).

TypeScript cũng có thể thực hiện IaC. Công cụ tự động hóa cấu hình infrastructure AWS là [AWS CDK (Cloud Development Kit)](https://aws.amazon.com/cdk/#:~:text=The%20AWS%20Cloud%20Development%20Kit,resources%20using%20familiar%20programming%20languages.&text=AWS%20CDK%20uses%20the%20familiarity,languages%20for%20modeling%20your%20applications.). Công cụ này hỗ trợ TypeScript.

Công cụ cấu hình infrastructure hỗ trợ nhiều cloud vendor như AWS hay Google Platform là [Pulumi](https://www.pulumi.com/). Pulumi có thể viết cấu hình infrastructure của các vendor bằng TypeScript. Công cụ cấu hình infrastructure nổi tiếng nhất là [Terraform](https://www.terraform.io/), nhưng Terraform viết bằng ngôn ngữ độc lập gọi là HCL, trong khi Pulumi dùng TypeScript nên là công cụ dễ tiếp cận với TypeScript programmer.

## Google Apps Script

Google cung cấp office suite như Spreadsheet và Docs, được nhiều doanh nghiệp áp dụng. Google Spreadsheet và các ứng dụng khác có cơ chế mở rộng tính năng bằng JavaScript. Đó gọi là Google Apps Script. Sử dụng Google Apps Script có thể tạo hàm tùy chỉnh trong spreadsheet, tự động hóa thao tác, hữu ích cho việc tăng hiệu quả công việc. Code viết bằng TypeScript có thể compile sang JavaScript và sử dụng trong Google Apps Script.

## Browser extension

Browser như Google Chrome và Firefox có cơ chế mở rộng tính năng browser. Browser extension có thể viết bằng JavaScript. Code viết bằng TypeScript cũng có thể compile sang JavaScript và chạy như browser extension.

## Machine learning

Không có tranh cãi rằng Python là số một trong lĩnh vực machine learning, neural network, deep learning. Tuy nhiên, nhiều công cụ machine learning cũng đã được tạo bằng JavaScript, và TypeScript programmer cũng ngày càng dễ tiếp cận hơn. [TensorFlow.js](https://www.tensorflow.org/js/) là library machine learning do Google phát triển. [Brain.js](https://brain.js.org/) là library neural network.

## Embedded

Microsoft đã phát triển Static TypeScript (STS), ngôn ngữ subset của TypeScript nhắm đến thiết bị embedded với tài nguyên ít, và [công bố kết quả nghiên cứu](https://www.infoq.com/jp/news/2019/11/static-typescript-msft-paper/) về việc tạo phần mềm embedded bằng nó. STS không giống TypeScript và vẫn đang trong giai đoạn nghiên cứu, nhưng nếu các hoạt động như vậy trở nên sôi động, lập trình embedded cũng sẽ đi vào phạm vi của TypeScript programmer.

## WebAssembly

WebAssembly (WASM) là ngôn ngữ assembly chạy trên browser. WASM được sử dụng ở những nơi cần xử lý nhanh hơn JavaScript. Chương trình WASM thường được phát triển bằng system language như C, C++, Rust, nhưng cũng có các nỗ lực cho phép phát triển WASM bằng TypeScript. Đứng đầu là [AssemblyScript](https://www.assemblyscript.org/). Sử dụng AssemblyScript có thể chuyển đổi code kiểu TypeScript sang WASM.
