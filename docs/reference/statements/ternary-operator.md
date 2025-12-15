---
sidebar_label: 三項演算子
---

# Toán tử ba ngôi (ternary operator)

Toán tử ba ngôi (ternary operator) trong JavaScript là toán tử có thể thực hiện điều kiện phân nhánh. Được gọi là toán tử ba ngôi vì nhận ba toán hạng: biểu thức điều kiện, giá trị khi đúng, và giá trị khi sai.

```js
điều_kiện ? giá_trị_khi_đúng : giá_trị_khi_sai;
```

Kết quả của phép toán có thể được gán cho biến.

```js twoslash
const age = 20;
const drink = age >= 20 ? "Bia" : "Nước trái cây";
console.log(drink);
// @log: "Bia"
```

Nói đến điều kiện phân nhánh là if-else, nhưng vì if-else là câu lệnh nên không thể viết như trên để trực tiếp trả về giá trị.

```js
// Không thể viết như thế này
const drink = if (age >= 20) "Bia" else "Nước trái cây";
```

Toán tử ba ngôi có thể lồng nhau.

```js twoslash
const extension = "ts";
const language =
  extension === "js"
    ? "JavaScript"
    : extension === "ts"
    ? "TypeScript"
    : extension === "java"
    ? "Java"
    : "Không xác định";
```

Viết xử lý tương đương bằng if-else như sau.

```js twoslash
const extension = "ts";
let language;
if (extension === "js") {
  language = "JavaScript";
} else if (extension === "ts") {
  language = "TypeScript";
} else if (extension === "java") {
  language = "Java";
} else {
  language = "Không xác định";
}
```

## Thông tin liên quan

[if-else文](if-else.md)

[switch文](switch.md)
