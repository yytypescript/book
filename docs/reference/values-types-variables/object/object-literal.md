---
sidebar_label: Object literal
---

# Object literal

Đặc điểm của JavaScript là có thể dễ dàng tạo object bằng cú pháp object literal `{}`.

```js twoslash
// Tạo object rỗng
const object = {};

// Tạo object với các property
const person = { name: "Bob", age: 25 };
```

Trong các ngôn ngữ như Java hay PHP, để tạo object thường phải định nghĩa class trước rồi tạo instance từ class đó. Nhưng JavaScript không cần định nghĩa class, chỉ cần viết object literal như trên là có thể tạo object inline.

Nhờ có object literal, JavaScript cho phép viết code với độ linh hoạt cao.

Như ví dụ sau, JavaScript cũng có thể tạo object bằng cách `new Object`. Tuy nhiên, sử dụng object literal sẽ cho code ngắn gọn và dễ đọc hơn.

```js twoslash
const person = new Object();
person.name = "Bob";
person.age = 25;
```

Ngoài ra, bạn chắc đã biết JSON là format serialize dữ liệu được sử dụng rộng rãi. JSON được dùng trong nhiều ngôn ngữ lập trình, nhưng JSON là viết tắt của JavaScript Object Notation, và nguồn gốc của JSON là từ object literal của JavaScript. Và trong JavaScript, có thể interpret JSON trực tiếp như object literal.
