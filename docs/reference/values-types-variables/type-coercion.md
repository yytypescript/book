---
sidebar_label: Type coercion
---

# Type coercion (ép kiểu)

JavaScript có data type, nhưng có những trường hợp khi thực hiện phép toán với hai giá trị khác kiểu mà không gây lỗi. Ví dụ, khi trừ kiểu number `1` từ kiểu string `"1"`, kết quả là kiểu number `0`.

```js
"1" - 1; //=> 0
```

Điều này là do cơ chế gọi là type coercion (ép kiểu). Type coercion là việc khi xử lý hai giá trị khác kiểu, một trong số chúng được chuyển đổi ngầm định sang kiểu khác.

Trong ví dụ trên, kiểu string `"1"` được ép kiểu thành kiểu number `1`, sau đó phép toán `- 1` được thực hiện, nên kết quả là `0`.

Trong các ngôn ngữ nghiêm ngặt về kiểu, có những ngôn ngữ không cho phép phép toán giữa các giá trị khác kiểu, nên những người quen với các ngôn ngữ đó cần đặc biệt chú ý.

Ngoài ra, cần lưu ý rằng kiểu được ép sang phụ thuộc vào toán tử. Ví dụ, khi cộng kiểu number `1` vào kiểu string `"1"`, kết quả là kiểu string `"11"`. Điều này là vì kiểu number `1` được ép kiểu thành kiểu string `"1"`, và trở thành phép nối chuỗi `"1" + "1"`.

```js
"1" + 1; //=> "11"
```

<PostILearned>

Khi thực hiện phép toán giữa hai giá trị khác kiểu như chuỗi và số, JavaScript có "type coercion" chuyển đổi kiểu ngầm định.

"1" - 1; //=> 0
"1" + 1; //=> "11"

</PostILearned>
