---
sidebar_label: Sai số khi tính toán số thập phân
---

# Sai số khi tính toán số thập phân

Cần lưu ý rằng phép tính số thập phân trong JavaScript có thể phát sinh sai số. Ví dụ, 0.1 + 0.2 lẽ ra phải là 0.3, nhưng kết quả tính toán lại là 0.30000000000000004. Đây không phải là bug của JavaScript.

```js
0.1 + 0.2 === 0.3; //=> false
```

Kiểu number tuân thủ chuẩn IEEE 754, và hiện tượng này xảy ra do các ràng buộc của chuẩn đó. Số 0.2 trong hệ thập phân là số thập phân hữu hạn, nhưng khi biểu diễn trong hệ nhị phân sẽ thành số thập phân tuần hoàn như 0.0011... Số thập phân tuần hoàn có phần thập phân vô hạn, nhưng vì IEEE 754 chỉ xử lý được số chữ số thập phân hữu hạn, nên số tuần hoàn bị cắt bỏ ở giữa. Kết quả là phát sinh sai số trong phép tính số thập phân. Điều này tương tự như ràng buộc khi chúng ta tính toán số pi bằng tay. Số pi là 3.141592... với phần thập phân vô hạn, nhưng vì thời gian và giấy có hạn, chúng ta chấp nhận một mức sai số nhất định và làm tròn thành 3.14 để tính toán. Nhân tiện, các phép tính chỉ với những số là số thập phân hữu hạn trong hệ nhị phân như 0.5 hay 0.25 thì có thể tính toán không có sai số.

```js
0.5 + 0.25 === 0.75; //=> true
```

Để giải quyết sai số khi tính toán số thập phân, có thể nghĩ đến phương pháp tạm thời nâng lên thành số nguyên để tính, rồi hạ xuống lại số chữ số ban đầu. Đây là phương pháp dựa vào đặc tính phép tính số nguyên không phát sinh sai số. Ví dụ, hãy xem xét phép tính giá bao gồm thuế tiêu thụ của 110 yên. Khi nhân 110 với 1.1, sẽ phát sinh sai số và không ra đúng 121 yên.

```js
110 * 1.1; //=> 121.00000000000001
```

Vì vậy, hãy thử nhân 110 với thuế suất đã nâng lên là 11, rồi chia cho 10. Khi đó, có thể tính toán chính xác.

```js
(110 * 11) / 10 === 121; //=> true
```

Khi sử dụng phương pháp này, cần lưu ý rằng số sau khi hạ số chữ số có thể là số thập phân, và giá trị đó vẫn còn vấn đề sai số khi tính toán số thập phân.

```js twoslash
const price1 = (101 * 11) / 10; // 111.1
const price2 = (103 * 11) / 10; // 113.3
price1 + price2; // 224.39999999999998
```

Nếu muốn giải quyết vấn đề sai số khi tính toán số thập phân một cách toàn diện, có thể sử dụng package không có sai số tính toán như [decimal.js](https://github.com/MikeMcl/decimal.js/).
