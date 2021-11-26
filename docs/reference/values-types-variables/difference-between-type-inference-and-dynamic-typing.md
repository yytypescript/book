# 型推論と動的型付けの違い

型を書かないという意味では、JavaScriptをはじめRubyやPHPなどの動的型付け言語でも同様です。型推論と動的型付けは何が違うのでしょうか？

型推論はコンパイルのタイミングで型が決定され、その型が変更されることはありません。型をプログラマが書くかコンパイラが自動で決めるという点で違いがあり、あくまで静的型付けの世界に閉じた話になります。

次のTypeScriptの例では、変数`x`が型推論により`number`型として決定され、以降は常に`number`型として振舞います。

```ts twoslash title="TypeScript"
// @errors: 2322 2339
let x = 1;
//  ^?
x = "hello"; // xはnumber型と決定しているのでstring型を代入するとエラー
console.log(x.substring(1, 3));
```

一方、動的型付けでは実行時に型が決まるので、実行タイミングにより型が変化します。次のJavaScriptの例では、最初に`1`の値が代入され変数`x`の型は`number`型となります。その後、`hello`の文字列を代入することで 変数`x`の型は`string`型に変更されます。このように実行タイミングで型が変化するので、型推論ではエラーになる処理も動的型付け言語では正常に動作します。

```ts title="JavaScript" twoslash
let x = 1; // xはnumber型となる
x = "hello"; //x はstring型となる
console.log(x.substring(1, 3));
// @log: "el"
// @noErrors
```
