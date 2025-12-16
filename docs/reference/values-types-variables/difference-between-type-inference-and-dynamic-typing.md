# Sự khác biệt giữa type inference và dynamic typing

Về mặt không viết kiểu, các ngôn ngữ dynamic typing như JavaScript, Ruby, PHP cũng tương tự. Vậy type inference và dynamic typing khác nhau như thế nào?

Type inference quyết định kiểu tại thời điểm compile và kiểu đó không thay đổi. Sự khác biệt nằm ở việc lập trình viên viết kiểu hay compiler tự động quyết định, và điều này hoàn toàn nằm trong thế giới static typing.

Trong ví dụ TypeScript sau, biến `x` được xác định là kiểu `number` bằng type inference, và sau đó luôn hoạt động như kiểu `number`.

```ts twoslash title="TypeScript"
// @errors: 2322 2339
let x = 1;
//  ^?
x = "hello"; // x đã được xác định là kiểu number nên gán kiểu string sẽ gây lỗi
console.log(x.substring(1, 3));
```

Mặt khác, với dynamic typing, kiểu được quyết định tại runtime, nên kiểu thay đổi tùy theo thời điểm thực thi. Trong ví dụ JavaScript sau, đầu tiên giá trị `1` được gán và kiểu của biến `x` là `number`. Sau đó, bằng việc gán chuỗi `hello`, kiểu của biến `x` thay đổi thành `string`. Do kiểu thay đổi tại thời điểm thực thi như vậy, các xử lý gây lỗi trong type inference vẫn hoạt động bình thường trong ngôn ngữ dynamic typing.

```ts title="JavaScript" twoslash
let x = 1; // x có kiểu number
x = "hello"; // x có kiểu string
console.log(x.substring(1, 3));
// @log: "el"
// @noErrors
```
