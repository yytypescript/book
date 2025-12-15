# Câu lệnh switch

Cú pháp switch là cú pháp để thực hiện điều kiện phân nhánh trong JavaScript.

```js
switch (điều_kiện) {
  case giá_trị_A:
    xử_lý_cho_giá_trị_A;
    break;
  case giá_trị_B:
    xử_lý_cho_giá_trị_B;
    break;
  default:
    xử_lý_cho_các_giá_trị_khác;
    break;
}
```

Ví dụ sử dụng câu lệnh switch như sau.

```js twoslash
const extension = "ts";
switch (extension) {
  case "js":
    console.log("JavaScript");
    break;
  case "ts":
    console.log("TypeScript");
    break;
  default:
    console.log("Ngôn ngữ không xác định");
    break;
}
// @log: "TypeScript"
```

Viết lại code này bằng if-else như sau.

```js twoslash
const extension = "ts";
if (extension === "js") {
  console.log("JavaScript");
} else if (extension === "ts") {
  console.log("TypeScript");
} else {
  console.log("Ngôn ngữ không xác định");
}
// @log: "TypeScript"
```

Các case cũng có thể viết liên tiếp.

```js twoslash
const food = "🍙";
switch (food) {
  case "🍎":
  case "🍓":
  case "🍉":
    console.log("Trái cây");
    break;
  case "🍙":
  case "🍜":
  case "🍞":
    console.log("Tinh bột");
    break;
  case "🥕":
  case "🧅":
  case "🥬":
    console.log("Rau củ");
    break;
  default:
    console.log("Thức ăn không xác định");
    break;
}
// @log: "Tinh bột"
```

## switch sử dụng phép so sánh bằng nghiêm ngặt

Trong cú pháp switch, giá trị được xác định bằng phép so sánh bằng nghiêm ngặt (`===`) chứ không phải phép so sánh bằng (`==`). Ví dụ, `null` và `undefined` được coi là bằng nhau trong phép so sánh bằng, nhưng không bằng nhau trong phép so sánh bằng nghiêm ngặt.

```ts twoslash
console.log(null == undefined);
// @log: true
console.log(null === undefined);
// @log: false
```

Điều này rõ ràng khi tạo cú pháp switch sử dụng hai giá trị này.

```ts twoslash
function test(n: unknown): void {
  switch (n) {
    case null:
      console.log("THIS IS null");
      return;
    case undefined:
      console.log("THIS IS undefined");
      return;
    default:
      console.log("THIS IS THE OTHER");
  }
}

test(null);
// @log: 'THIS IS null'
test(undefined);
// @log: 'THIS IS undefined'
```
