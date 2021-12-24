# オブジェクトのプロパティ

JavaScriptのオブジェクトは、プロパティの集合体です。プロパティはキーと値の対です。プロパティの値には、`1`や`"string"`のようなプリミティブ型や関数、そして、オブジェクトも入れることができます。

```js
const product = {
  name: "ミネラルウォーター",
  price: 100,
  getTaxIncludedPrice: function () {
    return Math.floor(this.price * 1.1);
  },
  shomikigen: new Date("2022-01-20"),
};
```

上の`getTaxIncludedPrice`には関数が代入されていますが、この関数は「メソッド」と呼ばれます。メソッドとは、オブジェクトに関連づいた関数のことです。メソッドを定義するには、キーと関数の値に分けて書く方法だけでなく、メソッド定義のための短い構文を使うこともできます。

```js
const object = {
  // キーと値に分けて書いたメソッド定義
  printHello1: function () {
    console.log("Hello");
  },
  // 短い構文を用いたメソッド定義
  printHello2() {
    console.log("Hello");
  },
};
```

JavaやPHPでは、オブジェクトのフィールドとメソッドははっきり区別されます。一方、JavaScriptではその区別はきっちりしていません。Javaで言うところのメソッドとフィールドは、JavaScriptでは同じように扱われます。たとえば、メソッドに`null`を代入することで、フィールドに変えてしまうこともできます。

```js twoslash
const calculator = {
  sum(a, b) {
    return a + b;
  },
};

calculator.sum(1, 1);
// @log: 2
calculator.sum = null;
calculator.sum(1, 1); // ここではもうメソッドではないので、呼び出すとエラーになります
```
