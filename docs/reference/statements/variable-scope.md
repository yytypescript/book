---
sidebar_label: 変数のスコープ
---

# 変数のスコープ (scope)

スコープ(scope)とは、変数がどこから参照できるかを定めた変数の有効範囲のことです。JavaScriptには大きく分けてグローバルスコープとローカルスコープの2つがあります。

## グローバルスコープ

グローバルスコープ(global scope)はプログラムのどこからでも参照できる変数です。JavaScriptにはグローバルオブジェクト(global object)と呼ばれるオブジェクトがたったひとつ存在します。ブラウザでは`window`オブジェクトがグローバルオブジェクトです。

グローバル変数は、グローバルオブジェクトのプロパティになります。ブラウザでは、`window`オブジェクトのプロパティになっていることになります。日付の`Date`クラスや、デバッグに使う`console`オブジェクトなどの組み込みAPIはすべて`window`オブジェクトのプロパティです。グローバル変数へのアクセスはwindowを省略して書くことができます。

```js twoslash
Date === window.Date; //=> true
console === window.console; //=> true
```

ローカルスコープ以外で`var`を用いて変数宣言すると、グローバル変数になります。ただ、`var`の使用は本書としては非推奨です。

[varはもう使わない](../values-types-variables/vars-problems.md)

## ローカルスコープ

ローカルスコープ(local scope)は、一定範囲にだけ効く変数スコープです。

### 関数スコープ

関数スコープ(function scope)は、関数内でのみ参照できる範囲です。関数内で宣言された変数は、関数の外から参照できません。

```js twoslash
function func() {
  const variable = 123;
  return variable; // 参照できる
}
console.log(variable); // 参照できない
```

### レキシカルスコープ

レキシカルスコープ(lexical scope)変数とは、関数を定義した地点から参照できる、関数の外の変数を言います。

```js twoslash
const x = 100;

function a() {
  console.log(x); // 関数の外の変数が見える
}

a();
// @log: 100
```

### ブロックスコープ

ブロックスコープ(block scope)は、ブレース`{ }`で囲まれた範囲だけ有効なスコープです。ブロックスコープ内の変数は、ブロックの外から参照できません。

<!--prettier-ignore-->
```js twoslash
{
  const x = 100;
  console.log(x);
// @log: 100
}
console.log(x); // xを参照できない
// @error: ReferenceError: x is not defined
```

ブロックスコープはif構文などのブレースにも作用します。条件分岐の中で変数宣言された変数は、条件分岐の外からは参照できないので注意しましょう。

```js twoslash
if (navigator.userAgent.includes("Firefox")) {
  const browser = "Firefox";
} else {
  const browser = "Firefox以外";
}
console.log(browser); // 参照できずエラー
```

上の例は、ブロックスコープの外で変数宣言するように書き換える必要があります。

```js twoslash
let browser;
if (navigator.userAgent.includes("Firefox")) {
  browser = "Firefox";
} else {
  browser = "Firefox以外";
}
console.log(browser); // OK
```

## 意図しないグローバル変数への代入

JavaScriptではローカルスコープの変数に代入したつもりが、グローバル変数に代入してしまっていたといった事故が起こりえます。ローカル変数を宣言する場合は、`let`や`const`を用いますが、これを書き忘れた変数代入は、グローバル変数になってしまいます。

```js twoslash
function func() {
  foo = "ローカル変数のつもり";
}
func();
console.log(window.foo);
// @log: "ローカル変数のつもり"
```

JavaScriptで変数を扱う際は、誤ってグローバル変数を作ってしまわないよう注意が必要です。一方、TypeScriptでは変数宣言されていない変数に代入しようとすると、コンパイラが指摘してくれます。

```ts twoslash
// @errors: 2304
function func() {
  foo = "ローカル変数のつもり";
}
```

意図しないグローバル変数への代入は、JavaScriptの残念な仕様と言えますが、TypeScriptを使っているとこういったトラブルも発見しやすくなります。
