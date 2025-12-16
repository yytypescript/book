---
sidebar_label: Sự khác biệt giữa undefined và null
---

# Sự khác biệt giữa undefined và null

Trong nhiều ngôn ngữ lập trình, cách biểu thị "không có giá trị" chỉ có một cách như null. Tuy nhiên, JavaScript có 2 cách biểu thị "không có giá trị" là null và undefined. Đây là điều khiến những người từ ngôn ngữ khác chuyển sang JavaScript ngạc nhiên và phân vân về cách sử dụng. Ở đây, chúng ta sẽ giải thích sự khác biệt trong specification giữa null và undefined, và cách sử dụng chúng trong thực tế.

## Sự khác biệt về ý nghĩa

undefined và null có điểm chung là đều có nghĩa "không có giá trị" ở phạm vi rộng. Nếu có sự khác biệt về mặt ngữ nghĩa thì undefined là "không có giá trị vì chưa được gán giá trị", còn null là "không có giá trị vì không tồn tại giá trị để gán" - đây là sự khác biệt tinh tế.

Việc coding theo đúng sự khác biệt ngữ nghĩa này một cách nghiêm ngặt khá khó với người mới bắt đầu. Vì không có tiêu chuẩn khách quan về cách sử dụng. Nếu phân vân nên dùng cái nào thì sử dụng undefined sẽ an toàn hơn.

## Sự khác biệt trong language specification

undefined và null có sự khác biệt trong specification của ngôn ngữ. Đây không phải là sự khác biệt mơ hồ như về ý nghĩa, mà có thể xác nhận rõ ràng.

### null không tự nhiên phát sinh

undefined theo language specification sẽ tự nhiên phát sinh mà không cần programmer sử dụng rõ ràng. Ví dụ, khi khai báo biến mà không có giá trị khởi tạo, JavaScript sẽ gán undefined cho biến đó.

```js twoslash
let value;
console.log(value);
// @log: undefined
```

Khi truy cập property không tồn tại trong object hoặc phần tử không có trong array, cũng tự động trở thành undefined.

```js twoslash
const obj = {};
console.log(obj.foo);
// @log: undefined
const arr = [];
console.log(arr[0]);
// @log: undefined
```

Khi lấy return value của function không có return value cũng là undefined.

```js twoslash
function func() {}
console.log(func());
// @log: undefined
```

Mặt khác, null không phát sinh trừ khi programmer cố ý sử dụng. JavaScript không cung cấp null. Tuy nhiên, một số DOM API trả về null, nên tùy library bạn có thể gặp null.

### undefined là biến

undefined và null đều là giá trị primitive type, nhưng undefined là biến còn null là literal. null là literal nên không thể tạo biến có tên null. Mặt khác undefined không phải literal mà là biến, nên có thể tạo biến có tên undefined.

### Toán tử typeof

Kết quả của toán tử typeof khác nhau giữa undefined và null. undefined cho kết quả typeof là "undefined" chỉ tên primitive, trong khi null không phải "null" mà là "object".

```js twoslash
typeof undefined;
// @log: "undefined"
typeof null;
// @log: "object"
```

### JSON

Khi giá trị của object property là undefined, khi JSON hóa object đó bằng JSON.stringify, property sẽ bị xóa. Mặt khác, khi giá trị property là null, giá trị được giữ lại khi JSON hóa.

```js twoslash
console.log(JSON.stringify({ foo: undefined }));
// @log: {}
console.log(JSON.stringify({ foo: null }));
// @log: {"foo": null}
```

## Cách sử dụng undefined và null

Cách sử dụng undefined và null như thế nào là chủ đề gây tranh cãi lớn. Có programmer cho rằng chỉ nên dùng undefined, có người nói nên dùng null. Cũng có người chủ trương cần hiểu rõ sự khác biệt ý nghĩa giữa undefined và null để sử dụng phân biệt. Ngược lại, cũng có người có quan điểm không suy nghĩ quá sâu.

Nếu không có yêu cầu đặc biệt, trong TypeScript khuyến nghị không dùng null mà chỉ dùng undefined. Tuy nhiên, vì cũng có API trả về null, nên trong phần code mới bạn viết, hãy cố gắng không dùng null mà sử dụng undefined. Bạn có thể convert null từ API thành undefined, nhưng nếu code convert nhiều quá thì việc cho phép null như vậy cũng là phương án thỏa hiệp tốt.

### Công sức để phát triển ý thức phân biệt không tương xứng với lợi ích

Nếu phân biệt sử dụng 2 loại, cần có quyết định ở mỗi nơi trong code là nên dùng cái nào. Quyết định đó nếu làm việc cá nhân thì còn được, nhưng với teamwork thì độ khó tăng lên. Team cần có nhận thức chung về rule và ví dụ cụ thể như "trường hợp này nên dùng undefined", "trường hợp này dùng null". Nếu không có nhận thức chung, trong khi coding sẽ có câu hỏi phát sinh, hoặc khi code review sẽ có chỉnh sửa, dẫn đến development bị dừng ở những chỗ không bản chất. Việc thiết lập rule và thống nhất ý thức để phân biệt sử dụng không phải không thể, nhưng thực tế lợi ích của việc phân biệt undefined và null không đáng với công sức bỏ ra.

Mặt khác, "không dùng null mà thống nhất dùng undefined" là rule đơn giản. Rule này dễ dàng trở thành nhận thức chung và teamwork cũng dễ dàng hơn. Thực tế, team phát triển TypeScript đã đưa ra [guideline đơn giản chỉ một dòng "không dùng null"](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines#null-and-undefined), giúp nhiều developer dễ dàng tham gia hơn.

### Thống nhất về undefined đơn giản hơn

Việc có 2 loại undefined và null có nghĩa "không có giá trị" là nguồn gốc của sự nhầm lẫn, nên dùng một trong hai sẽ giảm quyết định trong coding. Vì vậy, cũng có thể nghĩ đến phương án thống nhất về null. Tuy nhiên, điều đó không được khuyến nghị. Vì undefined tự nhiên phát sinh ở khắp nơi, nếu cố gắng chuyển tất cả thành null thì lượng code sẽ tăng dần.

Việc đặt giá trị khởi tạo của biến là null thì đơn giản, nhưng nếu cố gắng làm cho cả trường hợp truy cập object property hoặc array element không tồn tại cũng trả về null thì sẽ khó khăn. Do đó, nếu thống nhất thì nên thống nhất về undefined mới thực tế.
