# instanceof演算子

`instanceof`演算子は、特定のオブジェクトがクラスのインスタンスかをチェックするJavaScriptの演算子です。

## 構文

```js
// prettier-ignore
オブジェクト instanceof クラス
```

### 引数

- オブジェクト: 検査するオブジェクトです。
- クラス: 検査対象のクラス名です。

## 例

```ts twoslash
class ClassA {}
class ClassB {}
const a = new ClassA();
console.log(a instanceof ClassA);
// @log: true
console.log(a instanceof ClassB);
// @log: false
```

## 継承と`instanceof`

`instanceof`は継承関係をチェックすることもできます。たとえば、次のように`Child`クラスのインスタンスが`Parent`クラスのインスタンスかをチェックすることができます。

```ts twoslash
class Parent {}
class Child extends Parent {}
const child = new Child();
console.log(child instanceof Parent);
// @log: true
```

## `instanceof`の反転

`instanceof`演算子の結果を反転させる場合は、`値 instanceof クラス名`の句全体をカッコで囲った上で、否定演算子`!`を先頭につける必要があります。

```ts twoslash
class MyClass {}
const myInstance = new MyClass();
// ---cut---
if (!(myInstance instanceof MyClass)) {
  // myInstanceがMyClassではないときの処理
}
```

## 抽象クラスと`instanceof`

TypeScriptには[抽象クラス](./abstract-class.md)があります。`instanceof`演算子は抽象クラスについても使うことができます。

```ts twoslash
abstract class AbstractClass {}
class ConcreteClass extends AbstractClass {}
const obj = new ConcreteClass();
console.log(obj instanceof AbstractClass);
// @log: true
```
