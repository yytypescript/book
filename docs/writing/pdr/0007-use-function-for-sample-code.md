# 0007-Ưu tiên sử dụng function trong sample code định nghĩa hàm

- Trạng thái: Áp dụng
- Người đề xuất: suin
- Người quyết định: suin, reoring, クロレ, jamashita
- Ngày cập nhật: 2020-02-21

## Vấn đề cần giải quyết và bối cảnh

Khi trình bày sample code định nghĩa hàm trong TypeScript/JavaScript, trong trường hợp cả function và arrow function đều không ảnh hưởng đến nội dung giải thích, nên ưu tiên sử dụng cách viết nào?

Trong JavaScript, khi định nghĩa hàm, có hai cách: sử dụng function và sử dụng arrow function. Bằng việc làm rõ tiêu chuẩn sử dụng cái nào, cuốn sách sẽ có sự thống nhất, đồng thời tránh gây nhầm lẫn cho độc giả.

## Quyết định

**Ưu tiên sử dụng function trong sample code định nghĩa hàm**. Lý do là:

- Với function, người đọc dễ nhận biết đó là hàm hơn.
- Handbook chính thức của TypeScript cũng sử dụng function.

Tuy nhiên, **những nơi cần sử dụng arrow function, hoặc không thể giải thích được nếu không dùng arrow function, thì sử dụng arrow function**. Ví dụ:

- Khi higher-order function cần tham chiếu đến this.
- Khi giải thích về chính arrow function.
- Khi theo quy ước của framework mà arrow function được sử dụng phổ biến hơn trong thực tế.
