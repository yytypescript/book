---
description: Bật hàng loạt các option thuộc nhóm strict
tags: [strict]
---

# strict

`strict` là compiler option bật hàng loạt các compiler option thuộc nhóm strict.

- Mặc định: `false`
- Phiên bản thêm vào: 2.3
- TypeScript khuyến nghị nên bật

## Giải thích

Option này **tính đến TypeScript 4.4** tương đương với việc bật cả 8 option sau. Nếu phát triển từ đầu thì nên bật option này.

- noImplicitAny
- strictNullChecks
- strictFunctionTypes
- strictBindCallApply
- strictPropertyInitialization
- noImplicitThis
- useUnknownInCatchVariables
- alwaysStrict

Lý do ghi rõ phiên bản TypeScript trong giải thích là vì **trong các phiên bản tương lai có thể thêm hoặc bỏ các option**. Nếu muốn cấu hình ổn định hơn, thay vì dùng `strict` hãy bật từng option riêng lẻ. Khi bật option này mà tắt các option riêng lẻ thì cấu hình riêng lẻ sẽ được ưu tiên.
