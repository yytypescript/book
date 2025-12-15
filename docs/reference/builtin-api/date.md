---
title: Date
---

Date là class built-in của JavaScript để xử lý thời gian. Đối tượng Date chứa giá trị số biểu thị số mili giây đã trôi qua kể từ 00:00:00 UTC ngày 01/01/1970.

## Giới thiệu về đối tượng Date

Việc sử dụng đối tượng `Date` built-in của JavaScript cần một số lưu ý. Dưới đây là các vấn đề chính:

1. **Hoạt động không trực quan**: Đối tượng `Date` sẽ cố gắng tự điều chỉnh khi phân tích các ngày không tồn tại. Ví dụ, khi cố biểu diễn ngày 30 tháng 2 (ngày không tồn tại) bằng đối tượng `Date`, JavaScript sẽ điều chỉnh thành ngày 1 tháng 3. Điều này có thể gây nhầm lẫn và dẫn đến kết quả không mong đợi.
2. **Format tốn công**: Để hiển thị đối tượng `Date` theo format cụ thể, thường phải tự tạo hàm format riêng. Việc này không chỉ tốn công mà còn có thể gây ra bug.
3. **Xử lý timezone**: Đối tượng `Date` của JavaScript luôn hiển thị thời gian theo timezone local. Tuy nhiên, khi người dùng phân tán ở nhiều múi giờ khác nhau trên thế giới, điều này có thể gây nhầm lẫn.

Để giải quyết các vấn đề trên, khuyến nghị sử dụng các thư viện third-party như `date-fns` hoặc `Day.js`. Các thư viện này cung cấp API đơn giản, nhất quán và nhiều hàm thao tác ngày tháng, đồng thời xử lý vấn đề timezone một cách phù hợp. Ngoài ra, chúng còn cung cấp nhiều tùy chọn format để hiển thị ngày tháng.

Do đó, với các tác vụ đơn giản, đối tượng `Date` built-in của JavaScript là phù hợp, nhưng khi cần thao tác ngày giờ phức tạp hơn, hãy cân nhắc sử dụng thư viện third-party phù hợp. Điều này giúp các thao tác liên quan đến ngày giờ trở nên chắc chắn và hiệu quả hơn.

### Thư viện date third-party

#### [date-fns](https://date-fns.org/)

Thao tác ngày tháng theo dạng function hơn là object. Giải quyết các điểm phiền phức khi thao tác trực tiếp với đối tượng Date.

#### [Day.js](https://day.js.org/)

Cung cấp object nhẹ để thao tác ngày tháng. Có API tương thích với Moment.js (được đề cập sau), nên thường được cân nhắc làm thư viện thay thế cho các project đang dùng Moment.js.

#### [Moment.js](https://momentjs.com/)

Package có độ nổi tiếng rất lớn cho xử lý ngày tháng, nhưng hiện tại không còn phát triển mới nữa, không cần thiết phải sử dụng cho các project mới.

## Thao tác với Date

### Lấy năm - `Date.prototype.getFullYear()`

Lấy năm. Không được nhầm lẫn sử dụng `Date.prototype.getYear()`.

### Lấy 2-3 chữ số cuối của năm - `Date.prototype.getYear()`

**Không khuyến nghị**. Trả về giá trị số biểu thị năm của ngày đã cho trừ đi 1900. Thay vào đó hãy sử dụng `Date.prototype.getFullYear()`.

### Lấy tháng - `Date.prototype.getMonth()`

Lấy tháng, nhưng trả về 0-11 nên cần cộng thêm 1 để có tháng thực tế.

### Lấy ngày - `Date.prototype.getDate()`

Lấy ngày. Không được nhầm lẫn sử dụng `Date.prototype.getDay()`.

### Lấy thứ trong tuần - `Date.prototype.getDay()`

Lấy thứ trong tuần. Trả về 0-6. 0 là Chủ nhật, 1 là Thứ hai, v.v.

### Lấy giờ - `Date.prototype.getHours()`

Lấy giờ.

### Lấy phút - `Date.prototype.getMinutes()`

Lấy phút.

### Lấy giây - `Date.prototype.getSeconds()`

Lấy giây.

### Lấy mili giây - `Date.prototype.getMilliseconds()`

Lấy mili giây.

### Lấy số mili giây từ UTC 1970/01/01 00:00:00 - `Date.prototype.getTime()`

Trả về giá trị số mili giây đã trôi qua kể từ 00:00:00 ngày 01/01/1970 theo giờ UTC.

### Chuyển đổi sang chuỗi theo chuẩn ISO8601 - `Date.prototype.toJSON()`

Trả về chuỗi theo chuẩn ISO8601. ISO8601 có định dạng `YYYY-MM-DDThh:mm:ss.sssZ`.

## Chuyên mục: Nguồn gốc vấn đề của Date

Thiết kế của Date rất primitive nên cần khá nhiều code để chuyển đổi sang định dạng ngày thông thường như yyyy年m月d日.

```ts twoslash title="Xử lý format ngày của Date"
const d = new Date();
const year = d.getFullYear();
const month = d.getMonth() + 1;
const day = d.getDate();
console.log(`${year}年${month}月${day}日`);
```

Ngoài ra, Date không có method tiện lợi để xác định cụ thể timezone (ví dụ: 'America/Los_Angeles') hoặc chuyển đổi timezone. Do khó sử dụng, nhiều người đã phải nhờ đến các thư viện date third-party như [Moment.js](https://momentjs.com/) hoặc [date-fns](https://date-fns.org/). Do phản hồi quá tiêu cực, built-in API ngày tháng hiện đại [Temporal](https://tc39.es/proposal-temporal/docs/ja/index.html) cũng đã bắt đầu được cân nhắc.

Nhân tiện, tại sao Date lại có implementation khá tệ như vậy? Điều này có liên quan đến lịch sử. Brendan Eich, người implement JavaScript, chỉ được cho 10 ngày để hoàn thành[^1]. Trong thời hạn này cũng bao gồm cả implementation xử lý ngày tháng. Xử lý ngày tháng khá phức tạp và nếu tự làm từ đầu sẽ mất nhiều thời gian. Để rút ngắn thời gian, implementation đã được chuyển từ `java.util.Date` của Java thời đó.

[^1]: https://maggiepint.com/2017/04/09/fixing-javascript-date-getting-started/

Những người biết về xử lý ngày tháng của Java có thể nghĩ "Nếu xuất phát từ Java, sao lại có implementation tệ đến vậy!?". Xử lý ngày tháng của Java hiện tại rất tốt. Thực ra, `java.util.Date` của Java thời đó hoàn toàn khác với xử lý ngày tháng của Java hiện tại. Nó có tiếng là không tốt.

[Tài liệu `java.util.Date` của Java (phiên bản 1.0)](http://web.mit.edu/java_v1.0.2/www/javadoc/java.util.Date.html) thời đó. Nhìn vào thì thấy interface rất giống với Date của JavaScript. Có thể thấy được dấu vết của việc chuyển đổi.

![Reference của java.util.Date của Java (phiên bản 1.0) có interface tương tự như Date của JavaScript](date/java-date.png)

Do được chuyển đổi quá giống, thậm chí cả bug [vấn đề năm 2000] cũng được kế thừa[^2].

[vấn đề năm 2000]: https://ja.wikipedia.org/wiki/2000%E5%B9%B4%E5%95%8F%E9%A1%8C

![Slide của Mozilla chỉ ra rằng "bug" của vấn đề năm 2000 đã được kế thừa từ java.util.Date](date/mozilla-slide.png)

[^2]: https://www.mozilla.org/js/language/ICFP-Keynote.ppt

```js twoslash title="Bug của vấn đề năm 2000"
console.log(new Date(1999, 3, 1).getYear());
// @log: 99
console.log(new Date(2000, 3, 1).getYear());
// @log: 100
```

Tuy gọi là bug, nhưng hiện tại [đã trở thành specification](https://tc39.es/ecma262/#sec-date.prototype.getyear).

Trong Java, do `java.util.Date` phiên bản 1.0 không tốt nên ngay lập tức bị deprecated trong Java 1.1 và được thay thế bằng xử lý ngày tháng mới. Kết quả là thư viện date của Java hiện đã đủ dễ sử dụng. Còn JavaScript vốn bắt chước Java thì sau đó như thế nào? Date vẫn giữ nguyên trong hơn 20 năm.
