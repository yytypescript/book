# プリミティブ以外はすべてオブジェクト

JavaScriptでは、プリミティブ型以外のものはすべてオブジェクト型です。オブジェクト型には、クラスから作ったインスタンスだけでなく、クラスそのものや配列、正規表現もあります。

プリミティブ型は値が同じであれば、同一のものと判定できますが、オブジェクト型はプロパティの値が同じであっても、インスタンスが異なると同一のものとは判定されません。

```js twoslash
const value1 = 123;
const value2 = 123;
console.log(value1 == value2);
// @log: true

const object1 = { value: 123 };
const object2 = { value: 123 };
console.log(object1 == object2);
// @log: false
```
