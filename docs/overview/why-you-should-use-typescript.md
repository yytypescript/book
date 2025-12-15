---
image: /img/why-you-should-use-typescript.png
---

# Tại sao nên sử dụng TypeScript

Để phát triển frontend của web application, ngôn ngữ tối thiểu cần thiết ngoài HTML và CSS là chỉ JavaScript. Chỉ cần sử dụng JavaScript, bạn có thể implement frontend khá tự do. Vậy tại sao lại nên sử dụng TypeScript thay vì JavaScript? Ở đây, chúng ta sẽ xem xét 4 lý do chính nên sử dụng TypeScript.

## TypeScript là ngôn ngữ tối ưu cho phát triển quy mô lớn

Chúng ta đã xem bối cảnh lịch sử dẫn đến việc TypeScript được phát minh trong "Bối cảnh ra đời của TypeScript", TypeScript được sinh ra để vượt qua phát triển ứng dụng quy mô lớn mà JavaScript không thể đáp ứng.

[Bối cảnh ra đời của TypeScript](before-typescript.md)

Do đó, TypeScript có 3 đặc điểm lớn mà thực tế phát triển ứng dụng quy mô lớn yêu cầu.

1. Kiểm tra tĩnh bằng kiểu
2. Tính module
3. Chi phí học tập hợp lý

Trong số này, đặc biệt kiểm tra tĩnh bằng kiểu là tính năng chính của TypeScript, như tên "Type" trong TypeScript gợi ý. Kiểm tra kiểu có thể nhận ra lỗi chương trình mà không cần chạy chương trình. Bug phát hiện càng muộn thì chi phí sửa càng cao, nhưng với TypeScript có thể kiểm tra thường xuyên khi coding, và nhờ phát hiện bug sớm có thể giảm chi phí sửa. Theo Airbnb, [phân tích cho thấy nếu sử dụng TypeScript có thể ngăn ngừa 38% bug của Airbnb](https://www.reddit.com/r/typescript/comments/aofcik/38_of_bugs_at_airbnb_could_have_been_prevented_by/).

Ngoài ra, có kiểu giúp tăng khả năng đọc và hiểu chương trình, tận dụng được tính năng completion của editor, và hiệu quả coding cũng tăng lên.

TypeScript chính thức không nói rõ "ứng dụng quy mô lớn" là quy mô cụ thể bao nhiêu, nhưng theo cảm giác của tác giả, code vài trăm dòng cũng có thể hưởng đầy đủ lợi ích của TypeScript.

Tuy nhiên, cần nói công bằng rằng kiểm tra tĩnh không phải là viên đạn bạc cho đảm bảo chất lượng. Kiểm tra tĩnh phát hiện các lỗi mà ai đọc cũng có thể khách quan phán đoán là rõ ràng sai. Ví dụ, truy cập biến chưa định nghĩa, hoặc xử lý kiểu dữ liệu không đúng. Nó không thể phát hiện bug specification hoặc runtime error. Trong đảm bảo chất lượng, cần kết hợp các phương pháp khác như testing. Tuy nhiên, chắc chắn rằng nhờ có kiểm tra tĩnh, các loại bug mà TypeScript có thể phát hiện có thể bỏ qua trong giai đoạn test.

## Có kiến thức JavaScript là có thể bắt đầu sử dụng

TypeScript là superset của JavaScript. Superset có nghĩa là giữ nguyên specification JavaScript, thêm vào các tính năng và lợi ích riêng của TypeScript. Tức là, TypeScript compiler có thể hiểu code JavaScript như nó vốn có.

Nhờ đặc điểm này, một trong những lợi ích mà team phát triển có được là có kiến thức JavaScript là có thể bắt đầu sử dụng TypeScript. Điều này làm chi phí học ngôn ngữ mới rất hợp lý. Khi giới thiệu ngôn ngữ mới, với ngôn ngữ khó có thể mất vài tháng học rồi mới bắt đầu viết, nhưng với TypeScript có thể bắt đầu viết như JavaScript trước, dần dần học TypeScript, và từ từ điều chỉnh code để tối đa hóa lợi ích của TypeScript. TypeScript có nhiều tính năng không có trong JavaScript, nhưng tất cả có thể được giới thiệu một cách có chọn lọc.

Việc là superset của JavaScript cũng có nghĩa là cần biết JavaScript. Vì vậy, nếu kỳ vọng TypeScript giống như Java hay C#, hoặc hoàn toàn không có ý định học JavaScript, phát triển với TypeScript có thể gây bực bội. Những specification ngôn ngữ được gọi là "bẫy" trong JavaScript vẫn giữ nguyên trong TypeScript. Nếu hoàn toàn không muốn chạm vào JavaScript thì TypeScript không phù hợp, nhưng nếu bạn định sử dụng JavaScript thì TypeScript là lựa chọn có triển vọng.

## Có thể sử dụng cú pháp mới nhất ngay cả khi phát triển cho môi trường JS cũ

Tùy thuộc vào yêu cầu dự án, có thể cần implement để chạy trên browser chỉ hỗ trợ JavaScript cũ như ES5. TypeScript có thể giới thiệu vào các dự án nhắm đến môi trường JS cũ như vậy.

TypeScript có thể chọn compile sang phiên bản JavaScript nào khi compile. Phiên bản JavaScript cũ nhất mà TypeScript hỗ trợ là ES3, có thể đối ứng browser cũ trước modern browser. Compile sang ES5 cũ tiếp theo có thể đối ứng modern browser thời 2012 như Internet Explorer 9.

Sức hấp dẫn của TypeScript không chỉ là có thể compile sang phiên bản JavaScript cũ. ECMAScript, specification của JavaScript, được cập nhật major version mỗi năm một lần, và mỗi lần đều giới thiệu tính năng mới tiện lợi. TypeScript tuân thủ nguyên tắc conform với ECMAScript, và tính năng mới được chấp nhận trong ECMAScript được tích hợp nhanh chóng.

Hơn nữa, TypeScript cũng tích hợp trước specification ngôn ngữ được gọi là ESNext sẽ được giới thiệu vào ECMAScript tiếp theo, hay nói cách khác, specification ngôn ngữ gần như chắc chắn sẽ sử dụng được trong JavaScript tương lai.

Ngoài việc theo kịp ECMAScript, nhờ tích hợp trước ESNext, programmer có thể sử dụng cú pháp JavaScript mới nhất trong khi vẫn đối ứng code cho môi trường cũ.

Điều cần chú ý là sử dụng API mới. Ví dụ, nếu viết code sử dụng `Map` class hoặc `Set` class được giới thiệu trong ECMAScript 2015 (ES6) bằng TypeScript và compile sang ES5, sẽ không xảy ra syntax error nhưng phần sử dụng `Map` class hoặc `Set` class sẽ là runtime error. Điều này là vì TypeScript chỉ đảm nhận công việc chuyển đổi cú pháp mới sang code JS cũ. Nếu cần sử dụng API mới trên môi trường cũ, có thể giải quyết bằng cách sử dụng kết hợp polyfill như [core-js](https://github.com/zloirock/core-js).

## TypeScript là AltJS phổ biến nhất và được yêu thích nhất

Ngôn ngữ compile sang JavaScript để sử dụng được gọi chung là "AltJS". TypeScript là một loại AltJS, và AltJS còn có nhiều ngôn ngữ khác. Trong số đó, TypeScript là ngôn ngữ phổ biến nhất.

Stack Overflow đã công bố [bảng xếp hạng ngôn ngữ lập trình phổ biến](https://insights.stackoverflow.com/survey/2020#most-popular-technologies) từ khảo sát khoảng 65,000 developer. Bảng xếp hạng này bao gồm không chỉ AltJS mà tất cả ngôn ngữ lập trình như JavaScript, Java, C#. Trong bảng xếp hạng này, TypeScript xếp hạng 9, vượt qua C và Ruby.

Một khảo sát khác là "[The State of JavaScript 2020](https://2020.stateofjs.com/)", khảo sát khoảng 20,000 người dùng JavaScript trên toàn thế giới. Theo đó, TypeScript liên tục đứng đầu về độ hài lòng trong 4 năm từ 2017 đến 2020. Và 93% người dùng trả lời "hài lòng và muốn sử dụng lại".

Việc chọn ngôn ngữ lập trình có nhiều người dùng và độ hài lòng cao có nhiều lợi ích. Đầu tiên, có nhiều thông tin. Khi học ngôn ngữ mới hay troubleshooting, không cần nói rằng lượng thông tin tuyệt đối ảnh hưởng lớn đến độ dễ phát triển.

Tiếp theo, hệ sinh thái phong phú. Có IDE hỗ trợ TypeScript như VSCode và JetBrains IntelliJ IDEA, và nhiều framework và package cũng hỗ trợ TypeScript. Dù specification ngôn ngữ đơn lẻ có tốt đến đâu, nếu môi trường xung quanh phát triển không hoàn thiện, bạn phải tự phát minh lại công cụ và package đã có trong ngôn ngữ khác. TypeScript có hệ sinh thái phong phú nên không cần lo lắng về điều đó.

Cuối cùng, TypeScript cũng có lợi trong tuyển dụng và tìm việc. Nhiều người sử dụng có nghĩa là với doanh nghiệp thì dễ tìm programmer, và với người tìm việc thì dễ tìm dự án. TypeScript có độ hài lòng cao như kết quả khảo sát trước đó, dự án áp dụng ngôn ngữ như vậy dễ được programmer yêu thích, và dễ thu hút programmer có động lực cao.
