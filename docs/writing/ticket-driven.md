---
description: Quy trình làm việc - thảo luận trước khi tạo Pull Request.
---

# Quy trình làm việc (Thảo luận trước khi tạo PR)

Các Pull Request được gửi đột ngột mà không có sự thống nhất trước có thể không phù hợp với định hướng của dự án hoặc không phải là điều cần thiết. Những PR như vậy có thể bị đóng mà không được merge.

Việc tạo Pull Request tốn thời gian và công sức. Nếu không được merge, thời gian và công sức đó sẽ lãng phí.

Để tránh tình huống này, dự án áp dụng quy trình làm việc với phương châm "thảo luận trước khi tạo PR".

Khi tìm thấy điểm cần cải thiện, chúng tôi hiểu bạn muốn bắt tay ngay, nhưng hãy tạo issue trước và thảo luận rồi mới tiến hành tạo PR.

## Quy trình làm việc

Quy trình như sau:

1. Tạo issue
2. Thảo luận
3. Bắt đầu làm (sau khi thảo luận đầy đủ)
4. Tạo Pull Request
5. Merge

### Tạo issue

Khi muốn thay đổi nội dung, hãy chia sẻ ý tưởng dưới dạng issue.

Issue cần ghi rõ:

- Muốn thay đổi gì?
- Lý do thay đổi? (không cần nếu lý do hiển nhiên như sửa lỗi chính tả)
- Bạn có muốn tự đảm nhận không? (nếu bạn muốn tự tạo PR)

:::info
Ngay cả với các thay đổi nhỏ như sửa lỗi chính tả, hãy bắt đầu từ issue.
:::

### Thảo luận

Thảo luận trong issue cùng với maintainer về:

- Có nên làm không?
- Có ý tưởng nào tốt hơn không?
- Ai nên đảm nhận?

Nếu thảo luận diễn ra qua các kênh khác, hãy ghi lại trong issue.

Nếu maintainer quyết định "không làm", issue sẽ được đóng.

### Bắt đầu làm

Sau khi thảo luận đầy đủ và maintainer quyết định "làm", bạn có thể bắt đầu. Maintainer sẽ quyết định ai đảm nhận.

### Tạo Pull Request

Người đảm nhận tạo Pull Request với các thay đổi.

Khi tạo PR, sử dụng [chức năng liên kết issue bằng keyword của GitHub] để liên kết issue tương ứng. Điều này có 2 mục đích: một là để theo dõi lịch sử PR, hai là để tự động close issue khi PR được merge. Ví dụ, với PR giải quyết issue #123:

[chức năng liên kết issue bằng keyword của GitHub]: https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue#linking-a-pull-request-to-an-issue-using-a-keyword

```markdown
Close #123
```

### Merge

Maintainer xem xét nội dung PR và merge nếu không có vấn đề.

## PR không theo quy trình

Nếu có PR được tạo mà không theo quy trình:

- Bắt đầu lại từ issue.
- Ngoại lệ: nếu không có gì cần thảo luận và sự cần thiết của thay đổi là hiển nhiên, có thể merge trực tiếp. Tuy nhiên, để duy trì quy trình, mặc định sẽ yêu cầu bắt đầu lại từ issue.

:::caution
Trong quá khứ, đã có các PR không theo quy trình bị đóng vì không phù hợp với định hướng dự án do thiếu sự thống nhất trước. Vì vậy, khuyến khích tuân theo quy trình.
:::
