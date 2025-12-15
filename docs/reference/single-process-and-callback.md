# Single process, single thread và callback

Computing. Đặc biệt khi bạn bắt đầu lập trình xử lý song song và đồng thời, bạn sẽ nghe thấy các từ process và thread.

JavaScript là ngôn ngữ single process, single thread. Điều này có nghĩa là tất cả các chương trình được xử lý tuần tự. Ngôn ngữ single thread cũng chỉ có 1 call stack.

Call stack là thứ quản lý thứ tự gọi của các function đang thực thi. Bản thân từ stack có lẽ nhiều người đã từng nhìn thấy khi vô tình tạo vòng lặp vô hạn trong recursive function call.

```ts twoslash
function stack(): never {
  stack();
}

stack();
```

```text
RangeError: Maximum call stack size exceeded
```

## Blocking

Xử lý tuần tự có nghĩa là khi có xử lý tốn thời gian, các xử lý khác sẽ không được thực thi trong khoảng thời gian đó.

Nhiều người có lẽ đã từng implement giao tiếp AJAX trong browser. AJAX có thời gian chờ từ khi gửi request đến khi nhận response, nhưng nếu xử lý tuần tự thì JavaScript sẽ không thể thực hiện xử lý khác trong khoảng thời gian đó. Đây được gọi là blocking.

JavaScript có thể handle các event xảy ra trong browser như click, input từ các element input, back forward của browser history, v.v., nhưng trong khi xử lý tốn thời gian đang được thực thi, blocking xảy ra nên không thể handle các thao tác này. Nếu việc render màn hình cũng được giao cho JavaScript thì màn hình sẽ trông như bị đóng băng.

```ts twoslash
declare function ajax(url: string): Promise<unknown>;
declare function wait(ms: number): Promise<void>;
declare function ajaxDone(): boolean;
declare function cancelAjax(): Promise<void>;
// ---cut---
ajax("https://...");
wait(3000);

if (!ajaxDone()) {
  cancelAjax();
}
```

Các method trên không phải là method thực sự tồn tại, nhưng nếu bạn hiểu được ý nghĩa đại khái thì không có vấn đề. Nhìn điều này mà không có định kiến trước có thể thấy

1. Bắt đầu AJAX
2. Chờ 3000ms
3. Nếu AJAX chưa xong
   1. Hủy AJAX

nhưng điều này không hoạt động như dự định. Thực tế sẽ như sau.

1. AJAX và lấy kết quả (block và khi quay lại thì tiến sang 2)
2. Chờ 3000ms
3. Nếu AJAX chưa xong (đã kết thúc rồi)
4. Hủy AJAX

Tất nhiên `ajaxDone()` đã kết thúc bất kể kết quả thế nào tại thời điểm `ajax()`, nên `cancelAjax()` không được thực thi.

## Non-blocking

Đây là khái niệm ngược lại với blocking. Node.js có thể xử lý non-blocking I/O.

Điều này chỉ phương thức trả về kết quả cho caller ngay lập tức mà không đợi xử lý input/output kết thúc, và sau đó thông báo kết quả bằng cách khác.

Input/output ở đây thường được sử dụng khi nói đến việc truy cập đến nơi có data khác như file, request, DB, v.v., được gọi là repository, từ máy (server) mà application đang chạy.

Ví dụ dễ hiểu về non-blocking là như sau.

```ts twoslash
console.log("first");

setTimeout(() => {
  console.log("second");
}, 1000);

console.log("third");
```

`setTimeout()` là function thực sự tồn tại. Tham số thứ 2 chỉ định sau bao nhiêu millisecond thì thực thi function ở tham số thứ 1. Ở đây chỉ định 1000, tức là 1000 millisecond, nghĩa là 1 giây sau.

Những người mới bắt đầu với JavaScript thường nghĩ output cho code này là:

```text
first
second
third
```

Output thực tế là:

```text
first
third
second
```

`setTimeout()` là function non-blocking. Khi function này được thực thi, nó tạm giữ function ở tham số thứ 1 và kết thúc xử lý. Vì vậy `console.log('third')` tiếp theo được thực thi, và sau 1000 millisecond, function ở tham số thứ 1 được thực thi và `console.log('second')` bên trong được thực thi.

1000 millisecond là chờ quá lâu, nếu ngắn hơn thì sẽ hiển thị theo thứ tự dự định. Bạn có thể nghĩ như vậy, nhưng về cơ bản nó không hoạt động như dự định. Dưới đây là ví dụ thay đổi tham số thứ 2 từ 1000 millisecond thành 0 millisecond, nhưng nội dung output không thay đổi so với trước khi thay đổi.

```ts twoslash
console.log("first");

setTimeout(() => {
  console.log("second");
}, 0);

console.log("third");

// @log: 'first'

// @log: 'third'

// @log: 'second'
```

Ví von với nấu ăn trong thế giới thực có thể dễ hiểu hơn. Trong 40 phút nấu cơm, không có đầu bếp nào đứng đợi trước nồi cơm điện, mà trong thời gian đó sẽ làm các món ăn kèm khác.

Công việc tốn thời gian nhưng phần lớn là chờ đợi, với nồi cơm điện thì sau khi nhấn nút nấu cơm, không cần chờ đến khi cơm chín mà chuyển sang thực hiện xử lý khác - đó là ý nghĩa của non-blocking.

## Những người hùng thầm lặng để đạt được non-blocking

Để nói về non-blocking, giới thiệu những người hỗ trợ âm thầm mà bạn chắc chắn sẽ gặp.

### Message queue

Message queue là vùng lưu trữ tạm thời các event từ user, event từ browser, v.v. Các event tích lũy trong message queue được đưa từng cái một vào call stack khi call stack trống.

### Callback

**Function tạm giữ** đã giải thích trong `setTimeout()` được gọi là callback function. **Thông báo bằng cách khác sau đó** được đề cập ở mục trước chính là callback function này.

Callback function được tích lũy trong message queue khi một function thỏa mãn điều kiện, trong ví dụ mục trước là sau 1000 millisecond. Vì chỉ được tích lũy trong message queue, nên thực tế còn mất thêm thời gian cho đến khi call stack trống thì mới được thực thi.

Cho đến nay đã giải thích `setTimeout()` delay callback function bằng số millisecond của tham số thứ 2 rồi thực thi, nhưng nghiêm túc mà nói thì chỉ đưa lại vào message queue sau khi số millisecond trôi qua, và callback function đó không được thực thi ngay lập tức.

### Event loop

Event loop là vòng lặp vô hạn đơn giản. Nó liên tục giám sát call stack, và nếu có event thì thực thi nó. Ngoài stack của function call bình thường, nó cũng xử lý event mà message queue đưa lại. Hiện tại không giải thích chi tiết, nhưng hãy nhận thức rằng có một cái gì đó luôn xử lý event cho bạn là được!

## Tác hại của non-blocking

Non-blocking có nhiều điểm tốt và là đồng đội đáng tin cậy, nhưng non-blocking đôi khi đột nhiên cắn lại bạn. Đáng sợ nhỉ.

### Callback hell

Đây là **sản phẩm tiêu cực** trong thế giới callback.

Nói chung, callback được sử dụng để nhận kết quả xử lý tốn một khoảng thời gian nhất định sau đó. Function sử dụng callback chủ yếu có dạng như sau.

```ts twoslash
function ajax(uri: string, callback: (res: Response) => void): void {
  // ...
}
```

Khi sử dụng function này sẽ như thế này.

```ts twoslash
declare function ajax(uri: string, callback: (res: Response) => void): void;
// ---cut---
ajax("https://...", (res: Response) => {
  // ...
});
```

Ở đây, nếu muốn sử dụng `ajax()` tiếp dựa trên kết quả của function `ajax()` này, sẽ thành như thế này.

```ts twoslash
declare function ajax(uri: string, callback: (res: Response) => void): void;
// ---cut---
ajax("https://...", (res1: Response) => {
  ajax("https://...", (res2: Response) => {
    // ...
  });
});
```

Indent (nest) trở nên sâu. Nếu điều này tiếp tục nhiều lần sẽ không thể nhìn nổi.

```ts twoslash
declare function ajax(uri: string, callback: (res: Response) => void): void;
// ---cut---
ajax("https://...", (res1: Response) => {
  ajax("https://...", (res2: Response) => {
    ajax("https://...", (res3: Response) => {
      ajax("https://...", (res4: Response) => {
        ajax("https://...", (res5: Response) => {
          ajax("https://...", (res6: Response) => {
            // ...
          });
        });
      });
    });
  });
});
```

Class đột phá để giải quyết callback hell này là `Promise`, và có thể sử dụng như built-in object trong các browser chính và Node.js. Giải thích về điều này có trang riêng trong sách này, vui lòng tham khảo.

[Xử lý bất đồng bộ](./asynchronous/README.md)
