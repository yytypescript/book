---
description: Về cách quản lý trạng thái các trang
---

# 0004-Cách quản lý trạng thái trang

- Trạng thái: Áp dụng
- Người quyết định: suin, reoring, nouphet
- Ngày cập nhật: 2020-01-31

## Vấn đề cần giải quyết và bối cảnh

Chưa xác định phương pháp phân công và quản lý cho mục lục đã liệt kê.

## Các lựa chọn đã xem xét

- Quản lý bằng Google Docs
- Quản lý tại mỗi trang
- Quản lý bằng GitHub Issues

## Quyết định

Áp dụng quản lý bằng Google Docs vì:

- Mục lục đang được quản lý trên Google Docs
- Trạng thái có thể đồng bộ realtime
- Với số người vận hành hiện tại (<10) thì không có vấn đề

## Ưu nhược điểm của từng lựa chọn

### Quản lý bằng Google Docs

- Good: Dễ dàng tạo danh sách
- Good: Không cần đồng bộ mục lục với công cụ khác
- Bad: Có thể tăng số công cụ sử dụng
- Bad: Không scale được

### Quản lý tại mỗi trang

Không dùng công cụ quản lý riêng, ghi trạng thái ở đầu mỗi trang bài viết, ghi người phụ trách trong nội dung.

- Good: Không tăng số công cụ sử dụng
- Bad: Khó khăn khi số người tăng
- Bad: Khó sort theo deadline
- Bad: **GitBook không cập nhật thông tin mới nhất cho đến khi merge nên khó**

### Quản lý bằng GitHub Issues

- Good: Có vẻ scale được
- Bad: Với số người hiện tại thì công sức nhiều hơn
