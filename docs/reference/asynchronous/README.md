---
title: Xử lý bất đồng bộ
slug: /reference/asynchronous
---

Nếu bạn muốn xây dựng một ứng dụng JavaScript nghiêm túc, bạn sẽ không thể tách rời khỏi xử lý bất đồng bộ. Ban đầu có thể khó hiểu, nhưng giờ đây JavaScript đã có các tính năng giúp thao tác với xử lý bất đồng bộ một cách trực quan hơn nhiều, làm giảm đáng kể rào cản.

## Xử lý bất đồng bộ trong JavaScript

JavaScript là ngôn ngữ hoạt động với single-process và single-thread. Đặc điểm này được đề cập ở trang khác, nhưng có nghĩa là tất cả các chương trình được xử lý tuần tự.

[Single-process, Single-thread và Callback](../single-process-and-callback.md)

Nghe như vậy có vẻ như tất cả các chương trình JavaScript đều được xử lý đồng bộ từ trên xuống dưới.
Tuy nhiên, đặc điểm này có điểm yếu. Vì được xử lý tuần tự, nếu có một xử lý tốn nhiều thời gian thì các xử lý khác sẽ không được thực thi trong thời gian đó. Ví dụ, với API request, phần lớn thời gian là thời gian chờ, nhưng nếu thời gian chờ này cũng được xử lý tuần tự thì sẽ không thể làm gì khác trong khoảng thời gian đó. Đây được gọi là blocking.
Để tránh vấn đề này, JavaScript sử dụng non-blocking. Với non-blocking, sau khi nhận xử lý, nó sẽ trả về ngay lập tức và thông báo kết quả sau bằng một phương thức khác. Phương thức này còn được gọi là callback. Callback có nghĩa là cuộc gọi điện thoại gọi lại.

## Sự ra đời của Promise

Xử lý bất đồng bộ trong JavaScript có vấn đề là code trở nên khó đọc (callback hell). Promise được thêm vào từ ES2015 có thể coi là giải pháp cho vấn đề này, giải thoát code JavaScript khỏi callback hell.
Và để Promise trở nên dễ sử dụng hơn nữa, async/await đã được thêm vào trong ES2017.

## Nội dung được đề cập trong chương này

Trong chương này, chúng ta sẽ đề cập đến cách sử dụng và đặc điểm của Promise/async/await trong từng trang riêng biệt.
