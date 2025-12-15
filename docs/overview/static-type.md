# Static typing

Ngôn ngữ lập trình được phân loại thành 2 nhóm lớn: ngôn ngữ static typing và ngôn ngữ dynamic typing. Trong ngôn ngữ static typing có C và Java, và TypeScript mà bạn đang học cũng thuộc nhóm này. Mặt khác, ngôn ngữ dynamic typing có Ruby, Python, PHP và JavaScript.

Nếu bạn đã làm việc với ngôn ngữ dynamic typing và TypeScript là ngôn ngữ static typing đầu tiên của bạn, chắc hẳn bạn sẽ có những câu hỏi như:

- Sự khác biệt giữa "ngôn ngữ dynamic typing" và "ngôn ngữ static typing" là gì?
- "Ngôn ngữ static typing" có những lợi ích gì?

Ở đây, chúng tôi sẽ giải đáp những thắc mắc của người đọc lần đầu thử sức với ngôn ngữ static typing.

## Ngôn ngữ dynamic typing xác định kiểu tại "runtime"

Trước khi xem xét ngôn ngữ static typing là gì, hãy nhìn lại ngôn ngữ dynamic typing quen thuộc là gì.

Ví dụ, hãy xem xét hàm trừ 1 từ tham số đầu vào và trả về kết quả trong Python.

```python
def minus(x):
  return x - 1

print(minus(2))
```

Hàm `minus()` này có biến `x`, khi số nguyên `2` được gán vào, nó tính toán không vấn đề gì và trả về số nguyên `1`. Điều này là hiển nhiên.

Vậy nếu truyền kiểu `string` `"two"` vào hàm `minus()` thì sao?

```python
def minus(x):
  return x - 1

print(minus("two"))
```

Khi chạy code này, sẽ xảy ra lỗi "TypeError: unsupported operand type(s) for -: 'str' and 'int'". Điều này có nghĩa là "không thể trừ số nguyên từ chuỗi".

Việc trừ số từ chuỗi rõ ràng là kỳ lạ với con người. Bạn có thể nhận ra sự bất thường về kiểu mà không cần chạy.

Tuy nhiên, trong ngôn ngữ dynamic typing, vấn đề về kiểu bị bỏ qua cho đến khi chương trình được chạy. Khi chương trình chạy, kiểu của biến được xác định. Trong quá trình đó, vấn đề được phát hiện và xảy ra lỗi.

Từ đây có thể thấy, **đặc điểm lớn nhất của ngôn ngữ dynamic typing là kiểu của biến không được xác định cho đến khi chương trình được chạy**. Đặc điểm này cũng là lợi thế vì nó tăng độ tự do trong lập trình.

## Ngôn ngữ static typing xác định kiểu tại "compile time"

Vậy ngôn ngữ static typing có những đặc điểm gì? Hãy viết hàm `minus()` được trình bày trong Python bằng TypeScript, một ngôn ngữ static typing.

```ts twoslash
function minus(x: number) {
  return x - 1;
}
```

Điểm cần chú ý là `number` được viết bên cạnh biến `x`. Đây được gọi là type annotation, biểu thị rằng biến `x` có kiểu `number`.

Nếu gán kiểu `string` `"two"` vào biến `x` này và compile thì sao?

```ts
minus("two");
```

Kết quả compile là lỗi, và cảnh báo "Argument of type 'string' is not assignable to parameter of type 'number'." được hiển thị. Nội dung cảnh báo này là "không thể gán kiểu `string` cho parameter kiểu `number`".

Lỗi tương tự cũng được xác nhận trong ví dụ Python, nhưng nó xảy ra tại runtime. Mặt khác, lỗi trong ví dụ TypeScript này xảy ra tại compile time. Đây là sự khác biệt lớn giữa ngôn ngữ dynamic typing và ngôn ngữ static typing. Compile time là giai đoạn trước khi chạy chương trình. Tức là, **đặc điểm của ngôn ngữ static typing là kiểu được xác định tại compile time, trước runtime**. Nhờ đó, việc phát hiện sớm các phép gán rõ ràng bất thường là lợi thế lớn của ngôn ngữ static typing như TypeScript.

## Xem type annotation là chi phí hay đầu tư

Trong ngôn ngữ dynamic typing bạn không cần viết type annotation, nhưng trong TypeScript về cơ bản bạn sẽ viết cho mỗi biến. Do đó, một số người từ ngôn ngữ dynamic typing chuyển sang TypeScript có thể cảm thấy phiền khi lượng code tăng lên. Type annotation có thể được coi là "chi phí". (Có cơ chế "type inference" để giảm bớt điều này, nhưng ở đây chúng tôi bỏ qua phần giải thích đó.)

Vậy mục đích của type annotation là gì? Đó là để programmer nói cho compiler "kiểu của biến này là gì". Khi có type annotation, ví dụ khi compiler xử lý hàm `minus()`, nó sẽ làm việc như "biến `x` phải là kiểu `number`. Vậy code gán kiểu `string` là sai. Hãy báo lỗi để cho programmer biết".

Compiler chỉ ra vấn đề chi tiết, có thể bạn cảm thấy phiền. Ở đây cần thay đổi cách nhìn. Compiler là "code reviewer chuyên dụng của bạn". Bạn có từng gặp trường hợp release mà không nhận ra bug, rồi phát hiện thành vấn đề lớn không? Compiler là sự tồn tại đáng tin cậy cho bạn biết vấn đề ở giai đoạn rất sớm trước khi điều đó xảy ra.

Compiler cũng không phải toàn năng. Nếu không dạy kiểu đúng cách, nó sẽ không trở thành compiler tốt. Ngược lại, nếu viết type annotation đúng cách, nó sẽ trở thành compiler thông minh nhận ra nhiều vấn đề. Từ quan điểm này, type annotation có thể được coi là "đầu tư" để nuôi dưỡng compiler đúng cách và ngăn ngừa bug từ trước.

## Tóm tắt

- Ngôn ngữ dynamic typing: Ngôn ngữ xác định kiểu biến tại runtime. Vấn đề liên quan đến kiểu không được phát hiện cho đến khi chạy chương trình.
- Ngôn ngữ static typing: Ngôn ngữ xác định kiểu biến tại compile time. Vấn đề liên quan đến kiểu có thể được phát hiện mà không cần chạy chương trình.
- Type annotation là đầu tư để nuôi dưỡng compiler, code reviewer chuyên dụng của bạn.
