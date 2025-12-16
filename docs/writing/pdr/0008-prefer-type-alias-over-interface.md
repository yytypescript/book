# 0008-Ưu tiên sử dụng Type Alias hơn Interface trong sample code

- Trạng thái: Áp dụng
- Người đề xuất: suin, jamashita, t-yng, クロレ
- Người quyết định: Như trên
- Ngày cập nhật: 2020-03-27

## Vấn đề cần giải quyết và bối cảnh

- Thực tế: Trong TypeScript, cả interface và type alias đều có thể định nghĩa type của object.
- Quan điểm: Sample code trong sách nên thống nhất sử dụng một trong hai.
- Vấn đề: Trong sample code, khi định nghĩa type của object, nên chọn interface hay type alias?

## Các lựa chọn được xem xét

- interface
- type alias

## Quyết định

- Khi trình bày định nghĩa type của object trong sample code, ưu tiên sử dụng type alias.
- Lý do: Đã quên lý do cụ thể, nhưng được quyết định bằng đa số phiếu.
- Ngoại lệ: Có thể sử dụng interface khi trình bày sample code với các mục đích sau:
  - Giải thích về chính interface.
  - Giải thích sự giống và khác nhau giữa interface và type alias.
  - Khi class implements interface.
