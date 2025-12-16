# Property của object

Object trong JavaScript là tập hợp các property. Property là cặp key và value. Value của property có thể là primitive type như `1` hay `"string"`, function, hoặc object.

```js twoslash
const product = {
  name: "Mineral Water",
  price: 100,
  getTaxIncludedPrice: function () {
    return Math.floor(this.price * 1.1);
  },
  expiryDate: new Date("2022-01-20"),
};
```

Ở trên, `getTaxIncludedPrice` được gán function, function này gọi là "method". Method là function gắn với object. Để định nghĩa method, ngoài cách viết tách key và value của function, còn có cú pháp ngắn gọn để định nghĩa method.

```js twoslash
const object = {
  // Định nghĩa method tách key và value
  printHello1: function () {
    console.log("Hello");
  },
  // Định nghĩa method bằng cú pháp ngắn
  printHello2() {
    console.log("Hello");
  },
};
```

Trong Java hay PHP, field và method của object được phân biệt rõ ràng. Ngược lại, JavaScript không phân biệt chặt chẽ. Method và field theo cách gọi của Java được JavaScript xử lý như nhau. Ví dụ, có thể gán `null` vào method để biến nó thành field.

```js twoslash
const calculator = {
  sum(a, b) {
    return a + b;
  },
};

calculator.sum(1, 1);
// @log: 2
calculator.sum = null;
calculator.sum(1, 1); // Không còn là method nên gọi sẽ bị error
```
