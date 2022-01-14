# varはもう使わない

`var`は古い変数宣言の方法です。`var`にはいくつかの問題点がありました。それを解決するために、ES2015で`let`と`const`が導入されました。ここでは、`var`とその問題点を説明します。新たにコードを書く場合には`var`は使わずに`let`と`const`を使うことを推奨します。

## varの変数宣言

`var`は次のように書くことで変数を宣言できます。

```js
var name = "taro";
```

初期値を省略した変数宣言もできます。その場合の変数値は`undefined`です。

```js
var name;
```

## varの問題点

`var`による変数宣言には気をつけるべき挙動が何点か存在します。

### 同名の変数宣言

`var`の変数宣言では同じ変数名で宣言をした場合にエラーとならずに、後から宣言された変数が有効となります。これは思いがけず既存の変数を書き換えてしまい、意図しない結果を出力する可能性があります。

```js
function test() {
  var x = 1;
  var x = 2;
  console.log(x);
}
```

`let`と`const`では、同名の変数宣言はエラーになるようになっています。

```ts twoslash
let x = 1;
let x = 2;
// @error: SyntaxError: Identifier 'x' has already been declared

const y = 1;
const y = 2;
// @error: SyntaxError: Identifier 'y' has already been declared
// @noErrors
```

### グローバル変数の上書き

`var`はグローバル変数として定義されたときに、`window`オブジェクトのプロパティとして定義されるため、既存のプロパティを上書きする危険性があります。

たとえば、ブラウザ上で`innerWidth`変数をグローバル変数として定義してしまうと、標準APIの`window.innerWidth`が上書きされるため、ブラウザの幅を変更しても常に同じ値が返ってくるようになってしまいます。

```js twoslash
var innerWidth = 10;
console.log(window.innerWidth);
// @log: 10
```

`let`や`const`はグローバルなスコープで定義されることはないため、`window`オブジェクトのプロパティを不用意に上書きする心配はありません。

```ts twoslash
const innerWidth = 10;
console.log(window.innerWidth);
// @log: 500
// @noErrors
```

[変数のスコープ (scope)](../statements/variable-scope.md)

### 変数の巻き上げ

JavaScriptで宣言された変数はスコープの先頭で変数が生成されます。これは**変数の巻き上げ**と呼ばれています。`var`で宣言された変数は、スコープの先頭で生成されて`undefined`で値が初期化されます。次の例では`greeting`変数への参照はエラーとならずに`undefined`となります。

```ts twoslash
console.log(greeting);
// @log: undefined
var greeting = "こんにちは";

// ↓ 巻き上げの影響で実際はこう実行される

// @noErrors
var greeting;
console.log(greeting);
// @log: undefined
greeting = "こんにちは";
```

`var`での変数巻き上げでは参照エラーとならないため、意図せずに`undefined`の値を参照し予期せぬバグが発生する危険性があります。

`let`と`const`では、宣言前の変数を参照すると`Reference Error`が発生します。

```ts twoslash
console.log(x);
// @errors: 2448 2454
let x = 1;

console.log(y);
// @errors: 2448 2454
const y = 2;
```

ただ、ここで注意すべきなのが`let`と`const`の場合でも**変数の巻き上げは発生している**という点です。では、なぜ`Reference Error`が発生するのでしょうか？

`var`は変数の巻き上げが発生したタイミングで`undefined`で**変数を初期化している**ため、値の参照が可能となっていました。それに対して`let`と`const`は変数の巻き上げが発生しても変数が評価されるまで**変数は初期化されません**。そのため、初期化されていない変数を参照するためReference Errorが発生しているのです。

次の例では`let`や`const`で変数の巻き上げが発生しないなら`console.log(x)`の評価のタイミングで関数の先頭で宣言されている`var x = 1`が参照されて`1`が出力されるはずです。しかし、実際は`let`で宣言された変数`x`がブロックスコープ内で初期化されていない状態で生成されるため、未初期化の`x`を参照してReference Errorが発生します。

```ts twoslash
// @errors: 2448 2454
function output() {
  var x = 1;
  {
    console.log(x);
    let x = 2;
  }
}

output();
```

### スコープ

JavaScript では`var`で宣言された変数のスコープは関数となるため、`{}`の中で変数宣言をしても最初に定義した変数`x`は上書きされます。

<!--prettier-ignore-->
```ts twoslash
function print() {
  var x = 1;
  if (true) {
    var x = 2;
    console.log(x);
// @log: 2
  }
  console.log(x);
// @log: 2
}
```

`let`と`const`のスコープはブロックスコープです。次の例は`var`では変数`x`が上書きされていましたが、ここではブロックスコープ内で異なる変数として別々に定義されています。

<!--prettier-ignore-->
```ts twoslash
function print() {
  const x = 1;
  if (true) {
    const x = 2;
    console.log(x);
// @log: 2
  }
  console.log(x);
// @log: 1
}
```
