# Prototype-based

Phần này giải thích tổng quan về prototype-based của JavaScript. Nội dung được viết dành cho những người đã từng sử dụng class trong Java, PHP hoặc đã tiếp xúc với lập trình hướng đối tượng. Ngoài ra, phần này chủ yếu trả lời các câu hỏi sau:

- Prototype-based là cách tiếp cận như thế nào?
- JavaScript prototype-based khác gì so với PHP, Java class-based?
- Tại sao JavaScript lại áp dụng prototype-based?
- Ưu điểm của prototype-based là gì?

## Tạo object

Trong lập trình hướng đối tượng (OOP), chúng ta làm việc với object. Để làm việc với object, cần phải tạo object.

Tuy nhiên, cách tạo object không có quy tắc thống nhất trong OOP. Nó khác nhau tùy theo ngôn ngữ. Mặc dù chi tiết về cách tạo object khác nhau theo ngôn ngữ, nhưng phương pháp tạo có thể chia thành hai loại lớn: "class-based" và "prototype-based".

## Class-based là gì

Java, PHP, Ruby, Python được phân loại là class-based. Trong class-based, việc tạo object sử dụng "class" - bản thiết kế của object. Khi sử dụng operator `new` với class, ta nhận được object, và trong thế giới class-based, nó được gọi là "instance".

Ví dụ, khi muốn có object button, trước tiên tạo class Button làm bản thiết kế.

```js twoslash
class Button {
  constructor(name) {
    this.name = name;
  }
}
```

Sau đó, sử dụng operator `new` với class Button để nhận được object button.

```js twoslash
class Button {
  constructor(name) {
    this.name = name;
  }
}
// ---cut---
const dangerousButton = new Button("Đừng có nhấn nhé?");
```

Ngôn ngữ như vậy được gọi là class-based vì nguồn gốc của object là class.

## Prototype-based là gì

Ngược lại, việc tạo object trong JavaScript là prototype-based. Đặc điểm của prototype-based là không có thứ gì giống như class. (Nếu có thì class cũng là một loại object và không được đối xử đặc biệt)

Trong class-based, nguồn gốc của object là class. Prototype-based không có class. Vậy lấy gì làm nguồn gốc để tạo object? Câu trả lời là "tạo object mới từ object làm nguồn gốc".

Ví dụ, trong JavaScript, khi thực thi `Object.create()` với object đã có, ta nhận được object mới.

```js twoslash
const button = {
  name: "Button",
};

const dangerousButton = Object.create(button);
dangerousButton.name = "Đừng có nhấn nhé?";
```

Trong ví dụ trên, `button` và `dangerousButton` là các object khác nhau. Bằng chứng là property `name` của mỗi object có giá trị khác nhau.

```js twoslash
console.log(button.name);
// @log: "Button"
console.log(dangerousButton.name);
// @log: "Đừng có nhấn nhé?"
```

"Prototype" trong tiếng Việt có nghĩa là "nguyên mẫu". Nói đơn giản, prototype-based là cách tiếp cận tạo object từ object nguyên mẫu làm nguồn gốc.

:::info

### Cột: Prototype-based không trực quan?

Nhiều độc giả của cuốn sách này có lẽ đã quen với các ngôn ngữ class-based như PHP hay Java. Từ góc độ đó, prototype-based có thể cảm thấy không trực quan. Tuy nhiên, trong cuộc sống hàng ngày, chúng ta thực sự có những hoạt động mang tính prototype-based. Ở đây, tôi muốn kể một câu chuyện ví dụ nhỏ để prototype-based trở nên gần gũi hơn.

Bạn có bao giờ tạo tài liệu trong công việc không? Biên bản họp, tài liệu test spec, báo cáo, phiếu thanh toán chi phí... Có rất nhiều loại. Trong số đó, có những tài liệu tương tự được tạo nhiều lần định kỳ hoặc không định kỳ. Bạn xử lý công việc giấy tờ lặp đi lặp lại như thế nào?

Người chuẩn bị kỹ sẽ tạo template. Template là tài liệu mà phần không thay đổi được điền sẵn, phần thay đổi mỗi lần thì để trống. Khi cần tài liệu, chỉ cần điền vào chỗ trống dựa trên template là xong. Cách làm này giống với class-based. Class không thể sử dụng nguyên trạng, nhưng khi tạo instance thì có thể sử dụng. Template tài liệu cũng không thể nộp nguyên trạng, nhưng điền vào thì có ích.

Ngược lại, khi không có thời gian chuẩn bị tài liệu hoặc không có động lực để chuẩn bị, có thể không tạo template. Tuy nhiên, nếu có tài liệu đã dùng lần trước, bạn có thể sao chép nó và thêm bớt, thay thế nội dung cho phù hợp với lần này không? Cách tiếp cận này giống với prototype-based. Object prototype có thể sử dụng được chính nó, và object mới tạo từ nó cũng có thể sử dụng. Tài liệu đã dùng lần trước tự nó đã có ích, và tài liệu mới sao chép từ nó cũng có ích.

:::

## Kế thừa

Về kế thừa, class-based và prototype-based cũng có đặc điểm khác nhau. Trong class-based, khi kế thừa, sử dụng từ khóa `extends` để tạo class dẫn xuất từ class, rồi tạo object từ class dẫn xuất đó.

Hãy xác nhận quy trình trên bằng code cụ thể. Ở đây có class `Counter`.

```js twoslash
class Counter {
  constructor() {
    this.count = 0;
  }

  countUp() {
    this.count++;
  }
}
```

Class này có số đếm và hành vi count up. Class dẫn xuất có chức năng reset kế thừa từ class `Counter` này là class `ResettableCounter` sau.

```js twoslash
class Counter {
  constructor() {
    this.count = 0;
  }

  countUp() {
    this.count++;
  }
}
// ---cut---
class ResettableCounter extends Counter {
  reset() {
    this.count = 0;
  }
}
```

Để sử dụng class `ResettableCounter` này, tạo object bằng operator `new` với class này.

```js twoslash
class Counter {
  constructor() {
    this.count = 0;
  }

  countUp() {
    this.count++;
  }
}

class ResettableCounter extends Counter {
  reset() {
    this.count = 0;
  }
}
// ---cut---
counter = new ResettableCounter();
counter.countUp();
counter.reset();
```

Như ví dụ trên cho thấy, trong class-based, kế thừa và tạo object thường là các tính năng ngôn ngữ khác nhau như `extends` và `new`.

Ngược lại, trong JavaScript prototype-based, kế thừa cũng được thực hiện với cùng quy trình như tạo object. Ví dụ sau tạo object `resettableCounter` kế thừa từ object `counter`.

```js twoslash
const counter = {
  count: 0,
  countUp() {
    this.count++;
  },
};

const resettableCounter = Object.create(counter);
resettableCounter.reset = function () {
  this.count = 0;
};
```

Dù gọi là kế thừa, trong prototype-based không có cơ chế đặc biệt như `extends` của class-based, chỉ đơn giản là ứng dụng cơ chế prototype-based "tạo object mới từ object đã có" vào kế thừa.

## JavaScript cũng có thể viết theo style class-based

Qua giải thích đến đây, trong số những độc giả quen với class-based, có thể có người nghĩ "Khi muốn làm OOP trong JavaScript, phải viết theo cách khá độc đáo nhỉ". Điều tôi muốn bạn không hiểu lầm ở đây là JavaScript prototype-based cũng có thể viết theo cách giống class.

JavaScript cũ thực sự không có cú pháp class và có cách viết độc đáo, nhưng vì cú pháp `class` và `extends` được đưa vào ES2015, JavaScript gần đây có thể dễ dàng viết theo style class-based. Do đó, code JavaScript cũng trở nên dễ hiểu hơn với developer đến từ các ngôn ngữ class-based khác. Code sau đây được đưa ra khi giải thích class-based, nhưng thực ra đây là JavaScript.

```js twoslash
class Counter {
  constructor() {
    this.count = 0;
  }

  countUp() {
    this.count++;
  }
}
```

Trong phát triển JavaScript gần đây có thể sử dụng cú pháp `class`, không cần phải sử dụng nhiều `Object.create` hay cố gắng viết code theo kiểu prototype-based, nên đừng lo lắng. Tuy nhiên, dù có cú pháp `class`, không phải là JavaScript đã chuyển sang class-based, mà chỉ có thể viết theo style class-based. Cú pháp `class` cũng được xây dựng trên cơ chế prototype-based, và object model của JavaScript là prototype-based, nên cần ghi nhớ điểm này.

## Tại sao JavaScript là prototype-based?

Chúng ta đã xem prototype-based mà JavaScript áp dụng là gì. Vậy tại sao JavaScript lại chọn prototype-based thay vì class-based? Mục đích của việc chọn prototype-based là gì?

Việc phát triển JavaScript có các yêu cầu sau: Ngôn ngữ chạy trên browser, cú pháp giống Java. Tuy nhiên, không cầu kỳ như Java. Và thời gian phát triển chỉ có 10 ngày, rất gấp rút.

Người ta nói việc tạo ngôn ngữ class-based khó hơn tạo ngôn ngữ prototype-based. Vì thời gian để tạo JavaScript rất ít, prototype-based có lẽ đã góp phần giảm công sức.

JavaScript được tạo ra để giống Java. Java là class-based, nhưng JavaScript là prototype-based. Vậy JavaScript đã miễn cưỡng từ bỏ class-based? Thực ra không phải. Tác giả JavaScript, Brendan Eich, đã nói trong [cuộc phỏng vấn sau này](https://learning.oreilly.com/library/view/coders-at-work/9781430219484/Chapter04.html):

> **Seibel**: So you wanted to be like Java, but not too much.
> (Vậy bạn muốn giống Java, nhưng không quá nhiều.)
>
> **Eich**: Not too much. If I put classes in, I'd be in big trouble. Not that I really had time to, but that would've been a no-no.
> (Đúng vậy. Nếu tôi đưa class vào, sẽ rắc rối lớn. Không phải là tôi thực sự có thời gian, nhưng dù có thời gian thì class cũng là điều không nên.)

JavaScript ngay từ đầu không có ý định trở thành class-based. Eich dường như đã nghĩ đến việc làm ngôn ngữ đơn giản nhất có thể khi thiết kế JavaScript. JavaScript có ít loại primitive type, và primitive type cũng có thể sử dụng method như object nên không có khoảng cách lớn giữa primitive và object. Thiết kế ngôn ngữ như vậy cũng là vì hướng đến sự đơn giản.

Eich nói rằng có ảnh hưởng từ ngôn ngữ Self trong việc phát triển JavaScript. Self là ngôn ngữ lập trình hướng đối tượng prototype-based được công bố năm 1990. Tiêu đề của bài báo công bố Self là "The Power of Simplicity" nghĩa là "Sức mạnh của sự đơn giản". Self chủ trương rằng prototype-based làm ngôn ngữ đơn giản hơn đồng thời linh hoạt hơn so với OOP sử dụng class. Self là ngôn ngữ theo đuổi sự đơn giản, loại bỏ không chỉ class mà còn sự phân biệt giữa function và value, giữa method và field. Khi ngôn ngữ đơn giản, việc giải thích ngôn ngữ cũng trở nên dễ dàng và dễ học hơn. Self chủ trương rằng không phải từ bỏ kế thừa hay class để đơn giản hóa, ngược lại sự linh hoạt sinh ra nên có thể thực hiện class hay kế thừa bằng cách ứng dụng prototype.

Đây chỉ là ý kiến của Self và JavaScript không nói rõ, nhưng đọc từ bối cảnh lịch sử, rõ ràng JavaScript cũng đồng cảm với cách nghĩ của Self và áp dụng prototype-based. Đằng sau việc JavaScript áp dụng prototype-based có suy nghĩ muốn làm ngôn ngữ đơn giản và linh hoạt.

Việc JavaScript áp dụng prototype-based đã thực sự cho phép lập trình linh hoạt. Một ví dụ là idiom thực hiện OOP style class bằng cách ứng dụng prototype đã ra đời và được đưa vào cú pháp `class` trong specification ngôn ngữ, hay polyfill cho phép sử dụng method JavaScript phiên bản mới nhất trên môi trường thực thi cũ bằng cách programmer mở rộng prototype.

## Tóm tắt

- Class-based là style tạo object mới từ class làm nguồn gốc. Java, PHP thuộc loại này.
- Prototype-based là style tạo object mới từ object đã có. JavaScript thuộc loại này.
- Kế thừa trong prototype-based không phải là thao tác đặc biệt, mà là quy trình hoàn toàn giống với tạo object.
- JavaScript cũng có thể lập trình style class-based bằng cú pháp `class`.
- JavaScript áp dụng prototype-based với mục đích làm ngôn ngữ đơn giản và linh hoạt.
