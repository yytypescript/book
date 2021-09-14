# クラスはオブジェクト

JavaScriptのクラスの特徴は、クラスもオブジェクトの一種というところです。オブジェクトとは、プロパティの集合体だと前述しましたが、クラスもオブジェクトなのでプロパティの集合体としての性質を持ちます。したがって、定義したクラスはプロパティを追加したり、変更したりできます。

```javascript
const myObject = {};
myObject.key = "value"; // プロパティを追加

class MyClass {}
MyClass.key = "value"; // プロパティを追加
```

一方、TypeScriptでは型安全のためにこうした動的な拡張ができないようになっています。

```typescript
class MyClass {}
MyClass.key = "value";
// ERROR: Property 'key' does not exist on type 'typeof MyClass'.(2339)
```

