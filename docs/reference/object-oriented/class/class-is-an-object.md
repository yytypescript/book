# クラスはオブジェクト

JavaScriptのクラスの特徴は、クラスもオブジェクトの一種というところです。JavaScriptのオブジェクトはプロパティの集合体です。クラスもオブジェクトなのでプロパティの集合体としての性質を持ちます。したがって、定義したクラスはプロパティを追加したり、変更したりできます。

```js
const myObject = {};
myObject.key = "value"; // プロパティを追加

class MyClass {}
MyClass.key = "value"; // プロパティを追加
```

一方、TypeScriptでは型安全のためにこうした動的な拡張ができないようになっています。

```ts
class MyClass {}
MyClass.key = "value";
// ERROR: Property 'key' does not exist on type 'typeof MyClass'.(2339)
```
