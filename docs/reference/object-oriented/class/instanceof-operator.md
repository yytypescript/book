# instanceof演算子

JavaScriptでの継承関係のチェックは`instanceof`演算子で確認できます。この書き方は、JavaやPHPとよく似ています。

```js twoslash
class Parent {}

class Child extends Parent {}
// ---cut---
const parent = new Parent();
const child = new Child();

console.log(parent instanceof Parent);
// @log: true
console.log(parent instanceof Child);
// @log: false

console.log(child instanceof Parent);
// @log: true
console.log(child instanceof Child);
// @log: true
```
