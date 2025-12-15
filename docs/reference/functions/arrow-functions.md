---
sidebar_label: Arrow function
---

# Arrow function

Arrow function là một trong những cách tạo function trong JavaScript.

## Cú pháp arrow function

Arrow function trong JavaScript đặc trưng bởi cú pháp ngắn gọn. Bạn viết danh sách tham số trong ngoặc đơn, ký hiệu mũi tên `=>`, và nội dung xử lý trong ngoặc nhọn.

```js twoslash
(tham_số) => {
  // Nội dung xử lý
};
```

Arrow function là một expression. Expression là thứ mà khi được đánh giá sẽ trả về một giá trị. Để đặt tên cho arrow function, bạn gán nó vào một biến.

```js twoslash
const tên_biến = (tham_số) => {
  // Nội dung xử lý
};
```

Ví dụ, nếu viết lại [function expression](./function-expression.md) sau thành arrow function:

```js twoslash title="Function increment được định nghĩa bằng function expression"
const increment = function (n) {
  return n + 1;
};
```

Sẽ trở thành:

```js twoslash title="Function increment được định nghĩa bằng arrow function"
const increment = (n) => {
  return n + 1;
};
```

### Cú pháp rút gọn của arrow function

Trong JavaScript, arrow function có thể bỏ ngoặc đơn của tham số khi chỉ có một tham số duy nhất.

```js twoslash
// prettier-ignore
const increment = n => { /* ... */ };
//                ^Bỏ ngoặc đơn
```

Khi không có tham số, bạn không thể bỏ ngoặc đơn.

```js twoslash title="Arrow function không có tham số"
const getOne = () => {
  return 1;
};
```

Hơn nữa, nếu code bên trong function chỉ có một expression duy nhất, bạn có thể bỏ ngoặc nhọn `{}` và `return`. Cú pháp rút gọn này được gọi là concise body, còn cú pháp đầy đủ được gọi là block body.

```js twoslash
// prettier-ignore
const increment = n => n + 1;
//                     ^^^^^Bỏ return và ngoặc nhọn
```

Cần lưu ý khi giá trị trả về là [object literal](../values-types-variables/object/object-literal.md). Trong concise body, bạn phải bọc object literal bằng ngoặc đơn `()`.

```js twoslash
// prettier-ignore
(n) => { foo: n + 1 }; // Sai
(n) => ({ foo: n + 1 }); // Đúng
```

Nếu không làm vậy, ngoặc nhọn `{}` mà bạn định dùng để đánh dấu đầu và cuối của object literal sẽ bị hiểu là ngoặc nhọn của block body, dẫn đến xử lý khác. Trong ví dụ trên, `foo` sẽ được coi là label thay vì key của object property.

## Type annotation cho arrow function

Trong TypeScript, bạn có thể viết type annotation cho tham số của arrow function.

```ts twoslash
const increment = (num: number) => num + 1;
//                    ^^^^^^^^Type annotation của tham số
```

Bạn cũng có thể viết type annotation cho giá trị trả về.

```ts twoslash
const increment = (num: number): number => num + 1;
//                             ^^^^^^^^Type annotation của giá trị trả về
```

Khi bỏ ngoặc đơn của tham số, **bạn không thể viết type annotation cho cả tham số và giá trị trả về.**

<!--prettier-ignore-->
```ts twoslash
// @noImplicitAny: false
const increment = num => num + 1;
```

Khi compiler option `noImplicitAny` được bật (cấm any ngầm định), arrow function bỏ ngoặc đơn tham số có thể gây lỗi compile.

<!--prettier-ignore-->
```ts twoslash
// @errors: 7006
const increment = num => num + 1;
```

[noImplicitAny](../tsconfig/noimplicitany.md)

Ngay cả khi `noImplicitAny` được bật, bạn vẫn có thể bỏ ngoặc đơn tham số nếu kiểu của tham số có thể được suy luận. Ví dụ như khi viết arrow function trực tiếp làm tham số của function khác. Function `map` dưới đây nhận một function làm tham số đầu tiên. Vì thông tin kiểu của tham số đầu tiên đã có kiểu cho tham số, type annotation của arrow function được truyền vào có thể bỏ qua.

```ts twoslash
[1, 2, 3].map((num) => num + 1); // Có thể bỏ type annotation
```

<PostILearned>

・Arrow function trong JavaScript có thể viết ngắn gọn theo dạng ()=>{}
・Khi có 1 tham số, có thể bỏ ()
・Khi xử lý chỉ có 1 dòng, có thể bỏ {} (concise body)
・Trong TypeScript, không thể viết type annotation khi bỏ ngoặc đơn tham số

</PostILearned>

## Thông tin liên quan

[Sự khác biệt giữa function expression và arrow function](function-expression-vs-arrow-functions.md)

[Function declaration](./function-declaration.md)

[Function expression](function-expression.md)
