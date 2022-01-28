# instanceof演算子

JavaScriptでの継承関係のチェックは`instanceof`演算子で確認できます。この書き方は、JavaやPHPとよく似ています。

```js
const parent = new Parent();
const child = new Child();

parent instanceof Parent; //=> true
parent instanceof Child; //=> false

child instanceof Parent; //=> true
child instanceof Child; //=> true
```
