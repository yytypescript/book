# Tạo một hàm đơn giản

Trong tutorial này, qua trải nghiệm tạo một hàm đơn giản với TypeScript, bạn sẽ học type của TypeScript giải quyết vấn đề gì của JavaScript và compiler đóng vai trò gì.

## Những thứ cần thiết cho tutorial này

Để thực hiện tutorial này, cần có một số tool. Hãy chuẩn bị những thứ được liệt kê dưới đây.

- Node.js
- Editor như VS Code hoặc WebStorm
- tsc (TypeScript compiler)

[Chuẩn bị môi trường code](./setup.md)

## Vấn đề có thể xảy ra với JavaScript

Đầu tiên, hãy tạo file JavaScript sau ở môi trường local.

```js title="increment.js"
function increment(num) {
  return num + 1;
}

console.log(increment(999));
```

Chương trình này chỉ increment argument và trả về. Hãy thử chạy với Node.js.

```sh
$ node increment.js
1000
```

Chắc là chạy không có vấn đề gì. Tiếp theo, hãy thay đổi argument của hàm `increment` từ `999` sang string `"999"`.

```js title="increment.js"
function increment(num) {
  return num + 1;
}

console.log(increment("999"));
//                    ^^^^^
```

Thay đổi nhỏ này làm kết quả thực thi thay đổi lớn. Hãy thử chạy.

```sh
$ node increment.js
9991
```

Kết quả output chắc đã thay đổi từ 1000 sang 9991. Lý do là vì argument `num` trở thành string, toán tử `+` không còn là phép cộng mà trở thành nối chuỗi. JavaScript hiểu `"999" + 1` thành `"999" + "1"`. Để biết chi tiết về cách hiểu này, hãy xem giải thích về type coercion.

[Type coercion](../reference/values-types-variables/type-coercion.md)

Argument chỉ khác nhau về type một cách tinh tế giữa `999` và `"999"`. Nếu đây là tính toán số tiền thì sẽ là vấn đề lớn. Hàm `increment` chỉ hoạt động đúng khi argument `num` là kiểu number. Tuy nhiên, khi gọi hàm, có thể truyền nhiều type khác nhau mà không có ràng buộc. Làm thế nào để ràng buộc chỉ có thể gán kiểu number cho argument? Đây là lúc TypeScript xuất hiện.

## Chuyển đổi JavaScript sang TypeScript

Bước đầu tiên để biến JavaScript thành TypeScript là đổi extension của file từ `.js` sang `.ts`. TypeScript nói đơn giản là ngôn ngữ chỉ thêm cú pháp liên quan đến type vào JavaScript. Vì vậy, code JavaScript có thể được xử lý như TypeScript nguyên vẹn.

```sh
mv increment.js increment.ts
```

## Làm compiler hoạt động

Tính năng nổi bật của TypeScript chính là compiler. Một trong những vai trò của compiler là kiểm tra vấn đề về type như ví dụ trên và báo cáo các điểm phát hiện cho programmer. TypeScript compiler rất thông minh, có thể chỉ ra vấn đề về type mà không cần gợi ý. Tuy nhiên, nếu cho đủ gợi ý, compiler sẽ kiểm tra tỉ mỉ hơn.

Gợi ý cho compiler được gọi là "type annotation". Vậy hãy viết type annotation cho argument `num` của hàm `increment`. Type annotation được viết là `: number` bên phải `num`. Viết điều này có nghĩa là "argument `num` chỉ có thể gán kiểu number". Compiler sẽ dựa vào gợi ý này để kiểm tra code gọi hàm.

<!--prettier-ignore-->
```ts twoslash {1,2} title="increment.ts"
// @noErrors
function increment(num: number) {
//                 ^^^^^^^^type annotation
  return num + 1;
}

console.log(increment("999"));
```

Sau khi viết type annotation, hãy để TypeScript compiler kiểm tra. Lệnh của TypeScript compiler là `tsc`.

```sh
tsc increment.ts
```

Sẽ có error sau được báo cáo.

```ts twoslash {1,2}
// @errors: 2345
function increment(num: number) {
  return num + 1;
}
// ---cut---
console.log(increment("999"));
```

Nội dung error này là chỉ ra rằng "argument `num` chỉ có thể gán kiểu number, nhưng khi gọi hàm lại gán kiểu string. Liệu có thực sự không có vấn đề gì?".

Error có thể có hình ảnh là thứ không mong muốn. Tuy nhiên, error mà compiler báo cáo là thứ được hoan nghênh. Bởi vì nó thay bạn thông báo về nguy hiểm tiềm ẩn trong code tại thời điểm coding.

## Vượt qua compile

Công việc giải quyết tất cả các điểm vấn đề mà compiler chỉ ra được gọi là "vượt qua compile". Hãy sửa code trên thành code có thể vượt qua compile. Cách sửa đơn giản là chỉ cần biến argument khi gọi hàm thành kiểu number.

```ts twoslash {5} title="increment.ts"
function increment(num: number) {
  return num + 1;
}

console.log(increment(999));
//                    ^^^chỗ cần sửa
```

Sau khi sửa, hãy compile lại.

```sh
tsc increment.ts
```

Lần này chắc xử lý kết thúc mà không hiển thị gì. Compile thành công.

## JavaScript được tạo ra

Bạn có thể đã nhận ra rằng qua các bước đến đây, một file increment.js đã được tạo ra. Nội dung của file đó chắc như sau.

```ts twoslash title="increment.js"
// @showEmit
// @alwaysStrict: false
function increment(num: number) {
  return num + 1;
}

console.log(increment(999));
```

Đây là file JavaScript được compiler tạo ra trong quá trình compile increment.ts. So sánh với code TypeScript, bạn có thể thấy type annotation đã bị xóa khỏi argument `num`.

Phần type annotation là thứ riêng của TypeScript. Nếu có nó thì không thể thực thi trên browser hoặc Node.js. Vì vậy, TypeScript compiler tạo ra file JavaScript để chạy trên môi trường thực thi JavaScript. Developer sẽ deploy file JavaScript thành phẩm này lên môi trường production.

<PostILearned>

・Viết lại từ JavaScript sang TypeScript là đổi extension thành .ts
・Compiler cho biết vấn đề về type
・Thêm type annotation giúp compiler kiểm tra chi tiết hơn
・Deploy và sử dụng JS được compiler tạo ra

</PostILearned>
