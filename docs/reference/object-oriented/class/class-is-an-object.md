# クラスはオブジェクト

JavaScriptのクラスの特徴は、クラスもオブジェクトの一種というところです。JavaScriptのオブジェクトはプロパティの集合体です。クラスもオブジェクトですのでプロパティの集合体としての性質を持ちます。したがって、定義したクラスはプロパティを追加したり、変更したりできます。

```js twoslash
const myObject = {};
myObject.key = "value"; // プロパティを追加

class MyClass {}
MyClass.key = "value"; // プロパティを追加
```

一方、TypeScriptでは型安全のためにこうした動的な拡張ができないようになっています。

```ts twoslash
// @errors: 2339
class MyClass {}
MyClass.key = "value";
```
