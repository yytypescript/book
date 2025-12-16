# 0009-Áp dụng Docusaurus

- Trạng thái: Áp dụng
- Người đề xuất: @suin
- Người quyết định: @suin, @jamashita, @t-yng
- Ngày cập nhật: 2021-10-16

GitBook mà chúng tôi đã sử dụng để viết đến nay gặp phải các vấn đề sau. Để giải quyết những vấn đề này, chúng tôi áp dụng Docusaurus. Lý do được liệt kê dưới đây.

## Bối cảnh

- Muốn xuất eBook (ePub, mobi hoặc PDF) để phát hành sách điện tử trên Amazon. Vì nhiều người tìm sách nhập môn bằng cách tìm kiếm trên Amazon.
- Muốn thực hiện kiểm tra ngôn ngữ và tự động format sample code qua CI.

## Vấn đề của GitBook

- Chi phí 400.000 yên/năm để xuất PDF.
- Khó thực hiện CI.
- Sau đợt cập nhật UI gần đây, editor quá nặng dẫn đến tình trạng không thể chỉnh sửa bình thường.
- Các vấn đề nhỏ khác:
  - Chữ Hán trong h1, h2, h3 bị chuyển thành pinyin tiếng Trung trong header anchor.
  - Có lỗi khiến các dòng code của index type và Mapped Types bị mất khi chỉnh sửa trên GitBook sau khi merge PR từ GitHub.
  - GitBook editor không hỗ trợ đầy đủ tiếng Nhật.

## Lý do áp dụng Docusaurus

- Có thể xuất PDF miễn phí.
- Có thể tự động kiểm tra nội dung qua CI.

## Các lựa chọn được xem xét

1. Docusaurus
1. Next.js

## Ưu điểm và nhược điểm của từng lựa chọn

### Ứng viên 1: Docusaurus

Docusaurus là công cụ tạo tài liệu dạng JAMStack open source được xây dựng bằng React.

- Good: Được cập nhật liên tục và có thể kỳ vọng sự phát triển.
- Good: Có uy tín và thành tích. Được phát triển bởi Facebook và được sử dụng cho tài liệu của nhiều dự án open source như React, Jest.
- Good: Có thể xuất PDF. Có thể xuất PDF bằng docusaurus-prince-pdf.
- Good: Có thể tự động kiểm tra qua CI. Bằng cách kết hợp GitHub Actions với công cụ kiểm tra tự động, có thể phát hiện lỗi chính tả và sự không nhất quán trong cách viết, thậm chí trong một số trường hợp có thể tự động sửa.
- Good: Khả năng tùy chỉnh cao. Docusaurus được xây dựng bằng React, nên có thể làm những gì React làm được.
- Good: Khả năng biểu đạt tài liệu cao. Ví dụ như highlight dòng trong code block.
- Good: Chuyển trang nhanh.
- Good: Nếu thực hiện tất cả chỉnh sửa thông qua pull request, việc yêu cầu CLA sẽ dễ dàng hơn.
- Good: Những người không phải thành viên thường xuyên của nhóm viết cũng có cùng workflow, giúp đơn giản hóa. Việc nâng cấp từ người sửa lỗi chính tả thành người viết cũng trở nên dễ dàng hơn.
- Bad: Chức năng tìm kiếm yếu. Đặc biệt không hỗ trợ đầy đủ việc chuyển đổi trong IME tiếng Nhật.
- Bad: Cần tự hosting.

### Ứng viên 2: Next.js

Next.js là framework dành cho ứng dụng frontend. Cũng được sử dụng để tạo static site.

- Good: Được cập nhật liên tục và có thể kỳ vọng sự phát triển.
- Good: Có thể tự động kiểm tra qua CI. Bằng cách kết hợp GitHub Actions với công cụ kiểm tra tự động, có thể phát hiện lỗi chính tả và sự không nhất quán trong cách viết, thậm chí trong một số trường hợp có thể tự động sửa.
- Good: Khả năng tùy chỉnh cao.
- Good: Chuyển trang nhanh.
- Good: Nếu thực hiện tất cả chỉnh sửa thông qua pull request, việc yêu cầu CLA sẽ dễ dàng hơn.
- Good: Những người không phải thành viên thường xuyên của nhóm viết cũng có cùng workflow, giúp đơn giản hóa. Việc nâng cấp từ người sửa lỗi chính tả thành người viết cũng trở nên dễ dàng hơn.
- Bad: Cần tự xây dựng UI.
- Bad: Cần tự xây dựng logic để tạo trang nội dung từ Markdown.

## PDR liên quan

[0001-Viết với GitBook](0001-write-with-gitbook.md)
