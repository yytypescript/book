# TypeScript không phải là gì?

Nhiều developer đánh giá cao TypeScript. Trong bối cảnh đó, cũng có người đánh giá quá cao TypeScript dựa trên hiểu lầm. TypeScript cũng không phải là cây đũa thần. Bài viết này xem xét những gì TypeScript không giải quyết được. Điều quan trọng là hiểu điều này vì nỗ lực làm những gì TypeScript không thể làm sẽ trở nên vô ích.

## Không ảnh hưởng đến tăng tốc runtime / giảm bộ nhớ

Trong các cuộc thảo luận so sánh TypeScript và JavaScript, thỉnh thoảng thấy các ý kiến như sau.

- TypeScript có thể chạy nhanh hơn JavaScript
- TypeScript tiêu thụ ít bộ nhớ hơn JavaScript

Ngược lại, đôi khi cũng có lo ngại như sau.

- TypeScript có chậm hơn JavaScript không?
- TypeScript có tiêu thụ nhiều bộ nhớ hơn JavaScript không?

Kết luận là, performance runtime của TypeScript giống JavaScript. Để hiểu điều này, cần nắm 2 tiền đề sau.

1. Không có TypeScript runtime.
2. TypeScript compiler không tối ưu hóa.

### Không có TypeScript runtime

TypeScript không có runtime. Điều này có nghĩa là không có engine trực tiếp chạy TypeScript. Ngay cả Microsoft Edge, browser do Microsoft phát triển TypeScript, cũng không thể chạy TypeScript. Server Node.js cũng vậy[^1]. Để chạy code viết bằng TypeScript, cần chuyển đổi sang code JavaScript một lần. Do đó, performance của TypeScript được quyết định bởi JavaScript sau khi compile như thế nào.

[^1]: Có môi trường server gọi là Deno tự xưng là TypeScript runtime. Ngay cả Deno này, bên trong cũng compile TypeScript sang JavaScript và chạy trên JavaScript engine.

### TypeScript compiler không tối ưu hóa

Thông thường "compiler" được cho là có 3 công việc sau.

1. Phân tích source code và kiểm tra vấn đề
2. Chuyển đổi source code sang ngôn ngữ khác
3. Tối ưu hóa
   - Làm cho tốc độ chạy nhanh hơn
   - Làm cho chạy với ít bộ nhớ hơn
   - Làm cho tiêu thụ ít điện năng hơn
   - Làm cho kích thước file thực thi nhỏ hơn

Trong số này, TypeScript compiler chỉ làm 2 việc trên. Việc thứ 3 là tối ưu hóa không được thực hiện. TypeScript compiler về cơ bản chỉ xóa phần liên quan đến kiểu và chuyển đổi sang JavaScript gần như nguyên vẹn phần còn lại.

Ví dụ, nếu compile code TypeScript sau,

```ts twoslash title="Code TypeScript"
const oneDay: number = 60 * 60 * 24;
```

Code JavaScript sau sẽ được tạo ra. Chỉ type annotation `number` bị xóa.

```js twoslash title="Code JavaScript sau compile"
const oneDay = 60 * 60 * 24;
```

Biểu thức `60 * 60 * 24` này có thể tính toán tĩnh. Nếu tính toán khi compile và tạo JavaScript như sau, sẽ không cần tính toán thừa khi runtime. Đóng góp vào tăng tốc.

```js twoslash title="Code JavaScript đã tính toán trước"
const oneDay = 86400;
```

Tối ưu hóa như trên về mặt kỹ thuật có thể thực hiện được. Tuy nhiên, TypeScript nguyên tắc không thực hiện tối ưu hóa như vậy. TypeScript compiler về cơ bản chỉ xóa kiểu.

### Performance của cả hai về cơ bản tương đương

Chúng ta đã thấy TypeScript có các đặc điểm sau.

1. Không có TypeScript runtime.
2. TypeScript compiler không tối ưu hóa.

Từ 2 đặc điểm này, khi viết code cùng logic bằng TypeScript và JavaScript và so sánh, có thể coi không có khác biệt performance đáng chú ý[^2].

[^2]: Nói chính xác, khi chỉ định compiler option `target` là `es3` (JavaScript cũ), compile không chỉ đơn giản là "xóa kiểu" nên không phải lúc nào cũng đảm bảo tương đương.

## Không sửa bug specification của JavaScript

JavaScript có ví dụ về bug ban đầu trở thành specification. Ví dụ, [toán tử typeof] kiểm tra kiểu của giá trị, trả về `"object"` khi truyền `null`. Điều này được coi là bug, nhưng không được sửa vì tương thích ngược và trở thành specification.

[toán tử typeof]: ../reference/values-types-variables/typeof-operator.md

```js twoslash
typeof null;
// @log: "object"
```

Trong TypeScript, bug specification như vậy cũng không được sửa. Lý do là TypeScript có lập trường là ngôn ngữ thêm kiểu vào JavaScript.

<PostILearned>

Những gì TypeScript không giải quyết

・Cải thiện performance runtime của JavaScript
・Giải quyết bug specification của JS

</PostILearned>
