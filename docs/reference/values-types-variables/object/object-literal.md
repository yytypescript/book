---
sidebar_label: オブジェクトリテラル
---

# オブジェクトリテラル (object literal)

JavaScriptの特徴はオブジェクトリテラル`{}`という記法を用いて、簡単にオブジェクトを生成できる点です。

```js
// 空っぽのオブジェクトを生成
const object = {};

// プロパティを指定しながらオブジェクトを生成
const person = { name: "Bob", age: 25 };
```

JavaやPHPなどの言語では、オブジェクトを生成するにはまずクラスを定義し、そのクラスを元にインスタンスを作るのが普通ですが、JavaScriptはクラス定義がなくてもこのようにオブジェクトリテラルを書くと、オブジェクトをインラインで作れます。

オブジェクトリテラルがあるおかげで、JavaScriptでは自由度の高いコードが書けるようになっています。

次の例のように、JavaScriptでも`Object`を`new`することでオブジェクトを作ることができます。しかし、オブジェクトリテラルを使ったほうが端的で読みやすいコードになります。

```js
const person = new Object();
person.name = "Bob";
person.age = 25;
```

ちなみに、広く使われるデータシリアライズ形式にJSONがあるのはご存知でしょう。JSONは多くのプログラミング言語で用いられていますが、JSONはJavaScript Object Nationの略で、JSONの由来はJavaScriptのオブジェクトリテラルにあります。そして、JavaScriptではJSONをそのままオブジェクトリテラルとして解釈できます。
