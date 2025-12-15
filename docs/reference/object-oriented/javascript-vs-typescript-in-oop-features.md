# So sánh tính năng OOP giữa JavaScript và TypeScript

Đây là bảng so sánh đơn giản, cho thấy TypeScript mở rộng nhiều tính năng liên quan đến kiểu dữ liệu.

| Tính năng                  | JavaScript | TypeScript |
| :------------------------- | :--------- | :--------- |
| Cú pháp class              | ○          | ○          |
| Kế thừa class              | ○          | ○          |
| super                      | ○          | ○          |
| Constructor                | ○          | ○          |
| Abstract class             | ✕          | ○          |
| Abstract method            | ✕          | ○          |
| Access modifier            | △          | ○          |
| Interface                  | ✕          | ○          |
| Generics                   | ✕          | ○          |
| Static property            | △          | ○          |
| Static method              | △          | ○          |
| Final class / Sealed class | ✕          | ✕          |
| Final method               | ✕          | ✕          |

Đặc điểm nổi bật của TypeScript không chỉ ở class mà còn ở chỗ nó báo lỗi compile khi kiểu dữ liệu không phù hợp ngay trong lúc code. Với JavaScript, về cơ bản bạn chỉ biết lỗi kiểu dữ liệu khi chạy chương trình và gặp kiểu không hợp lệ. TypeScript chỉ compile khi code được đánh giá là type-safe và không có vấn đề. Ngoài ra, thông tin kiểu sẽ bị loại bỏ trong file JavaScript output.
