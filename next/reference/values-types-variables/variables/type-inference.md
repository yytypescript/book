# 変数宣言の型推論 \(Type Inference\)

TypeScriptには型推論と呼ばれる機能があります。型推論は、**コンパイラが型を自動で判別する機能**です。プログラマーは型推論を活用すると、型注釈を省略できるので、コードの記述量を減らせる利点があります。

```typescript
let x = 1; // let x: number = 1;と同じ意味になる

x = "hello";
// Error: Type 'string' is not assignable to type 'number'.
```

上の例では変数`x`に`1`の値コードを代入しています。この時点でコンパイラは代入された値から、変数`x`の型を`number`型と自動で判別します。型注釈`x: number`を書くことを省略できます。

型注釈が書かれていないものの`x`は`number`型を推論されているため、`x`に`hello`の文字列型を再代入する記述は、型の不一致によりコンパイルエラーとなります。

## 動的型付けとの違い

型を書かないという意味では、JavaScriptをはじめRubyやPHPなどの動的型付け言語でも同様です。型推論と動的型付けは何が違うのでしょうか？

型推論はコンパイルのタイミングで型が決定され、その型が変更されることはありません。型をプログラマが書くかコンパイラが自動で決めるという点で違いがあり、あくまで静的型付けの世界に閉じた話になります。

次のTypeScriptの例では、変数`x`が型推論により `number`型として決定され、以降は常に `number`型として振舞います。

```typescript
// TypeSciprtでの例
// let x: number
let x = 1;

// Error: Type 'string' is not assignable to type 'number'.
x = 'hello'; // x はnumber型と決定しているのでstring型を代入するとエラー

// Property 'substring' does not exist on type 'number'.
console.log(x.substring(1,3))
```

一方、動的型付けでは実行時に型が決まるので、実行タイミングにより型が変化します。次のJavaScriptの例では、最初に`1`の値が代入され変数`x`の型は`number`型となります。その後、`hello`の文字列を代入することで 変数`x`の型は `string`型に変更されます。このように実行タイミングで型が変化するので、型推論ではエラーになる処理も動的型付け言語では正常に動作します。

```javascript
// JavaScriptでの例
let x = 1; // x はnumber型となる
x = 'hello'; // x はstring型となる

// output: "el"
console.log(x.substring(1,3))
```



