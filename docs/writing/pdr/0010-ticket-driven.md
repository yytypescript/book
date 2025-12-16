# 0010-Viết theo hướng Ticket-driven

- Trạng thái: Áp dụng
- Người đề xuất: @suin
- Người tham gia: @suin, @canalun, @jamashita
- Ngày cập nhật: 2023-02-24

Khi không merge pull request, thời gian và công sức của tác giả pull request sẽ bị lãng phí, điều này gây áy náy. Để giải quyết vấn đề này, chúng tôi áp dụng quy trình thảo luận trên issue trước khi tạo pull request.

## Bối cảnh: Số lượng contributor tăng lên

Cùng với sự gia tăng số lượng contributor của Survival TypeScript, số lượng pull request cũng tăng lên. Trong số đó, có những pull request không được merge. Lý do thường gặp là không phù hợp với định hướng của cuốn sách.

## Vấn đề 1: Lãng phí công sức

Pull request được tạo ra từ thời gian, công sức và tài năng của contributor. Việc không tiếp nhận những đóng góp như vậy đồng nghĩa với việc lãng phí thời gian, công sức và tài năng. Điều này không phải là điều mong muốn đối với contributor.

## Vấn đề 2: Từ chối là gánh nặng tâm lý

Việc từ chối pull request cũng là điều khó khăn đối với maintainer. Khi nghĩ đến thời gian và công sức đằng sau pull request, không thể từ chối bằng một vài lời. Dù nghĩ rằng không nên merge khi xét đến độc giả, nhưng lại muốn merge khi nghĩ đến contributor. Có những tình huống tiến thoái lưỡng nan như vậy. Gánh nặng tâm lý này là vấn đề đối với maintainer và cũng trở thành rào cản trong quá trình viết.

## Giải pháp: Ticket-driven

Ticket-driven là giải pháp cho các vấn đề trên. Mục đích là "hãy thảo luận trước khi bắt đầu".

Bằng cách thảo luận trước khi bắt đầu, các vấn đề trên được giải quyết và có những lợi ích sau:

- Dễ tạo ra pull request phù hợp với định hướng của cuốn sách
- Giảm lãng phí thời gian, công sức và tài năng của contributor
- Giảm gánh nặng tâm lý cho maintainer

Ngoài ra còn có các lợi ích phụ sau:

- Có thể theo dõi lịch sử thay đổi. Những người sau có thể biết được những cuộc thảo luận nào đã diễn ra về thay đổi, tại sao cần thay đổi, v.v.

### Nếu pull request được tạo mà không theo ticket-driven

Nếu pull request được tạo mà không thảo luận trước, sẽ thực hiện quy trình sau:

- Bắt đầu lại từ issue. Nếu cần thảo luận, cần bắt đầu lại từ issue.
- Merge trực tiếp. Khi không cần thảo luận và sự cần thiết của việc tiếp nhận là hiển nhiên thì sẽ merge.

Tuy nhiên, vì không nên phá vỡ ticket-driven càng nhiều càng tốt, nên việc bắt đầu lại từ issue sẽ là flow mặc định.

Ngoài ra, trong tài liệu sẽ cảnh báo rằng pull request được tạo mà không có issue sẽ có nguy cơ bị Close cao.

## Giải pháp phụ: Đưa vào PULL_REQUEST_TEMPLATE.md

Chuẩn bị sẵn PULL_REQUEST_TEMPLATE.md và bao gồm nội dung về việc thực hiện ticket-driven trong đó. Bằng cách này, nội dung đó sẽ được hiển thị khi tạo pull request, nên người tham gia mới cũng dễ nhận ra ticket-driven. Giải pháp này không hiệu quả lắm với vấn đề 1, nhưng là giải pháp cho vấn đề 2.

## Biện pháp hỗ trợ: Kiểm tra "Close {issue_number}" bằng GitHub Actions

Sử dụng GitHub Actions để kiểm tra xem phần mô tả của pull request có chứa chỉ dẫn đóng issue "Close {issue_number}" hay không, tạo môi trường để ticket-driven hoạt động như nguyên tắc.

GitHub Action sử dụng: https://github.com/marketplace/actions/verify-linked-issue

Dù có tuyên bố ticket-driven bao nhiêu, nếu không có môi trường thúc đẩy nó thì có vẻ sẽ trở nên hình thức. Để ngăn chặn sự hình thức hóa, GitHub Actions này có vẻ hiệu quả.

## PDR liên quan

Không có
