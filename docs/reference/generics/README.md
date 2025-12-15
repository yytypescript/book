---
sidebar_label: Generics
slug: /reference/generics
---

# Generics (generics)

Việc kết hợp giữa type safety và code reusability là một thách thức. Nếu cố gắng sử dụng cùng một đoạn code cho nhiều kiểu dữ liệu khác nhau, type safety sẽ bị hy sinh. Ngược lại, nếu tập trung vào type safety, bạn sẽ phải viết nhiều đoạn code tương tự nhau, khiến code reusability khó đạt được. Generics là tính năng được giới thiệu để giải quyết vấn đề này. Với generics, bạn có thể **đồng thời đảm bảo type safety và code reusability**.

## Vấn đề mà generics giải quyết

Hãy xem generics giải quyết những vấn đề cụ thể nào. Ở đây có một hàm thông thường là `chooseRandomlyString()`. Hàm này nhận hai tham số kiểu string và trả về ngẫu nhiên một trong hai giá trị với xác suất 50-50.

```ts twoslash
function chooseRandomlyString(v1: string, v2: string): string {
  return Math.random() <= 0.5 ? v1 : v2;
}
```

`chooseRandomlyString` có thể được tái sử dụng cho việc chọn ngẫu nhiên string.

```ts twoslash
declare function chooseRandomlyString(v1: string, v2: string): string;
// ---cut---
const winOrLose = chooseRandomlyString("勝ち", "負け");
```

Tiếp theo, giả sử bạn cần chọn ngẫu nhiên không chỉ string mà còn cả number với cùng logic. Vì `chooseRandomlyString()` chỉ hỗ trợ string nên bạn phải tạo một hàm mới cho number.

```ts twoslash
// Hàm chọn ngẫu nhiên cho number
function chooseRandomlyNumber(v1: number, v2: number): number {
  return Math.random() <= 0.5 ? v1 : v2;
}
const num: number = chooseRandomlyNumber(1, 2);
```

Hơn nữa, vì logic chọn ngẫu nhiên 50-50 rất generic, bạn cũng tạo implementation cho đối tượng `URL` để phục vụ A/B test quảng cáo.

```ts twoslash
const urlA: URL = new URL("https://www.example.com/1");
const urlB: URL = new URL("https://www.example.com/2");
// ---cut---
// Hàm chọn ngẫu nhiên cho URL object
function chooseRandomlyURL(v1: URL, v2: URL): URL {
  return Math.random() <= 0.5 ? v1 : v2;
}
const url: URL = chooseRandomlyURL(urlA, urlB);
```

Đến đây, hàm `chooseRandomly()` đã bị sao chép hai lần, tạo ra ba hàm giống hệt nhau chỉ khác nhau về kiểu dữ liệu.

```ts twoslash
// 3 hàm trùng lặp
function chooseRandomlyString(v1: string, v2: string): string {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomlyNumber(v1: number, v2: number): number {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomlyURL(v1: URL, v2: URL): URL {
  return Math.random() <= 0.5 ? v1 : v2;
}
```

Vậy làm thế nào để tái sử dụng code? Một phương pháp có thể nghĩ đến là dùng kiểu `any`. Vấn đề của phương pháp này là kiểu trả về cũng trở thành `any`, khiến compiler không thể kiểm tra và dễ gây ra lỗi. Nói cách khác, type safety bị mất đi.

Trong đoạn code mẫu dưới đây, tuy truyền kiểu `number` vào `chooseRandomly()`, nhưng lại xử lý giá trị trả về như kiểu `string`. Code này không gây compile error, nhưng khi chạy sẽ xuất hiện lỗi "TypeError: str.toLowerCase is not a function" ở dòng 5.

```ts twoslash
function chooseRandomly(v1: any, v2: any): any {
  return Math.random() <= 0.5 ? v1 : v2;
}
let str = chooseRandomly(0, 1);
str = str.toLowerCase();
```

Làm thế nào để đạt được cả code reusability và type safety? Đây là lúc generics phát huy tác dụng. Ý tưởng của generics rất đơn giản: "cho phép xử lý type như biến". Điều này có nghĩa là gì? Hãy xem ba hàm trùng lặp ở trên từ góc độ "phần nào khác nhau?". Bạn sẽ nhận thấy chỉ có phần được đánh dấu bằng `<>` dưới đây là khác nhau. Phần còn lại hoàn toàn giống nhau.

```ts twoslash
// @noErrors
function chooseRandomly<String>(v1: <string>, v2: <string>): <string> {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomly<Number>(v1: <number>, v2: <number>): <number> {
  return Math.random() <= 0.5 ? v1 : v2;
}
function chooseRandomly<URL>(v1: <URL>, v2: <URL>): <URL> {
  return Math.random() <= 0.5 ? v1 : v2;
}
chooseRandomly<String>("勝ち", "負け");
chooseRandomly<Number>(1, 2);
chooseRandomly<URL>(urlA, urlB);
```

Phần khác nhau này liên quan đến type. Nếu muốn xử lý phần này như biến, ngay cả khi chưa biết cú pháp generics, các programmer có thể tưởng tượng ra code như sau:

```ts twoslash
// @noErrors
// Lưu ý: Đây là cú pháp giả định
function chooseRandomly<type>(v1: <type>, v2: <type>): <type> {
  return Math.random() <= 0.5 ? v1 : v2;
}
chooseRandomly<string>("勝ち", "負け");
chooseRandomly<number>(1, 2);
chooseRandomly<URL>(urlA, urlB);
```

Phần được thay thế bằng `<type>` biểu thị "type argument". Giống như argument của value, trong ví dụ này type cũng là argument nên khi gọi hàm `chooseRandomly()`, bạn truyền type vào hàm như `chooseRandomly<string>`. Code xử lý type như argument đã ra đời. Bây giờ bạn đã hiểu ý nghĩa của "generics cho phép xử lý type như biến" chưa?

Đoạn code trên chỉ là code giả định để hiểu ý tưởng của generics. TypeScript không thể hiểu code này, vì vậy hãy viết lại bằng cú pháp generics của TypeScript. Nó không quá khác biệt so với code giả định. Cú pháp như sau:

```ts twoslash
const urlA: URL = new URL("https://www.example.com/1");
const urlB: URL = new URL("https://www.example.com/2");
// ---cut---
function chooseRandomly<T>(v1: T, v2: T): T {
  return Math.random() <= 0.5 ? v1 : v2;
}
chooseRandomly<string>("勝ち", "負け");
chooseRandomly<number>(1, 2);
chooseRandomly<URL>(urlA, urlB);
```

`<T>` trong `chooseRandomly` là định nghĩa type variable. Theo quy ước, `T` thường được sử dụng, nhưng bạn cũng có thể dùng `A` hoặc `Type`. `T` được viết ở kiểu tham số và kiểu trả về của hàm là tham chiếu đến type variable.

Hãy thử dùng hàm `chooseRandomly` đã được generic hóa với đoạn code lỗi mà trước đây không phát hiện được lúc compile. Bây giờ sẽ xuất hiện compile error "Argument of type '0' is not assignable to parameter of type 'string'.", giúp phát hiện lỗi khi truyền `0` vào nơi phải là kiểu `string`.

```ts twoslash
// @errors: 2345
function chooseRandomly<T>(v1: T, v2: T): T {
  return Math.random() <= 0.5 ? v1 : v2;
}
let str = chooseRandomly<string>(0, 1);
str = str.toLowerCase();
```

Cho đến nay, chúng ta đã thấy quá trình tái sử dụng các hàm không generic và đồng thời đảm bảo type safety, đồng thời giải thích các vấn đề mà generics giải quyết. Generics là tính năng ngôn ngữ cho phép kết hợp code reusability và type safety. Khi muốn sử dụng code generic với nhiều kiểu dữ liệu khác nhau, hãy cân nhắc sử dụng generics.

## Tóm tắt

- Code reusability làm giảm type safety.
- Type safety cao khiến code reusability khó đạt được.
- Generics là tính năng ngôn ngữ giúp kết hợp code reusability và type safety.
- Generics dựa trên ý tưởng xử lý type như argument.
