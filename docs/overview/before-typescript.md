# Bối cảnh ra đời của TypeScript

TypeScript là ngôn ngữ lập trình được phát triển với mục đích giúp phát triển ứng dụng lớn bằng JavaScript dễ dàng hơn.

Đúng là JavaScript ban đầu không được thiết kế cho phát triển quy mô lớn. Tuy nhiên, lẽ ra JavaScript có thể tự tiến hóa để đáp ứng phát triển quy mô lớn. Nhưng thực tế không suôn sẻ như vậy. Thay vào đó, TypeScript đã đảm nhận một phần phát triển quy mô lớn.

Tại sao lại như vậy? Câu trả lời nằm trong lịch sử JavaScript. Bạn sẽ thấy lý do tại sao TypeScript là phát minh cần thiết và vẫn còn cần thiết đến ngày nay. Hãy cùng tìm hiểu lịch sử trước khi TypeScript ra đời.

## Thập niên 1990

### Sự ra đời của JavaScript

Trước khi JavaScript ra đời, ngay cả validation form đơn giản cũng cần thực hiện bằng chương trình server-side. Netscape, công ty phát triển browser Netscape Navigator, nhận ra sự cần thiết của chương trình chạy ở client-side. Vì vậy, năm 1995, Netscape đã implement JavaScript như một ngôn ngữ script chạy trên Netscape Navigator.

### Công cụ bổ trợ

JavaScript thời đó được coi là ngôn ngữ bổ trợ cho HTML, chỉ được sử dụng để implement animation đơn giản hoặc validation form. Người ta không coi JavaScript là ngôn ngữ để tạo ứng dụng quy mô lớn.

Mặc dù bây giờ không rõ có đúng không, nhưng thời đó có quan điểm rằng JavaScript có vấn đề bảo mật, và thậm chí có ấn tượng rằng người "có IT literacy cao" là người tắt JavaScript khi lướt web. Do đó, một số trang web có thông báo "Vui lòng bật JavaScript để xem trang này".

JavaScript trong thập niên 1990 không phải là thứ thiết yếu như hiện đại, mà chỉ là ngôn ngữ có vị trí bổ trợ, tùy chọn.

## Đầu thập niên 2000

### Nhu cầu phát triển quy mô lớn bắt đầu âm ỉ

Nhìn sang các nền tảng khác, thời kỳ này đã có [Java applet](https://ja.wikipedia.org/wiki/Java%E3%82%A2%E3%83%97%E3%83%AC%E3%83%83%E3%83%88) và [Adobe Flash](https://ja.wikipedia.org/wiki/Adobe_Flash) như công nghệ thực hiện ứng dụng browser. Đặc biệt Flash nhẹ hơn Java applet, xuất hiện các trang web implement toàn bộ bằng Flash, và từ "[Flash thời hoàng kim](https://dic.nicovideo.jp/a/flash%E9%BB%84%E9%87%91%E6%99%82%E4%BB%A3)" được sinh ra sau để nhìn lại thời đại này. Trong khi đó, JavaScript vẫn bị chi phối bởi hình ảnh "công cụ bổ trợ".

Thông thường, website có giao diện người dùng tương tác, ngày nay gọi là web application, thời đó được gọi là "rich internet application", và hầu hết được thực hiện bằng Java applet hoặc Flash, nhưng cũng có programmer thử phát triển web application bằng JavaScript.

Năm 1997, Microsoft đưa ra thị trường Outlook Web Access 2000 như webmail cho doanh nghiệp, đây là web application bằng JavaScript. Với chúng ta ngày nay có thể bất ngờ, nhưng JavaScript thời đó vẫn chưa thể giao tiếp với server. Vì vậy, Microsoft đã thêm tính năng XMLHTTP, sau này trở thành XMLHttpRequest (XHR), vào Internet Explorer cho ứng dụng này. XHR là bản cập nhật cách mạng, nhưng phải chờ thêm thời gian nữa mới được nhiều programmer chú ý.

Đầu thập niên 2000, người ta bắt đầu mong muốn có thể phát triển web application quy mô lớn với UI tương tác bằng JavaScript.

### 10 năm mất mát

Thời điểm này, JavaScript đã chuyển từ ngôn ngữ thuộc sở hữu của Netscape sang ngôn ngữ mà toàn ngành web cùng làm việc. Do đó, specification ngôn ngữ JavaScript được định nghĩa dưới tên ECMAScript, và các vendor implement JavaScript dựa trên specification đó. Cuộc họp định nghĩa ECMAScript này là TC39, với sự tham gia của các vendor liên quan đến JavaScript như Netscape và Microsoft.

Tại TC39, xem xét sự cần thiết của JavaScript chịu được phát triển quy mô lớn, họ bắt đầu thảo luận về việc định nghĩa specification ngôn ngữ mới "ECMAScript 4" từ khoảng năm 1999. ECMAScript 4 (ES4) này thảo luận các specification ngôn ngữ tham vọng như sau:

- Module
- Class giống Java
- Static typing
- Nullable type
- Union type
- Generics

Ồ, đây chẳng phải đều là những thứ TypeScript có sao? Đúng vậy. "Giúp phát triển ứng dụng quy mô lớn dễ dàng hơn" là vấn đề chung của cả hai ngôn ngữ, do đó, ngay cả trong JavaScript 20 năm trước, giải pháp tương tự như TypeScript đã được xem xét.

Ở đây nảy sinh một câu hỏi. "Nếu ý tưởng của ES4 được đưa vào JavaScript, chẳng phải TypeScript không cần thiết sao?"

Thực ra, đáng tiếc, ES4 không bao giờ được chấp nhận như specification chính thức. Việc định nghĩa specification ES4 bị gián đoạn 2 năm từ 2003, được nối lại năm 2005, và bản thảo specification được công bố năm 2007. ES4 không tương thích với JavaScript hiện có. Xung đột xảy ra giữa Microsoft với lập trường bảo thủ và Netscape muốn thay đổi cách mạng, và bản thảo ES4 không thể thỏa hiệp cũng vì lý do chính trị, cuối cùng bị hủy bỏ năm 2008.

Vì những sự kiện như vậy, JavaScript từng hướng đến quy mô lớn nhưng không đạt được mục tiêu đó, và khoảng 10 năm trôi qua.

## Giữa thập niên 2000

### Cú sốc Google Map

Trong khi sự tiến hóa của JavaScript bị đình trệ, hình ảnh "không phải ngôn ngữ để phát triển ứng dụng nghiêm túc" về JavaScript vẫn chi phối, một sự kiện gây sốc xảy ra trong ngành web. Đó là sự xuất hiện của Google Map năm 2005.

Hầu hết các trang bản đồ thời đó đều reload trang web khi di chuyển hoặc zoom bản đồ, nên Google Map có thể thao tác bản đồ mượt mà mà không chuyển trang là phát minh đột phá thực hiện cảm giác ứng dụng native trên trang web theo cảm giác thời đó.

Công nghệ hỗ trợ khả năng thao tác của Google Map phía sau là AJAX. AJAX là viết tắt của "**A**synchronous **Ja**vaScript and **X**ML", là công nghệ sử dụng HTTP communication bất đồng bộ qua XMLHttpRequest object để lấy dữ liệu XML từ server mà không reload trang và viết lại một phần HTML. Ngày nay AJAX là điều hiển nhiên đến mức bị coi là công nghệ cũ, nhưng thời đó là công nghệ tiên tiến nhất.

Google Map đã gây sốc cho nhiều programmer. Không chỉ đưa AJAX vào spotlight, mà còn chứng minh rằng JavaScript cũng có thể tạo ứng dụng đàng hoàng.

## Cuối thập niên 2000

### Nhu cầu quy mô lớn tăng mạnh

Developer chứng kiến thành công của Google Map ngày càng bị thu hút bởi web application có thể cung cấp cho người dùng ứng dụng mà không cần install gì khác ngoài browser, và nhu cầu phát triển quy mô lớn bằng JavaScript cũng tăng từng ngày.

Năm 2005, Prototype.js, tiên phong của JavaScript application framework, được release. Năm sau jQuery được release, sau đó một thời gian, năm 2009 AngularJS, năm 2010 Backbone.js được công bố, và công cụ phát triển frontend web application tiếp tục được phát minh.

### JS không tiến hóa, AltJS làm mưa làm gió

Phong cách phát triển JavaScript thay đổi hoàn toàn, quy mô lớn tiến triển, nhưng bản thân JavaScript không có động thái. ES4 được kỳ vọng cũng bị hủy bỏ năm 2008.

Developer không cam chịu JavaScript không tiến hóa. "Nếu bản thân JavaScript không tốt lên, sao không tạo ngôn ngữ có thể compile sang JavaScript?" Một số developer bắt đầu suy nghĩ như vậy.

Dựa trên ý tưởng như vậy, CoffeeScript được công bố năm 2009 và làm mưa làm gió như ngôn ngữ phát triển ứng dụng JavaScript. CoffeeScript là ngôn ngữ hấp dẫn vì có thể coding với cú pháp ngắn gọn như Ruby, và được Ruby on Rails, server-side framework, chính thức chấp nhận như ngôn ngữ phát triển frontend. CoffeeScript có cú pháp class, được programmer quen với lập trình hướng đối tượng class-based ưa thích.

Phương pháp có vẻ kỳ lạ là coding bằng ngôn ngữ khác rồi compile sang JavaScript đã thành công, và nhiều ngôn ngữ áp dụng cách tiếp cận này được phát triển, chúng được gọi chung là AltJS. Việc compile từ ngôn ngữ này sang ngôn ngữ khác được gọi là "transpile", và từ này cũng trở nên phổ biến thời này. Khi AltJS trở nên phổ biến, JavaScript đôi khi bị chế giễu là "assembler hiện đại".

### ECMAScript 2015 khởi động

Năm 2008, ECMAScript có động thái mới. Thảo luận về cải thiện JavaScript được nối lại. ES4 quá cách mạng nên gặp phản đối lớn từ phe bảo thủ. Vì vậy, Harmony, specification ngôn ngữ mới, được xem xét như giải pháp thỏa hiệp để tích hợp thành quả ES4 trong khi duy trì tương thích với JS hiện có, không cách mạng như ES4. Harmony đề xuất specification ngôn ngữ hướng đến phát triển quy mô lớn như cú pháp class, cú pháp module, import/export. Một số trong đó được chấp nhận vào ECMAScript 2015 sau này.

Như vậy, TC39 nơi thảo luận specification ngôn ngữ JavaScript đã trở thành cuộc họp hiệu quả, và kỳ vọng vào tương lai JavaScript cũng bắt đầu tăng lên.

## Thập niên 2010

### Sự ra đời của TypeScript

Trong khi thảo luận về phát triển quy mô lớn trở nên sôi động tại TC39 hướng đến việc định nghĩa ECMAScript 2015, TypeScript được công bố năm 2012.

TypeScript ngay từ đầu đã tập trung vào phát triển JavaScript quy mô lớn ngày càng khó khăn. Đặc điểm được nhấn mạnh đặc biệt là superset của JavaScript, tính module, và kiểu.

Trong khi CoffeeScript phổ biến thời đó đưa ra lộ trình độc lập với cú pháp khác biệt đáng kể so với JavaScript, TypeScript áp dụng chiến lược "ngôn ngữ superset của JavaScript" chỉ mở rộng cú pháp JavaScript. Do đó, ngay cả khi áp dụng TypeScript, tài sản JavaScript hiện có có thể sử dụng như cũ, team không phải tốn chi phí học đột ngột, và có thể tăng dần lợi ích của TypeScript, nên có thể áp dụng ngay trong phát triển quy mô lớn.

Tính module rất quan trọng trong phát triển quy mô lớn. Nếu không có specification ngôn ngữ cho phép chia và tổ chức code thành kích thước phù hợp, encapsulate chi tiết implementation, và tránh xung đột tên biến hoặc hàm, phát triển quy mô lớn sẽ rất khó khăn.

JavaScript thời đó không có hệ thống module hay namespace, khiến phát triển quy mô lớn khó khăn. TypeScript giải quyết vấn đề này bằng cách áp dụng trước cú pháp class và module được đề xuất trong ES2015, thực hiện tính module.

Kiểu là đặc điểm lớn nhất của TypeScript. Lợi ích của kiểu là có thể code jump và code completion khi coding, thông tin kiểu cũng là documentation, và có thể kiểm tra source code trước khi chạy chương trình. Như vậy, kiểu đã nâng cao đáng kể năng suất phát triển quy mô lớn.

### Thế mạnh của TypeScript không phai nhạt

Sau khi TypeScript được công bố, ECMAScript 2015 mà TypeScript làm mẫu đã được công bố chính thức, sau đó ECMAScript được update hàng năm. JavaScript từng đình trệ cũng đã tiến hóa hàng năm để hạ thấp rào cản phát triển quy mô lớn.

Trong bối cảnh đó, trong 3 đặc điểm lớn mà TypeScript đưa ra từ đầu, tính module đã được đưa vào specification JavaScript, và ở phần đó TypeScript đã mất lợi thế. Tuy nhiên, "kiểu" là tính năng chính của TypeScript vẫn chưa được đưa vào specification JavaScript đến ngày nay.

Kiểu là specification ngôn ngữ rất quan trọng khi phát triển quy mô lớn, và trong khi JavaScript tiếp tục tiến hóa, "kiểu" của TypeScript chắc chắn vẫn là thế mạnh vững chắc đến ngày nay.

## Tóm tắt

JavaScript ra đời năm 1995 ban đầu không được giả định sử dụng cho phát triển quy mô lớn. Sau 10 năm, nhu cầu phát triển quy mô lớn bắt đầu hiện rõ, và JavaScript phải đối mặt với việc đáp ứng. Tuy nhiên, không thể đạt được thỏa thuận giữa các vendor, và sự tiến hóa của JavaScript bị đình trệ.

Trong khi JavaScript bị đóng băng, web application vẫn tiếp tục quy mô lớn, và độ khó phát triển tăng lên từng ngày. Để đối phó, cộng đồng đã đưa ra nhiều giải pháp khác nhau.

Trong dòng chảy đó, TypeScript được phát minh. TypeScript được công bố năm 2012 với 3 đặc điểm: superset của JavaScript, tính module và kiểu, như ngôn ngữ đối mặt với khó khăn của phát triển quy mô lớn.

Sau khi TypeScript được công bố, JavaScript cũng bắt đầu tiến bộ trở lại, công bố ECMAScript 2015 như bản cập nhật lớn đầu tiên sau 6 năm, và từ đó tiếp tục công bố specification mới hàng năm. Tuy nhiên, "kiểu" là đặc điểm lớn nhất của TypeScript vẫn không có trong JavaScript. TypeScript vẫn được ưa chuộng trong phát triển quy mô lớn ngày nay là vì có trải nghiệm phát triển không có được với JavaScript.

## Tài liệu tham khảo

- [Chapter 4. How JavaScript Was Created](http://speakingjs.com/es5/ch04.html)
- [Microsoft augments JavaScript for large-scale development | InfoWorld](https://www.infoworld.com/article/2614863/microsoft-augments-javascript-for-large-scale-development.html)
- [The Real Story Behind ECMAScript](https://auth0.com/blog/the-real-story-behind-es4/)
- [JavaScript 2.0](https://web.archive.org/web/20000816194528/http://mozilla.org/js/language/js20-1999-02-18/index.html)
- [JavaScript 2.0 Motivation](https://web.archive.org/web/20000823225602/http://mozilla.org/js/language/js20-1999-02-18/motivation.html)
- [ActionScript - Wikipedia](https://en.wikipedia.org/wiki/ActionScript)
- [JavaScript - Wikipedia](https://ja.wikipedia.org/wiki/JavaScript)
- [ECMAScript - Wikipedia](https://en.wikipedia.org/wiki/ECMAScript)
- [A Brief History of JavaScript](https://auth0.com/blog/a-brief-history-of-javascript/)
- [The ECMAScript 6 schedule change](https://2ality.com/2014/06/es6-schedule.html#fn2)
- [見えてきた「ECMAScript 6」。JavaScriptの生みの親が書く「Harmony of Dreams Come True」 － Publickey](https://www.publickey1.jp/blog/12/javascriptecmascript_6harmony_of_dreams_come_true.html)
- [JavaScript: The First 20 Years | Zenod](https://zenodo.org/record/3707008#.XrVIhBMzZTY)
- [Anders Hejlsberg: Introducing TypeScript | Channel 9](https://channel9.msdn.com/posts/Anders-Hejlsberg-Introducing-TypeScript)
